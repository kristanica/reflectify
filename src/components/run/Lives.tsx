import { useGameEngineStore } from "@/store/useGameEngineStore";
import { HeartIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import React from "react";

const Lives = () => {
  const lives = useGameEngineStore((state) => state.lives);

  return (
    <div className="absolute top-10 left-0 flex flex-row gap-1">
      <AnimatePresence>
        {Array.from({ length: lives }).map((_, index) => (
          <motion.div
            key={index}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0, scaleX: 0 }}
            transition={{ duration: 0.3 }}
          >
            <HeartIcon className="fill-red-700 stroke-none" />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Lives;
