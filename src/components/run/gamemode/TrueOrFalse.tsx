import { useGameEngineStore } from "@/store/useGameEngineStore";

type TrueOrFalseType = {
  answer: string;
};

const TrueOrFalse = ({ answer }: TrueOrFalseType) => {
  const selectedAnswer = useGameEngineStore((state) => state.selectedAnswer);
  const setSelectedAnswer = useGameEngineStore(
    (state) => state.setSelectedAnswer,
  );
  const hasAnswered = useGameEngineStore((state) => state.hasAnswered);

  return (
    <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2">
      {["True", "False"].map((option, i) => {
        const isSelected = selectedAnswer === option;
        const isCorrectChoice = option === answer;
        let optionStyle =
          "border-mocha-surface1 bg-mocha-base text-mocha-subtext1 hover:border-mocha-blue hover:bg-mocha-blue/5";

        if (hasAnswered) {
          if (isCorrectChoice) {
            optionStyle = "border-mocha-green bg-mocha-green/10 text-mocha-green";
          } else if (isSelected && !isCorrectChoice) {
            optionStyle = "border-mocha-red bg-mocha-red/10 text-mocha-red";
          } else {
            optionStyle =
              "border-mocha-surface2 bg-mocha-base/20 text-mocha-overlay0 opacity-50";
          }
        } else if (isSelected) {
          optionStyle = "border-mocha-blue bg-mocha-blue/10 text-mocha-blue";
        }
        return (
          <button
            onClick={() => setSelectedAnswer(option)}
            key={i}
            disabled={hasAnswered}
            className={`min-h-16 w-full border p-4 text-left font-mono text-sm font-bold tracking-[0.12em] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mocha-blue ${optionStyle}`}
          >
            {option.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
};

export default TrueOrFalse;
