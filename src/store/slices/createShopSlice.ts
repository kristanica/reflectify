import { AUGMENTS, CONSUMABLE_DATABASE } from "@/lib/mockData";
import { StateCreator } from "zustand";

const getRandomItems = (database: any[]) => {
  return [...database].sort(() => Math.random() - 0.5).slice(0, 3);
};

const createShopSlice: StateCreator<GameEngineStore, [], [], ShopSlice> = (
  set,
  get,
) => ({
  consumblesBrought: [],
  shakeTrigger: 0,
  maxJokerShuffle: 3,
  maxConsumablesShuffle: 3,
  availableJokers: getRandomItems(AUGMENTS),
  availableConsumables: getRandomItems(CONSUMABLE_DATABASE),

  addConsumablesBrought: (item) => {
    set((state) => ({
      consumblesBrought: [...state.consumblesBrought, item],
    }));
  },
  setMaxConsumablesShuffle: (max: number) => {
    set(() => ({
      maxConsumablesShuffle: max,
    }));
  },
  setMaxJokerShuffle: (max: number) => {
    set(() => ({
      maxJokerShuffle: max,
    }));
  },

  setAvailableConsumables: (consumables: any[]) => {
    set(() => ({
      availableConsumables: getRandomItems(consumables),
    }));
  },
  setAvailableJokers: (jokers: any[]) => {
    set(() => ({
      availableJokers: getRandomItems(jokers),
    }));
  },
  shuffleJokers: () => {
    const shuffled = [...AUGMENTS].sort(() => Math.random() - 0.5);

    set((state) => ({
      availableJokers: shuffled.slice(0, 3),
      maxJokerShuffle: state.maxJokerShuffle - 1,
    }));
  },
  shuffleConsumables: () => {
    const shuffled = [...CONSUMABLE_DATABASE].sort(() => Math.random() - 0.5);

    set((state) => ({
      availableConsumables: shuffled.slice(0, 3),
      maxConsumablesShuffle: state.maxConsumablesShuffle - 1,
    }));
  },
  purchase: async (shopItem) => {
    const credits = get().credits;
    if (credits < shopItem.cost) {
      set((state) => ({
        shakeTrigger: state.shakeTrigger + 1,
      }));

      return;
    }

    if (shopItem.type === "PASSIVE") {
      get().buyJoker(shopItem);
    } else if (shopItem.type === "CONSUMABLE") {
      get().buyConsumable(shopItem);
    }
  },
});

export default createShopSlice;
