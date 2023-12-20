import { DragEvent, useCallback, useRef, useState } from "react";
import ReactFlow, {
	Background,
	BackgroundVariant,
	Connection,
	Controls,
	MiniMap,
	ReactFlowInstance,
	ReactFlowProvider,
	addEdge,
	useEdgesState,
	useNodesState,
} from "reactflow";
import "reactflow/dist/style.css";
import Sidebar from "../../components/sidebar";
import { NodeObject, NodeType, initialNodes } from "../../utils/home";
import CircleNode from "../../components/nodes/components/circle";
import RectangleNode from "../../components/nodes/components/rectangle";
import EllipseNode from "../../components/nodes/components/ellipse";
import SquareNode from "../../components/nodes/components/square";
import RoundedRectangleNode from "../../components/nodes/components/rectangleRounded";

const nodeTypes = {
	[NodeType.CIRCLE]: CircleNode,
	[NodeType.RECTANGLE]: RectangleNode,
	[NodeType.ELLIPSE]: EllipseNode,
	[NodeType.SQUARE]: SquareNode,
	[NodeType.ROUNDED_RECTANGLE]: RoundedRectangleNode,
};

function Home() {
	const reactFlowWrapper = useRef(null);
	const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
	const [edges, setEdges, onEdgesChange] = useEdgesState([]);
	const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance>(
		{} as ReactFlowInstance
	);

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
			console.log("TYPE", type);

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
				data: { label: "123", type: NodeType.RECTANGLE as string },
			};

			setNodes((nds) => nds.concat(newNode));
		},
		[reactFlowInstance, setNodes]
	);

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
						nodeTypes={nodeTypes}>
						<Controls />
						<MiniMap />
						<Background variant={BackgroundVariant.Dots} gap={12} size={1} />
					</ReactFlow>
				</div>
				<Sidebar />
			</ReactFlowProvider>
		</div>
	);
}

export default Home;
