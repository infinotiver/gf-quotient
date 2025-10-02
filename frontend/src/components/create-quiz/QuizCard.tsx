
import OptionCard from "./OptionCard";
import type { OptionType } from "./OptionCard";

export type QuestionType = {
  text: string;
  options: OptionType[];
};

type Props = {
  question: QuestionType;
  onChange: (updated: QuestionType) => void;
  onDelete: () => void;
};

export default function QuestionCard({ question, onChange, onDelete }: Props) {
  const addOption = () => {
    onChange({
      ...question,
      options: [
        ...question.options,
        { id: (question.options.length + 1).toString(), text: "", isCorrect: false },
      ],
    });
  };

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg mb-4 w-full shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-xl text-pink-400">Question</h3>
        <button onClick={onDelete} className="text-red-500 hover:underline">
          Remove
        </button>
      </div>

      <textarea
        className="w-full p-3 bg-gray-800 rounded-lg mb-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-400"
        value={question.text}
        onChange={(e) => onChange({ ...question, text: e.target.value })}
        placeholder="Enter your question here"
      />

      {question.options.map((option, index) => (
        <OptionCard
          key={index}
          option={option}
          isCorrect={option.isCorrect}
          onTextChange={(newText) =>
            onChange({
              ...question,
              options: question.options.map((opt, i) =>
                i === index ? { ...opt, text: newText } : opt
              ),
            })
          }
          onToggleCorrect={() =>
            onChange({
              ...question,
              options: question.options.map((opt, i) => ({
                ...opt,
                isCorrect: i === index,
              })),
            })
          }
          onDelete={() =>
            onChange({
              ...question,
              options: question.options.filter((_, i) => i !== index),
            })
          }
        />
      ))}

      <button
        onClick={addOption}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-3"
      >
        Add Option
      </button>
    </div>
  );
}
