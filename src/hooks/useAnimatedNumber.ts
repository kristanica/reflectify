import { useSpring, useTransform } from "motion/react";
import { useEffect } from "react";

const useAnimatedNumber = ({ val }: { val: number }) => {
  const animatedValue = useSpring(val, {
    stiffness: 150,
    damping: 15,
    mass: 1,
  });

  useEffect(() => {
    animatedValue.set(val);
  }, [val, animatedValue]);

  const displayValue = useTransform(animatedValue, (latest) => {
    return Math.round(latest).toString().padStart(5, "0");
  });

  return displayValue;
};

export default useAnimatedNumber;
