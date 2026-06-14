import endSession from "@/actions/run/endSession";
import { useRouter, useSearchParams } from "next/navigation";

export default function Modal({ onToggle }: { onToggle: () => void }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const sessionId = searchParams.get("sessionId");

  const useEndSession = async () => {
    if (sessionId) {
      await endSession(sessionId);
    }

    onToggle();
    router.push("/decks");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="border w-[90%] sm:w-[50%] max-w-md border-zinc-800 bg-zinc-950/90 p-5 rounded font-mono text-xs flex flex-col justify-between space-y-6 hover:border-zinc-700 transition-colors shadow-2xl">
        <header className="border-b border-zinc-800 pb-3 text-[12px] text-zinc-500 uppercase tracking-wider">
          System Warning
        </header>

        <div className="text-zinc-300 text-sm leading-relaxed">
          Are you sure you want to abandon this run?
          <br />
          <span className="text-red-400/80 mt-2 block">
            All unsaved progress and active streaks will be lost.
          </span>
        </div>
        <div className="flex items-center justify-end space-x-4 pt-2">
          <button
            onClick={onToggle}
            className="px-4 py-2 text-zinc-400 hover:text-zinc-100 transition-colors uppercase tracking-widest"
          >
            Cancel
          </button>
          <button
            onClick={useEndSession}
            className="px-4 py-2 bg-red-900/20 text-red-400 border border-red-900/50 hover:bg-red-900/40 hover:border-red-800 rounded transition-all uppercase tracking-widest"
          >
            Abandon Run
          </button>
        </div>
      </div>
    </div>
  );
}
