import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../HomePage"; // Corrected the relative path
import CreateQuizPage from "../CreateQuizPage";
import QuizAttemptPage from "../QuizAttemptPage";

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
