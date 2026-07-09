import { openai } from "@ai-sdk/openai";
import { generateText, Output } from "ai";
import { array, string, z } from "zod";

export default async function conceptExtraction(
  rawText: string[] | undefined,
  isTopic: boolean,
) {
  const sourceText = rawText?.join("\n\n") ?? "";
  const documentPrompt = `
You are an expert curriculum designer preparing study material for Reflectify, a roguelike educational quiz game.

Analyze the source text and extract its core knowledge into atomic, testable concepts that can later be transformed into quiz questions, boss encounters, and scenario-based challenges.

Source Text:
"""
${sourceText}
"""
`;

  const topicPrompt = `
You are an expert curriculum designer preparing study material for Reflectify, a roguelike educational quiz game.

The user wants to study this topic:
"""
${sourceText}
"""

Generate a comprehensive set of core facts, rules, definitions, relationships, and important details that would be useful for quiz generation.
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

    Extract concepts using these strict rules:

    1. ATOMIC BUT MEANINGFUL
    Each concept must contain one clearly testable idea. Do not combine unrelated facts.
    However, do not split so aggressively that the concept loses educational meaning.

    2. STANDALONE CONTEXT
    Each concept must make sense without reading the original source.
    Avoid unclear pronouns such as "it", "they", "this", or "that" unless the noun is explicit.

    BAD: "It is used to neutralize bases."
    GOOD: "An acid can neutralize a base by donating hydrogen ions."

    3. QUIZ-READY FACTS
    Write each concept as a declarative fact that can be turned into a question.
    Do not write questions. Do not write commands. Do not write vague summaries.

    4. PRESERVE IMPORTANT TERMS
    Keep key technical terms, names, formulas, dates, classifications, and relationships.
    If a term has a definition, include the term and the definition in the same concept.

    5. PRIORITIZE TESTABLE KNOWLEDGE
    Extract definitions, causes, effects, rules, comparisons, processes, classifications, formulas, examples, and common misconceptions.
    Ignore filler, page numbers, headers, footers, citations, introductions, learning objectives, and conversational text.

    6. FAIRNESS FOR QUESTION GENERATION
    Every concept must contain enough information for a future AI system to generate a fair quiz question from that concept alone.
    Do not create concepts that require hidden context from the source.

    7. NO META-LANGUAGE
    Do not say "the text states", "the passage explains", "according to the document", or "this chapter discusses".
    State the knowledge directly as if it is generally true.

    8. COVERAGE
    For documents, extract all major testable ideas from the source.
    For topics, generate 15 to 25 high-value concepts unless the topic is narrow.

    Return only the structured output.
    `,
  });

  return output.concepts;
}
