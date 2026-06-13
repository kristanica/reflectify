import { useReducer } from "react";

export type IngestState = {
  title: string;
  topic: string;
  file: File | null;
  ingestType: "File" | "Topic";
};

export type IngestAction =
  | {
      type: "SET_FIELD";
      field: keyof IngestState;
      payload: IngestState[keyof IngestState];
    }
  | {
      type: "RESET";
    };

const inititialState: IngestState = {
  title: "",
  topic: "",
  file: null,
  ingestType: "File",
};

const reducer = (state: IngestState, action: IngestAction): IngestState => {
  switch (action.type) {
    case "SET_FIELD": {
      return { ...state, [action.field]: action.payload };
    }
    case "RESET": {
      return inititialState;
    }
    default:
      return state;
  }
};

export default function useIngestForm() {
  const [state, dispatch] = useReducer(reducer, inititialState);

  return {
    state,
    dispatch,
  };
}
