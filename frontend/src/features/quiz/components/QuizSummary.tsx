import type { QuizData } from "../api";
import Button from "@components/common/Button";

interface QuizSummaryProps {
  data: QuizData;
  onSubmit: () => void;
  isSubmitting?: boolean;
}

export default function QuizSummaryStep({
  data,
  onSubmit,
  isSubmitting = false,
}: QuizSummaryProps) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-3xl font-display font-bold">Quiz Summary</h2>
      <div className="bg-muted p-4 rounded">
        <div className="text-md text-muted-foreground">Title</div>
        <div className="text-xl font-semibold">{data.title || "Untitled"}</div>
        <div className="text-md text-muted-foreground mt-3">Description</div>
        <div className="text-md text-foreground">
          {data.description || "No description"}
        </div>
        <div className="text-md text-muted-foreground mt-3">Questions</div>
        <div className="text-md text-foreground">{data.questions.length}</div>
      </div>
      <Button onClick={onSubmit} disabled={isSubmitting}>
        {isSubmitting ? "Creating..." : "Create Quiz"}
      </Button>
    </div>
  );
}
