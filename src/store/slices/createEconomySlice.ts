import { StateCreator } from "zustand";

const createEconomySlice: StateCreator<
  GameEngineStore,
  [],
  [],
  EconomySlice
> = (set, get) => ({
  credits: 2000,
  jokers: [],
  totalAccumulatedCredits: 0,
  isShopOpen: false,
  consumables: [],
  lastOpenedShop: 0,
  shopHistory: [],
  setCredits: (val) => set((state) => ({ credits: state.credits + val })),

  buyJoker: (val) =>
    set((state) => {
      if (state.credits >= val.cost && state.jokers.length <= 5) {
        if (state.jokers.some((j) => j.id === val.id)) return state;
        const newHistoryRecord = {
          cost: val.cost,
          itemKey: val.name,
          purchaseAt: new Date().toISOString(),
        };
        return {
          credits: state.credits - val.cost,
          jokers: [...state.jokers, val],
          shopHistory: [...state.shopHistory, newHistoryRecord],
        };
      }

      return state;
    }),

  buyConsumable: (val) =>
    set((state) => {
      if (state.credits < val.cost) return state;

      const newHistoryRecord = {
        cost: val.cost,
        itemKey: val.name,
        purchaseAt: new Date().toISOString(),
      };
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
          shopHistory: [...state.shopHistory, newHistoryRecord],
        };
      }
      return {
        credits: state.credits - val.cost,
        consumables: [
          ...state.consumables,
          { ...val, quantity: 1 },
        ] as typeof state.consumables,
        shopHistory: [...state.shopHistory, newHistoryRecord],
      };
    }),
  openShop: () =>
    set((state) => {
      return {
        isShopOpen: true,
        lastOpenedShop: state.questionsAnswered,
      };
    }),
  closeShop: () => set(() => ({ isShopOpen: false })),
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
});

export default createEconomySlice;
