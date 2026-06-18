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
    <div className="flex flex-col items-end  absolute top-7 right-2">
      <div className="flex flx-row gap-2">
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

        <div className="flex flex-col items-end">
          <span className="text-[10px] tracking-widest text-zinc-500 font-mono uppercase mb-1">
            SCORE
          </span>
          <motion.div
            key={score}
            initial={{ scale: 1.2, color: "#fff" }}
            animate={{ scale: 1, color: "#22d3ee" }} // cyan-400 hex
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            <motion.span className="font-mono text-xl tracking-widest leading-none drop-shadow-[0_0_10px_rgba(34,211,238,0.4)]">
              {animatedScore}
            </motion.span>
          </motion.div>
        </div>
      </div>

      <div className="flex flex-col items-end">
        <span className="text-[10px] tracking-widest text-zinc-500 font-mono uppercase mb-1">
          credits
        </span>
        <motion.div
          key={credits}
          initial={{ scale: 1.2, color: "#fff" }}
          animate={{ scale: 1, color: "gold" }} // cyan-400 hex
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
        >
          $
          <motion.span className="font-mono text-xl tracking-widest leading-none drop-shadow-[0_0_10px_rgba(34,211,238,0.4)]">
            {animatedCredits}
          </motion.span>
        </motion.div>
      </div>
    </div>
  );
};

export default Score;
