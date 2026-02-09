import OptionCard from "./OptionCard"; // Import the OptionCard component
import type { OptionType } from "./OptionCard";
import { Plus, Trash2 } from "lucide-react";
import Button from "../../../components/common/Button";
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
      (opt) => opt.id !== optionId,
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
    <div className="flex flex-col gap-3 p-3 bg-card rounded-2xl">
      <input
        type="text"
        value={question.text}
        onChange={(e) => onChange({ ...question, text: e.target.value })}
        placeholder="Question text"
        className="w-full p-2 bg-background rounded-xl border border-input focus:ring-2 focus:ring-ring"
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
                opt.id === option.id ? { ...opt, text: newText } : opt,
              ),
            })
          }
          onToggleCorrect={() =>
            onChange({ ...question, correct_option: option.id })
          }
          onDelete={() => deleteOption(option.id)}
        />
      ))}

      <div className="flex gap-2">
        <Button onClick={addOption} variant="secondary">
          <Plus size={14} />
          Add Option
        </Button>
        <Button onClick={onDelete} variant="secondary">
          <Trash2 size={14} />
          Delete
        </Button>
      </div>
    </div>
  );
}
