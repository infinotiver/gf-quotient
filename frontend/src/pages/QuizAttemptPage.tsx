import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import QuizAttempt from "../components/quiz-attempt/QuizAttempt";
import type { OptionType } from "../components/create-quiz/OptionCard";
type QuizData = {
  id: string;
  title: string;
  options: OptionType[];
};

export default function QuizAttemptPage() {
  const { quizId } = useParams();
  const [quizData, setQuizData] = useState<QuizData | null>(null);

  useEffect(() => {
    // Fetch quiz data from backend
    async function fetchQuiz() {
      try {
        const response = await fetch(`https://your-backend-api.com/quizzes/${quizId}`);
        const data = await response.json();
        setQuizData(data);
      } catch (error) {
        console.error("Error fetching quiz:", error);
      }
    }
    fetchQuiz();
  }, [quizId]);

  if (!quizData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">{quizData.title}</h1>
      <QuizAttempt quizId={quizData.id} options={quizData.options} />
    </div>
  );
}
