export const submissionMessages = [
  "Answers sent. Your moment is saved.",
  "Submitted with love. Results are on the way.",
  "Sweet! Your answers are in.",
  "Done and delivered. Let the sparks fly.",
];

export const resultsMessages = [
  "The results are in—let’s see how your hearts align.",
  "Quiz complete! Time to reveal your connection score.",
  "Here is your relationship snapshot. Ready for the big reveal?",
  "Let’s see how well you two really know each other.",
  "Moment of truth! Your love story, decoded.",
];

export const lovemeterVerdicts = [
  { min: 0, max: 30, label: "Warm Spark" },
  { min: 31, max: 60, label: "Magnetic" },
  { min: 61, max: 85, label: "Electric" },
  { min: 86, max: 100, label: "All-In" },
];

export function getVerdict(pct: number): string {
  const match = lovemeterVerdicts.find((v) => pct >= v.min && pct <= v.max);
  return match ? match.label : "LoveMeter";
}

export function pickRandom<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}
