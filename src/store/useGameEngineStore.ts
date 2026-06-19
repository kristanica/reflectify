// removed unused/incorrect import
import { CONSUMABLE_DATABASE } from "@/lib/mockData";
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
  resetLives: () => void;

  plusStreak: () => void;
  resetStreak: () => void;
  setScore: (val: number) => void;
  resetGame: () => void;
  setCredits: (val: number) => void;
  buyJoker: (val: ShopItem) => void;
  buyConsumable: (val: ShopItem) => void;
  openShop: () => void;
  closeShop: () => void;

  submitAnswer: (timeElapsedInSecond: number) => void;
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
  resetLives: () =>
    set(() => ({
      lives: 3,
    })),
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

  submitAnswer: (timeElapsedInSecond) =>
    set((state) => {
      const currentQuestionType = state.questionQueues[0].type;

      const isCorrect = state.selectedAnswer === state.questionQueues[0].answer;

      if (!isCorrect) {
        const hasScapeGoat = state.jokers.find(
          (joker) => joker.effect === "FATAL_OVERRIDE",
        );

        const hasTfMultipler = state.jokers.find(
          (joker) => joker.effect === "TF_MULTIPLIER",
        );

        const hasDamageSynthesis = state.jokers.find(
          (joker) => joker.effect === "DAMAGE_SYNTHESIS",
        );

        const damageDealth =
          hasTfMultipler && currentQuestionType === "MULTIPLE_CHOICE" ? 2 : 1;

        let updatedConsumables = state.consumables;

        // Fires damage synthesis
        if (hasDamageSynthesis) {
          const randomNumber = Math.floor(
            Math.random() * CONSUMABLE_DATABASE.length,
          );

          const randomItem = CONSUMABLE_DATABASE[randomNumber];

          const doesItemExistIndex = state.consumables.findIndex(
            (c) => c.id === randomItem.id,
          );

          // update quantity
          if (doesItemExistIndex !== -1) {
            updatedConsumables = state.consumables.map((item, index) =>
              index === doesItemExistIndex
                ? { ...item, quantity: (item.quantity ?? 1) + 1 }
                : item,
            );
            // Add item
          } else {
            updatedConsumables = [
              ...state.consumables,
              { ...(randomItem as unknown as ShopItem), quantity: 1 },
            ];
          }
        }

        // fires scapegoat if it will kill the player
        if (hasScapeGoat && state.lives <= damageDealth) {
          return {
            lives: hasScapeGoat.value,
            score: state.score - 50,
            jokers: state.jokers.filter(
              (joker) => joker.id !== hasScapeGoat.id,
            ),
            streak: 0,
            hasAnswered: true,
            selectedAnswer: "",
          };
        }

        return {
          lives: state.lives - damageDealth,
          score: state.score - 50,
          streak: 0,
          consumables: updatedConsumables,
          hasAnswered: true,
          selectedAnswer: "",
        };
      }

      let earnCredits = Math.round(4 * ((state.streak || 1) * 0.5));

      state.jokers.forEach((joker) => {
        if (joker.effect === "SPEED_PAYOUT") {
          if (timeElapsedInSecond < 3) {
            earnCredits += joker.value;
          } else if (timeElapsedInSecond > 10) {
            earnCredits -= 5;
          }
        }

        if (joker.effect === "INSTANT_SUBMIT_PAYOUT") {
          earnCredits += joker.value;
        }

        if (joker.effect === "ADRENALINE_MULTIPLIER" && state.lives === 1) {
          earnCredits *= 2;
        }
      });

      return {
        streak: state.streak + 1,
        hasAnswered: true,
        selectedAnswer: "",
        score: state.score + 100,
        credits: state.credits + earnCredits,
      };
    }),
}));
