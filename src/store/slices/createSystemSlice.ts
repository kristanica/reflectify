import { StateCreator } from "zustand";

const createSystemSlice: StateCreator<GameEngineStore, [], [], SystemSlice> = (
  set,
  get,
) => ({
  toasts: [],
  sessionId: "",
  deckId: "",
  attempts: [],
  setAttempts: (attempt: ConceptAttempt) => {
    set((state) => ({
      attempts: [...state.attempts, attempt],
    }));
  },

  setDeckId: (deckId: string) => {
    set(() => ({
      deckId,
    }));
  },
  logs: [
    `[${new Date().toLocaleTimeString("en-US", { hour12: false })}] > WELCOME TO REFLECTIFY_OS. AWAITING INPUT.`,
  ],
  setSessionId: (sessionId) => {
    set(() => ({
      sessionId,
    }));
  },
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
  addLogs: (val) =>
    set((state) => {
      const timeString = new Date().toLocaleTimeString("en-us", {
        hour12: false,
      });

      return { logs: [...state.logs, `[${timeString}]: ${val}`] };
    }),
});

export default createSystemSlice;
