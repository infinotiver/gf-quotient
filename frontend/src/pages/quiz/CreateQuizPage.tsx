import { useState } from "react";
import OptionCard from "../../components/create-quiz/OptionCard";
import type { OptionType } from "../../components/create-quiz/OptionCard";
export default function CreateQuizPage() {
  const [options, setOptions] = useState<OptionType[]>([
    { id: "1", text: "", isCorrect: false },
  ]);

  const handleTextChange = (id: string, newText: string) => {
    setOptions((prevOptions) =>
      prevOptions.map((option) =>
        option.id === id ? { ...option, text: newText } : option
      )
    );
  };

  const handleToggleCorrect = (id: string) => {
    setOptions((prevOptions) =>
      prevOptions.map((option) =>
        option.id === id ? { ...option, isCorrect: !option.isCorrect } : option
      )
    );
  };

  const handleDelete = (id: string) => {
    setOptions((prevOptions) =>
      prevOptions.filter((option) => option.id !== id)
    );
  };

  const handleAddOption = () => {
    setOptions((prevOptions) => [
      ...prevOptions,
      { id: (prevOptions.length + 1).toString(), text: "", isCorrect: false },
    ]);
  };

  return (
    <div>
      <h1>Create Quiz</h1>
      {options.map((option) => (
        <OptionCard
          key={option.id}
          option={option}
          isCorrect={option.isCorrect}
          onTextChange={(newText: string) => handleTextChange(option.id, newText)}
          onToggleCorrect={() => handleToggleCorrect(option.id)}
          onDelete={() => handleDelete(option.id)}
        />
      ))}
      <button onClick={handleAddOption}>Add Option</button>
    </div>
  );
}
