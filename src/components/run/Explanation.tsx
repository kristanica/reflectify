import { motion } from "motion/react";

const Explanation = ({ explanation }: { explanation: string }) => {
  return (
    <motion.div
      key="answer"
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="w-full  mt-6 p-4 border border-zinc-800 bg-zinc-950/50 rounded-sm overflow-hidden"
    >
      <p className="text-[10px] tracking-widest text-zinc-500 mb-2 font-mono uppercase">
        System Analysis
      </p>
      <p className="text-zinc-300 font-mono text-xs leading-relaxed">
        {explanation}
      </p>
    </motion.div>
  );
};

export default Explanation;
