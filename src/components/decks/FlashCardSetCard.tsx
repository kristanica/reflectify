"use client";

import { deleteFlashCardSet } from "@/actions/deleteFlashCardSet";
import { DeleteAction } from "./DeleteAction";
import Link from "next/link";
import { durationFormat } from "@/lib/utils";
import { KeyboardEvent, useState } from "react";
import { renameFlashCardSet } from "@/actions/renameFlashCardSet";

export default function FlashCardSetCard({
  slug,
  id,
  title,
  endedAt,
  startedAt,
}: {
  slug: string;
  id: string;
  title: string;
  endedAt: Date | null;
  startedAt: Date;
}) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>(title);

  const handleEditTitle = async (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setIsEditing(false);

      await renameFlashCardSet(id, newTitle);
    }
    if (event.key === "Escape") {
      setNewTitle(title);
      setIsEditing(false);
    }
  };

  return (
    <div className="flex min-h-60 flex-col justify-between space-y-4 border border-mocha-surface1 bg-mocha-base/60 p-5 font-mono text-xs transition-colors hover:border-mocha-mauve/50">
      {/* Seed Info Header */}
      <div className="space-y-2 relative">
        <DeleteAction
          onDeleteAction={() => deleteFlashCardSet(id)}
          title={title}
        />
        <div className="flex justify-between items-start">
          <span className="text-[10px] text-mocha-overlay1 uppercase tracking-wider">
            {startedAt.toDateString()}
          </span>
        </div>

        {isEditing ? (
          <input
            autoFocus
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onBlur={() => setIsEditing(false)}
            className="w-full border border-mocha-mauve bg-mocha-crust px-3 py-2 text-mocha-text outline-none"
            onKeyDown={handleEditTitle}
          />
        ) : (
          <h3
            onDoubleClick={() => setIsEditing(true)}
            className="text-sm font-bold text-mocha-text tracking-wide"
          >
            {newTitle}
          </h3>
        )}
      </div>

      {/* Run Metrics */}
      <div className="grid gap-2 border border-mocha-surface1 bg-mocha-crust/35 p-3 text-[10px] md:grid-cols-3">
        <div>
          <span className="text-mocha-overlay1">STARTED AT:</span>
          <p className="text-mocha-subtext1 mt-0.5">
            {startedAt.toLocaleTimeString()}
          </p>
        </div>

        <div>
          <span className="text-mocha-overlay1">ENDED AT:</span>
          <p className="text-mocha-subtext1 mt-0.5">
            {endedAt!.toLocaleTimeString()}
          </p>
        </div>

        <div>
          <span className="text-mocha-overlay1">DURATION </span>
          <p className="text-mocha-subtext1 mt-0.5">
            {durationFormat(
              endedAt!.getTime(),

              startedAt.getTime(),
            )}
          </p>
        </div>
      </div>

      <Link
        href={`/flashcards/${slug}/${id}`}
        className="flex min-h-11 flex-1 items-center justify-center border border-mocha-mauve bg-mocha-mauve px-3 py-2 text-center font-bold uppercase tracking-[0.12em] text-mocha-crust transition-colors hover:bg-mocha-lavender"
      >
        Study Flashcard
      </Link>

      {/* Card Actions */}
    </div>
  );
}
