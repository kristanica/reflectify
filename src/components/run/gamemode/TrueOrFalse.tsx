import { useGameEngineStore } from "@/store/useGameEngineStore";
import React from "react";

type TrueOrFalseType = {
  answer: string;
};

const TrueOrFalse = ({ answer }: TrueOrFalseType) => {
  const selectedAnswer = useGameEngineStore((state) => state.selectedAnswer);
  const setSelectedAnswer = useGameEngineStore(
    (state) => state.setSelectedAnswer,
  );
  const hasAnswered = useGameEngineStore((state) => state.hasAnswered);

  return (
    <div className="grid grid-cols-2 gap-2 w-full max-w-3xl">
      {["True", "False"].map((option, i) => {
        let optionStyle =
          "border-zinc-800 text-gray-300 hover:border-amber-600 hover:bg-amber-600/5";

        if (!hasAnswered) {
          if (selectedAnswer === option) {
            optionStyle = "border-amber-600 bg-amber-600/5 text-amber-500";
          }
        } else {
          const isCorrectPick = option === answer;
          const isWrongPick = selectedAnswer === option && !isCorrectPick;
          if (isCorrectPick) {
            optionStyle = "border-green-500 bg-green-500/10 text-green-400";
          } else if (isWrongPick) {
            optionStyle = "border-red-500 bg-red-500/10 text-red-400";
          } else {
            optionStyle = "border-zinc-800 text-gray-500 opacity-30";
          }
        }
        return (
          <button
            onClick={() => setSelectedAnswer(option)}
            disabled={hasAnswered}
            key={i}
            className={`relative border rounded-sm p-4 min-h-20 flex items-center justify-center font-mono text-sm tracking-widest transition-all duration-150 ${optionStyle} ${!hasAnswered ? "cursor-pointer" : "cursor-default"}`}
          >
            {option.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
};

export default TrueOrFalse;
