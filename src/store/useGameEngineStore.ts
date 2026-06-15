import { create } from "zustand";

type State = {
  selectedAnswer: string | undefined;
  hasAnswered: boolean;
  questionQueues: GeneratedQuestion[];
};
type Action = {
  setSelectedAnswer: (val: string) => void;
  setHasAnswered: (val: boolean) => void;

  setQuestionQueues: (newQuestions: GeneratedQuestion[]) => void;

  handleNextQuestion: () => void;
};

export const useGameEngineStore = create<State & Action>((set) => ({
  //   States
  selectedAnswer: undefined,
  hasAnswered: false,
  questionQueues: [],

  // Actions

  setQuestionQueues: (newQuestions) =>
    set((state) => ({
      questionQueues: [...state.questionQueues, ...newQuestions],
    })),

  handleNextQuestion: () =>
    set((state) => ({
      questionQueues: state.questionQueues.slice(1),
      selectedAnswer: undefined,
      hasAnswered: false,
    })),

  setSelectedAnswer: (val) => set(() => ({ selectedAnswer: val })),
  setHasAnswered: (val) => set(() => ({ hasAnswered: val })),
}));
