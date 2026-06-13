import { object, string, enum as enum_, infer as zInfer } from "zod";

export const ingestFormSchema = object({
  title: string()
    .min(3, "Title must be atleast 3 Characters long")
    .max(50, "Title must not exceed 50 characters"),
  ingestType: enum_(["File", "Topic"]),
  topic: string().nullish(),
});

export type IngestFormType = zInfer<typeof ingestFormSchema>;
