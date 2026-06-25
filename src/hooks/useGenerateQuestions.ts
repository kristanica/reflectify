import generateQuestions from "@/actions/run/generateQuestions";
import getConcepts from "@/actions/run/getConcepts";
import { MOCK_QUESTIONS } from "@/lib/constants";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

type UseGenerateQuestionsType = {
  userId: string;
  deckId: string;

  onGeneratedQuestsion: (newQuestions: GeneratedQuestion[]) => void;
};

const useGenerateQuestions = ({
  userId,
  deckId,
  onGeneratedQuestsion,
}: UseGenerateQuestionsType) => {
  return useMutation({
    mutationFn: async ({
      currentIds,
      depth,
    }: {
      currentIds: string[];
      depth: number;
    }) => {
      // const tasks = await getConcepts({
      //   userId: userId,
      //   deckId: deckId,
      //   questionQueues: currentIds,
      //   depth,
      // });

      // if (!tasks || tasks.length === 0) return;

      // const generatedConcepts = await generateQuestions(tasks);
      return MOCK_QUESTIONS;
    },
    onSettled: () => {},
    onSuccess: (data) => {
      if (data && data.length > 0) {
        onGeneratedQuestsion(data);
      }
    },

    onError: () => {
      toast.error("Something went wrong with fetching question");
    },
  });
};

export default useGenerateQuestions;
