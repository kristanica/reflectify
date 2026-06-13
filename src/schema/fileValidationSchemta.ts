import { instanceof as instanceof_, infer as zInfer } from "zod";

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_FILE_TYPE = "application/pdf";

export const fileValidationSchema = instanceof_(File, {
  message: "No file uploaded",
})
  .refine((val) => val.size <= MAX_FILE_SIZE, {
    message: "File must be under 10MB",
  })
  .refine(
    (val) => ALLOWED_FILE_TYPE === val.type && val.name.endsWith(".pdf"),
    { message: "File must be PDF" },
  );

export type Register = zInfer<typeof fileValidationSchema>;
