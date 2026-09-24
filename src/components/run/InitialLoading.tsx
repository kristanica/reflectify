import React, { useEffect, useMemo, useState } from "react";
import { Spinner } from "../ui/spinner";

const InitialLoading = ({ isFillingQueue }: { isFillingQueue: boolean }) => {
  const LOADING_QUOTES = useMemo(
    () => [
      "Polishing the mirrors of memory...",
      "Reflecting past concepts into active focus...",
      "Measuring the decay of your knowledge...",
      "Reconstructing faded synapses...",
      "Forging mastery through reflection...",
      "Extracting atomic facts from the void...",
      "Bending the forgetting curve...",
      "Calculating the optimal moment of review...",
      "Gathering fragments of forgotten lore...",
      "Preparing cognitive reflections...",
      "Analyzing spaced repetition intervals...",
      "The Ebbinghaus curve waits for no one...",
    ],
    [],
  );
  const [quote, setQuote] = useState<string>(LOADING_QUOTES[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      const random = Math.floor(Math.random() * LOADING_QUOTES.length);
      setQuote(LOADING_QUOTES[random]);
    }, 1000);

    return () => clearInterval(interval);
  }, [LOADING_QUOTES]);

  return (
    <div className="w-full max-w-lg border border-mocha-surface1 bg-mocha-base/70 p-6 text-center font-mono sm:p-8">
      <div className="mx-auto flex size-14 items-center justify-center border border-mocha-yellow/30 bg-mocha-yellow/10">
        <Spinner className="size-6 text-mocha-yellow" />
      </div>
      <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.22em] text-mocha-yellow">
        {isFillingQueue ? "Refilling question queue" : "Initializing run"}
      </p>
      <p className="mt-3 text-xs leading-6 text-mocha-overlay2" aria-live="polite">
        {isFillingQueue ? "Generating the next encounter batch..." : quote}
      </p>
    </div>
  );
};

export default InitialLoading;
