type GameBoardType = {
  deckId: string;
  userId: string;
  baseXp: number;
  baseLevel: number;
  sessionId: string;
};
type GeneratedQuestion = {
  conceptId: string;
  type: string;
  question: string;
  options: (string | undefined)[];
  answer: string;
  explanation: string;
};

type GetConceptsType = {
  userId: string;
  deckId: string;
  questionQueues: string[];
  depth: number;
};
