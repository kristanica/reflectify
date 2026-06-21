import { useGameEngineStore } from "@/store/useGameEngineStore";
import { HeartIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import React from "react";

const Lives = () => {
  const lives = useGameEngineStore((state) => state.lives);

  return (
    <div className="flex gap-4 items-center h-full">
      <div className="flex items-center gap-2 border border-zinc-800 bg-zinc-950 px-3 py-1.5 rounded h-full">
        <span className="text-zinc-500 font-mono text-[10px] tracking-wider">LIVES:</span>
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
    </div>
  );
};

export default Lives;
