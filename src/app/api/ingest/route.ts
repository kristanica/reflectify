/* eslint-disable @typescript-eslint/no-explicit-any */
import { fileValidationSchema } from "@/schema/fileValidationSchemta";
import { ingestFormSchema } from "@/schema/ingestFormSchema";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/handlers";
import { NextResponse } from "next/server";
import { safeParse } from "zod";
import { put } from "@vercel/blob";
import { PDFParse } from "pdf-parse";
import prisma from "@/lib/prisma";
import { SourceType } from "@/generated/prisma/enums";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    //   Check session
    if (!session?.user) {
      return NextResponse.json(
        {
          error: "UNAUTHORIZED",
        },
        {
          status: 401,
        },
      );
    }

    const userId = (session.user as any).id;

    console.log("hit!");

    const formData = await req.formData();
    console.log(formData.get("title"));
    //   Get default form fields
    const formDataResult = safeParse(ingestFormSchema, {
      title: formData.get("title"),
      ingestType: formData.get("ingestType"),
      topic: formData.get("topic"),
    });

    if (!formDataResult.success) {
      console.log("Im here!");

      return NextResponse.json(
        { error: formDataResult.error.issues[0] },
        { status: 400 },
      );
    }

    const { title, ingestType, topic } = formDataResult.data;
    let fileUrl: string = "";
    let rawText: string[] = [];

    //   If ingestTyppe is file, do another validation
    if (ingestType === "File") {
      const fileDataResult = safeParse(
        fileValidationSchema,
        formData.get("file"),
      );

      if (!fileDataResult.success) {
        return NextResponse.json(
          { error: fileDataResult.error.issues[0] },
          { status: 400 },
        );
      }

      const file = fileDataResult.data;

      //    Save file to vercel blob
      const blob = await put(
        `decks/${userId}/${Date.now()}-${file.name}`,
        file,
        {
          access: "private",
        },
      );

      fileUrl = blob.url;

      // Parsing
      const arrayBuffer = await file.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);
      const parsedPdf = new PDFParse(uint8Array);

      const extractPdf = await parsedPdf.getText();

      rawText = extractPdf.text
        .split(/\n\n+/)
        .filter((chunk: any) => chunk.trim().length > 0) as string[];
    } else if (ingestType === "Topic" && topic) {
      rawText = [topic];
    } else {
      return NextResponse.json(
        { error: "VALIDATION ERROR: Topic details are missing." },
        { status: 400 },
      );
    }

    if (rawText.length === 0) {
      return NextResponse.json(
        {
          error: "Extraction Error: No content was extracted",
        },
        {
          status: 400,
        },
      );
    }

    const conceptExtraction = (await import("@/lib/conceptExtraction")).default;

    const isTopic = ingestType === "Topic";
    const generatedConcepts = await conceptExtraction(rawText, isTopic);

    // Put into transaction so succeed or , only expose deck as return value
    const deck = await prisma.$transaction(async (tx) => {
      //  Save it as deck first
      const deck = await tx.deck.create({
        data: {
          title: title,
          sourceType: ingestType.toUpperCase() as SourceType,
          rawText: JSON.stringify(rawText),

          user: {
            connect: { id: userId },
          },
        },
      });
      // Save extracted concepts
      const concepts = await tx.concept.createManyAndReturn({
        data: generatedConcepts.map((concept) => ({
          concept: concept,
          deckId: deck.id,
        })),
      });
      // Generate masteries
      await tx.conceptMasteries.createMany({
        data: concepts.map((concept) => ({
          userId: userId,
          conceptId: concept.id,
        })),
      });

      return deck;
    });

    return NextResponse.json({
      success: true,
      deckId: deck.id,
      title: deck.title,
      fileUrl: fileUrl || null,
      charCount: rawText.length,
    });
  } catch (e: any) {
    console.error("INGEST_ERROR:", e);
    return NextResponse.json(
      { error: "INTERNAL SERVER ERROR: " + e.message },
      { status: 500 },
    );
  }
}
