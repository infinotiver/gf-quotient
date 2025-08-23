import React, { useState } from "react";

interface QuizTitleProps {
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
}

export default function QuizTitle({
  onTitleChange,
  onDescriptionChange,
}: QuizTitleProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    onTitleChange(event.target.value);
    console.log(event.target.value);
  };
  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescription(event.target.value);
    onDescriptionChange(event.target.value);
    console.log(event.target.value);
  };
  return (
    <>
      <div className="flex flex-col p-6 bg-gray-800 rounded-lg shadow-lg gap-4">
        <h1 className="text-3xl font-bold mb-4 text-white">
          Quiz Title & Description
        </h1>
        <input
          value={title}
          onChange={handleTitleChange}
          className="w-full p-3 border border-gray-600 rounded-lg bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
          placeholder="Enter the quiz title..."
        />
        <input
          value={description}
          onChange={handleDescriptionChange}
          className="w-full p-3 border border-gray-600 rounded-lg bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm"
          placeholder="Enter the quiz description..."
        />
      </div>
    </>
  );
}
