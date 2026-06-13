import { PDFParse } from "pdf-parse";

async function extractPdfText(file: File): Promise<string[]> {
  const arrayBuffer = await file.arrayBuffer();
  const uint8Array = new Uint8Array(arrayBuffer);
  const parsedPdf = new PDFParse(uint8Array);

  const extractPdf = await parsedPdf.getText();

  return extractPdf.text
    .split(/\n\n+/)
    .filter((chunk: string) => chunk.trim().length > 0);
}

export default extractPdfText;
