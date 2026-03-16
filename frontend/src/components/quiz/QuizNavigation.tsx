interface QuizNavigationProps {
  onBack: () => void;
  onNext: () => void;
  isLastStep: boolean;
}

export default function QuizNavigation({
  onBack,
  onNext,
  isLastStep,
}: QuizNavigationProps) {
  return (
    <div className="flex gap-4">
      <button
        onClick={onBack}
        className="px-4 py-2 bg-purple-600 text-white font-semibold rounded shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-300"
      >
        Back
      </button>
      <button
        onClick={onNext}
        className="px-6 py-2 bg-blue-500 text-white font-semibold rounded shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300"
      >
        {isLastStep ? "Submit" : "Next"}
      </button>
    </div>
  );
}
