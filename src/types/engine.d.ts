type EconomyState = {
  credits: number;
  jokers: ShopItem[];
  totalAccumulatedCredits: number;
  isShopOpen: boolean;
  consumables: (ShopItem & { quantity: number })[];
  lastOpenedShop: number;
  shopHistory: Purchase[];
};

type EconomyAction = {
  setCredits: (val: number) => void;
  buyJoker: (val: ShopItem) => void;
  buyConsumable: (val: ShopItem) => void;
  openShop: () => void;
  closeShop: () => void;
  useConsumable: (consumableId: string) => void;
};

type EconomySlice = EconomyAction & EconomyState;

type PlayerState = {
  lives: number;
  streak: number;
  maxStreak: number;
  score: number;
  baseExp: number;
  baseLevel: number;
  sessionExpEarned: number;
  currentLevel: number;
  correctAnswerCount: number;
  incorrectAnswerCount: number;
};

type PlayerAction = {
  incrementLives: () => void;
  decrementLives: () => void;
  resetLives: () => void;
  plusStreak: () => void;
  resetStreak: () => void;
  setScore: (val: number) => void;
  initPlayerStat: (baseExp: number, baseLevel: number) => void;
};

type PlayerSlice = PlayerAction & PlayerState;

type SystemState = {
  sessionId: string;
  toasts: ToastItem[];
  logs: string[];
};

type SystemAction = {
  setSessionId: (sessionId: string) => void;
  addToast: (type: ToastType, message: string) => void;
  removeToast: (id: string) => void;
  addLogs: (logs: string) => void;
};

type SystemSlice = SystemAction & SystemState;

type SystemState = {
  selectedAnswer: string | undefined;
  hasAnswered: boolean;
  questionQueues: GeneratedQuestion[];
  questionsAnswered: number;
  is5050Active: boolean;
};

type SystemAction = {
  setSelectedAnswer: (val: string) => void;
  setHasAnswered: (val: boolean) => void;
  setQuestionQueues: (newQuestions: GeneratedQuestion[]) => void;
  handleNextQuestion: () => void;
  resetGame: () => void;
  submitAnswer: (timeElapsedInSecond: number) => void;
};

type GameLoopState = {
  selectedAnswer: string | undefined;
  hasAnswered: boolean;
  questionQueues: GeneratedQuestion[];
  questionsAnswered: number;
  is5050Active: boolean;
};

type GameLoopAction = {
  setSelectedAnswer: (val: string) => void;
  setHasAnswered: (val: boolean) => void;
  setQuestionQueues: (newQuestions: GeneratedQuestion[]) => void;
  handleNextQuestion: () => void;
  resetGame: () => void;
  submitAnswer: (timeElapsedInSecond: number) => void;
};

type GameLoopSlice = GameLoopState & GameLoopAction;

type GameEngineStore = SystemSlice & EconomySlice & PlayerSlice & GameLoopSlice;
