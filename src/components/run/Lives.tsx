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
            {Array.from({ length: lives }).map((_, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1, opacity: 50, scaleX: 0 }}
                transition={{ duration: 0.3 }}
              >
                <HeartIcon className="fill-red-700 stroke-none" />
              </motion.div>
            ))}
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
