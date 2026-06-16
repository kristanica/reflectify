import { create } from "zustand";

type State = {
  selectedAnswer: string | undefined;
  hasAnswered: boolean;
  questionQueues: GeneratedQuestion[];
  questionsAnswered: number;

  lives: number;
};
type Action = {
  setSelectedAnswer: (val: string) => void;
  setHasAnswered: (val: boolean) => void;

  setQuestionQueues: (newQuestions: GeneratedQuestion[]) => void;

  handleNextQuestion: () => void;

  incrementLives: () => void;
  decrementLives: () => void;
};

export const useGameEngineStore = create<State & Action>((set) => ({
  //   States
  selectedAnswer: undefined,
  hasAnswered: false,
  questionQueues: [],
  questionsAnswered: 0,
  lives: 3,
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
      questionsAnswered: state.questionsAnswered + 1,
    })),

  setSelectedAnswer: (val) => set(() => ({ selectedAnswer: val })),
  setHasAnswered: (val) => set(() => ({ hasAnswered: val })),

  incrementLives: () =>
    set((state) => ({
      lives: state.lives + 1,
    })),
  decrementLives: () => set((state) => ({ lives: state.lives - 1 })),
}));
