import React, { useState } from "react";
interface IntimacySliderProps {
  onChange: (value: string) => void;
}
function IntimacySlider({ onChange }: IntimacySliderProps) {
  const [relationshipLength, setRelationshipLength] = useState("<2m");

  const lengthOptions = [
    "<2 months",
    "6 months",
    "1 year",
    "2 year",
    "2+ year",
  ];

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const index = parseInt(event.target.value, 10);
    setRelationshipLength(lengthOptions[index]);
    onChange(relationshipLength);
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-800 rounded-xl shadow-md min-w-[24vw]">
      <label
        htmlFor="relationship-slider"
        className="text-2xl font-semibold text-pink-400 mb-4"
      >
        Relationship Length:{" "}
        <span className="text-pink-500 text-2xl ">{relationshipLength}</span>
      </label>
      <input
        id="relationship-slider"
        type="range"
        min="0"
        max={lengthOptions.length - 1}
        step="1"
        value={lengthOptions.indexOf(relationshipLength)}
        onChange={handleSliderChange}
        className="w-full h-3 bg-pink-500 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-pink-400"
      />
    </div>
  );
}

export default IntimacySlider;
