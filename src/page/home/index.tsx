import {
	DragEvent,
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
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
	const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
	const [edges, setEdges, onEdgesChange] = useEdgesState([]);
	const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance>(
		{} as ReactFlowInstance
	);
	const { dispatch, state } = useContext(Context);

	const onConnect = useCallback(
		(params: Connection) => setEdges((eds) => addEdge(params, eds)),
		[setEdges]
	);

	const onDragOver = useCallback((event: DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		event.dataTransfer.dropEffect = "move";
	}, []);

	const onDrop = useCallback(
		(event: DragEvent<HTMLDivElement>) => {
			event.preventDefault();
			const type = event.dataTransfer.getData("application/reactflow");

			// check if the dropped element is valid
			if (typeof type === "undefined" || !type) {
				return;
			}

			// reactFlowInstance.project was renamed to reactFlowInstance.screenToFlowPosition
			// and you don't need to subtract the reactFlowBounds.left/top anymore
			// details: https://reactflow.dev/whats-new/2023-11-10
			const position = reactFlowInstance.screenToFlowPosition({
				x: event.clientX,
				y: event.clientY,
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
				payload: newNode,
			});

			setNodes((nds) => nds.concat(newNode));
		},
		[reactFlowInstance, setNodes, dispatch]
	);

	const handleNodeClick: NodeMouseHandler = (_, node) => {
		dispatch({
			type: "selectedNode",
			payload: {
				id: node?.id,
			},
		});
	};

	useEffect(() => {
		const fn = () => {
			setNodes((prev) => {
				return prev?.map((node) => {
					if (node.id === state.selectedNodeId) {
						node.style = state?.nodes[state.selectedNodeId].style;
					}

					return node;
				});
			});
		};

		EventHandler.on("update-style", fn);

		return () => {
			EventHandler.remove("update-style", fn);
		};
	}, [setNodes, state]);

	return (
		<div className='App'>
			<ReactFlowProvider>
				<div className='reactflow-wrapper' ref={reactFlowWrapper}>
					<ReactFlow
						nodes={nodes}
						edges={edges}
						onNodesChange={onNodesChange}
						onEdgesChange={onEdgesChange}
						onConnect={onConnect}
						fitView
						onDragOver={onDragOver}
						onDrop={onDrop}
						onInit={setReactFlowInstance}
						nodeTypes={nodeTypes}
						onNodeClick={handleNodeClick}>
						<Controls />
						{/* <MiniMap /> */}
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
			</ReactFlowProvider>
		</div>
	);
}

export default Home;
