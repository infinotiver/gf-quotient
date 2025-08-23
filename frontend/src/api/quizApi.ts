import axios from "axios";

const API_BASE_URL = "https://your-backend-api.com"; // Replace with actual backend URL

// Create a new quiz
export async function createQuiz(quizData: {
  title: string;
  options: OptionType[];
}) {
  try {
    const response = await axios.post(`${API_BASE_URL}/quizzes`, quizData);
    return response.data;
  } catch (error) {
    console.error("Error creating quiz:", error);
    throw error;
  }
}

// Attempt a quiz
export async function attemptQuiz(
  quizId: string,
  answers: { optionId: string; isSelected: boolean }[]
) {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/quizzes/${quizId}/attempt`,
      { answers }
    );
    return response.data;
  } catch (error) {
    console.error("Error attempting quiz:", error);
    throw error;
  }
}
