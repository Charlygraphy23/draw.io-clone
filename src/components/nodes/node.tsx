import { ChangeEvent, MouseEvent, useRef, useState } from "react";
import style from "./style.module.scss";
import { NodeType } from "../../utils/home";
import { Handle, NodeResizer, Position } from "reactflow";
import { flushSync } from "react-dom";

type Props = {
	nodeType: NodeType;
	onDragStart?: React.DragEventHandler<HTMLDivElement>;
	draggable?: boolean;
	inSidebar?: boolean;
	selected?: boolean;
	initialValue?: string;
};

const Node = ({
	nodeType,
	onDragStart,
	draggable,
	inSidebar = false,
	selected = false,
	initialValue = "",
}: Props) => {
	const [state, setState] = useState({
		showInput: false,
		value: initialValue,
	});
	const inputRef = useRef<HTMLInputElement>(null);

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setState((prevState) => ({
			...prevState,
			value: event?.target?.value,
		}));
	};

	const handleClick = (event: MouseEvent<HTMLDivElement>) => {
		if (event?.detail === 2) {
			// means double click happens
			flushSync(() => {
				setState((prevState) => ({
					...prevState,
					showInput: true,
				}));
			});
			inputRef?.current?.focus();
		}
	};

	const handleBlur = () => {
		setState((prevState) => ({
			...prevState,
			showInput: false,
		}));
	};

	return (
		<>
			<NodeResizer
				handleStyle={{ padding: "2px" }}
				lineStyle={{ padding: "3px" }}
				color='#ff0071'
				isVisible={selected}
			/>
			{!inSidebar && <Handle type='target' position={Position.Top} />}

			<div
				className={`${style.nodes} nodes ${nodeType}`}
				onClick={handleClick}
				onDragStart={onDragStart}
				draggable={draggable}>
				{state?.showInput ? (
					<input
						ref={inputRef}
						onBlur={handleBlur}
						type='text'
						onChange={handleChange}
						value={state?.value}
					/>
				) : (
					<span className={style.label}>{state?.value}</span>
				)}
			</div>
			{!inSidebar && <Handle type='source' position={Position.Bottom} id='a' />}
		</>
	);
};

export default Node;
