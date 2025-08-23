import React from "react";
import QuestionCard from "./QuizCard";
import type { QuestionType } from "./QuizCard";

type QuestionsStepProps = {
  questions: QuestionType[];
  setQuizData: React.Dispatch<React.SetStateAction<any>>;
};

export default function QuestionsStep({
  questions,
  setQuizData,
}: QuestionsStepProps) {
  const updateQuestion = (index: number, updatedQuestion: QuestionType) => {
    const newQuestions = questions.map((q, i) =>
      i === index ? updatedQuestion : q
    );
    setQuizData((prev: any) => ({ ...prev, questions: newQuestions }));
  };

  const addQuestion = () => {
    const newQuestions = [
      ...questions,
      { text: "", options: [{ text: "", isCorrect: false }] },
    ];
    setQuizData((prev: any) => ({ ...prev, questions: newQuestions }));
  };

  const deleteQuestion = (index: number) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuizData((prev: any) => ({ ...prev, questions: newQuestions }));
  };

  return (
    <div className="flex flex-col gap-6">
      {questions.map((q, idx) => (
        <QuestionCard
          key={idx}
          question={q}
          onChange={(updated) => updateQuestion(idx, updated)}
          onDelete={() => deleteQuestion(idx)}
        />
      ))}
      <button
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        onClick={addQuestion}
      >
        Add New Question
      </button>
    </div>
  );
}
