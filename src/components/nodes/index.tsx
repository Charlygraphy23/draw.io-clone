import { DragEvent, useCallback } from "react";
import Node from "./node";
import { NodeType } from "../../utils/home";

type Props = {
	data: {
		type: string;
	};
	onDragStart?: React.DragEventHandler<HTMLDivElement>;
	draggable?: boolean;
	inSidebar?: boolean;
	properties?: Record<string, string | number>;
	initialValue?: string;
};

const CustomNodes = ({ data, ...rest }: Props) => {
	const { type = NodeType.RECTANGLE } = data;

	const onDragStart = useCallback(
		(event: DragEvent<HTMLDivElement>) => {
			console.log(event)
			event.dataTransfer.setData("application/reactflow", data?.type);
			event.dataTransfer.effectAllowed = "move";
		},
		[data?.type]
	);

	return (
		<Node nodeType={type as NodeType} onDragStart={onDragStart} onTouchStart={onDragStart} {...rest} />
	);
};

export default CustomNodes;
