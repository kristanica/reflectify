"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import InitialLoading from "./InitialLoading";
import { Bot } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import useGenerateQuestions from "@/hooks/useGenerateQuestions";
import GameTypeIdentifier from "./GameTypeIdentifier";
import { useGameEngineStore } from "@/store/useGameEngineStore";
import { useShallow } from "zustand/react/shallow";
import Stats from "./Stats";

import GameOver from "./GameOver";

import BlackMarket from "./shop/BlackMarket";
import Explanation from "@/components/run/Explanation";
import Augments from "./Augments";
import Logs from "./Logs";

export default function GameBoard({
  deckId,
  userId,
  baseXp,
  baseLevel,
  sessionId,
}: GameBoardType) {
  // gameStore
  const {
    selectedAnswer,
    hasAnswered,
    questionQueues,
    depth,
    lives,
    submitAnswer,
    consumeItem,
    isShopOpen,
    openShop,
    lastShopDepth,
    jokers,
    initPlayerStat,
    setQuestionQueues,
    handleNextQuestion,
    setSessionId,
  } = useGameEngineStore(
    useShallow((state) => ({
      selectedAnswer: state.selectedAnswer,
      hasAnswered: state.hasAnswered,
      questionQueues: state.questionQueues,
      depth: state.questionsAnswered,
      lives: state.lives,
      submitAnswer: state.submitAnswer,
      consumeItem: state.useConsumable,
      isShopOpen: state.isShopOpen,
      openShop: state.openShop,
      lastShopDepth: state.lastOpenedShop,
      jokers: state.jokers,
      initPlayerStat: state.initPlayerStat,
      setQuestionQueues: state.setQuestionQueues,
      handleNextQuestion: state.handleNextQuestion,
      setSessionId: state.setSessionId,
    })),
  );

  const isBossEncounter = questionQueues[0]?.type === "BOSS_SCENARIO";
  const [hasLoadedInitialQuestions , sethasLoadedInitialQuestions ] = useState<boolean>(false);

  const [showWarning, setShowWarning] = useState<boolean>(false);

  const hasInitialized = useRef<boolean>(false);

  useEffect(() => {
    if (hasInitialized.current) return;
    initPlayerStat(baseXp, baseLevel);
    setSessionId(sessionId);
    hasInitialized.current = true;
  }, [baseXp, baseLevel, initPlayerStat, setSessionId, sessionId]);

  const handleConsumable = useCallback(
    (consumableId: string) => {
      consumeItem(consumableId);
    },
    [consumeItem],
  );

  // Refs
  const questionTimerStart = useRef<number | null>(null);
  const hasDictionary = jokers.some(
    (joker) => joker.effect === "INSTANT_SUBMIT_PAYOUT",
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

  const answerQuestion = useCallback(() => {
    const timeElapsedInSecond = questionTimerStart.current
      ? (Date.now() - questionTimerStart.current) / 1000
      : 0;

    submitAnswer(timeElapsedInSecond);
  }, [submitAnswer]);

  useEffect(() => {
    if (isBossEncounter && !hasAnswered) {
      const showTimer = setTimeout(() => setShowWarning(true), 0);
      const hideTimer = setTimeout(() => setShowWarning(false), 3000);
      return () => {
        clearTimeout(showTimer);
        clearTimeout(hideTimer);
      };
    }
  }, [isBossEncounter, hasAnswered]);

  // Background fetching
  useEffect(() => {
    if (questionQueues.length < 15 && !isFetchingQuestion) {
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

  // Speed payout
  useEffect(() => {
    if (
      questionTimerStart.current === null &&
      questionQueues[0] &&
      questionQueues[0].question
    ) {
      questionTimerStart.current = Date.now();
    }
  }, [questionQueues]);
  // Dictionary attack
  useEffect(() => {
    if (hasDictionary && selectedAnswer && !hasAnswered) {
      answerQuestion();
    }
  }, [answerQuestion, hasAnswered, hasDictionary, selectedAnswer]);

  // Determines shop pop up
  useEffect(() => {
    if (depth > 0 && depth % 10 === 0 && lastShopDepth !== depth) {
      openShop();
    }
  }, [depth, lastShopDepth, openShop]);

  useEffect(() => {
    if (questionQueues.length > 0 && !hasLoadedInitialQuestions) {
      setTimeout(() => {
        sethasLoadedInitialQuestions(true);
      }, 200);
    }
  }, [sethasLoadedInitialQuestions, questionQueues.length, hasLoadedInitialQuestions]);

  if (lives <= 0) {
    return <GameOver></GameOver>;
  }

  if (questionQueues.length === 0 && (isFetchingQuestion || isFetchingIdle)) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="text-mocha-overlay2 h-full flex flex-1 items-center justify-center"
      >

        <InitialLoading isFillingQueue={hasLoadedInitialQuestions} />


      </motion.div>
    );
  }

  if (isShopOpen) {
    return <BlackMarket />;
  }



  return (
    <div className="w-full h-full flex flex-col pt-2 p-6 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key="question"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          className="flex flex-col flex-1 relative w-full max-w-5xl mx-auto h-full space-y-6 min-h-0"
        >
          {/* Header Block */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-4 gap-4">
            <div>
              <h2
                className={`text-xl font-bold font-mono tracking-widest uppercase ${
                  isBossEncounter
                    ? "text-destructive animate-pulse"
                    : "text-primary"
                }`}
              >
                {isBossEncounter
                  ? "[ CRITICAL BOSS ENCOUNTER ]"
                  : "[ ACTIVE RUN ]"}
              </h2>
              <p className="text-xs text-mocha-subtext0 font-mono mt-1">
                DEPTH: {depth}
              </p>
            </div>

            <div className="flex gap-4 text-xs font-mono items-center flex-row">
              <Stats />
            </div>
          </div>

          {/* Main Layout Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1 min-h-0">
            {/* LEFT COLUMN: Question & Answers (3/4 Width) */}
            <div className="lg:col-span-3 row-span-4 flex flex-col space-y-6 overflow-y-auto pr-2 pb-6">
              {/* Question Block */}
              <div className="border bg-card p-6 rounded flex flex-col space-y-4">
                <div className="flex justify-between items-start border-b pb-4">
                  <div>
                    <h3 className="text-sm font-bold tracking-wider font-mono text-mocha-text uppercase">
                      CURRENT QUERY { questionQueues.length}
                    </h3>
                  </div>

                  <div className="flex gap-4 items-center">
                    {hasAnswered ? (
                      <button
                        disabled={!hasAnswered}
                        onClick={() => handleNextQuestion()}
                        className="px-6 py-2 border bg-transparent text-mocha-text border-primary hover:bg-primary font-mono text-xs font-bold transition-all duration-300 tracking-widest uppercase disabled:opacity-30 disabled:border-mocha-surface2 disabled:text-mocha-overlay0 disabled:pointer-events-none rounded-sm"
                      >
                        NEXT
                      </button>
                    ) : (
                      !hasDictionary && (
                        <button
                          disabled={!selectedAnswer}
                          onClick={answerQuestion}
                          className="px-6 py-2 border bg-transparent text-mocha-text border-primary hover:bg-primary hover:text-muted font-mono text-xs font-bold transition-all duration-300 tracking-widest uppercase disabled:opacity-30 disabled:border-mocha-surface2 disabled:text-mocha-overlay0 disabled:pointer-events-none rounded-sm"
                        >
                          ANSWER
                        </button>
                      )
                    )}
                  </div>
                </div>

                <div>
                  <p className="text-mocha-subtext1 font-mono text-sm leading-relaxed whitespace-pre-wrap">
                    {questionQueues[0].question}
                  </p>
                </div>
              </div>

              {/* Answers Block */}
              <div className="w-full">
                <GameTypeIdentifier
                  choices={questionQueues[0].options as string[]}
                  answer={questionQueues[0].answer}
                  type={questionQueues[0].type}
                />
              </div>

              <div className="border bg-card p-5 rounded font-mono mt-4">
                <h4 className="text-xs text-mocha-text uppercase font-bold tracking-wider mb-3">
                  <Bot className="w-3.5 h-3.5 inline-block" /> AI EXPLANATION
                </h4>

                {/* Explanation Block */}
                <AnimatePresence mode="wait">
                  {hasAnswered ? (
                    <motion.div
                      key="answer"
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="overflow-hidden"
                    >
                      <Explanation
                        explanation={questionQueues[0].explanation}
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="no answer"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                    >
                      <p className="text-mocha-overlay1 font-mono text-xs leading-relaxed whitespace-pre-wrap">
                        THE AI IS WAITING FOR YOUR ANSWER....
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="grid gap-2 md:grid-cols-2 rounded font-mono mt-4">
                <Augments handleConsumable={handleConsumable}></Augments>
              </div>
            </div>

            {/* RIGHT COLUMN: Augments & Consumables (1/4 Width) */}
            <div className="flex flex-1 flex-col space-x-6 md:space-x-0 border-t row-span-1 pt-5 md:pt-0 md:border-none md:row-span-4 space-y-6 overflow-y-auto pr-2 pb-6">
              <Logs></Logs>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
