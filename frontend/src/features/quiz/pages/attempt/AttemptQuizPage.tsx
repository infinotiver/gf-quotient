import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import apiClient from "@api/apiClient";
import type { OptionType } from "../../components/OptionCard";
import Button from "@components/common/Button";
import Skeleton from "@components/common/Skeleton";
import Card from "@components/common/Card";
import TopNav from "@components/common/TopNav";
import useQuiz from "@hooks/quiz/useQuiz";

type Question = {
  id: number;
  text: string;
  options: OptionType[];
};
export default function AttemptQuiz() {
  const { quizId } = useParams();
  const navigate = useNavigate();

  // Fetch quiz data
  const { data: quiz, isLoading } = useQuiz(quizId);

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<
    { question_id: number; selected_option: number }[]
  >([]);
  // Submit mutation
  // Instead of sending { answers: [...] }, send one request per answer OR bulk submit properly
  const mutation = useMutation({
    mutationFn: async (payload: { responses: { question_id: number; selected_option: number }[] }) => {
      const response = await apiClient.post(`/quiz/${quizId}/submit`, payload);
      return response.data;
    },
    onSuccess: (res) => {
      navigate(`/attempt/${quizId}/results`, { state: res });
    },
    onError: (error) => {
      alert("Failed to submit responses. Please try again.");
      console.error(error);
    },
  });

  if (isLoading)
    return (
      <div className="flex flex-col min-h-screen bg-background text-foreground outer-pad">
        <TopNav
          links={[
            { label: "Home", to: "/", variant: "ghost" },
            { label: "Create quiz", to: "/create-quiz", variant: "secondary" },
          ]}
        />
        <div className="flex flex-1 items-center justify-center">
          <Skeleton width="lg" lines={5} />
        </div>
      </div>
    );
  if (!quiz) return <p>Quiz not found.</p>;
  const questions: Question[] = quiz.quiz.questions;
  const currentQ = questions[step];

  const handleSelect = (optionId: number) => {
    setAnswers((prev) => {
      const existing = prev.find((a) => a.question_id === currentQ.id);
      if (existing) {
        return prev.map((a) =>
          a.question_id === currentQ.id
            ? { ...a, selected_option: optionId }
            : a
        );
      }
      return [...prev, { question_id: currentQ.id, selected_option: optionId }];
    });
  };
  const handleSubmit = (
    answers: { question_id: number; selected_option: number }[]
  ) => {
    mutation.mutate({ responses: answers });
  };

  const currentAnswer = answers.find((a) => a.question_id === currentQ.id);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground outer-pad">
      <TopNav
        links={[
          { label: "Home", to: "/", variant: "ghost" },
          { label: "Create quiz", to: "/create-quiz", variant: "secondary" },
        ]}
      />
      <div className="flex flex-1 items-center justify-center">
      <Card className="w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Question {step + 1} of {questions.length}
        </h2>
        <p className="text-lg mb-6 text-center">{currentQ.text}</p>

        <div className="flex flex-col gap-4">
          {currentQ.options.map((opt) => {
            const selected = currentAnswer?.selected_option === opt.id;
            return (
              <Button
                key={opt.id}
                onClick={() => handleSelect(opt.id)}
                variant={selected ? "primary" : "secondary"}
                className="w-full border border-border"
              >
                {opt.text}
              </Button>
            );
          })}
        </div>

        <div className="flex gap-4 mt-8 justify-center">
          {step > 0 && (
            <Button variant="secondary" onClick={() => setStep((s) => s - 1)}>
              Back
            </Button>
          )}
          {step < questions.length - 1 && (
            <Button onClick={() => setStep((s) => s + 1)} disabled={!currentAnswer}>
              Next
            </Button>
          )}
          {step === questions.length - 1 && (
            <Button
              onClick={() => handleSubmit(answers)}
              disabled={answers.length < questions.length}
            >
              Submit
            </Button>
          )}
        </div>
      </Card>
      </div>
    </div>
  );
}
