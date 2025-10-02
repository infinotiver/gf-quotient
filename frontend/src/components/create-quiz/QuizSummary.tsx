import type { QuizData } from "../../api/quiz";

interface QuizSummaryProps {
  data: QuizData;
  onSubmit: () => void;
}

export default function QuizSummaryStep({ data, onSubmit }: QuizSummaryProps) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold">Summary</h2>
      <pre className="bg-gray-800 p-2 rounded text-sm">
        {JSON.stringify(data, null, 2)}
      </pre>
      <button
        onClick={onSubmit}
        className="px-4 py-2 bg-green-500 text-white rounded"
      >
        Submit Quiz
      </button>
    </div>
  );
}
