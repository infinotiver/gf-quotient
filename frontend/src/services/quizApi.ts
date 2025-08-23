import axios from "axios";

const API_BASE_URL = "http://localhost:8000"; // Change to backend base URL

export const createQuiz = async (quizData: { [key: string]: any }): Promise<{ quiz_id: string; token: string }> => {
  const res = await axios.post(`${API_BASE_URL}/quiz`, quizData);
  return res.data;
};

export const getQuizByToken = async (token: string): Promise<{ [key: string]: any }> => {
  const res = await axios.get(`${API_BASE_URL}/quiz/${token}`);
  return res.data;
};

export const submitQuizResponse = async (
  quizId: string,
  token: string,
  response: { [key: string]: any }
): Promise<{ [key: string]: any }> => {
  const res = await axios.post(
    `${API_BASE_URL}/quiz/${quizId}/submit?token=${token}`,
    response
  );
  return res.data;
};

export const getQuizResults = async (token: string): Promise<{ [key: string]: any }> => {
  const res = await axios.get(`${API_BASE_URL}/results/${token}`);
  return res.data;
};
