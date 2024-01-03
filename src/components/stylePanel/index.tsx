import React, { useState } from "react";
import style from "./style.module.scss";
import { Box, Tab, Tabs } from "@mui/material";
import StyleHandler from "./components/styleHandler";
import FontHandler from "./components/fontHandler";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import useToggleElement from "../../hooks/useToggleElement";

const StylePanel = () => {
  const [value, setValue] = useState(0);
  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const { isHidden, toggleHidden } = useToggleElement();

  return (
    <>
      <div className={style.openStyleBar}>
        <KeyboardDoubleArrowLeftIcon
          onClick={() => toggleHidden(false)}
          sx={{ cursor: "pointer" }}
        />
      </div>
      <section
        className={`${style.stylePanel} ${isHidden ? style.hidden : ""}`}
      >
        <div className={style.wrapper}>
          <div onClick={() => toggleHidden()}>
            <KeyboardDoubleArrowRightIcon
              className={style.hide}
              sx={{ cursor: "pointer" }}
            />
          </div>
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label="Style" />
                <Tab label="Font" />
              </Tabs>
            </Box>
            {value === 0 && <StyleHandler />}
            {value === 1 && <FontHandler />}
          </Box>
        </div>
      </section>
    </>
  );
};

export default StylePanel;
