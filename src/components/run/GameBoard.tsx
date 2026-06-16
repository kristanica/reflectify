"use client";

import { useEffect, useState } from "react";

import InitialLoading from "./InitialLoading";
import { AnimatePresence, motion } from "motion/react";
import useGenerateQuestions from "@/hooks/useGenerateQuestions";
import GameTypeIdentifier from "./GameTypeIdentifier";
import { useGameEngineStore } from "@/store/useGameEngineStore";
import { ratio } from "fuzzball";

import Lives from "./Lives";

import GameOver from "./GameOver";

export default function GameBoard({ deckId, userId }: GameBoardType) {
  const selectedAnswer = useGameEngineStore((state) => state.selectedAnswer);
  const hasAnswered = useGameEngineStore((state) => state.hasAnswered);
  const setHasAnswered = useGameEngineStore((state) => state.setHasAnswered);
  const questionQueues = useGameEngineStore((state) => state.questionQueues);
  const depth = useGameEngineStore((state) => state.questionsAnswered);
  const decrementLives = useGameEngineStore((state) => state.decrementLives);
  const lives = useGameEngineStore((state) => state.lives);
  const plusStreak = useGameEngineStore((state) => state.plusStreak);
  const streak = useGameEngineStore((state) => state.streak);
  const score = useGameEngineStore((state) => state.score);
  const resetStreak = useGameEngineStore((state) => state.resetStreak);
  const setScore = useGameEngineStore((state) => state.setScore);
  const setSelectedAnswer = useGameEngineStore(
    (state) => state.setSelectedAnswer,
  );

  const setQuestionQueues = useGameEngineStore(
    (state) => state.setQuestionQueues,
  );

  const handleNextQuestion = useGameEngineStore(
    (state) => state.handleNextQuestion,
  );

  const {
    mutate: fetchMoreQuestion,
    isPending: isFetchingQuestion,
    isIdle: isFetchingIdle,
  } = useGenerateQuestions({
    userId: userId,
    deckId: deckId,
    onGeneratedQuestsion: (newQuestions) => {
      setQuestionQueues(newQuestions);
    },
  });

  const answerQuestion = async () => {
    setHasAnswered(true);
    setSelectedAnswer("");
    let isCorrect = selectedAnswer === questionQueues[0].answer;

    if (questionQueues[0].type === "IDENTIFICATION") {
      {
        const cleanUserAnswer = selectedAnswer!.toLowerCase().trim();
        const cleanAiAnswer = questionQueues[0].answer.toLowerCase().trim();

        const score = ratio(cleanUserAnswer, cleanAiAnswer);
        isCorrect = score >= 85;
      }
    }

    if (!isCorrect) {
      decrementLives();
      setScore(-50);
      resetStreak();
    } else {
      plusStreak();
      setScore(100);
    }
  };

  useEffect(() => {
    if (questionQueues.length < 10 && !isFetchingQuestion) {
      const conceptIds = questionQueues.map((concept) => concept.conceptId);
      fetchMoreQuestion({ currentIds: conceptIds, depth: depth });
    }
  }, [
    questionQueues.length,
    isFetchingQuestion,
    questionQueues,
    fetchMoreQuestion,
    depth,
  ]);

  if (lives <= 0) {
    return <GameOver></GameOver>;
  }

  if (lives <= 0) {
    return <GameOver></GameOver>;
  }

  return (
    <div className="text-gray-400 h-full flex flex-1 flex-col items-center justify-center">
      <AnimatePresence mode="wait">
        {questionQueues.length === 0 &&
        (isFetchingQuestion || isFetchingIdle) ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <InitialLoading></InitialLoading>
          </motion.div>
        ) : (
          <motion.div
            key="question"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="flex flex-col flex-1 relative min-w-3xl w-full max-w-3xl items-center justify-center"
          >
            {/* 🚨 THE NEW TACTICAL HUD 🚨 */}
            <div className="w-full flex justify-between items-end border-b border-zinc-800 pb-4 mb-6">
              {/* Left Side: Lives */}
              <Lives></Lives>

              {/* Right Side: Score & Streak */}
              <div className="flex items-end gap-6">
                {/* Dynamic Combo Meter (Only shows if Streak > 1) */}
                <AnimatePresence>
                  {streak > 1 && (
                    <motion.div
                      key="combo-meter"
                      initial={{ opacity: 0, scale: 0.8, x: 20 }}
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      exit={{
                        opacity: 0,
                        scale: 0.5,
                        y: 10,
                        filter: "blur(5px)",
                      }} // Shatter effect!
                      className="flex items-center gap-2 bg-amber-500/10 px-3 py-1 border border-amber-500/30 rounded-sm"
                    >
                      <span className="text-amber-500 font-mono text-[10px] tracking-[0.2em] uppercase animate-pulse">
                        Combo
                      </span>
                      <span className="text-amber-400 font-bold font-mono text-sm">
                        x{streak}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Score Display */}
                <div className="flex flex-col items-end">
                  <span className="text-[10px] tracking-widest text-zinc-500 font-mono uppercase mb-1">
                    Data Sync
                  </span>
                  <span className="text-cyan-400 font-mono text-xl tracking-widest leading-none">
                    {/* Pads the score with zeroes: 150 -> 00150 */}
                    {score.toString().padStart(5, "0")}
                  </span>
                </div>
              </div>
            </div>
            {/* 🚨 END TACTICAL HUD 🚨 */}

            <div className="w-full max-w-3xl mb-6">
              <p className="text-[10px] tracking-widest text-amber-600 mb-2 font-mono">
                QUESTION
              </p>
              <p className="text-gray-100 font-mono text-sm leading-relaxed">
                {questionQueues[0].question}
              </p>
            </div>

            <GameTypeIdentifier
              choices={questionQueues[0].options as string[]}
              answer={questionQueues[0].answer}
              type={questionQueues[0].type}
            ></GameTypeIdentifier>

            <AnimatePresence mode="wait">
              {hasAnswered && (
                <motion.div
                  key="answer"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="w-full max-w-3xl mt-6 p-4 border border-zinc-800 bg-zinc-950/50 rounded-sm overflow-hidden"
                >
                  <p className="text-[10px] tracking-widest text-zinc-500 mb-2 font-mono uppercase">
                    System Analysis
                  </p>
                  <p className="text-zinc-300 font-mono text-xs leading-relaxed">
                    {questionQueues[0].explanation}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {hasAnswered ? (
              <button
                disabled={!hasAnswered}
                onClick={() => handleNextQuestion()}
                className="self-end py-2.5 px-8 mt-6 border border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-black transition-all duration-300 font-mono tracking-[0.2em] text-xs uppercase disabled:opacity-30 disabled:border-zinc-700 disabled:text-zinc-600 disabled:pointer-events-none rounded-sm"
              >
                NEXT
              </button>
            ) : (
              <button
                disabled={!selectedAnswer}
                onClick={answerQuestion}
                className="self-end py-2.5 px-8 mt-6 border border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-black transition-all duration-300 font-mono tracking-[0.2em] text-xs uppercase disabled:opacity-30 disabled:border-zinc-700 disabled:text-zinc-600 disabled:pointer-events-none rounded-sm"
              >
                ANSWER
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

{
  /* <Button
            onClick={() => {
              console.log(
                "----",
                questionQueues[0],
                "Has been slicced!",
                questionQueues.length,
                "----",
              );
              setQuestionQueues((prev) => prev.slice(1));
            }}
          >
            Answer & Nexxt
          </Button> */
}
