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
  selectedAnswer: undefined,
  hasAnswered: false,
  questionQueues: [],
  questionsAnswered: 0,
  is5050Active: false,
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
      questionQueues: [],
      questionsAnswered: 0,
      lives: 3,
      streak: 0,
      maxStreak: 0,
      score: 0,
      selectedAnswer: undefined,
      hasAnswered: false,
    })),
  submitAnswer: (timeElapsedInSecond) => {
    // random logs
    const state = get();

    const currentQuestionType = state.questionQueues[0].type;
    const currentQuestion = state.questionQueues[0];

    const isCorrect = state.selectedAnswer === state.questionQueues[0].answer;

    if (!isCorrect) {
      set((state) => ({
        incorrectAnswerCount: state.incorrectAnswerCount + 1,
      }));

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

    set((state) => ({ correctAnswerCount: state.correctAnswerCount + 1 }));
    //  -- EXP/ LEVEL CALCULATION --
    const currentDepth = state.questionsAnswered + 1;

    const xpEarnedThisQuestion = calculateSessionXp(currentDepth);

    const newSessionXp = state.sessionExpEarned + xpEarnedThisQuestion;
    const newTotalXp = state.baseExp + newSessionXp;

    const newCalculatedLevel = calculateNewLevel(newTotalXp);

    state.addLogs(
      `> DATA HARVESTED: +${xpEarnedThisQuestion} XP | TOTAL: ${newTotalXp} XP`,
    );
    if (newCalculatedLevel > state.currentLevel) {
      state.addLogs(
        `> ⚠️ SYSTEM UPGRADE: LEVEL ${newCalculatedLevel} ACHIEVED.`,
      );
      get().addToast("system", `LEVEL UP: ${newCalculatedLevel}!`);
    }

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
