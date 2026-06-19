import { useGameEngineStore } from "@/store/useGameEngineStore";

import { motion } from "motion/react";
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
    <div className="grid grid-cols-2 gap-2 w-full ">
      {["True", "False"].map((option, i) => {
        const isSelected = selectedAnswer === option;
        const isCorrectChoice = option === answer;
        let optionStyle =
          "border-zinc-800 text-gray-300 hover:border-amber-600 hover:bg-amber-600/5";

        if (hasAnswered) {
          if (isCorrectChoice) {
          } else if (isSelected && !isCorrectChoice) {
            optionStyle = "border-red-500 bg-red-500/10 text-red-500";
          } else {
            optionStyle = "border-zinc-900 text-zinc-700 opacity-50";
          }
        } else if (isSelected) {
          optionStyle =
            "border-amber-500 bg-amber-500/10 text-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.2)]";
        }
        return (
          <button
            onClick={() => setSelectedAnswer(option)}
            key={i}
            className={`w-full text-left p-5 border rounded-sm font-mono text-sm transition-all duration-300 ${optionStyle}`}
          >
            {option.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
};

export default TrueOrFalse;
