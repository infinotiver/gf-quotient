import QUIZ_QUESTIONS from "./questions.ts";

export function getQuestions(
  category: "normal" | "cute" | "spicy" | "playful" | "deep"
) {
  return QUIZ_QUESTIONS[category] || [];
}
