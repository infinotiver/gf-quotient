import { useQuery } from "@tanstack/react-query";
import { getCrushPage } from "@features/crush/api";

export default function useCrushPage(pageId?: string) {
  return useQuery({
    queryKey: ["crush", pageId],
    queryFn: async () => {
      if (!pageId) throw new Error("Page ID required");
      return await getCrushPage(pageId);
    },
    enabled: Boolean(pageId),
    staleTime: 60_000,
    refetchOnWindowFocus: false,
  });
}
