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
    <div className="mt-6 flex gap-3 border-t border-mocha-surface1 pt-5">
      <form action={dispatchAction} className="flex-1 flex">
        <input name="deckId" value={deckId} type="hidden"></input>

        <button
          type="submit"
          disabled={isPending}
          className="min-h-11 w-full cursor-pointer border border-mocha-mauve bg-mocha-mauve px-4 py-2 text-center font-mono text-[10px] font-black uppercase tracking-[0.14em] text-mocha-crust transition-colors hover:bg-mocha-lavender disabled:opacity-50"
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
        }flex min-h-11 flex-1 items-center justify-center border border-destructive/50 px-4 py-2 text-center font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-destructive transition-colors hover:bg-destructive hover:text-muted`}
      >
        Abandon
      </Link>
    </div>
  );
}
