import React, {
  Dispatch,
  PropsWithChildren,
  createContext,
  useReducer,
} from "react";
import { NodeType } from "../utils/home";
import { XYPosition } from "reactflow";

type PropertiesType = {
  id: string;
  type: NodeType;
  position: XYPosition;
  data: { type: NodeType };
  style: React.CSSProperties;
};

type InitialStateType = {
  nodes: {
    [key in string]: PropertiesType;
  };
  selectedNodeId: string;
};

const initialState: InitialStateType = {
  nodes: {},
  selectedNodeId: "",
} as InitialStateType;

export const Context = createContext({
  state: initialState,
} as {
  state: typeof initialState;
  dispatch: Dispatch<{ payload: Record<string, unknown>; type: string }>;
});

const stateReducer = (
  state: InitialStateType,
  action: { payload: Record<string, string>; type: string }
) => {
  const { payload, type } = action;

  switch (type) {
    case "add":
      state.nodes[payload.id] = {
        ...state?.nodes?.[payload?.id],
        ...payload,
      };
      return Object.assign({} , state);

    case "selectedNode":
      state.selectedNodeId = payload?.id;
      return state;

    case "addStyle":
      if (!state.selectedNodeId) return state;

      state.nodes[state.selectedNodeId] = {
        ...state?.nodes?.[state.selectedNodeId],
        style: { 
			...state?.nodes?.[state.selectedNodeId]?.style,
			...payload
		}
      };
      return Object.assign({} , state);

    default:
      return Object.assign({} , state);
  }
};

const Provider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(stateReducer, initialState);

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};

export default Provider;
