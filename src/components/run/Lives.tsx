import useAnimatedNumber from "@/hooks/useAnimatedNumber";
import { useGameEngineStore } from "@/store/useGameEngineStore";
import { HeartIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import React from "react";

const Lives = () => {
  const lives = useGameEngineStore((state) => state.lives);
  const depth = useGameEngineStore((state) => state.questionsAnswered);
  const animatedDepth = useAnimatedNumber({ val: depth });

  return (
    <div className="flex  gap-1 absolute top-7 left-0 flex-col">
      <div>
        <span className="text-[9px] tracking-[0.2em] text-[#666] uppercase font-mono">
          Lives
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
                    className={`transition-colors duration-300 ${
                      isAlive
                        ? "fill-red-700 stroke-red-700 drop-shadow-[0_0_8px_rgba(185,28,28,0.5)]"
                        : "fill-transparent stroke-zinc-600"
                    }`}
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      <div className="flex flex-col">
        <span className="text-[9px] tracking-[0.2em] text-[#666] uppercase font-mono">
          Depth
        </span>

        <motion.span key={depth}>{animatedDepth}</motion.span>
      </div>
    </div>
  );
};

export default Lives;
