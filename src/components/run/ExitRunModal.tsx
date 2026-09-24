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
      <div className="flex w-[90%] max-w-md flex-col justify-between space-y-6 border border-mocha-surface1 bg-mocha-mantle/95 p-5 font-mono text-xs shadow-2xl transition-colors hover:border-mocha-surface2 sm:w-[50%]">
        <header className="border-b border-mocha-surface1 pb-3 text-[12px] text-mocha-overlay1 uppercase tracking-wider">
          System Warning
        </header>

        <div className="text-mocha-subtext1 text-sm leading-relaxed">
          Are you sure you want to abandon this run?
          <br />
          <span className="text-mocha-red/80 mt-2 block">
            All unsaved progress and active streaks will be lost.
          </span>
        </div>
        <div className="flex items-center justify-end space-x-4 pt-2">
          <button
            onClick={onToggle}
            className="px-4 py-2 text-mocha-overlay2 hover:text-mocha-text transition-colors uppercase tracking-widest"
          >
            Cancel
          </button>
          <button
            onClick={useEndSession}
            className="min-h-11 border border-mocha-red/30 bg-mocha-red/10 px-4 py-2 uppercase tracking-widest text-mocha-red transition-colors hover:border-mocha-red/60 hover:bg-mocha-red/20"
          >
            Abandon Run
          </button>
        </div>
      </div>
    </div>
  );
}
