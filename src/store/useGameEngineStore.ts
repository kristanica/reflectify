// removed unused/incorrect import
import { create } from "zustand";

type State = {
  selectedAnswer: string | undefined;
  hasAnswered: boolean;
  questionQueues: GeneratedQuestion[];
  questionsAnswered: number;

  lives: number;
  streak: number;
  maxStreak: number;
  score: number;
  credits: number;

  jokers: ShopItem[];
  consumables: (ShopItem & { quantity: number })[];
  isShopOpen: boolean;

  lastOpenedShop: number;
};
type Action = {
  setSelectedAnswer: (val: string) => void;
  setHasAnswered: (val: boolean) => void;

  setQuestionQueues: (newQuestions: GeneratedQuestion[]) => void;

  handleNextQuestion: () => void;

  incrementLives: () => void;
  decrementLives: () => void;

  plusStreak: () => void;
  resetStreak: () => void;
  setScore: (val: number) => void;
  resetGame: () => void;
  setCredits: (val: number) => void;
  buyJoker: (val: ShopItem) => void;
  buyConsumable: (val: ShopItem) => void;
  openShop: () => void;
  closeShop: () => void;
};

export const useGameEngineStore = create<State & Action>((set) => ({
  //   States
  selectedAnswer: undefined,
  hasAnswered: false,
  questionQueues: [],
  questionsAnswered: 0,
  lives: 3,
  streak: 0,
  maxStreak: 0,
  score: 0,
  credits: 2000,
  jokers: [],
  consumables: [],
  isShopOpen: false,
  lastOpenedShop: 0,

  // Actions
  openShop: () =>
    set((state) => {
      return {
        isShopOpen: true,
        lastOpenedShop: state.questionsAnswered,
      };
    }),
  closeShop: () => set(() => ({ isShopOpen: false })),
  setQuestionQueues: (newQuestions) =>
    set((state) => ({
      questionQueues: [...state.questionQueues, ...newQuestions],
    })),

  handleNextQuestion: () =>
    set((state) => ({
      questionQueues: state.questionQueues.slice(1),
      selectedAnswer: undefined,
      hasAnswered: false,
      questionsAnswered: state.questionsAnswered + 1,
    })),

  setSelectedAnswer: (val) => set(() => ({ selectedAnswer: val })),
  setHasAnswered: (val) => set(() => ({ hasAnswered: val })),

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
  incrementLives: () =>
    set((state) => ({
      lives: state.lives + 1,
    })),

  setCredits: (val) => set((state) => ({ credits: state.credits + val })),
  decrementLives: () => set((state) => ({ lives: state.lives - 1 })),
  resetGame: () =>
    set(() => ({
      questionQueues: [],
      questionsAnswered: 0,
      lives: 3,
      streak: 0,
      maxStreak: 0,
      score: 0,
      selectedAnswer: undefined,
      hasAnswered: false,
    })),

  buyJoker: (val) =>
    set((state) => {
      if (state.credits >= val.cost && state.jokers.length <= 5) {
        if (state.jokers.some((j) => j.id === val.id)) return state;

        return {
          credits: state.credits - val.cost,
          jokers: [...state.jokers, val],
        };
      }

      return state;
    }),

  buyConsumable: (val) =>
    set((state) => {
      if (state.credits < val.cost) return state;

      // if consumable already exist
      if (state.consumables.some((c) => c.id === val.id)) {
        const newConsumables = state.consumables.map((item) => {
          if (item.id === val.id) {
            return { ...item, quantity: (item.quantity ?? 1) + 1 };
          }
          return item;
        });

        return {
          credits: state.credits - val.cost,
          consumables: newConsumables as typeof state.consumables,
        };
      }
      return {
        credits: state.credits - val.cost,
        consumables: [
          ...state.consumables,
          { ...val, quantity: 1 },
        ] as typeof state.consumables,
      };
    }),
}));
