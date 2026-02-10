
import { useParams } from "react-router-dom";
import Card from "@components/common/Card";
import Skeleton from "@components/common/Skeleton";
import Button from "@components/common/Button";
import { useMemo } from "react";
import { getVerdict, pickRandom, resultsMessages } from "../utils/messages";
import LoveScale from "@components/common/LoveScale";
import TopNav from "@components/common/TopNav";
import { removeQuizFromStorage } from "@utils/storage";
import useResults from "@hooks/quiz/useResults";
import useDeleteQuiz from "@hooks/quiz/useDeleteQuiz";

export default function ResultPage() {
  const { token } = useParams();

  const { data, isLoading, error } = useResults(token);
  const deleteMutation = useDeleteQuiz(token, () => {
    if (token) {
      removeQuizFromStorage(token);
    }
    window.location.href = "/";
  });

  const blurb = useMemo(() => pickRandom(resultsMessages), []);

  if (isLoading)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground outer-pad">
        <Skeleton width="lg" lines={6} />
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
    <div className="flex flex-col min-h-screen bg-background text-foreground outer-pad">
      <TopNav
        links={[
          { label: "Home", to: "/", variant: "ghost" },
          { label: "Create quiz", to: "/create-quiz", variant: "secondary" },
        ]}
      />
      <div className="flex flex-1 items-center justify-center">
      <Card className="w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-center mb-2">{quiz.title}</h1>
        <p className="text-muted-foreground text-center mb-2">{quiz.description}</p>
        {responses.length > 0 ? (
          <>
            <h2 className="text-center text-xl font-display font-bold mb-1">
              LoveMeter verdict: <span className="text-primary">{verdict}</span>
            </h2>
            <p className="text-center text-sm text-muted-foreground mb-4">
              {blurb}
            </p>
            <div className="text-center mb-8">
              <LoveScale score={score} total={total} label="Love scale" />
            </div>
          </>
        ) : (
          <div className="mt-6 mb-8 text-center">
            <div className="text-sm text-muted-foreground mb-2">
              No attempts yet. Share this link:
            </div>
            <code className="block border border-border px-4 py-2 rounded-lg text-center break-all">
              {quiz.quiz_id
                ? `${window.location.origin}/attempt/${quiz.quiz_id}`
                : "Attempt link unavailable"}
            </code>
            <div className="mt-3 text-xs text-muted-foreground">
              Results link (keep private):{" "}
              {token ? `${window.location.origin}/results/${token}` : "Unavailable"}
            </div>
          </div>
        )}

        <div className="flex flex-col gap-4">
          {responses.length > 0 &&
            quiz.questions.map((q) => {
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
    </div>
  );
}
