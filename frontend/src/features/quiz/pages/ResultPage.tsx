import { useMemo, useRef } from "react";
import { useParams } from "react-router-dom";
import Button from "@components/common/Button";
import Card from "@components/common/Card";
import LoveScale from "@components/quiz/LoveScale";
import Skeleton from "@components/common/Skeleton";
import TopNav from "@components/common/TopNav";
import { removeQuizFromStorage } from "@utils/storage";
import useDeleteQuiz from "@hooks/quiz/useDeleteQuiz";
import useResults from "@hooks/quiz/useResults";
import { getVerdict, pickRandom, resultsMessages } from "../utils/messages";
import { toPng } from "html-to-image";

export default function ResultPage() {
  const resultsRef = useRef<HTMLDivElement>(null);
  const handleSaveImage = async () => {
    if (resultsRef.current) {
      try {
        const dataUrl = await toPng(resultsRef.current, {
          cacheBust: true,
          backgroundColor: "#fff",
        });
        const link = document.createElement("a");
        link.download = "quiz-results.png";
        link.href = dataUrl;
        link.click();
      } catch (err) {
        alert("Failed to save image. Try again or use a different browser.");
        console.log(err);
      }
    }
  };
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
  if (error || !data)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground outer-pad">
        <Card className="max-w-md text-center">
          <h2 className="text-xl font-bold mb-2">Could not load results</h2>
          <p className="text-sm text-muted-foreground">
            The link may be invalid or the quiz was deleted.
          </p>
          <div className="mt-4 flex justify-center">
            <Button
              variant="secondary"
              onClick={() => (window.location.href = "/")}
            >
              Go home
            </Button>
          </div>
        </Card>
      </div>
    );

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
          <div ref={resultsRef} className="relative p-4 mb-8">
            <div
              className="absolute top-2 right-4 opacity-30 pointer-events-none select-none text-3xl font-display font-bold text-primary"
              style={{ zIndex: 2 }}
            >
              lovemeter143
            </div>
            <div
              className="absolute bottom-2 right-4 opacity-20 pointer-events-none select-none text-xs font-display"
              style={{ zIndex: 2 }}
            >
              {quiz.quiz_id
                ? `${window.location.origin}/attempt/${quiz.quiz_id}`
                : ""}
            </div>
            <h1 className="text-3xl font-bold text-center font-display">
              {quiz.title || "Untitled quiz"}
            </h1>
            <p className="text-muted-foreground text-center text-xs font-gyg mb-2">
              {quiz.description || "No description provided."}
            </p>
            {responses.length > 0 ? (
              <>
                <h2 className="text-center text-xl font-display font-bold mb-1">
                  Verdict:{" "}
                  <span className="text-primary">{verdict}</span>
                </h2>
                <p className="text-center text-xs text-muted-foreground mb-4">
                  {blurb}
                </p>
                <div className="text-center mb-8">
                  <LoveScale score={score} total={total} />
                </div>
              </>
            ) : (
              <div className="mt-6 mb-8 text-center">
                <div className="text-md text-muted-foreground mb-2">
                  No attempts yet. Share this link:
                </div>
                <code className="block border border-border px-4 py-2 rounded-lg text-center break-all">
                  {quiz.quiz_id
                    ? `${window.location.origin}/attempt/${quiz.quiz_id}`
                    : "Attempt link unavailable"}
                </code>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-4">
            {responses.length > 0 &&
              quiz.questions.map((q) => {
                const userResponse = responses.find(
                  (r) => r.question_id === q.id,
                );
                const correctId = q.correct_option ?? null;
                return (
                  <div
                    key={q.id}
                    className="p-4 bg-card border border-border rounded-2xl"
                  >
                    <div className="font-semibold mb-3">
                      Q{q.id}. {q.text}
                    </div>
                    <div className="flex flex-col gap-2">
                      {q.options.map((opt) => {
                        const isSelected =
                          userResponse?.selected_option === opt.id;
                        const isCorrect = correctId === opt.id;
                        const classes = isCorrect
                          ? "bg-success/15 border-success"
                          : isSelected
                            ? "bg-destructive/15 border-destructive"
                            : "bg-muted border-border";
                        return (
                          <div
                            key={opt.id}
                            className={`w-full border rounded-lg px-3 py-2 text-md ${classes}`}
                          >
                            <div className="flex items-center justify-between">
                              <span>{opt.text || `Option ${opt.id}`}</span>
                              <span className="text-md text-muted-foreground">
                                {isCorrect
                                  ? "Correct"
                                  : isSelected
                                    ? "Their choice"
                                    : ""}
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

          <div className="flex justify-center space-x-2 mt-8">
            <Button
              onClick={handleSaveImage}
              className="font-gaegu"
            >
              Save as Image
            </Button>
            <Button
              variant="danger"
              className="font-gaegu"
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
