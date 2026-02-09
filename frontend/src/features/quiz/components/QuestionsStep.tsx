import React, { useState } from "react";
import QuestionCard from "./QuizCard";
import type { QuestionType } from "./QuizCard";
import type { QuizData } from "../../features/quiz/api";
import { ChevronDown, ChevronUp, Plus } from "lucide-react";
import Button from "../common/Button";
interface QuestionsStepProps {
  questions: QuestionType[];
  setQuizData: React.Dispatch<React.SetStateAction<QuizData>>;
}

export default function QuestionsStep({
  questions,
  setQuizData,
}: QuestionsStepProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
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
    <div className="flex flex-col gap-4 rounded">
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Questions: {questions.length}
        </div>
        <Button
          size="sm"
          onClick={() => {
            addQuestion();
            setExpandedIndex(questions.length);
          }}
        >
          <Plus size={16} />
          Add Question
        </Button>
      </div>
      <div className="flex flex-col gap-3 max-h-[55vh] md:max-h-[65vh] overflow-y-auto pr-1">
        {questions.map((q, idx) => {
          const isOpen = expandedIndex === idx;
          return (
            <div key={idx} className="border border-border rounded-xl">
              <Button
                variant="ghost"
                className="w-full justify-between"
                onClick={() => setExpandedIndex(isOpen ? null : idx)}
              >
                <div className="text-sm text-foreground">
                  Q{idx + 1}: {q.text || "Untitled question"}
                </div>
                {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </Button>
              {isOpen && (
                <div className="p-3 pt-0">
                  <QuestionCard
                    question={q}
                    onChange={(updated) => updateQuestion(idx, updated)}
                    onDelete={() => deleteQuestion(idx)}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
