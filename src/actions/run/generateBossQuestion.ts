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
         You are an AI Game Master running a brutal but fair roguelike educational
       game where knowledge is the only way to survive.
         A player has reached a critical threshold and triggered a BOSS ENCOUNTER.

         Your objective is to generate exactly ONE highly difficult "BOSS_SCENARIO"
       question that requires the player to synthesize ALL of the provided Concept
       Facts to arrive at the correct answer.

         CRITICAL GAMEPLAY RULES:
         1. **Quantity & Formatting**: You MUST return exactly 1 question object.
       The 'type' must be "BOSS_SCENARIO".
         2. **Concept Tracking**: You MUST set the 'conceptId' exactly to this
       string: "${combinedIds}". Do not change it.
         3. **Dynamic Options**: You MUST count the options. The array length MUST
       be exactly 6.
         4. **Synthesis Required**: Do not just ask about Fact 1, Fact 2, or Fact 3
       separately. Create a complex real-world scenario, a multi-step logic problem,
       or an integrated system where the player cannot find the answer without
       understanding how all the facts interact.
         5. **Absolute Fairness**: The scenario must be answerable STRICTLY using
       the provided Concept Facts. Do not require outside domain knowledge.
         6. **Immersion**: NEVER use phrases like "based on the Concept Fact", "according to the text", or "which statement is supported". Write the question as if the facts are universal truths within the game world.
         7. **Format Precision**: ${FORMAT_INSTRUCTIONS["BOSS_SCENARIO"]}
         8. **The Explanation**: Provide a precise 1-2 sentence explanation
       definitively proving why the correct answer is the ONLY answer based on the
       combination of facts. Adopt a slightly thematic, clinical "System Override"
       tone.

         Here are the Concept Facts the player must synthesize to defeat this boss:
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
