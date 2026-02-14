import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage"; // Corrected the relative path
import CreateQuizPage from "./features/quiz/pages/CreateQuizPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ShareQuizPage from "./features/quiz/pages/QuizSharePage";
import AttemptLanding from "./features/quiz/pages/attempt/LandingPage";
import AttemptQuiz from "./features/quiz/pages/attempt/AttemptQuizPage";
import ResultPage from "./features/quiz/pages/ResultPage";
import AttemptResultPage from "./features/quiz/pages/attempt/AttemptResultPage";
import CreateCrushPage from "./features/crush/CreateCrushPage";
import CrushPage from "./features/crush/CrushPage";
import PrivacyPage from "./pages/PrivacyPage";
import ClickSpark from "./components/common/ClickSpark";
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
      <ClickSpark
        sparkColor="#FF0000"
        sparkSize={10}
        sparkRadius={15}
        sparkCount={8}
        duration={400}
      >
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/create-quiz" element={<CreateQuizPage />} />
            <Route path="/attempt/:quizId" element={<AttemptLanding />} />
            <Route path="/attempt/:quizId/start" element={<AttemptQuiz />} />
            <Route
              path="/attempt/:quizId/results"
              element={<AttemptResultPage />}
            />
            <Route path="/quiz/share/:quizId" element={<ShareQuizPage />} />
            <Route path="/results/:token" element={<ResultPage />} />
            <Route path="/crush/create" element={<CreateCrushPage />} />
            <Route path="/crush/:pageId" element={<CrushPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
          </Routes>
        </QueryClientProvider>
      </ClickSpark>
    </Router>
  );
}

export default App;
