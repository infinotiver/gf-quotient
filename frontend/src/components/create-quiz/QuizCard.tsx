
import OptionCard from "./OptionCard"; // Import the OptionCard component
import type { OptionType } from "./OptionCard";

export interface QuestionType {
  text: string;
  options: OptionType[];
  correct_option: number | null; // Store the ID of the correct option
}

interface QuizCardProps {
  question: QuestionType;
  onChange: (updatedQuestion: QuestionType) => void;
  onDelete: () => void;
}

export default function QuizCard({
  question,
  onChange,
  onDelete,
}: QuizCardProps) {
  const addOption = () => {
    const nextOptionId =
      question.options.length > 0
        ? question.options.reduce((maxId, opt) => Math.max(maxId, opt.id), 0) +
          1
        : 1;
    const newOption: OptionType = { id: nextOptionId, text: "" };
    onChange({ ...question, options: [...question.options, newOption] });
  };

  const deleteOption = (optionId: number) => {
    const updatedOptions = question.options.filter(
      (opt) => opt.id !== optionId
    );
    const updatedCorrectOption =
      question.correct_option === optionId ? null : question.correct_option;
    onChange({
      ...question,
      options: updatedOptions,
      correct_option: updatedCorrectOption,
    });
  };

  return (
    <div className="flex flex-col gap-4 p-4 bg-gray-800 rounded">
      <input
        type="text"
        value={question.text}
        onChange={(e) => onChange({ ...question, text: e.target.value })}
        placeholder="Enter question text"
        className="w-full p-2 bg-gray-700 rounded"
      />

      {question.options.map((option) => (
        <OptionCard
          key={option.id}
          option={option}
          correct_option={question.correct_option === option.id}
          onTextChange={(newText) =>
            onChange({
              ...question,
              options: question.options.map((opt) =>
                opt.id === option.id ? { ...opt, text: newText } : opt
              ),
            })
          }
          onToggleCorrect={() =>
            onChange({ ...question, correct_option: option.id })
          }
          onDelete={() => deleteOption(option.id)}
        />
      ))}

      <button
        onClick={addOption}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Add Option
      </button>
      <button
        onClick={onDelete}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
      >
        Delete Question
      </button>
    </div>
  );
}
