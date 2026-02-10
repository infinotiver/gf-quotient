import { useMutation } from "@tanstack/react-query";
import { deleteQuiz } from "@features/quiz/api";

export default function useDeleteQuiz(token?: string, onSuccess?: () => void) {
  return useMutation({
    mutationFn: async () => {
      if (!token) throw new Error("Token is required");
      return deleteQuiz(token);
    },
    onSuccess,
  });
}
