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
      <p className="whitespace-pre-wrap text-sm leading-7 text-mocha-subtext1">
        {explanation}
      </p>
    </motion.div>
  );
};

export default Explanation;
