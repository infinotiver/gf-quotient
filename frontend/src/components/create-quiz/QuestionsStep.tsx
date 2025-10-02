import React from "react";
import QuestionCard from "./QuizCard";
import type { QuestionType } from "./QuizCard";
import type { QuizData } from "../../api/quiz";

interface QuestionsStepProps {
  questions: QuestionType[];
  setQuizData: React.Dispatch<React.SetStateAction<QuizData>>;
}

export default function QuestionsStep({
  questions,
  setQuizData,
}: QuestionsStepProps) {
  const updateQuestion = (index: number, updatedQuestion: QuestionType) => {
    // Ensure correct_option is set at the question level
    const correctOption = updatedQuestion.options.find(
      (opt) => opt.id === updatedQuestion.correct_option
    );
    if (!correctOption) {
      updatedQuestion.correct_option = null; // Reset if no valid correct option
    }
    setQuizData((prev: QuizData) => ({
      ...prev,
      questions: prev.questions.map((q, i) =>
        i === index ? updatedQuestion : q
      ),
    }));
  };

  let nextOptionId =
    questions
      .flatMap((q) => q.options.map((o) => o.id))
      .reduce((maxId, id) => Math.max(maxId, id), 0) + 1;

  const addQuestion = () => {
    const newQuestions = [
      ...questions,
      {
        text: "",
        options: [{ id: nextOptionId++, text: "" }],
        correct_option: null, // Initialize correct_option as null
      },
    ];
    setQuizData((prev: QuizData) => ({ ...prev, questions: newQuestions }));
  };

  const deleteQuestion = (index: number) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuizData((prev: QuizData) => ({ ...prev, questions: newQuestions }));
  };

  return (
    <div className="flex flex-col gap-6 rounded">
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
