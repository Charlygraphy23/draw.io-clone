import { useState } from "react";
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
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";

const NODES = [
	NodeType.RECTANGLE,
	NodeType.CIRCLE,
	NodeType.ROUNDED_RECTANGLE,
	NodeType.SQUARE,
	NodeType.ELLIPSE,
	NodeType.TEXT,
];

const Sidebar = () => {
	const [expanded, setExpanded] = useState(1);
	const [isHidden, setIsHidden] = useState(false);

	const handleChange = (id: number) => {
		setExpanded(id);
	};

	const toggleHidden = (isHidden = true) => {
		setIsHidden(isHidden);
	};

	return (
		<>
			<div className={style.openSideNav}>
				<KeyboardDoubleArrowRightIcon onClick={() => toggleHidden(false)} />
			</div>
			<div
				className={`${style.sidebar_wrapper} ${
					isHidden ? style.hidden : ""
				} sidebar`}>
				<div className={style.description}>
					<span> You can drag these nodes to the pane on the right. </span>
					<div onClick={() => toggleHidden()}>
						<KeyboardDoubleArrowLeftIcon className={style.hide} />
					</div>
				</div>

				<Accordion expanded={expanded === 1} onChange={() => handleChange(1)}>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls='general'
						id='general'>
						<Typography>General</Typography>
					</AccordionSummary>
					<AccordionDetails className={style?.sidebar__nodes}>
						{NODES?.map((node, index) => (
							<CustomNodes
								key={index}
								data={{ type: node }}
								draggable
								inSidebar
								initialValue={node === NodeType.TEXT ? "Text" : ""}
							/>
						))}
					</AccordionDetails>
				</Accordion>
			</div>
		</>
	);
};

export default Sidebar;
