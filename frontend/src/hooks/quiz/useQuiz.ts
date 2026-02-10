import { useQuery } from "@tanstack/react-query";
import { getQuiz } from "@features/quiz/api";

export default function useQuiz(quizId?: string) {
  return useQuery({
    queryKey: ["quiz", quizId],
    queryFn: async () => {
      if (!quizId) throw new Error("Quiz ID is required");
      return await getQuiz(quizId);
    },
    enabled: Boolean(quizId),
    staleTime: 60_000,
    refetchOnWindowFocus: false,
  });
}
