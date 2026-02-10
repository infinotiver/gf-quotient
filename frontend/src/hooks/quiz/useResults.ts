import { useQuery } from "@tanstack/react-query";
import { getResults } from "@features/quiz/api";

export default function useResults(token?: string) {
  return useQuery({
    queryKey: ["results", token],
    queryFn: async () => {
      if (!token) throw new Error("Token is required");
      return await getResults(token);
    },
    enabled: Boolean(token),
    staleTime: 60_000,
    refetchOnWindowFocus: false,
  });
}
