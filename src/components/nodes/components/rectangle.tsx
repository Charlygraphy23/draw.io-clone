import { NodeType } from "../../../utils/home";
import Node from "../node";

type Props = {
	data: {
		type: string;
	};
	onDragStart?: React.DragEventHandler<HTMLDivElement>;
	draggable?: boolean;
};

const RectangleNode = (props: Props) => {
	return <Node nodeType={NodeType.RECTANGLE} {...props} />;
};

export default RectangleNode;
