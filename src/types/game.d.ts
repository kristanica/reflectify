type GameBoardType = {
  deckId: string;
  userId: string;
  baseXp: number;
  baseLevel: number;
};
type GeneratedQuestion = {
  conceptId: string;
  type: string;
  question: string;
  options: (string | undefined)[];
  answer: string;
  explanation: string;
};
