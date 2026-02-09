import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCrushPage } from "./api";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import Skeleton from "../../components/common/Skeleton";

export default function CrushPage() {
  const { pageId } = useParams();
  const [answer, setAnswer] = useState<"yes" | "no" | null>(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ["crush", pageId],
    queryFn: async () => {
      if (!pageId) throw new Error("Page ID required");
      return await getCrushPage(pageId);
    },
    staleTime: 60_000,
    refetchOnWindowFocus: false,
  });

  if (isLoading)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground outer-pad">
        <Skeleton width="lg" lines={4} />
      </div>
    );
  if (error || !data) return <p>Error loading page.</p>;

  const page = data.page;

  return (
    <div
      className="min-h-screen flex items-center justify-center outer-pad"
      style={{
        background: page.theme.background,
        color: page.theme.text,
        backgroundImage: page.theme.background_image
          ? `url(${page.theme.background_image})`
          : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Card className="w-full max-w-xl">
        <h1 className="text-3xl font-bold font-display text-center mb-4">
          {page.title}
        </h1>
        {page.subtitle && (
          <p className="text-center text-sm text-muted-foreground mb-4">
            {page.subtitle}
          </p>
        )}
        {page.hero_image && (
          <div className="flex justify-center mb-4">
            <img
              src={page.hero_image}
              alt="Crush"
              className="max-h-48 rounded-lg"
            />
          </div>
        )}
        <p className="text-center mb-6">{page.question}</p>
        {answer ? (
          <div className="text-center font-semibold">
            {answer === "yes"
              ? page.message_after_yes || "Sweet!"
              : page.message_after_no || "Thanks for being honest."}
          </div>
        ) : (
          <div className="flex gap-3 justify-center">
            <Button
              onClick={() => setAnswer("yes")}
              className="min-w-[120px]"
              style={{ background: page.theme.accent }}
            >
              {page.yes_text}
            </Button>
            <Button variant="secondary" onClick={() => setAnswer("no")} className="min-w-[120px]">
              {page.no_text}
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}
