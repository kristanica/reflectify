import { motion } from "motion/react";
import { useGameEngineStore } from "@/store/useGameEngineStore";
import { useEffect, useRef } from "react";
import { useShallow } from "zustand/react/shallow";
import saveToGameSession from "@/actions/run/saveGameSession";
import { useRouter } from "next/navigation";

const GameOver = () => {
  const router = useRouter();
  const {
    depth,
    maxStreak,
    shopHistory,
    inCorrectAnswerCount,
    resetGame,
    correctAnswerCount,
    score,
    totalAccumulatedCredits,
    newLevel,
    sessionId,
    sessionExpEarned,
    addToast,
  } = useGameEngineStore(
    useShallow((state) => ({
      depth: state.questionsAnswered,
      maxStreak: state.maxStreak,
      shopHistory: state.shopHistory,
      inCorrectAnswerCount: state.incorrectAnswerCount,
      correctAnswerCount: state.correctAnswerCount,
      sessionExpEarned: state.sessionExpEarned,
      resetGame: state.resetGame,
      score: state.score,
      totalAccumulatedCredits: state.totalAccumulatedCredits,
      newLevel: state.currentLevel,
      sessionId: state.sessionId,
      addToast: state.addToast,
    })),
  );

  const hasSaved = useRef<boolean>(false);

  const handleReset = () => {
    resetGame();
    router.push("/decks");
  };

  useEffect(() => {
    if (hasSaved.current) return;
    (async () => {
      const response = await saveToGameSession({
        maxStreak,
        shopHistory,
        inCorrectAnswerCount,
        correctAnswerCount,
        sessionId,
        score,
        sessionExpEarned,
        totalAccumulatedCredits,
        newLevel,
      });

      if (response.success) {
        addToast("system", "Run ended");
      }
    })();
    hasSaved.current = true;
  }, [
    correctAnswerCount,
    inCorrectAnswerCount,
    maxStreak,
    newLevel,
    score,
    sessionExpEarned,
    sessionId,
    shopHistory,
    totalAccumulatedCredits,
    addToast,
  ]);

  return (
    <div className="text-mocha-overlay2 h-full flex flex-1 flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center h-full w-full max-w-2xl mx-auto text-center px-4">
        <motion.div
          // A slick cinematic fade-in from a slight blur
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full flex flex-col items-center"
        >
          {/* --- HEADER --- */}
          <p className="text-mocha-red/80 font-mono tracking-[0.5em] text-xs mb-3 uppercase animate-pulse">
            Fatal Error
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-mocha-red tracking-widest uppercase">
            Run Terminated
          </h1>
          <div className="border border-mocha-red/30 my-5 bg-mocha-mantle/80 p-8 rounded-sm mb-10 w-full max-w-md text-left relative overflow-hidden shadow-[0_0_30px_rgba(220,38,38,0.05)]">
            <div className="absolute inset-0  pointer-events-none opacity-30"></div>

            <div className="relative z-10 flex flex-col gap-5">
              <div className="flex justify-between items-center border-b border-mocha-surface2 pb-3">
                <span className="text-mocha-overlay1 font-mono text-xs tracking-widest uppercase">
                  Depth Reached
                </span>
                <span className="text-mocha-yellow font-mono text-lg">
                  {depth}
                </span>
              </div>

              <div className="flex justify-between items-center border-b border-mocha-surface2 pb-3">
                <span className="text-mocha-overlay1 font-mono text-xs tracking-widest uppercase">
                  Max Streak
                </span>
                <span className="text-mocha-yellow font-mono text-lg">
                  {maxStreak}
                </span>
              </div>

              <div className="flex justify-between items-center border-mocha-surface2 pb-3">
                <span className="text-mocha-overlay1 font-mono text-xs tracking-widest uppercase">
                  Score
                </span>
                <span className="text-mocha-yellow font-mono text-lg">
                  {score}
                </span>
              </div>
            </div>
          </div>
          {/* --- ACTION BUTTONS --- */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-md">
            <button
              onClick={handleReset}
              className="w-full py-3 px-8 border border-mocha-surface2 text-mocha-subtext1 hover:bg-mocha-yellow hover:text-black transition-all duration-300 font-mono tracking-[0.2em] text-xs uppercase rounded-sm"
            >
              Return to Base
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default GameOver;
