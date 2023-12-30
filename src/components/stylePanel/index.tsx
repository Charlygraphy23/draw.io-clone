import React, { useContext, useState } from "react";
import style from "./style.module.scss";
import { Box, Tab, Tabs } from "@mui/material";
import StyleHandler from "./components/styleHandler";
import { Context } from "../../store";
import FontHandler from "./components/fontHandler";

const StylePanel = () => {
	const [value, setValue] = useState(0);
	const { state } = useContext(Context);
	const handleChange = (_: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	return (
		<section className={style.stylePanel}>
			<div className={style.wrapper}>
				<Box sx={{ width: "100%" }}>
					<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
						<Tabs
							value={value}
							onChange={handleChange}
							aria-label='basic tabs example'>
							<Tab label='Style' />
							<Tab label='Font' />
						</Tabs>
					</Box>
					{value === 0 && <StyleHandler />}
					{value === 1 && <FontHandler />}
				</Box>
			</div>
		</section>
	);
};

export default StylePanel;
