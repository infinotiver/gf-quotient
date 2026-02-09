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
      <div className="flex flex-col bg-card border border-border rounded-lg inner-pad stack-gap">
        <h1 className="text-3xl font-bold mb-2 text-foreground">
          LoveMeter Quiz Title
        </h1>
        <p className="text-sm text-muted-foreground mb-2">
          Create a sweet quiz for your special someone.
        </p>
        <input
          value={title}
          onChange={handleTitleChange}
          className="w-full p-3 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          placeholder="Enter the quiz title..."
        />
        <input
          value={description}
          onChange={handleDescriptionChange}
          className="w-full p-3 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm"
          placeholder="Enter the quiz description..."
        />
      </div>
    </>
  );
}
