import { NodeType } from "../../../utils/home";
import Node from "../node";

type Props = {
	data: {
		type: string;
	};
	onDragStart?: React.DragEventHandler<HTMLDivElement>;
	draggable?: boolean;
};

const EllipseNode = (props: Props) => {
	return <Node nodeType={NodeType.ELLIPSE} {...props} />;
};

export default EllipseNode;
