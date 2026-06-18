import { generateText, Output } from "ai";
import { array, string, z } from "zod";
import { openai } from "@ai-sdk/openai";

export default async function conceptExtraction(
  rawText: string[] | undefined,
  isTopic: boolean,
) {
  const documentPrompt = `
      You are an expert curriculum designer. Analyze the following text and extract its core knowledge into a list of atomic concepts.
      
      Source Text:
      """
      ${rawText}
      """
  `;
  const topicPrompt = `
      You are an expert curriculum designer. The user wants to study the following topic: "${rawText}".
      Generate a comprehensive list of 15 to 20 core facts, rules, and important details about this topic.
  `;

  const activePrompt = isTopic ? topicPrompt : documentPrompt;

  const { output } = await generateText({
    model: openai("gpt-5-nano"),
    output: Output.object({
      schema: z.object({
        concepts: array(string()).describe(
          "A list of atomic, testable facts extracted from the text.",
        ),
      }),
    }),
    prompt: `
       ${activePrompt}

      Follow these strict rules for extraction:      
      1. ATOMICITY: Each concept must contain exactly one distinct, testable idea. Do not combine multiple facts using "and", "but", or "because". If a sentence has multiple facts, split it into multiple distinct concepts.
      
      2. CONTEXT INDEPENDENCE: Each concept must stand completely on its own. Do not use pronouns like "He", "It", or "They" if the subject isn't clear. Always use specific names and nouns. 
         - BAD: "It was established to create a fake signal."
         - GOOD: "Project YoRHa was established to create a fake signal."
      
      3. FACTUAL AND DECLARATIVE: Write concepts as declarative statements of fact. Do not format them as questions or opinions.
      
      4. NO FLUFF: Ignore introductory paragraphs, meta-text, page numbers, or conversational transitions. Extract only the raw knowledge.

    `,
  });

  return output.concepts;
}
