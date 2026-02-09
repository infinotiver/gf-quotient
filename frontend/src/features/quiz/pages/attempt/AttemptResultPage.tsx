import { useLocation, useParams, Link } from "react-router-dom";
import Button from "@components/common/Button";
import Card from "@components/common/Card";
import LoveScale from "@components/common/LoveScale";
import { useMemo } from "react";
import { pickRandom, submissionMessages } from "../../utils/messages";
import TopNav from "@components/common/TopNav";

export default function AttemptResultPage() {
  const { quizId } = useParams();
  const location = useLocation();
  const state = location.state as
    | { status?: string; message?: string; score?: number; total?: number }
    | undefined;
  const blurb = useMemo(() => pickRandom(submissionMessages), []);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground outer-pad">
      <TopNav
        links={[
          { label: "Home", to: "/", variant: "ghost" },
          { label: "Create quiz", to: "/create-quiz", variant: "secondary" },
        ]}
      />
      <div className="flex flex-1 items-center justify-center">
      <Card className="w-full max-w-md">
        <h1 className="text-2xl font-bold mb-3 text-center">Thanks for playing!</h1>
        <p className="text-muted-foreground text-center mb-6">
          {state?.message || blurb}
        </p>
        {typeof state?.score === "number" && typeof state?.total === "number" && (
          <div className="mb-6">
            <LoveScale score={state.score} total={state.total} label="Love scale" />
          </div>
        )}
        <div className="text-xs text-muted-foreground text-center mb-6">
          Quiz ID: {quizId}
        </div>
        <div className="flex flex-col gap-2">
          <Link to="/create-quiz" className="w-full inline-flex">
            <Button className="w-full">Make your own quiz</Button>
          </Link>
          <Link to="/" className="w-full inline-flex">
            <Button variant="secondary" className="w-full">
              Back to Home
            </Button>
          </Link>
        </div>
      </Card>
      </div>
    </div>
  );
}
