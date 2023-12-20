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
