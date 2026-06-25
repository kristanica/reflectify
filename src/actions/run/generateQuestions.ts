"use server";

import { FORMAT_INSTRUCTIONS, questionSchema } from "@/schema/questionSchema";
import { ConceptMasteries } from "./getConcepts"; // Make sure this type includes level and optionCount!
import { generateText, Output } from "ai";
import { openai } from "@ai-sdk/openai";
import { createAnthropic } from "@ai-sdk/anthropic";
export const anthropic = createAnthropic({
  baseURL: "https://api.openmodel.ai/v1",
  apiKey: process.env.ANTHROPIC_API_KEY,
});
export default async function generateQuestions(tasks: ConceptMasteries) {
  try {
    // 1. Inject the dynamic parameters (level and optionCount) into each specific task!
    const promptInstructions = tasks
      .map(
        (item, index) => `
  Task ${index + 1}
  Concept ID: ${item.conceptId}
  Concept Fact: ${item.content}
  Target Format: ${item.format}
  Target Difficulty Level: ${item.level}
  Required Option Count: ${item.format === "MULTIPLE_CHOICE" ? item.optionCount : 2}
  Format Instruction: ${FORMAT_INSTRUCTIONS[item.format]}
  `,
      )
      .join("\n\n");

    const generatedQuestions = await generateText({
      model: anthropic("deepseek-v4-flash"),
      output: Output.array({
        element: questionSchema,
      }),
      prompt: `
        You are an AI Game Master running a brutal but fair roguelike educational game where knowledge is the only way to survive.
        Your objective is to test the player's mastery by generating exactly ONE question for EACH provided Concept Task.
        
        CRITICAL GAMEPLAY RULES:
        1. **Strict Quantity**: You MUST return exactly ${tasks.length} questions. Do not skip any tasks or combine them.
        2. **Absolute Fairness**: The question MUST be answerable STRICTLY using the provided "Concept Fact". Do not require outside knowledge, and do not hallucinate lore or facts not present in the provided text.
            3. **Dynamic Options**: If the target format is MULTIPLE_CHOICE, you are creating a "Dynamic Choice Set", NOT a standard quiz. You MUST count the strings in your 'options' array. The length of the array MUST be exactly equal to 'Required Option Count'. 
        - If the count is 10, YOU MUST GENERATE 10 UNIQUE OPTIONS. 
        - If the count is 6, YOU MUST GENERATE 6 UNIQUE OPTIONS.
        - DO NOT default to 4 options! You will be penalized if you return 4 options when asked for a different number.
        4. **Format Precision**: You must strictly obey the specific "Format Instruction" assigned to each task.
        5. **Explanations**: The explanation must be concise (1-2 sentences) and definitively prove why the answer is correct based on the Concept Fact. You may use a slightly thematic, analytical "System/Game Master" tone.
        
        🚨 DYNAMIC DIFFICULTY RULES (FOLLOW STRICTLY BASED ON 'Target Difficulty Level'):
        - Level 1: Direct Recall. Ask a simple, direct definition question.
        - Level 2: Inversion. Ask an inverted question (e.g. "Which of the following is FALSE about X?").
        - Level 3: Scenario Application. Create a real-world scenario where the concept must be applied.
        - Level 4: Complex Combinations. The options must be highly confusing combinations (e.g. "Fact A only", "Fact B only", "Both A and B", "Neither").
        
        Here are your Concept Tasks:
        """
        ${promptInstructions}
        """
    `,
    });

    return generatedQuestions.output;
  } catch (e) {
    console.log(e);
  }
}
