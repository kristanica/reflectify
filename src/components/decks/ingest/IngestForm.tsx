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
import { ingestForm } from "@/actions/ingestForm";
import { Spinner } from "@/components/ui/spinner";
import { validateTopicText } from "@/lib/utils";

const IngestForm = () => {
  const toggleType = ["File", "Topic"] as const;

  const fileRef = useRef<HTMLInputElement>(null);

  const { state, dispatch } = useIngestForm();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

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
    setProgress(8);
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 92) return prev;
        const next = prev + 4;
        return Math.min(next, 92);
      });
    }, 600);

    if (state.ingestType === "Topic" && !validateTopicText(state.topic)) {
      toast.error("Topic must be at least 15 characters long.");
      setIsSubmitting(false);
      setProgress(0);
      return;
    }

    // server action to ingest the form data
    const res = await ingestForm(state);

    clearInterval(timer);
    setProgress(100);

    setTimeout(() => {
      setIsSubmitting(false);
      setProgress(0);
    }, 600);

    if (res.ok) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  };

  return (
    <section className=" w-1/2 mx-auto  ">
      {isSubmitting ? (
        <div className="flex flex-col items-center gap-4 mt-4 justify-center border border-mocha-surface1 bg-mocha-mantle p-6 rounded font-mono text-xs text-mocha-overlay2">
          <Spinner></Spinner>

          <div className="h-1.5 w-full overflow-hidden rounded-full bg-mocha-surface1">
            <motion.div
              className="h-full bg-mocha-yellow"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            ></motion.div>
          </div>
        </div>
      ) : (
        <form
          onSubmit={onSubmit}
          className="space-y-6 max-w-xl   font-mono text-xs"
        >
          <FieldGroup className=" h-full ">
            <Field>
              <FieldLabel
                htmlFor="seedTitle"
                className="text-mocha-overlay2 uppercase tracking-wider block"
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
                className="w-full border border-mocha-surface1 bg-mocha-mantle px-4 py-3 text-mocha-text rounded outline-none focus:border-mocha-yellow transition-colors"
              ></Input>
            </Field>

            <Field className="flex flex-col">
              <FieldLabel
                htmlFor="ingestionType"
                className="text-mocha-overlay2 uppercase tracking-wider block"
              >
                Ingestion Type
              </FieldLabel>
              <Input
                type="hidden"
                name="ingestionType"
                id="ingestionType"
                value={state.ingestType}
              />
              <div className="flex border border-mocha-surface1 bg-mocha-mantle p-1 rounded gap-2">
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
                    className={`flex-1 text-center py-2 transition-all uppercase font-bold text-[10px] bg-mocha-mantle ${
                      state.ingestType === type
                        ? "bg-mocha-yellow text-black"
                        : "text-mocha-overlay1 hover:text-mocha-subtext1"
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
                    className="h-full border border-dashed border-mocha-surface1 hover:border-mocha-yellow/50 font-mono text-xs text-mocha-overlay2 rounded p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all bg-mocha-mantle hover:bg-mocha-base/40"
                  >
                    {state.file ? (
                      <div className="flex flex-col items-center space-y-2">
                        <FileText className="w-10 h-10 text-mocha-yellow" />
                        <p className="text-mocha-text text-xs font-bold truncate max-w-[200px]">
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
                          className="text-[10px] text-mocha-red hover:text-mocha-red/80 flex items-center gap-1 font-mono uppercase"
                        >
                          <X className="w-3.5 h-3.5" /> Remove file
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center">
                        <UploadCloudIcon className="w-8 h-8 mb-2 text-mocha-overlay1" />
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
                      className="w-full border border-mocha-surface1 bg-mocha-mantle px-4 py-3 text-mocha-text rounded outline-none focus:border-mocha-yellow transition-colors resize-none leading-relaxed"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </Field>

            <Field>
              <button
                type="submit"
                className="w-full block text-center border border-mocha-yellow hover:bg-mocha-yellow hover:text-black text-mocha-yellow py-3.5 transition-all uppercase font-bold text-xs rounded-sm cursor-pointer"
              >
                Ingest
              </button>
            </Field>
          </FieldGroup>
        </form>
      )}
    </section>
  );
};

export default IngestForm;
