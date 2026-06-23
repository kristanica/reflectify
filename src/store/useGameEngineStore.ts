import { create } from "zustand";
import createSystemSlice from "./slices/createSystemSlice";
import createEconomySlice from "./slices/createEconomySlice";
import createPlayerSlice from "./slices/createPlayerSlice";
import createGameLoopSlice from "./slices/createGameLoopSlice";

export const useGameEngineStore = create<GameEngineStore>()((...a) => ({
  ...createSystemSlice(...a),
  ...createEconomySlice(...a),
  ...createPlayerSlice(...a),
  ...createGameLoopSlice(...a),
}));
