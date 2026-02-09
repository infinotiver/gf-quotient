import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import { getLatestQuiz } from "@utils/storage";

export default function ResultsQuickLink() {
  const [latest, setLatest] = useState<ReturnType<typeof getLatestQuiz>>(null);

  useEffect(() => {
    setLatest(getLatestQuiz());
  }, []);

  if (!latest) return null;

  return (
    <div className="bg-card border border-border rounded-full px-3 py-2 text-xs text-muted-foreground flex items-center gap-2">
      <span className="hidden sm:inline">Latest quiz:</span>
      <span className="font-semibold text-foreground truncate max-w-[140px]">
        {latest.title}
      </span>
      <Link to={`/results/${latest.token}`}>
        <Button size="sm">View results</Button>
      </Link>
    </div>
  );
}
