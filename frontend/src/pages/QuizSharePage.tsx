import { useLocation, useParams, Link } from "react-router-dom";
import Button from "../components/common/Button";
import Card from "../components/common/Card";

export default function ShareQuizPage() {
  const { quizId } = useParams<{ quizId: string }>();
  const location = useLocation();
  const token = (location.state as { token: string } | undefined)?.token;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground outer-pad">
      <Card className="w-full max-w-xl">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Quiz Created with Love!
        </h1>

        <p className="mb-3 text-center">
          Share this link so they can take the quiz:
        </p>
        <code className="block border border-border px-4 py-2 rounded-lg text-center break-all">
          {quizId
            ? `${window.location.origin}/attempt/${quizId}`
            : "Attempt link unavailable"}
        </code>

        <p className="my-6 text-center">Keep this results link private:</p>
        <code className="block bg-primary text-primary-foreground px-4 py-2 rounded-lg text-center break-all">
          {token
            ? `${window.location.origin}/results/${token}`
            : "Results token unavailable"}
        </code>

        <div className="mt-6 flex justify-center">
          <Link to="/" className="w-full">
            <Button variant="secondary" className="w-full">
              Go to Home
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
