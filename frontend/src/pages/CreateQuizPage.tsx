import { useState } from "react";
const createQuiz = async (quizData: { title: string; options: OptionType[] }) => {
  return Promise.resolve({ success: true, quizId: "dummy-id" , quizData});
};
import OptionCard from "../components/create-quiz/OptionCard";
import type { OptionType } from "../components/create-quiz/OptionCard";
export default function CreateQuizPage() {
  const [title, setTitle] = useState("");
  const [options, setOptions] = useState<OptionType[]>([]);

  const addOption = () => {
    setOptions([...options, { id: crypto.randomUUID(), text: "", isCorrect: false }]);
  };

  const handleSubmit = async () => {
    try {
      const quizData = { title, options };
      const result = await createQuiz(quizData);
      console.log("Quiz created:", result);
    } catch (error) {
      console.error("Error creating quiz:", error);
    }
  };

  return (
    <div className="p-4">
      <input
        className="w-full p-2 mb-4 bg-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-400"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Quiz title"
      />
      {options.map((option, index) => (
        <OptionCard
          key={index}
          option={option}
          isCorrect={option.isCorrect}
          onTextChange={(newText: string) =>
            setOptions((prev) =>
              prev.map((opt, i) =>
                i === index ? { ...opt, text: newText } : opt
              )
            )
          }
          onToggleCorrect={() =>
            setOptions((prev) =>
              prev.map((opt, i) =>
                i === index ? { ...opt, isCorrect: !opt.isCorrect } : opt
              )
            )
          }
          onDelete={() =>
            setOptions((prev) => prev.filter((_, i) => i !== index))
          }
        />
      ))}
      <button
        onClick={addOption}
        className="mt-4 p-2 bg-green-500 text-white rounded-lg"
      >
        Add Option
      </button>
      <button
        onClick={handleSubmit}
        className="mt-4 p-2 bg-blue-500 text-white rounded-lg"
      >
        Create Quiz
      </button>
    </div>
  );
}
