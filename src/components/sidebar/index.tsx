import { DragEvent, useState } from "react";
import CustomNodes from "../nodes";
import style from "./style.module.scss";
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { NodeType } from "../../utils/home";

const NODES = [
	NodeType.RECTANGLE,
	NodeType.CIRCLE,
	NodeType.ROUNDED_RECTANGLE,
	NodeType.SQUARE,
	NodeType.ELLIPSE,
];

const Sidebar = () => {
	const [expanded, setExpanded] = useState(1);
	const onDragStart = (
		event: DragEvent<HTMLDivElement>,
		nodeType: NodeType
	) => {
		event.dataTransfer.setData("application/reactflow", nodeType);
		event.dataTransfer.effectAllowed = "move";
	};

	const handleChange = (id: number) => {
		setExpanded(id);
	};

	return (
		<div className={`${style.sidebar_wrapper} sidebar`}>
			<div className={style.description}>
				You can drag these nodes to the pane on the right.
			</div>

			<Accordion expanded={expanded === 1} onChange={() => handleChange(1)}>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls='general'
					id='general'>
					<Typography>General</Typography>
				</AccordionSummary>
				<AccordionDetails>
					{NODES?.map((node, index) => (
						<CustomNodes
							key={index}
							data={{ type: node }}
							onDragStart={(event: DragEvent<HTMLDivElement>) =>
								onDragStart(event, node)
							}
							draggable
							inSidebar
						/>
					))}
				</AccordionDetails>
			</Accordion>
		</div>
	);
};

export default Sidebar;
