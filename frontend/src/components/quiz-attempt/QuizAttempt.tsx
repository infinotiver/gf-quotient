import { useState } from "react";
import { attemptQuiz } from "../../api/quizApi";
import OptionCard, { OptionType } from "../create-quiz/OptionCard";

type QuizAttemptProps = {
  quizId: string;
  options: OptionType[];
};

export default function QuizAttempt({ quizId, options }: QuizAttemptProps) {
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: string]: boolean;
  }>({});

  const handleOptionToggle = (optionId: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [optionId]: !prev[optionId],
    }));
  };

  const handleSubmit = async () => {
    const answers = Object.entries(selectedOptions).map(
      ([optionId, isSelected]) => ({
        optionId,
        isSelected,
      })
    );
    try {
      const result = await attemptQuiz(quizId, answers);
      console.log("Quiz result:", result);
    } catch (error) {
      console.error("Error submitting quiz attempt:", error);
    }
  };

  return (
    <div>
      {options.map((option) => (
        <OptionCard
          key={option.text}
          option={option}
          isCorrect={false} // Correctness is irrelevant during attempt
          onTextChange={() => {}}
          onToggleCorrect={() => handleOptionToggle(option.text)}
          onDelete={() => {}}
          disabled={true} // Disable editing
        />
      ))}
      <button
        onClick={handleSubmit}
        className="mt-4 p-2 bg-blue-500 text-white rounded-lg"
      >
        Submit Quiz
      </button>
    </div>
  );
}
