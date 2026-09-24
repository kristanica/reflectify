import useAnimatedNumber from "@/hooks/useAnimatedNumber";
import { useGameEngineStore } from "@/store/useGameEngineStore";
import { HeartIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import React from "react";

const Stats = () => {
  const lives = useGameEngineStore((state) => state.lives);
  const streak = useGameEngineStore((state) => state.streak);
  const score = useGameEngineStore((state) => state.score);
  const credits = useGameEngineStore((state) => state.credits);

  const animatedScore = useAnimatedNumber({ val: score });
  const animatedCredits = useAnimatedNumber({ val: credits });

  return (
    <div className="grid w-full grid-cols-2 gap-px border border-mocha-surface1 bg-mocha-surface1 lg:grid-cols-4">
      {/* Lives */}
      <section className="flex min-h-16 flex-col justify-center gap-2 bg-mocha-base px-4 py-3">
        <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-mocha-overlay1">
          Integrity
        </span>
        <div className="flex flex-row gap-1">
          <AnimatePresence>
            {Array.from({ length: 3 }).map((_, index) => {
              // Check if this heart slot is still active
              const isAlive = index < lives;
              return (
                <motion.div
                  key={index}
                  // When you lose a life, the heart physically shrinks and fades slightly!
                  animate={{
                    scale: isAlive ? 1 : 0.8,
                    opacity: isAlive ? 1 : 0.4,
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <HeartIcon
                    className={`w-3.5 h-3.5 transition-colors duration-300 ${
                      isAlive
                        ? "fill-mocha-pink stroke-mocha-pink "
                        : "fill-transparent stroke-mocha-subtext0"
                    }`}
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </section>

      <motion.section
        key="combo-meter"
        animate={streak > 1 ? { backgroundColor: "rgba(249,226,175,0.1)" } : {}}
        className="flex min-h-16 flex-col justify-center gap-1 bg-mocha-base px-4 py-3"
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-mocha-overlay1">
          Combo
        </span>
        <span className={`font-mono text-lg font-black ${streak > 1 ? "text-mocha-yellow" : "text-mocha-subtext0"}`}>
          x{streak}
        </span>
      </motion.section>

      {/* Score */}
      <section className="flex min-h-16 flex-col justify-center gap-1 bg-mocha-base px-4 py-3 text-mocha-sky">
        <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-mocha-overlay1">
          Score
        </span>
        <motion.div
          key={score}
          initial={{ scale: 1.2, color: "#fff" }}
          animate={{ scale: 1, color: "#89b4fa" }} // mocha-blue hex
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
        >
          <motion.span className="font-mono text-lg font-black leading-none text-mocha-sky">
            {animatedScore}
          </motion.span>
        </motion.div>
      </section>

      <section className="flex min-h-16 flex-col justify-center gap-1 bg-mocha-base px-4 py-3">
        <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-mocha-overlay1">
          Credits
        </span>
        <motion.div
          key={credits}
          initial={{ scale: 1.2, color: "#fff" }}
          animate={{ scale: 1, color: "#f9e2af" }} // mocha-yellow hex
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
        >
          <motion.span className="font-mono text-lg font-black leading-none text-mocha-yellow">
            {animatedCredits}
          </motion.span>
        </motion.div>
      </section>
    </div>
  );
};

export default Stats;
