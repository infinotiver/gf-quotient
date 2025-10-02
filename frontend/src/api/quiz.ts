import apiClient from "./apiClient";
import type { AxiosResponse } from "axios";
import type { QuestionType } from "../components/create-quiz/QuizCard";

export type QuizData = {
  title: string;
  description: string;
  intimacy_level: string;
  questions: QuestionType[]; // replace `any` with your real Question type
};

export function createQuiz(data: QuizData): Promise<AxiosResponse> {
  const response = apiClient.post("/quiz", data);
  return response;
}
