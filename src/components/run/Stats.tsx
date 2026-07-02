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
    <div className="grid w-full grid-cols-2 md:flex gap-4 items-center h-full">
      {/* Lives */}
      <section className=" flex items-center gap-2 border bg-card  px-3 py-1.5 rounded h-full">
        <span className="text-mocha-subtext1 font-mono text-[10px] tracking-wider">
          LIVES:
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

      {/* Combo Meter */}
      <AnimatePresence>
        {streak > 1 && (
          <motion.section
            key="combo-meter"
            initial={{ opacity: 0, scale: 0.8, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{
              opacity: 0,
              scale: 0.5,
              y: 10,
              filter: "blur(5px)",
            }}
            className={`flex items-center gap-2 border border-mocha-yellow/30 bg-mocha-yellow/10 px-3 py-1.5 rounded h-full`}
          >
            <span className="text-mocha-yellow font-mono text-[10px] tracking-wider uppercase animate-pulse">
              COMBO:
            </span>
            <span className="text-mocha-yellow font-bold font-mono text-xs leading-none">
              x{streak}
            </span>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Score */}
      <section className="flex items-center gap-2 border bg-card text-mocha-sky px-3 py-1.5 rounded h-full">
        <span className="text-mocha-subtext1 font-mono text-[10px] tracking-wider uppercase">
          SCORE:
        </span>
        <motion.div
          key={score}
          initial={{ scale: 1.2, color: "#fff" }}
          animate={{ scale: 1, color: "#89b4fa" }} // mocha-blue hex
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
        >
          <motion.span className="font-mono text-xs text-mocha-sky  leading-none">
            {animatedScore}
          </motion.span>
        </motion.div>
      </section>

      <section className="flex items-center gap-2 border bg-card  px-3 py-1.5 rounded h-full">
        <span className="text-mocha-subtext1 font-mono text-[10px] tracking-wider uppercase">
          GOLD:
        </span>
        <motion.div
          key={credits}
          initial={{ scale: 1.2, color: "#fff" }}
          animate={{ scale: 1, color: "#f9e2af" }} // mocha-yellow hex
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
        >
          <motion.span className="text-mocha-yellow font-mono text-xs  leading-none">
            {animatedCredits}
          </motion.span>
        </motion.div>
      </section>
    </div>
  );
};

export default Stats;
