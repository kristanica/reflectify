"use client";

import { useGameEngineStore } from "@/store/useGameEngineStore";
import { motion } from "motion/react";
type MultipleChoiceType = {
  choices: string[] | undefined;
  answer: string;
};

const MultipleChoice = ({ choices, answer }: MultipleChoiceType) => {
  const selectedAnswer = useGameEngineStore((state) => state.selectedAnswer);
  const setSelectedAnswer = useGameEngineStore(
    (state) => state.setSelectedAnswer,
  );
  const hasAnswered = useGameEngineStore((state) => state.hasAnswered);
  const safeChoices = choices ?? [];

  const getGridClass = (length: number) => {
    if (length <= 2) return "grid-cols-1 sm:grid-cols-2";
    if (length === 4) return "grid-cols-1 sm:grid-cols-2";
    if (length >= 5) return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
    return "grid-cols-1 sm:grid-cols-2";
  };
  return (
    <div
      className={`grid gap-4 w-full max-w-4xl mt-4 ${getGridClass(safeChoices.length)}`}
    >
      {(choices ?? []).map((option, i) => {
        let optionStyle =
          "border-zinc-800 text-gray-300 hover:border-amber-600 hover:bg-amber-600/5";
        if (!hasAnswered) {
          if (selectedAnswer === option) {
            optionStyle = "border-amber-600 bg-amber-600/5";
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
          <motion.button
            onClick={() => setSelectedAnswer(option)}
            key={i}
            className={`
        
              relative border rounded-sm text-left p-4 pl-8 min-h-20 flex items-center font-mono text-xs leading-relaxed transition-colors duration-150 ${optionStyle} ${!hasAnswered ? "cursor-pointer" : "cursor-default "}`}
          >
            <span className="absolute top-2 left-2 text-[10px] text-zinc-600">
              {i + 1}
            </span>
            {option}
          </motion.button>
        );
      })}
    </div>
  );
};

export default MultipleChoice;
