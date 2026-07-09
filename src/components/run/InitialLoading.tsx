import React, { useEffect, useMemo, useState } from "react";
import { Spinner } from "../ui/spinner";

const InitialLoading = ({ isFillingQueue }: {isFillingQueue: boolean}) => {
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
    <div className="text-mocha-yellow font-mono text-xs uppercase tracking-[0.3em] animate-pulse text-center px-4">
      <Spinner className="mx-auto my-10 h-10 w-10"></Spinner>
      {isFillingQueue ? <p>Filling queue</p> : <p>{quote}</p> }

    </div>
  );
};

export default InitialLoading;
