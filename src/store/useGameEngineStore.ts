import { CONSUMABLE_DATABASE, MOCK_INVENTORY } from "@/lib/mockData";
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

  logs: string[];
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
  addLogs: (logs: string) => void;
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
  consumables: [],
  isShopOpen: false,
  lastOpenedShop: 0,
  is5050Active: false,
  logs: ["> WELCOME TO REFLECTIFY_OS. AWAITING INPUT."],
  // Actions

  addLogs: (val) => set((state) => ({ logs: [...state.logs, val] })),
  addToast: (type, message) => {
    const id = crypto.randomUUID();

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

    if (targetConsumable.effect === "FIFTY_FIFTY") {
      if (get().is5050Active) {
        get().addToast("error", "50/50 is already activated!");
        return;
      }
      if (get().questionQueues[0].type === "TRUE_OR_FALSE") {
        get().addToast(
          "error",
          "SYS_ERR: 50/50 only works on Multiple Choice!",
        );
        return;
      }
    }

    if (targetConsumable.effect === "SIPHON_STREAK" && get().streak <= 0) {
      get().addToast("error", "SYS_ERR: No Combo Streak to siphon!");
      return;
    }

    if (targetConsumable.effect === "RANSOMWARE" && get().lives === 3) {
      get().addToast("error", "SYS_ERR: You're still at max HP!");
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

  submitAnswer: (timeElapsedInSecond) => {
    // random logs
    const successLogs = [
      "LOGIC GATE SHATTERED. HARVESTING DATA.",
      "TRUTH FRAGMENT EXTRACTED. NODE COMPROMISED.",
      "SYNAPSE ALIGNED. SECURITY PROTOCOL OBLITERATED.",
    ];
    // random logs
    const failLogs = [
      "FATAL MISMATCH. BLACK ICE DEPLOYED.",
      "PARADOX TRIGGERED. ACTIVE TRACE INITIATED.",
      "LOGIC FAULT DETECTED. NEURAL FEEDBACK SEVERING LINK.",
    ];
    const state = get();

    const currentQuestionType = state.questionQueues[0].type;
    const currentQuestion = state.questionQueues[0];

    const isCorrect = state.selectedAnswer === state.questionQueues[0].answer;

    if (!isCorrect) {
      const randomFail =
        failLogs[Math.floor(Math.random() * successLogs.length)];

      state.addLogs(`> ${randomFail} `);
      state.addLogs(
        `> MISMATCH DETAILS: EXPECTED [${currentQuestion.answer}] | RECEIVED [${state.selectedAnswer || "NONE"}]`,
      );

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
        state.addLogs(
          `> DAMAGE SYNTHESIS: CONVERTING SYSTEM SHOCK INTO CONTRABAND...`,
        );
        const randomNumber = Math.floor(
          Math.random() * CONSUMABLE_DATABASE.length,
        );

        const randomItem = CONSUMABLE_DATABASE[randomNumber];
        state.addLogs(`> DAMAGE SYNTHESIS: RECEIVED ${randomItem.name}`);

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
        state.addLogs(
          `> CRITICAL HIT INTERCEPTED. SCAPEGOAT PROTOCOL EXECUTED.`,
        );
        set(() => ({
          lives: hasScapeGoat.value,
          score: state.score - 50,
          jokers: state.jokers.filter((joker) => joker.id !== hasScapeGoat.id),
          streak: 0,
          hasAnswered: true,
          selectedAnswer: "",
        }));
      }

      set(() => ({
        lives: state.lives - damageDealth,
        score: state.score - 50,
        streak: 0,
        consumables: updatedConsumables,
        hasAnswered: true,
        selectedAnswer: "",
      }));
      return;
    } // is incorrect ends here

    let earnCredits = Math.round(4 * ((state.streak || 1) * 0.5));

    state.jokers.forEach((joker) => {
      if (joker.effect === "SPEED_PAYOUT") {
        if (timeElapsedInSecond < 3) {
          state.addLogs(`> RAPID INJECTION DETECTED. SPEED BONUS APPLIED.`);
          earnCredits += joker.value;
        } else if (timeElapsedInSecond > 10) {
          earnCredits -= 5;
        }
      }

      if (joker.effect === "INSTANT_SUBMIT_PAYOUT") {
        earnCredits += joker.value;
      }

      if (joker.effect === "ADRENALINE_MULTIPLIER" && state.lives === 1) {
        state.addLogs(`> ADRENALINE MULTIPLIER ACTIVE: CREDITS DOUBLED.`);
        earnCredits *= 2;
      }
    });

    const randomSuccess =
      successLogs[Math.floor(Math.random() * successLogs.length)];
    state.addLogs(`> ${randomSuccess}`);
    state.addLogs(
      `> DECRYPTED PAYLOAD: [${state.selectedAnswer}] | NET GAIN: +$${earnCredits} CR`,
    );

    set(() => {
      return {
        streak: state.streak + 1,
        hasAnswered: true,
        selectedAnswer: "",
        score: state.score + 100,
        credits: state.credits + earnCredits,
      };
    });
  },
}));
