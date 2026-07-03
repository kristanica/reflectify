import { useGameEngineStore } from "@/store/useGameEngineStore";
import { motion, AnimatePresence } from "motion/react";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

const Logs = () => {
  const logs = useGameEngineStore((state) => state.logs);

  return (
    <>
      <h2 className="text-sm font-bold font-mono tracking-widest mb-2 text-mocha-yellow uppercase flex items-center gap-2">
        <span>[ SYSTEM_LOGS ]</span>
      </h2>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="h-full w-full border-mocha-surface1 border mt-2 bg-mocha-base/40 py-3 px-4 overflow-y-auto flex flex-col font-mono text-[11px] leading-relaxed relative"
      >
        <AnimatePresence initial={false}>
          {[...logs].reverse().map((item, index) => {
            const isLatest = index === 0;
            const opacity = Math.max(0.15, 1 - index * 0.2);

            return (
              <motion.div
                key={`${logs.length - index}-${item.substring(0, 5)}`}
                variants={itemVariants}
                layout
                initial="hidden"
                animate="show"
                className={`flex gap-3 mb-2 transition-colors duration-300 ease-in-out`}
                style={{ opacity }}
              >
                <p
                  className={`${isLatest ? "text-mocha-text tracking-wide" : "text-mocha-overlay1"}`}
                >
                  {item}
                </p>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {logs.length === 0 && (
          <motion.div variants={itemVariants} className="flex gap-3 opacity-40">
            <span className="text-mocha-surface2">{">"}</span>
            <p className="text-mocha-overlay1 animate-pulse">
              Awaiting system input_
            </p>
          </motion.div>
        )}
      </motion.div>
    </>
  );
};

export default Logs;
