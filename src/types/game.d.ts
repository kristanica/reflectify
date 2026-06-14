type GameBoardType = {
  deckId: string;
  userId: string;
};
type GeneratedQuestion = {
  conceptId: string;
  type: QuestionType;
  question: string;
  options: (string | undefined)[];
  answer: string;
  explanation: string;
};
