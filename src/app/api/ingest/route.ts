/* eslint-disable @typescript-eslint/no-explicit-any */
import { fileValidationSchema } from "@/schema/fileValidationSchemta";
import { ingestFormSchema } from "@/schema/ingestFormSchema";
import { NextResponse } from "next/server";
import { safeParse } from "zod";
import conceptExtraction from "@/lib/conceptExtraction";
import uploadToBlob from "@/lib/uploadToBlob";
import extractPdfText from "@/lib/pdfExtractor";
import saveToDeck from "@/lib/saveToDeck";
import checkSession from "@/lib/checkSession";
export async function POST(req: Request) {
  try {
    const session = await checkSession();
    if (session instanceof NextResponse) {
      return session;
    }

    const userId = session.user.id;

    const formData = await req.formData();
    //   Get default form fields
    const formDataResult = safeParse(ingestFormSchema, {
      title: formData.get("title"),
      ingestType: formData.get("ingestType"),
      topic: formData.get("topic"),
    });

    if (!formDataResult.success) {
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

      const file = fileDataResult.data as File;

      //  Blob and RawText save
      [fileUrl, rawText] = await Promise.all([
        uploadToBlob(userId, file),
        extractPdfText(file),
      ]);
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

    const isTopic = ingestType === "Topic";
    const generatedConcepts = await conceptExtraction(rawText, isTopic);

    const deck = await saveToDeck({
      userId: userId,
      title: title,
      ingestType: ingestType,
      rawText: rawText,
      generatedConcepts: generatedConcepts,
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
