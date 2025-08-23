import QUIZ_QUESTIONS from "./questions.ts";

export function getQuestions(
  intimacyLevel: "<2 months" | "6 months" | "1 year" | "2 years" | "2+ years"
) {
  return QUIZ_QUESTIONS[intimacyLevel] || [];
}
