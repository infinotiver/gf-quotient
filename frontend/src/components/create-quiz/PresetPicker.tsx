import Button from "../common/Button";

const presets = [
  { key: "normal", label: "normal" },
  { key: "cute", label: "cute" },
  { key: "spicy", label: "spicy" },
  { key: "playful", label: "playful" },
  { key: "deep", label: "deep" },
] as const;

export type PresetKey = (typeof presets)[number]["key"];

type PresetPickerProps = {
  open: boolean;
  hasQuestions: boolean;
  presetMode: "add" | "replace";
  onClose: () => void;
  onModeChange: (mode: "add" | "replace") => void;
  onPick: (key: PresetKey) => void;
};

export default function PresetPicker({
  open,
  hasQuestions,
  presetMode,
  onClose,
  onModeChange,
  onPick,
}: PresetPickerProps) {
  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div className="fixed right-6 top-28 z-50 bg-card border border-border rounded-2xl p-3 shadow-sm w-72">
        <div className="text-sm text-muted-foreground mb-2">
          Load preset questions
        </div>
        {hasQuestions && (
          <>
            <div className="text-xs text-muted-foreground mb-2">
              Replace current questions or add to them?
            </div>
            <div className="flex gap-2 mb-3">
              <Button
                size="sm"
                variant={presetMode === "replace" ? "primary" : "secondary"}
                onClick={() => onModeChange("replace")}
              >
                Replace
              </Button>
              <Button
                size="sm"
                variant={presetMode === "add" ? "primary" : "secondary"}
                onClick={() => onModeChange("add")}
              >
                Add
              </Button>
            </div>
          </>
        )}
        <div className="flex flex-col gap-2">
          {presets.map((cat) => (
            <Button
              key={cat.key}
              size="sm"
              variant="secondary"
              className="w-full"
              onClick={() => onPick(cat.key)}
            >
              <span className="capitalize">{cat.label}</span>
            </Button>
          ))}
        </div>
        <div className="mt-2 text-xs text-muted-foreground">
          Max questions: 14
        </div>
      </div>
    </>
  );
}
