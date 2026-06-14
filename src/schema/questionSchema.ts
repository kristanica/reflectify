import { QuestionType } from "@/generated/prisma/enums";
import { object, string, infer as zInfer, enum as _enum, array } from "zod";

export const FORMAT_INSTRUCTIONS = {
  MULTIPLE_CHOICE: `
Provide 1 correct answer and 3 highly plausible distractors. The options must be challenging and related to the topic.
CRITICAL DISTRACTOR RULES:
1. Distractors must be brutally challenging but fair.
2. Use common misconceptions, near-misses, chronologically adjaent events, or partially correct statements.
3. NEVER use obvious joke answers, throwaways, or grammatically mismatched options that give away the answer.
4. All 4 options must be roughly the same length and share the same clinical, objective tone.
RANDOMIZATION:
You must randomize the position of the correct answer within the options array. DO NOT default to placing the correct answer at index 0 or index 3. The correct answer's position must be completely unpredictable across consecutive questions.
`,
  TRUE_OR_FALSE:
    "Make the statement tricky but definitively true or false. The answer must be exactly 'True' or 'False'. Do not use ambiguous wording.",
  IDENTIFICATION:
    "Ask a specific, direct question that requires a 1-to-3 word specific noun, name, or phrase as the answer. Do not give away the answer in the question.",
  SCENARIO:
    "Create a real-world, theoretical, or lore-based scenario where the student must apply the concept to find the answer. Do not use the exact wording of the concept fact. Test their deep understanding.",
};

export const questionSchema = object({
  conceptId: string().describe(
    "The **EXACT** ID of this concept this question is testing",
  ),
  type: _enum(QuestionType),
  question: string().describe("The text of the question"),
  options: array(string().optional()).describe(
    "Provide 4 options if the type is **MULTIPLE_CHOICE**. Omit otherwise",
  ),
  answer: string().describe(
    "The correct answer. For **MULTIPLE_CHOICE**, it must   **EXACTLY** match one of the options",
  ),
  explanation: string().describe(
    "A short **1-SENTENCE EXPLANATION** on why the answer is **CORRECT**",
  ),
});

export type QuestionSchema = zInfer<typeof questionSchema>;
