type StoredQuiz = {
  quiz_id: string;
  token: string;
  title: string;
  created_at: string;
};

const KEY = "gq_quizzes";

export function saveQuizToStorage(quiz: StoredQuiz, limit = 5) {
  try {
    const stored = localStorage.getItem(KEY);
    const list: StoredQuiz[] = stored ? JSON.parse(stored) : [];
    list.unshift(quiz);
    localStorage.setItem(KEY, JSON.stringify(list.slice(0, limit)));
  } catch {
    // ignore storage errors
  }
}

export function getLatestQuiz(): StoredQuiz | null {
  try {
    const stored = localStorage.getItem(KEY);
    if (!stored) return null;
    const list: StoredQuiz[] = JSON.parse(stored);
    return list.length > 0 ? list[0] : null;
  } catch {
    return null;
  }
}

export function removeQuizFromStorage(token: string) {
  try {
    const stored = localStorage.getItem(KEY);
    if (!stored) return;
    const list: StoredQuiz[] = JSON.parse(stored);
    const next = list.filter((quiz) => quiz.token !== token);
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // ignore storage errors
  }
}
