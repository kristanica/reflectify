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
    <div className="grid grid-cols-2 gap-4 w-full mt-4">
      {["True", "False"].map((option, i) => {
        const isSelected = selectedAnswer === option;
        const isCorrectChoice = option === answer;
        let optionStyle =
          "border-zinc-800 bg-zinc-950/40 text-gray-300 hover:border-[#f0a500] hover:bg-[#f0a500]/10 hover:text-white";

        if (hasAnswered) {
          if (isCorrectChoice) {
            optionStyle = "border-emerald-500 bg-emerald-500/10 text-emerald-400";
          } else if (isSelected && !isCorrectChoice) {
            optionStyle = "border-red-500 bg-red-500/10 text-red-500";
          } else {
            optionStyle = "border-zinc-900 bg-zinc-950/20 text-zinc-700 opacity-50";
          }
        } else if (isSelected) {
          optionStyle =
            "border-[#f0a500] bg-[#f0a500]/20 text-[#f0a500] shadow-[0_0_10px_rgba(240,165,0,0.2)]";
        }
        return (
          <button
            onClick={() => setSelectedAnswer(option)}
            key={i}
            disabled={hasAnswered}
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
