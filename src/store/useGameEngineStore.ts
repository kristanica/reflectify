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
}));
