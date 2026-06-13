import { fileValidationSchema } from "@/schema/fileValidationSchemta";
import { safeParse } from "zod";

export default function validateFile(File: File): {
  isValidated: boolean;
  data: string | File;
} {
  const validated = safeParse(fileValidationSchema, File);

  if (!validated.success) {
    return {
      isValidated: false,
      data: validated.error.issues[0].message,
    };
  }

  return {
    isValidated: true,
    data: validated.data,
  };
}
