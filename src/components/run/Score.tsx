import useAnimatedNumber from "@/hooks/useAnimatedNumber";
import { useGameEngineStore } from "@/store/useGameEngineStore";
import { AnimatePresence, motion } from "motion/react";

const Score = () => {
  const streak = useGameEngineStore((state) => state.streak);
  const score = useGameEngineStore((state) => state.score);
  const credits = useGameEngineStore((state) => state.credits);

  const animatedScore = useAnimatedNumber({ val: score });
  const animatedCredits = useAnimatedNumber({ val: credits });
  return (
    <div className="flex gap-4 items-center h-full">
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
            }}
            className="flex items-center gap-2 border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 rounded h-full"
          >
            <span className="text-amber-500 font-mono text-[10px] tracking-wider uppercase animate-pulse">
              COMBO:
            </span>
            <span className="text-amber-400 font-bold font-mono text-xs leading-none">
              x{streak}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-2 border border-zinc-800 bg-zinc-950 px-3 py-1.5 rounded h-full">
        <span className="text-zinc-500 font-mono text-[10px] tracking-wider uppercase">
          SCORE:
        </span>
        <motion.div
          key={score}
          initial={{ scale: 1.2, color: "#fff" }}
          animate={{ scale: 1, color: "#22d3ee" }} // cyan-400 hex
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
        >
          <motion.span className="font-mono text-xs text-white drop-shadow-[0_0_10px_rgba(34,211,238,0.4)] leading-none">
            {animatedScore}
          </motion.span>
        </motion.div>
      </div>

      <div className="flex items-center gap-2 border border-zinc-800 bg-zinc-950 px-3 py-1.5 rounded h-full">
        <span className="text-zinc-500 font-mono text-[10px] tracking-wider uppercase">
          GOLD:
        </span>
        <motion.div
          key={credits}
          initial={{ scale: 1.2, color: "#fff" }}
          animate={{ scale: 1, color: "gold" }} // cyan-400 hex
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
        >
          <motion.span className="text-[#f0a500] font-mono text-xs drop-shadow-[0_0_10px_rgba(240,165,0,0.4)] leading-none">
           {animatedCredits}
          </motion.span>
        </motion.div>
      </div>
    </div>
  );
};

export default Score;
