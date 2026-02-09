import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage"; // Corrected the relative path
import CreateQuizPage from "./pages/CreateQuizPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ShareQuizPage from "./pages/QuizSharePage";
import AttemptLanding from "./pages/attempt/LandingPage";
import AttemptQuiz from "./pages/attempt/AttemptQuizPage";
import ResultPage from "./pages/ResultPage";
import AttemptResultPage from "./pages/attempt/AttemptResultPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      refetchOnWindowFocus: false,
    },
  },
});
function App() {
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create-quiz" element={<CreateQuizPage />} />
          <Route path="/attempt/:quizId" element={<AttemptLanding />} />
          <Route path="/attempt/:quizId/start" element={<AttemptQuiz />} />
          <Route path="/attempt/:quizId/results" element={<AttemptResultPage />} />
          <Route path="/quiz/share/:quizId" element={<ShareQuizPage />} />
          <Route path="/results/:token" element={<ResultPage />} />
        </Routes>
      </QueryClientProvider>
    </Router>
  );
}

export default App;
