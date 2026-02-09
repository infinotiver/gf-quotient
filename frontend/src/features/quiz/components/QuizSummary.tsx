import type { QuizData } from "../api";
import Button from "@components/common/Button";

interface QuizSummaryProps {
  data: QuizData;
  onSubmit: () => void;
}

export default function QuizSummaryStep({ data, onSubmit }: QuizSummaryProps) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-3xl font-display font-bold">Quiz Summary</h2>
      <div className="bg-muted p-4 rounded">
        <div className="text-sm text-muted-foreground">Title</div>
        <div className="text-lg font-semibold">{data.title || "Untitled"}</div>
        <div className="text-sm text-muted-foreground mt-3">Description</div>
        <div className="text-sm text-foreground">
          {data.description || "No description"}
        </div>
        <div className="text-sm text-muted-foreground mt-3">Questions</div>
        <div className="text-sm text-foreground">{data.questions.length}</div>
      </div>
      <Button onClick={onSubmit}>
        Create Quiz
      </Button>
    </div>
  );
}
