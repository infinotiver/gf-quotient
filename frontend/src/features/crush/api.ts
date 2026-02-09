import apiClient from "@api/apiClient";
import type { CrushCreate, CrushPublic } from "./types";

export async function createCrushPage(data: CrushCreate): Promise<{ status: string; page_id: string }> {
  const response = await apiClient.post("/crush", data);
  return response.data;
}

export async function getCrushPage(pageId: string): Promise<{ status: string; page: CrushPublic }> {
  const response = await apiClient.get(`/crush/${pageId}`);
  return response.data;
}
