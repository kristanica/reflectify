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
          "border bg-card text-mocha-subtext1 hover:border-mocha-blue ";

        if (hasAnswered) {
          if (isCorrectChoice) {
            optionStyle = "border-mocha-green ";
          } else if (isSelected && !isCorrectChoice) {
            optionStyle = "border-mocha-red bg-mocha-red/10 text-mocha-red";
          } else {
            optionStyle =
              "border-mocha-surface2 bg-mocha-base/20 text-mocha-overlay0 opacity-50";
          }
        } else if (isSelected) {
          optionStyle = "border border-mocha-blue  text-mocha-subtext1";
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
