import { useState } from "react";
import { processQuizData } from "../utils/quizUtils";

interface useCreateQuizProps {
  (quizData: object): Promise<void>;
}

export function useCreateQuiz(onSubmission: useCreateQuizProps) {
  const MAX_STEPS = 5;
  const [quizData, setQuizData] = useState({
    title: "",
    questions: [],
  });
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < MAX_STEPS - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      processQuizData(quizData, onSubmission);
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  return {
    currentStep,
    quizData,
    setQuizData,
    handleNext,
    handleBack,
    isLastStep: currentStep === MAX_STEPS - 1,
  };
}
