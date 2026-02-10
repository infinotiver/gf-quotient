import { useMutation } from "@tanstack/react-query";
import { createCrushPage } from "@features/crush/api";
import type { CrushCreate } from "@features/crush/types";

export default function useCreateCrushPage(
  data: CrushCreate,
  onSuccess?: (result: { page_id: string }) => void,
) {
  return useMutation({
    mutationFn: async () => createCrushPage(data),
    onSuccess,
  });
}
