import Button from "@components/common/Button";
import { Heart, HeartCrack } from "lucide-react";
export type OptionType = {
  id: number;
  text: string;
};

interface OptionCardProps {
  option: OptionType;
  correct_option: boolean;
  onTextChange: (newText: string) => void;
  onToggleCorrect: () => void;
  onDelete: () => void;
  disabled?: boolean;
}

export default function OptionCard({
  option,
  correct_option,
  onTextChange,
  onToggleCorrect,
  onDelete,
  disabled = false,
}: OptionCardProps) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <Button
        variant={correct_option ? "primary" : "secondary"}
        onClick={disabled ? undefined : onToggleCorrect}
        className={`px-2 py-1 rounded border border-input ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {correct_option ? <Heart size={16} /> : <HeartCrack size={16} />}
      </Button>
      <input
        className={`flex-1 p-2 bg-background rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
        value={option.text}
        onChange={(e) => (disabled ? undefined : onTextChange(e.target.value))}
        placeholder="Option text"
        disabled={disabled}
      />
      <Button
        onClick={disabled ? undefined : onDelete}
        className={`text-destructive hover:opacity-80 ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        Remove
      </Button>
    </div>
  );
}
