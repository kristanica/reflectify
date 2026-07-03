"use server";
import { FORMAT_INSTRUCTIONS, questionSchema } from "@/schema/questionSchema";
import { ConceptMasteries } from "./getConcepts";
import { generateText, Output } from "ai";
import { openai } from "@ai-sdk/openai";
export default async function generateBossQuestion(tasks: ConceptMasteries) {
  try {
    const combinedFacts = tasks.map(
      (item, index) => `
      Task ${index + 1}
      Concept ID: ${item.conceptId}
      Concept Fact: ${item.content}
      `,
    );
    const combinedIds = tasks.map((item) => item.conceptId).join(",");

    const generateBossQuestion = await generateText({
      model: openai("gpt-5-nano"),
      output: Output.array({
        element: questionSchema,
      }),
      prompt: `
         You are an expert educator creating a comprehensive synthesis question.
         A student has reached a review point and needs to demonstrate mastery of multiple concepts.

         Your objective is to generate exactly ONE complex "BOSS_SCENARIO" question
         that requires the student to synthesize ALL of the provided Concept Facts
         to arrive at the correct answer.

         CRITICAL RULES:
         1. **Quantity & Formatting**: You MUST return exactly 1 question object. The 'type' must be "BOSS_SCENARIO".
         2. **Concept Tracking**: You MUST set the 'conceptId' exactly to this string: "${combinedIds}". Do not change it.
         3. **Dynamic Options**: You MUST count the options. The array length MUST be exactly 6.
         4. **Synthesis Required**: Do not just ask about Fact 1, Fact 2, or Fact 3 separately. Create a cohesive scenario or multi-step problem where the student cannot find the answer without understanding how all the facts interact.
         5. **Absolute Fairness**: The scenario must be answerable STRICTLY using the provided Concept Facts. Do not require outside domain knowledge.
         6. **No Meta-Language (CRITICAL)**: NEVER refer to the "provided facts", "three facts", "the text", or use the word "synthesize" in the question itself. Ask directly about the subject matter. 
            - BAD: "Which statement best explains the combined meaning of the three provided facts?"
            - GOOD: "Given that X occurs during process Y, and Z requires energy, what is the ultimate result of the reaction?"
         7. **Clarity**: The question should be clear, concise, and easy to understand. Avoid unnecessary lore, thematic dressing, or confusing roleplay. Write in plain, direct language.
         8. **Format Precision**: ${FORMAT_INSTRUCTIONS["BOSS_SCENARIO"]}
         9. **The Explanation**: Provide a precise, straightforward 1-2 sentence explanation definitively proving why the correct answer is the ONLY answer based on the combination of facts.

         Here are the Concept Facts the student must synthesize:
         """
         ${combinedFacts}
         """
         `,
    });
    return generateBossQuestion.output;
  } catch (error) {
    console.error(error);
  }
}
