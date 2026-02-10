import { useNavigate, useParams } from "react-router-dom";

import Button from "@components/common/Button";
import Skeleton from "@components/common/Skeleton";
import Card from "@components/common/Card";
import TopNav from "@components/common/TopNav";
import useQuiz from "@hooks/quiz/useQuiz";

export default function AttemptLanding() {
  const { quizId } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuiz(quizId);

  const quiz = data ? data : null;
  const attempted = quiz?.attempted === true;

  if (isLoading)
    return (
      <div className="flex flex-col min-h-screen bg-background text-foreground outer-pad">
        <TopNav
          links={[
            { label: "Home", to: "/", variant: "ghost" },
            { label: "Create quiz", to: "/create-quiz", variant: "secondary" },
          ]}
        />
        <div className="flex flex-1 items-center justify-center">
          <Skeleton width="lg" lines={3} />
        </div>
      </div>
    );

  return quiz ? (
    <div className="flex flex-col min-h-screen bg-background text-foreground outer-pad">
      <TopNav
        links={[
          { label: "Home", to: "/", variant: "ghost" },
          { label: "Create quiz", to: "/create-quiz", variant: "secondary" },
        ]}
      />
      <div className="flex flex-1 items-center justify-center">
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
    </div>
  ) : (
    <div className="flex flex-col min-h-screen bg-background text-foreground outer-pad">
      <TopNav
        links={[
          { label: "Home", to: "/", variant: "ghost" },
          { label: "Create quiz", to: "/create-quiz", variant: "secondary" },
        ]}
      />
      <div className="flex flex-1 items-center justify-center">
        <p>{error ? "Error loading quiz" : "No quiz data available"}</p>
      </div>
    </div>
  );
}
