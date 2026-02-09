import React, { useState } from "react";
interface IntimacySliderProps {
  onChange: (value: string) => void;
}
function IntimacySlider({ onChange }: IntimacySliderProps) {
  const lengthOptions = ["<2 months", "6m", "1y", "2y", "2y+"]; // Updated values
  const [relationshipLength, setRelationshipLength] = useState(lengthOptions[0]);

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const index = parseInt(event.target.value, 10);
    const selectedValue = lengthOptions[index];
    setRelationshipLength(selectedValue);
    onChange(selectedValue); // Pass the correct value
  };

  return (
    <div className="flex flex-col items-center bg-card border border-border rounded-xl w-full inner-pad">
      <label
        htmlFor="relationship-slider"
        className="text-xl font-semibold text-foreground mb-3 text-center"
      >
        Relationship Length
        <div className="text-primary text-2xl">{relationshipLength}</div>
      </label>
      <input
        id="relationship-slider"
        type="range"
        min="0"
        max={lengthOptions.length - 1}
        step="1"
        value={lengthOptions.indexOf(relationshipLength)}
        onChange={handleSliderChange}
        className="w-full h-3 bg-accent rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring"
      />
    </div>
  );
}

export default IntimacySlider;
