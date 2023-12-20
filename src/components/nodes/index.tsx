import { useCallback } from "react";
import Node from "./node";
import { NodeType } from "../../utils/home";

type Props = {
	data: {
		type: string;
	};
	onDragStart?: React.DragEventHandler<HTMLDivElement>;
	draggable?: boolean;
	inSidebar?: boolean;
};

const CustomNodes = ({ data, ...rest }: Props) => {
	console.log(data);
	const { type = NodeType.RECTANGLE } = data;
	const render = useCallback(() => {
		switch (type) {
			case NodeType.RECTANGLE:
				return <Node nodeType={type as NodeType} {...rest} />;
			default:
				return <Node nodeType={type as NodeType} {...rest} />;
		}
	}, [rest, type]);

	return render();
};

export default CustomNodes;
