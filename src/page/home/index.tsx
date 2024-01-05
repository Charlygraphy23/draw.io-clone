/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  DragEvent,
  TouchEvent,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from "react";
import ReactFlow, {
  Background,
  BackgroundVariant,
  Connection,
  Controls,
  NodeMouseHandler,
  ReactFlowInstance,
  ReactFlowProvider,
  addEdge,
  useEdgesState,
  useNodesState,
} from "reactflow";
import "reactflow/dist/style.css";
import Sidebar from "../../components/sidebar";
import {
  NodeObject,
  NodeType,
  initialNodes,
  calculateStyle,
  EventHandler,
} from "../../utils/home";
import CircleNode from "../../components/nodes/components/circle";
import RectangleNode from "../../components/nodes/components/rectangle";
import EllipseNode from "../../components/nodes/components/ellipse";
import SquareNode from "../../components/nodes/components/square";
import RoundedRectangleNode from "../../components/nodes/components/rectangleRounded";
import TextNode from "../../components/nodes/components/text";
import StylePanel from "../../components/stylePanel";
import { Context } from "../../store";
import DownloadComponent from "../../components/download";

const nodeTypes = {
  [NodeType.CIRCLE]: CircleNode,
  [NodeType.RECTANGLE]: RectangleNode,
  [NodeType.ELLIPSE]: EllipseNode,
  [NodeType.SQUARE]: SquareNode,
  [NodeType.ROUNDED_RECTANGLE]: RoundedRectangleNode,
  [NodeType.TEXT]: TextNode,
};

function Home() {
  const reactFlowWrapper = useRef(null);
  const reactFlowInstance = useRef<ReactFlowInstance>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const { dispatch, state } = useContext(Context);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onDragOver = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const handleDrop = useCallback(
    (clientX: number, clientY: number) => {
      const type = state.currentType;

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      if (!reactFlowInstance.current) return;

      // reactFlowInstance.project was renamed to reactFlowInstance.screenToFlowPosition
      // and you don't need to subtract the reactFlowBounds.left/top anymore
      // details: https://reactflow.dev/whats-new/2023-11-10
      const position = reactFlowInstance.current.screenToFlowPosition({
        x: clientX,
        y: clientY,
      });

      const ID = NodeObject.getId();
      const newNode = {
        id: ID,
        type,
        position,
        data: { type: type },
        style: {
          background: "#ffffff",
          ...calculateStyle(type as NodeType),
        },
      };

      dispatch({
        type: "add",
        payload: newNode as unknown as Record<string, string>,
      });

      setNodes((nds) => nds.concat(newNode));
    },
    [dispatch, reactFlowInstance, setNodes, state?.currentType]
  );

  const onDrop = useCallback(
    (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      handleDrop(event.clientX, event.clientY);
    },
    [handleDrop]
  );

  const handleNodeClick: NodeMouseHandler = (_, node) => {
    dispatch({
      type: "selectedNode",
      payload: {
        id: node?.id,
      },
    });
  };

  const onTouchEnd = useCallback(
    (event: TouchEvent<HTMLDivElement>) => {
      event.preventDefault();
      const [touch] = Array.from(event.changedTouches);
      handleDrop(touch.clientX, touch.clientY);
    },
    [handleDrop]
  );

  useEffect(() => {
    const fn = () => {
      setNodes((prev) => {
        return prev?.map((node) => {
          if (node.id === state.selectedNodeId) {
            node.style = {
              width: node.width ?? 0,
              height: node.height ?? 0,
              ...state?.nodes[state.selectedNodeId].style,
            };
          }

          return node;
        });
      });
    };

    EventHandler.on("onTouchEnd", onTouchEnd);

    EventHandler.on("update-style", fn);

    return () => {
      EventHandler.remove("update-style", fn);
      EventHandler.remove("onTouchEnd", onTouchEnd);
    };
  }, [onTouchEnd, setNodes, state]);

  return (
    <div className="App">
      <ReactFlowProvider>
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
            onDragOver={onDragOver}
            onDrop={onDrop}
            onInit={(data) => {
              // @ts-expect-error
              reactFlowInstance.current = data as ReactFlowInstance;
            }}
            nodeTypes={nodeTypes}
            onNodeClick={handleNodeClick}
          >
            <Controls />
            <Background
              color={"#ccc"}
              variant={BackgroundVariant.Dots}
              gap={12}
              size={1}
            />
          </ReactFlow>
        </div>
        <Sidebar />
        <StylePanel />
        <DownloadComponent nodes={nodes} />
      </ReactFlowProvider>
    </div>
  );
}

export default Home;
