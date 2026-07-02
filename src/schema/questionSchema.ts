import { object, string, infer as zInfer, enum as _enum, array } from "zod";

export const FORMAT_INSTRUCTIONS = {
  MULTIPLE_CHOICE: `
Provide 1 correct answer and multiple highly plausible distractors. The total number of options MUST exactly match the 'Required Option Count'. The options must be challenging and related to the topic.
CRITICAL DISTRACTOR RULES:
1. Distractors must be brutally challenging but fair.
2. Use common misconceptions, near-misses, chronologically adjacent events, or partially correct statements.
3. NEVER use obvious joke answers, throwaways, or grammatically mismatched options that give away the answer.
4. All options must be roughly the same length and share the same clinical, objective tone.
RANDOMIZATION:
You must randomize the position of the correct answer within the options array. DO NOT default to placing the correct answer at the very beginning or the very end. The correct answer's position must be completely unpredictable.
`,
  TRUE_OR_FALSE:
    "Make the statement tricky but definitively true or false. The answer must be exactly 'True' or 'False'. Do not use ambiguous wording.",
  BOSS_SCENARIO: `
This is a boss battle! Combine multiple concepts into a single complex scenario.
Provide 1 correct answer and multiple highly plausible distractors. The total number of options MUST exactly match the 'Required Option Count'. The options must test synthesis of multiple ideas.
CRITICAL DISTRACTOR RULES:
1. Distractors must be brutally challenging but fair.
2. Use common misconceptions or partially correct statements.
3. NEVER use obvious joke answers, throwaways, or grammatically mismatched options.
RANDOMIZATION:
You must randomize the position of the correct answer within the options array.
`,
};

export const questionSchema = object({
  conceptId: string().describe(
    "The **EXACT** ID of this concept this question is testing",
  ),
  type: _enum(["MULTIPLE_CHOICE", "TRUE_OR_FALSE", "BOSS_SCENARIO"]),
  question: string().describe("The text of the question"),
  options: array(string()).describe(
    "Provide EXACTLY the number of strings requested by 'Required Option Count'. Do not default to 4.",
  ),
  answer: string().describe(
    "The correct answer. For **MULTIPLE_CHOICE**, it must   **EXACTLY** match one of the options",
  ),
  explanation: string().describe(
    "A short **1-SENTENCE EXPLANATION** on why the answer is **CORRECT**",
  ),
});

export type QuestionSchema = zInfer<typeof questionSchema>;
