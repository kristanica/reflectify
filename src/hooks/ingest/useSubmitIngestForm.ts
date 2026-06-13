import { safeParse } from "zod";
import { IngestAction, IngestState } from "./useIngestForm";
import { ingestFormSchema } from "@/schema/ingestFormSchema";
import { fileValidationSchema } from "@/schema/fileValidationSchemta";

import axios from "axios";
import { Dispatch } from "react";
import { toast } from "sonner";

export default async function useSubmitIngestForm(
  dipatch: Dispatch<IngestAction>,
  state: IngestState,
  onProgress: (val: number) => void,
): Promise<boolean> {
  const { title, topic, file, ingestType } = state;

  const formDataResult = safeParse(ingestFormSchema, {
    title,
    ingestType,
    topic,
  });

  // Validate form
  if (!formDataResult.success) {
    toast.error("Form Error", {
      description: formDataResult.error.issues[0].message,
    });
    return false;
  }
  const formData = new FormData();

  formData.append("title", title);
  formData.append("ingestType", ingestType);

  // validate file
  if (ingestType === "File") {
    const fileDataResult = safeParse(fileValidationSchema, file);
    if (!fileDataResult.success) {
      toast.error("Form Error", {
        description: fileDataResult.error.issues[0].message,
      });
      return false;
    }
    formData.append("file", fileDataResult.data);
  } else {
    formData.append("topic", topic);
  }

  try {
    await axios.post("/api/ingest", formData, {
      onUploadProgress: (progressEvent) => {
        if (progressEvent.total) {
          const percentedCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total,
          );

          onProgress(percentedCompleted);
        }
      },
    });

    dipatch({ type: "RESET" });
    return true;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    const errorMessage =
      e.response?.data?.error || e.message || "Failed to process target.";
    console.log(errorMessage);
    return false;
  }
}
