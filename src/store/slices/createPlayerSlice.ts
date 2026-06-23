import { StateCreator } from "zustand";

const createPlayerSlice: StateCreator<GameEngineStore, [], [], PlayerSlice> = (
  set,
  get,
) => ({
  lives: 3,
  streak: 0,
  maxStreak: 0,
  score: 0,
  baseExp: 0,
  baseLevel: 1,
  sessionExpEarned: 0,
  currentLevel: 1,
  correctAnswerCount: 0,
  incorrectAnswerCount: 0,
  incrementLives: () =>
    set((state) => ({
      lives: state.lives + 1,
    })),

  decrementLives: () => set((state) => ({ lives: state.lives - 1 })),
  resetLives: () =>
    set(() => ({
      lives: 3,
    })),

  plusStreak: () =>
    set((state) => {
      const newStreak = state.streak + 1;

      return {
        streak: newStreak,
        maxStreak: Math.max(state.maxStreak, newStreak),
      };
    }),
  resetStreak: () => set(() => ({ streak: 0 })),
  setScore: (val) => set((state) => ({ score: state.score + val })),
  initPlayerStat: (baseExp, baseLevel) =>
    set(() => ({
      baseExp: baseExp,
      baseLevel: baseLevel,
      sessionExpEarned: 0,
    })),
});

export default createPlayerSlice;
