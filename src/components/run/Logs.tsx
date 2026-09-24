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
    <section className="flex h-full min-h-72 flex-col border border-mocha-surface1 bg-mocha-base/70">
      <header className="flex items-center justify-between border-b border-mocha-surface1 px-4 py-3 font-mono">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-mocha-yellow">
            Run activity
          </p>
          <p className="mt-1 text-[9px] uppercase tracking-[0.12em] text-mocha-overlay1">
            Event stream
          </p>
        </div>
        <span className="border border-mocha-green/30 bg-mocha-green/10 px-2 py-1 text-[9px] font-bold uppercase tracking-[0.14em] text-mocha-green">
          Live
        </span>
      </header>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        aria-live="polite"
        className="relative flex min-h-0 flex-1 flex-col overflow-y-auto p-4 font-mono text-[11px] leading-relaxed"
      >
        <AnimatePresence initial={false}>
          {[...logs].reverse().map((item, index) => {
            const isLatest = index === 0;


            return (
              <motion.div
                key={`${logs.length - index}-${item.substring(0, 5)}`}
                variants={itemVariants}
                layout
                initial="hidden"
                animate="show"
                className="grid grid-cols-[auto_1fr] gap-3 border-b border-mocha-surface0 py-3 transition-colors duration-300"
              >
                <span className={isLatest ? "text-mocha-green" : "text-mocha-surface2"}>
                  {isLatest ? ">" : "·"}
                </span>
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
    </section>
  );
};

export default Logs;
