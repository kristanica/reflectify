import { JSX } from "react/jsx-runtime";
import MultipleChoice from "./gamemode/MultipleChoice";
import TrueOrFalse from "./gamemode/TrueOrFalse";
import Identification from "./gamemode/Identification";

type GameTypeIdentifierType = {
  choices: string[];
  answer: string;

  type: string;
};

const GameTypeIdentifier = ({
  choices,
  answer,
  type,
}: GameTypeIdentifierType) => {
  const board: Record<string, JSX.Element> = {
    MULTIPLE_CHOICE: (
      <MultipleChoice choices={choices} answer={answer}></MultipleChoice>
    ),
    TRUE_OR_FALSE: <TrueOrFalse answer={answer}></TrueOrFalse>,
    IDENTIFICATION: <Identification></Identification>,
  };

  return board[type] || null;
};

export default GameTypeIdentifier;
