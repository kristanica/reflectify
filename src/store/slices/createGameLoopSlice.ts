import { failLogs, successLogs } from "@/lib/constants";
import { CONSUMABLE_DATABASE } from "@/lib/mockData";
import { calculateNewLevel, calculateSessionXp } from "@/lib/progressionUtils";
import { StateCreator } from "zustand";

const createGameLoopSlice: StateCreator<
  GameEngineStore,
  [],
  [],
  GameLoopSlice
> = (set, get) => ({
  shownQuestions: [],
  selectedAnswer: undefined,
  hasAnswered: false,
  questionQueues: [],
  questionsAnswered: 0,
  is5050Active: false,

  appendShownQuestion: (shownQuestions: ShownQuestionState) => {
    set((state) => {
      return {
        shownQuestions: [...state.shownQuestions, shownQuestions],
      };
    });
  },
  setSelectedAnswer: (val) => set(() => ({ selectedAnswer: val })),
  setHasAnswered: (val) => set(() => ({ hasAnswered: val })),
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
  resetGame: () =>
    set(() => ({
      attempts: [],
      questionQueues: [],
      questionsAnswered: 0,
      lives: 3,
      streak: 0,
      maxStreak: 0,
      score: 0,
      selectedAnswer: undefined,
      hasAnswered: false,
      logs: [],
    })),
  submitAnswer: (timeElapsedInSecond) => {
    // random logs
    const state = get();

    const currentQuestionType = state.questionQueues[0].type;
    const currentQuestion = state.questionQueues[0];

    const isCorrect = state.selectedAnswer === state.questionQueues[0].answer;

    // append shown question for flashcard
    state.appendShownQuestion({
      question: currentQuestion.question,
      correctAnswer: currentQuestion.answer,
    });

    if (!isCorrect) {
      state.setAttempts({
        conceptId: currentQuestion.conceptId,
        answeredAt: new Date().toISOString(),
        isCorrect: false,
        usedHint: false,
        responseMs: timeElapsedInSecond * 1000,
      });

      set((state) => ({
        incorrectAnswerCount: state.incorrectAnswerCount + 1,
      }));

      const randomFail = failLogs[Math.floor(Math.random() * failLogs.length)];

      state.addLogs(`${randomFail}`);
      state.addLogs(
        `Expected: [${currentQuestion.answer}] | Received: [${state.selectedAnswer || "NONE"}]`,
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
        state.addLogs(`Damage Synthesis converted HP loss into an item.`);
        const randomNumber = Math.floor(
          Math.random() * CONSUMABLE_DATABASE.length,
        );

        const randomItem = CONSUMABLE_DATABASE[randomNumber];
        state.addLogs(`Item received: ${randomItem.name}`);

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
        state.addLogs(`Fatal blow blocked by Scapegoat.`);
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

    state.setAttempts({
      conceptId: currentQuestion.conceptId,
      answeredAt: new Date().toISOString(),
      isCorrect: true,
      usedHint: false,
      responseMs: timeElapsedInSecond * 1000,
    });
    set((state) => ({ correctAnswerCount: state.correctAnswerCount + 1 }));
    //  -- EXP/ LEVEL CALCULATION --
    const currentDepth = state.questionsAnswered + 1;

    const xpEarnedThisQuestion = calculateSessionXp(currentDepth);

    const newSessionXp = state.sessionExpEarned + xpEarnedThisQuestion;
    const newTotalXp = state.baseExp + newSessionXp;

    const newCalculatedLevel = calculateNewLevel(newTotalXp);

    state.addLogs(`Earned ${xpEarnedThisQuestion} XP. (Total: ${newTotalXp})`);

    if (newCalculatedLevel > state.currentLevel) {
      state.addLogs(`Level up! Reached Level ${newCalculatedLevel}.`);
      get().addToast("system", `LEVEL UP: ${newCalculatedLevel}!`);
    }

    let earnCredits = Math.round(4 * ((state.streak || 1) * 0.5));

    state.jokers.forEach((joker) => {
      if (joker.effect === "SPEED_PAYOUT") {
        if (timeElapsedInSecond < 3) {
          state.addLogs(`Speed bonus applied.`);
          earnCredits += joker.value;
        } else if (timeElapsedInSecond > 10) {
          earnCredits -= 5;
        }
      }

      if (joker.effect === "INSTANT_SUBMIT_PAYOUT") {
        earnCredits += joker.value;
      }

      if (joker.effect === "ADRENALINE_MULTIPLIER" && state.lives === 1) {
        state.addLogs(`Adrenaline multiplier: Credits doubled.`);
        earnCredits *= 2;
      }
    });

    const randomSuccess =
      successLogs[Math.floor(Math.random() * successLogs.length)];
    state.addLogs(`${randomSuccess}`);
    state.addLogs(
      `Selected: [${state.selectedAnswer}] | Earned: $${earnCredits} CR`,
    );

    const newStreak = state.streak + 1;
    set(() => {
      return {
        streak: state.streak + 1,
        hasAnswered: true,
        selectedAnswer: "",
        score: state.score + 100,
        credits: state.credits + earnCredits,
        totalAccumulatedCredits: state.totalAccumulatedCredits + earnCredits,
        // playerstat
        sessionExpEarned: newSessionXp,
        currentLevel: newCalculatedLevel,
        maxStreak: Math.max(state.maxStreak, newStreak),
      };
    });
  },
});

export default createGameLoopSlice;
