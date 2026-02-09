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
    <div className="fixed bottom-14 right-3 z-50 bg-card/80 border border-border rounded-full px-3 py-1 text-xs text-muted-foreground flex items-center gap-2 backdrop-blur">
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
