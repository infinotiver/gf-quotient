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
    <div className="fixed bottom-10 z-30 p-2 sm:p-3 flex justify-start sm:justify-center w-full left-0 sm:left-1/2 sm:-translate-x-1/2">
      <div className="mx-auto flex items-center gap-2 rounded-full border border-border/60 bg-card/50 px-3 py-1 text-xs text-muted-foreground backdrop-blur-2xl">
        <span className="hidden sm:inline">Latest quiz</span>
        <span className="font-semibold text-foreground truncate max-w-[150px]">
          {latest.title}
        </span>
        <Link to={`/results/${latest.token}`}>
          <Button size="xs">View</Button>
        </Link>
      </div>
    </div>
  );
}
