"use server";

import { fileValidationSchema } from "@/schema/fileValidationSchemta";
import { ingestFormSchema } from "@/schema/ingestFormSchema";
import { safeParse } from "zod";
import conceptExtraction from "@/lib/conceptExtraction";
import uploadToBlob from "@/lib/uploadToBlob";
import extractPdfText from "@/lib/pdfExtractor";
import saveToDeck from "@/lib/saveToDeck";
import checkSession from "@/lib/checkSession";
import { NextResponse } from "next/server";
import type { IngestState } from "@/hooks/ingest/useIngestForm";
import { validateTopicText } from "@/lib/utils";

type IngestResult = {
  ok: boolean;
  message: string;
  deckId?: string;
  title?: string;
  fileUrl?: string | null;
  charCount?: number;
};

export async function ingestForm(state: IngestState): Promise<IngestResult> {
  try {
    const session = await checkSession();

    if (session instanceof NextResponse) {
      return {
        ok: false,
        message: "You must be logged in to ingest a seed.",
      };
    }

    const userId = session.user.id;

    const formDataResult = safeParse(ingestFormSchema, {
      title: state.title,
      ingestType: state.ingestType,
      topic: state.topic,
    });

    if (!formDataResult.success) {
      return {
        ok: false,
        message: formDataResult.error.issues[0].message,
      };
    }

    const { title, ingestType, topic } = formDataResult.data;

    let fileUrl = "";
    let rawText: string[] = [];

    // Files will be uploaded to blob storage and text extracted
    if (ingestType === "File") {
      const fileDataResult = safeParse(fileValidationSchema, state.file);

      if (!fileDataResult.success) {
        return {
          ok: false,
          message: fileDataResult.error.issues[0].message,
        };
      }

      const file = fileDataResult.data as File;
      rawText = await extractPdfText(file);

      if (rawText.length === 0 || !rawText) {
        return {
          ok: false,
          message: "No content was extracted.",
        };
      }

      fileUrl = await uploadToBlob(userId, file);
    }
    // Topic text will be used as-is
    else if (ingestType === "Topic" && topic) {
      if (!validateTopicText(topic)) {
        return {
          ok: false,
          message: "Topic must be at least 15 characters long.",
        };
      }
      rawText = [topic];
    } else {
      return {
        ok: false,
        message: "Topic details are missing.",
      };
    }

    if (rawText.length === 0) {
      return {
        ok: false,
        message: "No content was extracted.",
      };
    }

    const generatedConcepts = await conceptExtraction(
      rawText,
      ingestType === "Topic",
    );

    const deck = await saveToDeck({
      userId,
      title,
      ingestType,
      rawText,
      generatedConcepts,
    });

    return {
      ok: true,
      message: "Seed ingestion complete.",
      deckId: deck.id,
      title: deck.title,
      fileUrl: fileUrl || null,
      charCount: rawText.length,
    };
  } catch (e) {
    console.error("INGEST_ERROR:", e);

    return {
      ok: false,
      message: "Internal server error while ingesting seed.",
    };
  }
}
