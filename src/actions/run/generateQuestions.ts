"use server";

import { FORMAT_INSTRUCTIONS, questionSchema } from "@/schema/questionSchema";
import { ConceptMasteries } from "./getConcepts";
import { generateText, Output } from "ai";
import { openai } from "@ai-sdk/openai";

export default async function generateQuestions(tasks: ConceptMasteries) {
  try {
    const promptInstructions = tasks
      .map(
        (item, index) => `
  Task ${index + 1}
  Concept ID: ${item.conceptId},
  Concept Fact: ${item.content}
  Concept Required Format: ${item.format}
  Format Instruciton: ${FORMAT_INSTRUCTIONS[item.format]}
  `,
      )
      .join("\n\n");

    const generatedQuestions = await generateText({
      model: openai("gpt-4o"),
      output: Output.array({
        element: questionSchema,
      }),
      prompt: `
     You are an AI Game Master running a brutal but fair roguelike educational game where knowledge is the only way to survive.
        Your objective is to test the player's mastery by generating exactly ONE question for EACH provided Concept Task.
        
        CRITICAL GAMEPLAY RULES:
        1. **Strict Quantity**: You MUST return exactly ${tasks.length} questions. Do not skip any tasks or combine them.
        2. **Absolute Fairness**: The question MUST be answerable STRICTLY using the provided "Concept Fact". Do not require outside knowledge, and do not hallucinate lore or facts not present in the provided text.
        3. **Brutal Difficulty (Distractors)**: For multiple-choice questions, the wrong options (distractors) must be highly plausible, tricky, and cleverly written to trap players who only partially understand the concept. Do not make the correct answer obvious by simple elimination.
        4. **Format Precision**: You must strictly obey the specific "Format Instruction" assigned to each task.
        5. **Explanations**: The explanation must be concise (1-2 sentences) and definitively prove why the answer is correct based on the Concept Fact. You may use a slightly thematic, analytical "System/Game Master" tone.
        
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
