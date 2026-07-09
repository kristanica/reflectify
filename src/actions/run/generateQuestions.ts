"use server";

import { FORMAT_INSTRUCTIONS, questionSchema } from "@/schema/questionSchema";
import { ConceptMasteries } from "./getConcepts"; // Make sure this type includes level and optionCount!
import { generateText, Output } from "ai";
import { openai } from "@ai-sdk/openai";

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
      model: openai("gpt-5-nano"),
      output: Output.array({
        element: questionSchema,
      }),
      prompt: `
      You are an AI Game Master for a brutal but fair roguelike study game.

      Generate questions from the provided Concept Tasks.

      OUTPUT QUANTITY:
      - You will receive 10 Concept Tasks.
      - Return exactly 20 questions total.
      - Each Concept Task must produce at least 1 question and at most 3 questions.
      - Distribute the 20 questions across the tasks.
      - Do not skip any task.
      - Do not generate more than 3 questions for any single task.

      FAIRNESS:
      - Every question, answer, option, and explanation must be supported only by the task's Concept Fact.
      - Do not add outside facts, examples, numbers, names, lore, or assumptions.
      - If a task's fact is narrow, vary the question style without adding new information.

      QUESTION VARIATION:
      When generating multiple questions for one Concept Fact:
      - Test different angles when possible.
      - Avoid repeating the same stem, same correct answer wording, or same explanation.
      - Valid angles: definition, identification, inversion, implication, sequence, comparison, scenario, or consequence.
      - Use only angles that the Concept Fact actually supports.

      MULTIPLE CHOICE RULES:
      - If format is MULTIPLE_CHOICE, options.length must exactly equal Required Option Count.
      - All options must be unique.
      - Do not default to 4 options.
      - The correct answer must appear exactly once in options.

      IMMERSION:
      - Do not say "based on the Concept Fact", "according to the text", or "which statement is supported".
      - Write as if the fact is true within the game world.

      DIFFICULTY:
      - Level 1: Direct recall.
      - Level 2: Inversion, false/missing/mismatched/not implied.
      - Level 3: Scenario application using only the Concept Fact.
      - Level 4: Complex combinations such as A only, B only, Both, Neither.

      EXPLANATIONS:
      - 1-2 concise sentences.
      - Prove the answer using only the Concept Fact.
      - Use a sharp System/Game Master tone.

      Return valid JSON only.

      Concept Tasks:
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
