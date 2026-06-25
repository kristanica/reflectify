import { motion } from "motion/react";

const Explanation = ({ explanation }: { explanation: string }) => {
  return (
    <motion.div
      key="answer"
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="w-full overflow-hidden"
    >
      <p className="text-mocha-subtext1 font-mono text-xs leading-relaxed whitespace-pre-wrap">
        {explanation}
      </p>
    </motion.div>
  );
};

export default Explanation;
