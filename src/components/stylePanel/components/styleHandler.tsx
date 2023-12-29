import style from "../style.module.scss";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import Stack from "@mui/material/Stack";
import { useContext, useState } from "react";
import { EventHandler } from "../../../utils/home";
import { Context } from "../../../store";

const StyleHandler = () => {
  const [checked, setChecked] = useState(true);
  const { dispatch, state } = useContext(Context);

  const handleFillChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "addStyle",
      payload: {
        background: e.target.value,
      },
    });
    // EventHandler.emit("update", "");
  };

  console.log("Updated" , state?.nodes?.[state?.selectedNodeId]?.style?.background)
  console.log("Selected Id" , state?.selectedNodeId)

  return (
    <div className={style.styleHandler}>
      <FormGroup sx={{ marginTop: "20px" }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ width: "100%" }}
        >
          <FormControlLabel
            control={
              <Checkbox
                checked={checked}
                onChange={(e) => setChecked(e.target.checked)}
              />
            }
            label="Fill"
          />
          <input
            type="color"
            value={
              state?.nodes?.[state?.selectedNodeId]?.style?.background ??
              "#ffffff"
            }
            onChange={handleFillChange}
          />
        </Stack>
      </FormGroup>
    </div>
  );
};

export default StyleHandler;
