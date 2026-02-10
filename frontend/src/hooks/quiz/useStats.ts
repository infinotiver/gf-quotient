import { useQuery } from "@tanstack/react-query";
import { getStats } from "@features/quiz/api";

export default function useStats() {
  return useQuery({
    queryKey: ["stats"],
    queryFn: getStats,
    staleTime: 60_000,
    refetchOnWindowFocus: false,
  });
}
