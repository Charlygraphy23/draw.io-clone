import style from "../style.module.scss";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import Stack from "@mui/material/Stack";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../../store";
import { EventHandler, debounce } from "../../../utils/home";

const handleDebounce = debounce((value) => {
	EventHandler.emit("update-style", {
		background: value,
	});
}, 300);

const StyleHandler = () => {
	const [checked, setChecked] = useState(true);
	const [fillColor, setFillColor] = useState("#ffffff");
	const { dispatch, state } = useContext(Context);

	const handleFillChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFillColor(e.target.value);
		dispatch({
			type: "addStyle",
			payload: {
				background: fillColor,
			},
		});

		handleDebounce(e.target.value);
	};

	useEffect(() => {
		const currentColor =
			state?.nodes?.[state?.selectedNodeId]?.style?.background ?? "#ffffff";

		setFillColor(currentColor as string);
	}, [state?.selectedNodeId]);

	return (
		<div className={style.styleHandler}>
			<FormGroup sx={{ marginTop: "20px" }}>
				<Stack
					direction='row'
					alignItems='center'
					justifyContent='space-between'
					sx={{ width: "100%" }}>
					<FormControlLabel
						control={
							<Checkbox
								checked={checked}
								onChange={(e) => setChecked(e.target.checked)}
							/>
						}
						label='Fill'
					/>
					<input type='color' value={fillColor} onChange={handleFillChange} />
				</Stack>
			</FormGroup>
		</div>
	);
};

export default StyleHandler;
