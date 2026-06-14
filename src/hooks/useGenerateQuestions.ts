import generateQuestions from "@/actions/run/generateQuestions";
import getConcepts from "@/actions/run/getConcepts";
import { useMutation } from "@tanstack/react-query";
import React from "react";
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
    mutationFn: async (currentIds: string[]) => {
      const tasks = await getConcepts({
        userId: userId,
        deckId: deckId,
        questionQueues: currentIds,
      });

      if (!tasks || tasks.length === 0) return;

      const generatedConcepts = await generateQuestions(tasks);
      console.log(generatedConcepts);
      return generatedConcepts;
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
