import { CONSUMABLE_DATABASE } from "@/lib/mockData";
import { Target } from "lucide-react";
import { toast } from "sonner";
import { uuid } from "zod";
import { create } from "zustand";

type ToastType = "error" | "itemused";
type ToastItem = { id: string; type: ToastType; message: string };

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
  is5050Active: boolean;

  toasts: ToastItem[];

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
  useConsumable: (consumableId: string) => void;
  addToast: (type: ToastType, message: string) => void;
  removeToast: (id: string) => void;
};

export const useGameEngineStore = create<State & Action>((set, get) => ({
  //   States
  selectedAnswer: undefined,
  hasAnswered: false,
  questionQueues: [],
  questionsAnswered: 0,
  lives: 3,
  streak: 0,
  maxStreak: 0,
  score: 0,
  toasts: [],
  credits: 2000,
  jokers: [],
  consumables: [
    {
      id: "hack_5050",
      name: "50/50 Filter",
      description:
        "Instantly eliminates two incorrect options on a Multiple Choice question.",
      cost: 50,
      icon: "✂️",
      type: "CONSUMABLE",
      effect: "FIFTY_FIFTY",
      value: 2,
      quantity: 2,
    },
  ],
  isShopOpen: false,
  lastOpenedShop: 0,
  is5050Active: false,

  // Actions

  addToast: (type, message) => {
    const id = String(uuid());

    set((state) => ({ toasts: [...state.toasts, { id, type, message }] }));

    setTimeout(() => {
      get().removeToast(id);
    }, 2000);
  },

  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    })),

  useConsumable: (consumableId) => {
    const consumables = get().consumables;
    const itemIndex = consumables.findIndex((c) => c.id === consumableId);

    if (itemIndex === -1) return;

    const targetConsumable = consumables[itemIndex];
    if (targetConsumable.quantity && targetConsumable.quantity <= 0) return;

    if (targetConsumable.effect === "FIFTY_FIFTY" && get().is5050Active) {
      get().addToast("error", "FIFTY_FIFTY already activated");
      return;
    }

    if (targetConsumable.effect === "SIPHON_STREAK" && get().streak <= 0) {
      get().addToast("error", "SYS_ERR: No Combo Streak to siphon!");
      return;
    }

    if (targetConsumable.effect === "SKIP_QUESTION") {
      set((prev) => ({
        questionQueues: prev.questionQueues.slice(1),
        questionsAnswered: prev.questionsAnswered + 1,
        streak: prev.streak + 1,
        score: prev.score + 100,
        is5050Active: false,
        hasAnswered: false,
        selectedAnswer: "",
        consumables: prev.consumables
          .map((item, index) =>
            index === itemIndex
              ? { ...item, quantity: (item.quantity || 1) - 1 }
              : item,
          )
          .filter((item) => (item.quantity || 0) > 0),
      }));

      get().addToast("itemused", "ZERO-DAY EXPLOIT ");
      return;
    }

    set((state) => {
      let newLives = state.lives;
      let newCredits = state.credits;
      let newStreak = state.streak;
      let isNew5050Active = state.is5050Active;

      switch (targetConsumable.effect) {
        case "FIFTY_FIFTY": {
          isNew5050Active = true;

          break;
        }
        case "SIPHON_STREAK": {
          if (state.streak > 0) {
            newCredits = state.credits + state.streak * targetConsumable.value;
            newStreak = 0;
            break;
          }
        }
        case "RANSOMWARE": {
          newCredits = Math.floor(newCredits * 0.6);
          newLives = 3;
          break;
        }

        case "MEMORY_LEAK": {
          const gain = Math.min(state.credits, targetConsumable.value);
          newCredits = state.credits + gain;
          break;
        }

        default: {
          return state;
        }
      }

      const updatedConsumables = state.consumables
        .map((item, index) =>
          index === itemIndex
            ? { ...item, quantity: (item.quantity || 1) - 1 }
            : item,
        )
        .filter((item) => item.quantity || 0 > 0);

      return {
        lives: newLives,
        credits: newCredits,
        consumables: updatedConsumables,
        streak: newStreak,
        is5050Active: isNew5050Active,
      };
    });

    get().addToast("itemused", `${targetConsumable.name} has been activated`);
  },

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
      is5050Active: false,
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
