"use client";

import startSession from "@/actions/run/startSession";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

export default function StartSessionForm({ deckId }: { deckId: string }) {
  const router = useRouter();

  const [state, dispatchAction, isPending] = useActionState(startSession, {
    sessionId: "",
    success: false,
  });

  useEffect(() => {
    if (state.success) {
      router.push(`/run?sessionId=${state.sessionId}`);
    }
  }, [state, router]);

  return (
    <div className="flex gap-4 pt-6 mt-4 border-t border-zinc-900/50">
      <form action={dispatchAction} className="flex-1 flex">
        <input name="deckId" value={deckId} type="hidden"></input>

        <button
          type="submit"
          disabled={isPending}
          className="w-full cursor-pointer text-center border  border-primary hover:bg-primary hover:text-black text-primary py-1.5 transition-all uppercase font-bold text-[10px] rounded-sm disabled:opacity-50"
        >
          <span className="relative z-10">
            {isPending ? "Connecting..." : "Initiate Run"}
          </span>
        </button>
      </form>
      <Link
        href="/decks"
        className={`${
          isPending ? "pointer-events-none cursor-not-allowed bg-gray-600 " : ""
        }flex-1 flex items-center justify-center text-center border border-destructive/50 text-destructive  hover:bg-destructive hover:text-muted py-1.5 transition-all uppercase font-bold text-[10px] rounded-sm`}
      >
        Abandon
      </Link>
    </div>
  );
}
