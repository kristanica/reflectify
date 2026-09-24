"use client";

import { useGameEngineStore } from "@/store/useGameEngineStore";
import { motion } from "motion/react";
import { useMemo } from "react";
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
  const is5050Active = useGameEngineStore((state) => state.is5050Active);

  const eliminated = useMemo(() => {
    if (!is5050Active) return [];

    const wrongAnswers = choices?.filter((choice) => choice !== answer);

    return [...(wrongAnswers ?? [])].slice(0, 2);
  }, [is5050Active, choices, answer]);

  const safeChoices = choices ?? [];

  const getGridClass = (length: number) => {
    if (length <= 2) return "grid-cols-1 sm:grid-cols-2";
    if (length === 4) return "grid-cols-1 sm:grid-cols-2";
    if (length >= 5) return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
    return "grid-cols-1 sm:grid-cols-2";
  };
  return (
    <div className={`grid w-full gap-2 ${getGridClass(safeChoices.length)}`}>
      {(choices ?? []).map((option, i) => {
        const isSelected = selectedAnswer === option;
        const isCorrectChoice = option === answer;
        const isElminated = eliminated.includes(option);
        let isDisabled = hasAnswered;
        let optionStyle =
          "border-mocha-surface1 bg-mocha-base text-mocha-subtext1 hover:border-mocha-blue hover:bg-mocha-blue/5";

        if (isElminated) {
          optionStyle =
            "border-mocha-surface0 bg-mocha-crust/40 text-mocha-red/40 opacity-40 line-through";
          isDisabled = true;
        } else if (hasAnswered) {
          if (isCorrectChoice) {
            optionStyle = "border-mocha-green bg-mocha-green/10 text-mocha-green";
          } else if (isSelected && !isCorrectChoice) {
            optionStyle = "border-mocha-red bg-mocha-red/10 text-mocha-red";
          } else {
            optionStyle =
              "border-mocha-surface0 bg-mocha-crust/40 text-mocha-overlay0 opacity-50";
          }
        } else if (isSelected) {
          optionStyle = "border-mocha-blue bg-mocha-blue/10 text-mocha-blue";
        }

        return (
          <motion.button
            onClick={() => setSelectedAnswer(option)}
            key={i}
            disabled={isDisabled}
            className={`group flex min-h-16 w-full items-center gap-3 border p-4 text-left font-mono text-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mocha-blue disabled:cursor-default ${optionStyle}`}
          >
            <span className="text-[10px] font-black text-mocha-overlay1 group-hover:text-current">
              {String.fromCharCode(65 + i)}
            </span>
            <span>{option}</span>
          </motion.button>
        );
      })}
    </div>
  );
};

export default MultipleChoice;
