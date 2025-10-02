import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage"; // Corrected the relative path
import CreateQuizPage from "./pages/CreateQuizPage";
import QuizAttemptPage from "./pages/QuizAttemptPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ShareQuizPage from "./pages/QuizSharePage";

const queryClient = new QueryClient();
function App() {
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create-quiz" element={<CreateQuizPage />} />
          <Route path="/quiz-attempt/:quizId" element={<QuizAttemptPage />} />
          <Route path="/quiz/share/:quizId" element={<ShareQuizPage />} />
        </Routes>
      </QueryClientProvider>
    </Router>
  );
}

export default App;
