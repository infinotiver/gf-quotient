import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

import { getQuiz } from "../../api";
import Button from "../../../../components/common/Button";
import Skeleton from "../../../../components/common/Skeleton";
import Card from "../../../../components/common/Card";

export default function AttemptLanding() {
  const { quizId } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery({
    queryKey: ["quiz", quizId],
    queryFn: async () => {
      if (!quizId) throw new Error("Quiz ID is required");
      return await getQuiz(quizId);
    },
    staleTime: 60_000,
    refetchOnWindowFocus: false,
  });

  const quiz = data ? data : null;
  const attempted = quiz?.attempted === true;

  if (isLoading)
    return (
      <div className="flex flex-col justify-center items-center w-full min-h-screen bg-background text-foreground outer-pad">
        <Skeleton width="lg" lines={3} />
      </div>
    );

  return quiz ? (
    <div className="flex flex-col justify-center items-center w-full min-h-screen bg-background text-foreground outer-pad">
      <Card className="w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-center mb-4">{quiz.quiz.title}</h1>
        <p className="text-muted-foreground text-center mb-6">{quiz.quiz.description}</p>
        <div className="flex justify-between items-center text-sm text-muted-foreground mb-6">
          <span>Total Questions: {quiz.quiz.questions?.length || "N/A"}</span>
        </div>
        {attempted && (
          <p className="text-destructive text-center mb-4">
            This quiz has already been attempted. Results are available to the creator.
          </p>
        )}
        <Button
          onClick={() => navigate(`/attempt/${quizId}/start`)}
          className="w-full"
          disabled={attempted}
        >
          Start Quiz
        </Button>
      </Card>
    </div>
  ) : (
    <div className="flex justify-center items-center w-full min-h-screen bg-background text-foreground outer-pad">
      <p>{error ? "Error loading quiz" : "No quiz data available"}</p>
    </div>
  );
}
