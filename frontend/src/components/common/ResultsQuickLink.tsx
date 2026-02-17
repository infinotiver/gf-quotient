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
    <div className="fixed left-1/2 bottom-20 z-40 -translate-x-1/2 px-4">
      <div className="mx-auto flex items-center gap-2 rounded-full border border-border/60 bg-card/80 px-3 py-2 text-xs text-muted-foreground backdrop-blur-2xl">
        <span className="hidden sm:inline">Latest quiz</span>
        <span className="font-semibold text-foreground truncate max-w-[150px]">
          {latest.title}
        </span>
        <Link to={`/results/${latest.token}`}>
          <Button size="sm" className="rounded-full px-3">
            View
          </Button>
        </Link>
      </div>
    </div>
  );
}
