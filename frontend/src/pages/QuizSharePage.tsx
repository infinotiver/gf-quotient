import { useLocation, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
export default function ShareQuizPage() {
  const { quizId } = useParams<{ quizId: string }>();
  const location = useLocation();
  const token = (location.state as { token: string })?.token;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">💖 Quiz Created with Love! 💖</h1>

      <p className="mb-4 text-center">
        Share this special link with your boyfriend to take the quiz:
      </p>
      <code className="border-2 border-pink-700 px-4 py-2 rounded-lg text-white">
        {window.location.origin}/attempt/{token}
      </code>

      <p className="my-6 text-center">
        Keep this token safe (for your eyes only, GF!):
      </p>
      <code className="bg-pink-600 px-4 py-2 rounded-lg text-white">
        {window.location.origin}/results/{quizId}
      </code>
      <Link
        to="/"
        className="mt-6 bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-lg"
      >
        Go to Home
      </Link>
    </div>
  );
}
