export const processQuizData = async (
  quizData: any,
  onSubmission: (quizData: any) => Promise<void>
) => {
  try {
    await onSubmission(quizData);
  } catch (error) {
    console.error("Error submitting quiz:", error);
  }
};
