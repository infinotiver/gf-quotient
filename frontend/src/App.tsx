import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage"; // Corrected the relative path
import CreateQuizPage from "./pages/quiz/CreateQuizPage";
import QuizAttemptPage from "./pages/quiz/QuizAttemptPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create-quiz" element={<CreateQuizPage />} />
        <Route path="/quiz-attempt/:quizId" element={<QuizAttemptPage />} />
      </Routes>
    </Router>
  );
}

export default App;
