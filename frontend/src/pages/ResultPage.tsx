
import { useQuery, useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { deleteQuiz, getResults } from "../api/quiz";
import Card from "../components/common/Card";
import Skeleton from "../components/common/Skeleton";
import Button from "../components/common/Button";
import { useMemo } from "react";
import { getVerdict, pickRandom, resultsMessages } from "../utils/messages";
import LoveScale from "../components/common/LoveScale";

export default function ResultPage() {
  const { token } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["results", token],
    queryFn: async () => {
      if (!token) throw new Error("Token is required");
      return await getResults(token);
    },
    staleTime: 60_000,
    refetchOnWindowFocus: false,
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      if (!token) throw new Error("Token is required");
      return deleteQuiz(token);
    },
  });

  const blurb = useMemo(() => pickRandom(resultsMessages), []);

  if (isLoading)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground outer-pad">
        <Card className="w-full max-w-3xl">
          <div className="flex flex-col gap-4">
            <Skeleton className="h-8 w-1/2 mx-auto" />
            <Skeleton className="h-4 w-2/3 mx-auto" />
            <Skeleton className="h-6 w-1/3 mx-auto" />
            <div className="flex flex-col gap-3">
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
            </div>
          </div>
        </Card>
      </div>
    );
  if (error || !data) return <p>Error loading results.</p>;

  const quiz = data.quiz;
  const score = quiz.score ?? 0;
  const total = quiz.questions.length;
  const responses = quiz.responses || [];
  const pct = Math.round((score / (total || 1)) * 100);
  const verdict = getVerdict(pct);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground outer-pad">
      <Card className="w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-center mb-2">{quiz.title}</h1>
        <p className="text-muted-foreground text-center mb-2">{quiz.description}</p>
        <p className="text-center text-base font-bold mb-3">
          LoveMeter verdict: <span className="text-primary">{verdict}</span>
        </p>
        <div className="text-center mb-8">
          <LoveScale score={score} total={total} label="Love scale" />
        </div>

        <div className="flex flex-col gap-4">
          {quiz.questions.map((q) => {
            const userResponse = responses.find((r) => r.question_id === q.id);
            const correctId = q.correct_option ?? null;
            return (
              <div key={q.id} className="p-4 bg-card border border-border rounded-2xl">
                <div className="font-semibold mb-3">
                  Q{q.id}. {q.text}
                </div>
                <div className="flex flex-col gap-2">
                  {q.options.map((opt) => {
                    const isSelected = userResponse?.selected_option === opt.id;
                    const isCorrect = correctId === opt.id;
                    const classes = isCorrect
                      ? "bg-success/15 border-success"
                      : isSelected
                      ? "bg-destructive/15 border-destructive"
                      : "bg-muted border-border";
                    return (
                      <div
                        key={opt.id}
                        className={`w-full border rounded-lg px-3 py-2 text-sm ${classes}`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{opt.text || `Option ${opt.id}`}</span>
                          <span className="text-xs text-muted-foreground">
                            {isCorrect ? "Correct" : isSelected ? "Their choice" : ""}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex justify-center mt-8">
          <Button
            variant="danger"
            onClick={() => {
              if (confirm("Delete this quiz and all its results?")) {
                deleteMutation.mutate();
              }
            }}
          >
            Delete Quiz
          </Button>
        </div>
      </Card>
    </div>
  );
}
