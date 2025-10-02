import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import QuizTitle from "../components/create-quiz/QuizTitle";
import IntimacySlider from "../components/create-quiz/intimacySlider";
import QuestionsStep from "../components/create-quiz/QuestionsStep";
import QuizSummaryStep from "../components/create-quiz/QuizSummary";
import type { QuestionType } from "../components/create-quiz/QuizCard";
import { useNavigate } from "react-router-dom";
import { createQuiz } from "../api/quiz";

const intimacyLevels = [
  { label: "<2 months", value: "<2 months" },
  { label: "6 months", value: "6m" },
  { label: "1 year", value: "1y" },
  { label: "2 years", value: "2y" },
  { label: "2+ years", value: "2y+" },
];

export default function CreateQuizPage() {
  const [step, setStep] = useState(0);
  interface QuizData {
    title: string;
    description: string;
    intimacy_level: string;
    questions: QuestionType[];
  }

  const [quizData, setQuizData] = useState<QuizData>({
    title: "",
    description: "",
    intimacy_level: intimacyLevels[0].value,
    questions: [],
  });
  const [quizId, setQuizId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: async (data: typeof quizData) => {
      const response = await createQuiz(data);
      return response;
    },
    onSuccess: (data) => {
      setQuizId(data.data.quiz_id);
      setToken(data.data.token);
      // navigate to share page and pass quizId + token
      navigate(`/quiz/share/${quizId}`, { state: { token: token } });
    },
    onError: (error) => {
      alert(error);
    },
  });

  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => Math.max(0, s - 1));

  const handleSubmit = () => {
    const formattedQuizData = {
      ...quizData,
      questions: quizData.questions.map((q) => ({
        text: q.text,
        options: q.options.map(({ id, text }) => ({ id, text })), // Remove nested correct_option
        correct_option: q.correct_option, // Send correct_option at question level
      })),
    };
    mutation.mutate(formattedQuizData);
  };

  return (
    <div className="flex flex-col justify-center items-center w-full min-h-screen bg-gray-900 text-white gap-4 p-4">
      <h1 className="text-2xl font-bold mb-4">Create Quiz</h1>

      {step === 0 && (
        <QuizTitle
          onTitleChange={(value: string) =>
            setQuizData((prev) => ({ ...prev, title: value }))
          }
          onDescriptionChange={(value: string) =>
            setQuizData((prev) => ({ ...prev, description: value }))
          }
        />
      )}

      {step === 1 && (
        <IntimacySlider
          onChange={
            (val) => setQuizData((p) => ({ ...p, intimacy_level: val })) // Use normalized value
          }
        />
      )}

      {step === 2 && (
        <QuestionsStep
          questions={quizData.questions}
          setQuizData={setQuizData}
        />
      )}

      {step === 3 && (
        <QuizSummaryStep data={quizData} onSubmit={handleSubmit} />
      )}

      <div className="flex gap-2 mt-6">
        {step > 0 && (
          <button
            onClick={back}
            className="px-4 py-2 bg-gray-500 text-white rounded"
          >
            Back
          </button>
        )}
        {step < 3 && (
          <button
            onClick={next}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}
