import apiClient from "./apiClient";
import type { QuestionType } from "../components/create-quiz/QuizCard";
import type { OptionType } from "../components/create-quiz/OptionCard";
export type QuizData = {
  title: string;
  description: string;
  questions: QuestionType[]; // replace `any` with your real Question type
};

export type GetQuestionType = {
  text: string;
  options: OptionType[];
  id: number;
  correct_option?: number | null;
};

export type GetQuizData = {
  title: string;
  description: string;
  questions: GetQuestionType[];
};

export type QuizResult = {
  status: string;
  quiz: GetQuizData & {
    responses?: { question_id: number; selected_option: number }[];
    score?: number;
  };
  message?: string;
};

export type StatsResponse = {
  status: string;
  total_quizzes: number;
  message?: string;
};
export type CreateQuizResponse = {
  status: "success" | "error";
  quiz_id: string;
  token: string;
  message?: string;
};

export async function createQuiz(data: QuizData): Promise<CreateQuizResponse> {
  const response = await apiClient.post("/quiz", data);
  return response.data;
}

export async function getQuiz(
  quizId: string
): Promise<{ status: string; quiz: GetQuizData; message?: string; attempted?: boolean }> {
  const response = await apiClient.get(`/quiz/${quizId}`);
  const { status, quiz, message, attempted } = response.data;
  return { status, quiz, message, attempted };
}

export async function getResults(token: string): Promise<QuizResult> {
  const response = await apiClient.get(`/results/${token}`);
  return response.data;
}

export async function deleteQuiz(token: string): Promise<{ status: string; message?: string }> {
  const response = await apiClient.delete(`/results/${token}`);
  return response.data;
}

export async function getStats(): Promise<StatsResponse> {
  const response = await apiClient.get("/stats");
  return response.data;
}
