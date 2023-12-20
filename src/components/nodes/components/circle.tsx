import { NodeType } from "../../../utils/home";
import Node from "../node";

type Props = {
	data: {
		type: string;
	};
	onDragStart?: React.DragEventHandler<HTMLDivElement>;
	draggable?: boolean;
};

const CircleNode = (props: Props) => {
	return <Node nodeType={NodeType.CIRCLE} {...props} />;
};

export default CircleNode;
