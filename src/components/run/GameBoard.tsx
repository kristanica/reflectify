"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import InitialLoading from "./InitialLoading";
import { Bot, Database, ShieldAlert, Swords } from "lucide-react";
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
    setDeckId,
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
      setDeckId: state.setDeckId,
    })),
  );

  const isBossEncounter = questionQueues[0]?.type === "BOSS_SCENARIO";
  const [hasLoadedInitialQuestions, sethasLoadedInitialQuestions] =
    useState<boolean>(false);

  const [, setShowWarning] = useState<boolean>(false);

  const hasInitialized = useRef<boolean>(false);

  // Init base stat/
  useEffect(() => {
    if (hasInitialized.current) return;
    initPlayerStat(baseXp, baseLevel);
    setSessionId(sessionId);
    setDeckId(deckId);
    hasInitialized.current = true;
  }, [
    baseXp,
    baseLevel,
    initPlayerStat,
    setSessionId,
    sessionId,
    setDeckId,
    deckId,
  ]);

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
  }, [
    sethasLoadedInitialQuestions,
    questionQueues.length,
    hasLoadedInitialQuestions,
  ]);

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
    <div className="h-full w-full overflow-y-auto bg-mocha-crust">
      <AnimatePresence mode="wait">
        <motion.div
          key="question"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          className="mx-auto flex min-h-full w-full max-w-7xl flex-col gap-4 p-4 sm:p-6"
        >
          <header className="border border-mocha-surface1 bg-mocha-base/70">
            <div className="flex flex-col gap-4 border-b border-mocha-surface1 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
              <div className="flex items-start gap-3">
                <div
                  className={`flex size-11 shrink-0 items-center justify-center border ${
                    isBossEncounter
                      ? "border-mocha-red/50 bg-mocha-red/10 text-mocha-red"
                      : "border-mocha-mauve/40 bg-mocha-mauve/10 text-mocha-mauve"
                  }`}
                >
                  {isBossEncounter ? (
                    <ShieldAlert className="size-5" aria-hidden="true" />
                  ) : (
                    <Swords className="size-5" aria-hidden="true" />
                  )}
                </div>
                <div>
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-mocha-overlay1">
                    Reflectify / live session
                  </p>
                  <h1
                    className={`mt-1 text-lg font-black uppercase tracking-[0.12em] sm:text-xl ${
                      isBossEncounter ? "text-mocha-red" : "text-mocha-text"
                    }`}
                  >
                    {isBossEncounter ? "Critical boss encounter" : "Active run"}
                  </h1>
                </div>
              </div>

              <div className="grid grid-cols-2 border border-mocha-surface1 bg-mocha-crust/50 font-mono sm:min-w-64">
                <div className="border-r border-mocha-surface1 px-4 py-2.5">
                  <p className="text-[9px] uppercase tracking-[0.16em] text-mocha-overlay1">
                    Depth
                  </p>
                  <p className="mt-1 text-lg font-black text-mocha-mauve">
                    {String(depth).padStart(2, "0")}
                  </p>
                </div>
                <div className="px-4 py-2.5">
                  <p className="text-[9px] uppercase tracking-[0.16em] text-mocha-overlay1">
                    Queue
                  </p>
                  <p className="mt-1 flex items-center gap-2 text-lg font-black text-mocha-sky">
                    <Database className="size-3.5" aria-hidden="true" />
                    {String(questionQueues.length).padStart(2, "0")}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-3 sm:p-4">
              <Stats />
            </div>
          </header>

          <div className="grid flex-1 gap-4 xl:grid-cols-[minmax(0,1fr)_20rem]">
            <section className="min-w-0 space-y-4" aria-label="Current question">
              <div
                className={`border bg-mocha-base/70 ${
                  isBossEncounter
                    ? "border-mocha-red/50"
                    : "border-mocha-surface1"
                }`}
              >
                <div className="flex flex-col gap-3 border-b border-mocha-surface1 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-mocha-overlay1">
                      Current query
                    </p>
                    <p className="mt-1 font-mono text-xs text-mocha-subtext0">
                      {isBossEncounter
                        ? "Linked-concept synthesis protocol"
                        : "Select the best response, then confirm."}
                    </p>
                  </div>

                  {hasAnswered ? (
                    <button
                      disabled={!hasAnswered}
                      onClick={() => handleNextQuestion()}
                      className="min-h-11 w-full border border-mocha-mauve bg-mocha-mauve px-5 py-2 font-mono text-xs font-black uppercase tracking-[0.16em] text-mocha-crust transition-colors hover:bg-mocha-lavender focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mocha-lavender disabled:pointer-events-none disabled:opacity-30 sm:w-auto"
                    >
                      Next query
                    </button>
                  ) : (
                    !hasDictionary && (
                      <button
                        disabled={!selectedAnswer}
                        onClick={answerQuestion}
                        className="min-h-11 w-full border border-mocha-mauve bg-mocha-mauve px-5 py-2 font-mono text-xs font-black uppercase tracking-[0.16em] text-mocha-crust transition-colors hover:bg-mocha-lavender focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mocha-lavender disabled:pointer-events-none disabled:border-mocha-surface2 disabled:bg-transparent disabled:text-mocha-overlay0 disabled:opacity-50 sm:w-auto"
                      >
                        Lock answer
                      </button>
                    )
                  )}
                </div>

                <div className="p-5 sm:p-7 lg:p-8">
                  <p className="whitespace-pre-wrap text-base font-semibold leading-7 text-mocha-text sm:text-lg sm:leading-8">
                    {questionQueues[0].question}
                  </p>
                </div>
              </div>

              <div className="border border-mocha-surface1 bg-mocha-mantle/60 p-3 sm:p-4">
                <div className="mb-3 flex items-center justify-between border-b border-mocha-surface1 pb-3 font-mono">
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-mocha-sky">
                    Response matrix
                  </p>
                  <p className="text-[9px] uppercase tracking-[0.14em] text-mocha-overlay1">
                    {selectedAnswer ? "Response selected" : "Awaiting input"}
                  </p>
                </div>
                <GameTypeIdentifier
                  choices={questionQueues[0].options as string[]}
                  answer={questionQueues[0].answer}
                  type={questionQueues[0].type}
                />
              </div>

              <section
                className="border border-mocha-surface1 bg-mocha-base/70"
                aria-live="polite"
              >
                <div className="flex items-center gap-2 border-b border-mocha-surface1 px-4 py-3 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-mocha-green">
                  <Bot className="size-4" aria-hidden="true" />
                  Analysis channel
                </div>
                <div className="min-h-20 p-4 sm:p-5">
                  <AnimatePresence mode="wait">
                    {hasAnswered ? (
                      <motion.div
                        key="answer"
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                      >
                        <Explanation explanation={questionQueues[0].explanation} />
                      </motion.div>
                    ) : (
                      <motion.p
                        key="no-answer"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="font-mono text-xs leading-6 text-mocha-overlay1"
                      >
                        Submit a response to unlock the concept breakdown.
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </section>

              <div className="grid gap-4 font-mono md:grid-cols-2">
                <Augments handleConsumable={handleConsumable} />
              </div>
            </section>

            <aside className="min-h-72 xl:sticky xl:top-4 xl:h-[calc(100dvh-9.5rem)]" aria-label="Run activity">
              <Logs />
            </aside>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
