import { useContext, useEffect, useState } from "react";
import style from "../style.module.scss";
import { Context } from "../../../store";
import { EventHandler, debounce } from "../../../utils/home";

const initialState = {
	bold: false,
	italic: false,
	underline: false,
};

const handleDebounce = debounce((data) => {
	EventHandler.emit("update-style", data);
}, 300);

const FontHandler = () => {
	const { state, dispatch } = useContext(Context);
	const [fontState, setFontState] = useState(initialState);

	const calculateStyle = (type: string) => {
		const style = state?.nodes?.[state?.selectedNodeId]?.style;

		const obj = {
			bold: (style?.fontWeight ?? "normal") as string,
			italic: (style?.fontStyle ?? "normal") as string,
			underline: (style?.textDecoration ?? "none") as string,
		};
		if (type === "bold") {
			obj.bold = style?.fontWeight === "bold" ? "normal" : "bold";
		}
		if (type === "italic") {
			obj.italic = style?.fontStyle === "italic" ? "normal" : "italic";
		}
		if (type === "underline") {
			obj.underline =
				style?.textDecoration === "underline" ? "none" : "underline";
		}

		calculateState(obj);
		return obj;
	};

	const calculateState = (styleState: {
		bold: string;
		italic: string;
		underline: string;
	}) => {
		setFontState((prev) => {
			const newState = { ...prev };
			newState.bold = styleState?.bold === "bold";
			newState.italic = styleState.italic === "italic";
			newState.underline = styleState.underline === "underline";
			return newState;
		});
	};

	const handleClick = (type: string) => {
		const style = calculateStyle(type);

		dispatch({
			type: "addStyle",
			payload: {
				fontWeight: style?.bold,
				fontStyle: style?.italic,
				textDecoration: style?.underline,
			},
		});

		handleDebounce(style);
	};

	useEffect(() => {
		const bold = state?.nodes?.[state?.selectedNodeId]?.style
			?.fontWeight as string;
		const italic = state?.nodes?.[state?.selectedNodeId]?.style
			?.fontStyle as string;
		const underline = state?.nodes?.[state?.selectedNodeId]?.style
			?.direction as string;

		calculateState({
			bold,
			italic,
			underline,
		});
	}, [state?.selectedNodeId]);

	return (
		<div className={style.fontHandler}>
			<button
				className={`${style.bold} ${fontState?.bold ? style.active : ""}`}
				onClick={() => handleClick("bold")}>
				B
			</button>
			<button
				className={`${style.italic} ${fontState?.italic ? style.active : ""}`}
				onClick={() => handleClick("italic")}>
				I
			</button>
			<button
				className={`${style.underline} ${
					fontState?.underline ? style.active : ""
				}`}
				onClick={() => handleClick("underline")}>
				U
			</button>
		</div>
	);
};

export default FontHandler;
