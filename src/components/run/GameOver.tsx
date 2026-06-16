import { motion } from "motion/react";
import { useGameEngineStore } from "@/store/useGameEngineStore";
import { redirect } from "next/navigation";
const GameOver = () => {
  const depth = useGameEngineStore((state) => state.questionsAnswered);
  const maxStreak = useGameEngineStore((state) => state.maxStreak);
  const score = useGameEngineStore((state) => state.score);
  const resetGame = useGameEngineStore((state) => state.resetGame);

  const handleReset = () => {
    resetGame();
    redirect("/decks");
  };

  return (
    <div className="text-gray-400 h-full flex flex-1  flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center h-full w-full max-w-2xl mx-auto text-center px-4">
        <motion.div
          // A slick cinematic fade-in from a slight blur
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full flex flex-col items-center"
        >
          {/* --- HEADER --- */}
          <p className="text-red-500/80 font-mono tracking-[0.5em] text-xs mb-3 uppercase animate-pulse">
            Fatal Error
          </p>
          <h1 className="text-4xl md:text-5xl  font-bold text-red-600 tracking-widest uppercase">
            Run Terminated
          </h1>
          <div className="border border-red-900/30 my-5 bg-zinc-950/80 p-8 rounded-sm mb-10 w-full max-w-md text-left relative overflow-hidden shadow-[0_0_30px_rgba(220,38,38,0.05)]">
            <div className="absolute inset-0  pointer-events-none opacity-30"></div>

            <div className="relative z-10 flex flex-col gap-5">
              <div className="flex justify-between items-center border-b border-zinc-900 pb-3">
                <span className="text-zinc-500 font-mono text-xs tracking-widest uppercase">
                  Depth Reached
                </span>
                <span className="text-amber-500 font-mono text-lg">
                  {depth}
                </span>
              </div>

              <div className="flex justify-between items-center border-b border-zinc-900 pb-3">
                <span className="text-zinc-500 font-mono text-xs tracking-widest uppercase">
                  Max Streak
                </span>
                <span className="text-amber-500 font-mono text-lg">
                  {maxStreak}
                </span>
              </div>

              <div className="flex justify-between items-center  border-zinc-900 pb-3">
                <span className="text-zinc-500 font-mono text-xs tracking-widest uppercase">
                  Score
                </span>
                <span className="text-amber-500 font-mono text-lg">
                  {score}
                </span>
              </div>
            </div>
          </div>
          {/* --- ACTION BUTTONS --- */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-md">
            <button
              onClick={handleReset}
              className="w-full py-3 px-8 border border-zinc-700 text-zinc-300 hover:bg-amber-600 hover:text-white transition-all duration-300 font-mono tracking-[0.2em] text-xs uppercase rounded-sm"
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
