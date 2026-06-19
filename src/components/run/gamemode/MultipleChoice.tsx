"use client";

import { useGameEngineStore } from "@/store/useGameEngineStore";
import { motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
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
    <div
      className={`grid gap-4 w-full max-w-4xl mt-4 ${getGridClass(safeChoices.length)}`}
    >
      {(choices ?? []).map((option, i) => {
        const isSelected = selectedAnswer === option;
        const isCorrectChoice = option === answer;
        const isElminated = eliminated.includes(option);
        let isDisabled = hasAnswered;
        let optionStyle =
          "border-zinc-800 text-gray-300 hover:border-amber-600 hover:bg-amber-600/5";

        if (isElminated) {
          optionStyle =
            "border-zinc-900 text-red-900/40 opacity-30 line-through bg-zinc-950/10";
          isDisabled = true;
        } else if (hasAnswered) {
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
          <motion.button
            onClick={() => setSelectedAnswer(option)}
            key={i}
            disabled={isDisabled}
            className={`w-full text-left p-5 border rounded-sm font-mono text-sm transition-all duration-300 ${optionStyle}`}
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
