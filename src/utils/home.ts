/* eslint-disable @typescript-eslint/no-explicit-any */
import EventEmitter from "eventemitter3";

const EVENT = new EventEmitter();

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
	TEXT = "text",
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

		case NodeType.TEXT:
			return {
				minWidth: "2em",
				minHeight: "2em",
			};

		default:
			return {
				minWidth: "2em",
				minHeight: "2em",
			};
	}
};

export const EventHandler = {
	emit: (event: string, data: unknown) => EVENT.emit(event, data),
	once: (event: string, cb: (args: unknown) => void) => EVENT.once(event, cb),
	on: (event: string, cb: (args: unknown) => void) => EVENT.on(event, cb),
	remove: (event: string, cb: (args: unknown) => void) =>
		EVENT.removeListener(event, cb),
};

export const debounce = (cb: (...args: any[]) => void, time = 300) => {
	let timer: number;

	return function (...args: any[]) {
		clearTimeout(timer);
		timer = setTimeout(() => {
			return cb(...args);
		}, time);
	};
};
