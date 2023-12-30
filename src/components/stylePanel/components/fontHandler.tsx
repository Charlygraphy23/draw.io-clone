import React from "react";
import style from "../style.module.scss";

const FontHandler = () => {
	return (
		<div className={style.fontHandler}>
			<button className={style.bold}>B</button>
			<button className={style.italic}>I</button>
			<button className={style.underline}>U</button>
		</div>
	);
};

export default FontHandler;
