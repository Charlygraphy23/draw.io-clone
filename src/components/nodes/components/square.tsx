import { NodeType } from "../../../utils/home";
import Node from "../node";

type Props = {
	data: {
		type: string;
	};
	onDragStart?: React.DragEventHandler<HTMLDivElement>;
	draggable?: boolean;
};

const SquareNode = (props: Props) => {
	return <Node nodeType={NodeType.SQUARE} {...props} />;
};

export default SquareNode;
