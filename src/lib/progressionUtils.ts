export const calculateSessionXp = (currentDepth: number) => {
  const DEPTH_MULTIPLIER = 0.05;
  const BASE_XP_PER_CORRECT = 15;

  const depthBonus = 1 + currentDepth * DEPTH_MULTIPLIER;
  return Math.round(BASE_XP_PER_CORRECT * depthBonus);
};

export const calculateNewLevel = (newTotalXp: number) => {
  const BASE_EXP = 100;
  const GROWTH_EXPONENT = 1.5;
  return Math.floor(Math.pow(newTotalXp / BASE_EXP, 1 / GROWTH_EXPONENT)) + 1;
};
