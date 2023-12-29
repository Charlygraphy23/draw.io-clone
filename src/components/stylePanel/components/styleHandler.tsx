import style from "../style.module.scss";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import Stack from "@mui/material/Stack";
import { useState } from "react";

const StyleHandler = () => {
	const [fill, setFill] = useState("#ffffff");
	const [checked, setChecked] = useState(false);

	const handleFillChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFill(e.target.value);
	};

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
								value={checked}
								onChange={(e) => setChecked(e.target.checked)}
							/>
						}
						label='Fill'
					/>
					<input type='color' value={fill} onChange={handleFillChange} />
				</Stack>
			</FormGroup>
		</div>
	);
};

export default StyleHandler;
