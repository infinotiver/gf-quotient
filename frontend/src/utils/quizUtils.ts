export const processQuizData = async <T>(
  quizData: T,
  onSubmission: (quizData: T) => Promise<void>
) => {
  try {
    await onSubmission(quizData);
  } catch (error) {
    console.error("Error submitting quiz:", error);
  }
};
