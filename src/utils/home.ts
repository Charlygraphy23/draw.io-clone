class NodeId {
	private node_id = 0;

	getId() {
		console.log("this.node_id", this);
		this.node_id = this.node_id + 1;
		return `dndnode_${this.node_id}`;
	}
}

export const NodeObject = (() => new NodeId())();

export const initialNodes = [
	// {
	// 	id: "1",
	// 	type: "input",
	// 	data: { label: "input node" },
	// 	position: { x: 250, y: 5 },
	// },
];

export enum NodeType {
	RECTANGLE = "rectangle",
	SQUARE = "square",
	ROUNDED_RECTANGLE = "rounded_rectangle",
	ELLIPSE = "ellipsis",
	CIRCLE = "circle",
}

export const calculateStyle = (type: NodeType): React.CSSProperties => {
	switch (type) {
		case NodeType.RECTANGLE:
			return {
				minWidth: "2em",
				minHeight: "1em",
			};
		case NodeType.CIRCLE:
			return {
				minWidth: "2em",
				minHeight: "2em",
				borderRadius: "50%",
			};
		case NodeType.ELLIPSE:
			return {
				minWidth: "2em",
				minHeight: "1em",
				borderRadius: "50%",
			};
		case NodeType.ROUNDED_RECTANGLE:
			return {
				minWidth: "2em",
				minHeight: "1em",
				borderRadius: "5px",
			};
		case NodeType.SQUARE:
			return {
				minWidth: "2em",
				minHeight: "2em",
			};
	}
};
