"use client";

import { deleteFlashCardSet } from "@/actions/deleteFlashCardSet";
import { DeleteAction } from "./DeleteAction";
import Link from "next/link";
import { durationFormat } from "@/lib/utils";
import { KeyboardEvent, useState } from "react";
import { set } from "zod/v3";
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
    <div className="border border-mocha-surface1 bg-mocha-base/40 p-5 rounded font-mono text-xs flex flex-col justify-between space-y-4 hover:border-mocha-surface2 transition-all">
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
            className="w-full"

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
      <div className="grid md:grid-cols-3 gap-2 bg-mocha-mantle/60 p-3 border border-mocha-surface2 rounded text-[10px]">
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
        className="flex-1 text-center border border-mocha-yellow hover:bg-mocha-yellow hover:text-black text-mocha-yellow py-1.5 transition-all uppercase font-bold text-[10px] rounded-sm"
      >
        Study Flashcard
      </Link>

      {/* Card Actions */}
    </div>
  );
}
