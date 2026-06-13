/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileText, UploadCloudIcon, X } from "lucide-react";
import React, { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Textarea } from "@/components/ui/textarea";
import validateFile from "@/hooks/ingest/validateFile";
import { toast } from "sonner";
import useIngestForm from "@/hooks/ingest/useIngestForm";
import useSubmitIngestForm from "@/hooks/ingest/useSubmitIngestForm";
import { Spinner } from "@/components/ui/spinner";
const IngestForm = () => {
  const toggleType = ["File", "Topic"] as const;

  const fileRef = useRef<HTMLInputElement>(null);

  const { state, dispatch } = useIngestForm();

  const [progress, setProgress] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [isDragging, setDragging] = useState<boolean>(false);

  const handleFileInbound = (file: File) => {
    const result = validateFile(file);

    if (!result.isValidated) {
      toast.error("Unexpected Error", {
        description: result.data as string,
      });
      return;
    }

    toast.success("File Ready", {
      description: `${file.name} loaded succesfully`,
    });

    dispatch({ type: "SET_FIELD", field: "file", payload: file });
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer.files[0] && e.dataTransfer.files) {
      handleFileInbound(e.dataTransfer.files[0]);
    }
  };

  const dragEvent = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragging(true);
    } else if (e.type === "dragleave") {
      setDragging(false);
      console.log(e.type, "IsNotDragging");
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    setIsSubmitting(true);
    setProgress(0);

    const res = await useSubmitIngestForm(dispatch, state, (e) => {
      setProgress(e);
    });

    if (!res) {
      setIsSubmitting(false);
    }
  };

  return (
    <section className=" w-1/2 mx-auto  ">
      <form
        onSubmit={onSubmit}
        className="space-y-6 max-w-xl   font-mono text-xs"
      >
        <FieldGroup className=" h-full ">
          <Field>
            <FieldLabel
              htmlFor="seedTitle"
              className="text-zinc-400 uppercase tracking-wider block"
            >
              Seed Identication
            </FieldLabel>

            <Input
              placeholder="e.g. Chemistry Unit 2: Acids & Bases"
              id="seedTitle"
              name="seedTile"
              type="text"
              value={state.title}
              onChange={(e) =>
                dispatch({
                  type: "SET_FIELD",
                  field: "title",
                  payload: e.target.value,
                })
              }
              className="w-full border border-zinc-850 bg-zinc-950 px-4 py-3 text-white rounded outline-none focus:border-[#f0a500] transition-colors"
            ></Input>
          </Field>

          <Field className="flex flex-col">
            <FieldLabel
              htmlFor="ingestionType"
              className="text-zinc-400 uppercase tracking-wider block"
            >
              Ingestion Type
            </FieldLabel>
            <Input
              type="hidden"
              name="ingestionType"
              id="ingestionType"
              value={state.ingestType}
            />
            <div className="flex border border-zinc-850 bg-zinc-950 p-1 rounded gap-2">
              {toggleType.map((type) => (
                <Button
                  type="button"
                  onClick={() =>
                    dispatch({
                      type: "SET_FIELD",
                      field: "ingestType",
                      payload: type,
                    })
                  }
                  key={type}
                  className={`flex-1 text-center py-2 transition-all uppercase font-bold text-[10px] bg-zinc-950  ${
                    state.ingestType === type
                      ? "bg-[#f0a500] text-black"
                      : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  {type}
                </Button>
              ))}
            </div>
          </Field>

          <Field className="h-2xl ">
            <AnimatePresence mode="wait">
              {state.ingestType === "File" ? (
                <motion.div
                  key="File"
                  onDragEnter={dragEvent}
                  onDragOver={dragEvent}
                  onDragLeave={dragEvent}
                  onDrop={onDrop}
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  onClick={() => fileRef.current?.click()}
                  className="h-full border border-dashed border-zinc-800 hover:border-[#f0a500]/50 font-mono text-xs text-zinc-400 rounded p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all bg-zinc-950 hover:bg-zinc-900/40"
                >
                  {state.file ? (
                    <div className="flex flex-col items-center space-y-2">
                      <FileText className="w-10 h-10 text-[#f0a500]" />
                      <p className="text-white text-xs font-bold truncate max-w-[200px]">
                        {state.file.name}
                      </p>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          dispatch({
                            type: "SET_FIELD",
                            field: "file",
                            payload: null,
                          });
                        }}
                        className="text-[10px] text-red-500 hover:text-red-400 flex items-center gap-1 font-mono uppercase"
                      >
                        <X className="w-3.5 h-3.5" /> Remove file
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center">
                      <UploadCloudIcon className="w-8 h-8 mb-2 text-zinc-500" />
                      <Label className="pointer-events-none">
                        Ingest Source File (Max 10MB)
                      </Label>
                      <Input
                        type="file"
                        id="fileUpload"
                        name="fileUpload"
                        ref={fileRef}
                        onChange={(e) => {
                          if (e.target.files?.[0]) {
                            handleFileInbound(e.target.files?.[0]);
                          }
                        }}
                        className="hidden"
                        accept=".pdf,.txt,.docx"
                      />
                    </div>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="Topic"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="h-full"
                >
                  <Textarea
                    rows={5}
                    onChange={(e) =>
                      dispatch({
                        type: "SET_FIELD",
                        field: "topic",
                        payload: e.target.value,
                      })
                    }
                    id="topicDescription"
                    name="topicDescription"
                    placeholder="Explain the topic or list facts you want compiled..."
                    className="w-full border border-zinc-800 bg-zinc-950 px-4 py-3 text-white rounded outline-none focus:border-[#f0a500] transition-colors resize-none leading-relaxed"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </Field>

          <Field>
            <button
              type="submit"
              className="w-full block text-center border border-[#f0a500] hover:bg-[#f0a500] hover:text-black text-[#f0a500] py-3.5 transition-all uppercase font-bold text-xs rounded-sm cursor-pointer"
            >
              Ingest
            </button>
          </Field>
        </FieldGroup>
      </form>
      {isSubmitting && <Spinner></Spinner>}
    </section>
  );
};

export default IngestForm;
