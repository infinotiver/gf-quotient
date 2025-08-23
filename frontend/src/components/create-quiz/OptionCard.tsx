import { FaHeartBroken, FaCheck } from "react-icons/fa";

export type OptionType = {
  id: string;
  text: string;
  isCorrect: boolean;
};

type OptionCardProps = {
  option: OptionType;
  isCorrect: boolean;
  onTextChange: (newText: string) => void;
  onToggleCorrect: () => void;
  onDelete: () => void;
  disabled?: boolean; // New prop to disable interactions
};

export default function OptionCard({
  option,
  isCorrect,
  onTextChange,
  onToggleCorrect,
  onDelete,
  disabled = false, // Default value for disabled
}: OptionCardProps) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <button
        onClick={disabled ? undefined : onToggleCorrect}
        className={`p-2 rounded-full focus:outline-none ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {isCorrect ? (
          <FaCheck className="text-green-400" />
        ) : (
          <FaHeartBroken className="text-pink-400" />
        )}
      </button>
      <input
        className={`flex-1 p-2 bg-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-400 ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
        value={option.text}
        onChange={(e) => (disabled ? undefined : onTextChange(e.target.value))}
        placeholder="Option text"
        disabled={disabled}
      />
      <button
        onClick={disabled ? undefined : onDelete}
        className={`text-red-400 hover:underline ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        ❌
      </button>
    </div>
  );
}
