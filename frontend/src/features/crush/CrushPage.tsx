import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCrushPage } from "./api";
import Card from "@components/common/Card";
import Button from "@components/common/Button";
import Skeleton from "@components/common/Skeleton";
import TopNav from "@components/common/TopNav";
import Galaxy from "@components/Galaxy";

export default function CrushPage() {
  const { pageId } = useParams();
  const [answer, setAnswer] = useState<"yes" | "no" | null>(null);
  const [noClicks, setNoClicks] = useState(0);
  const cappedNoClicks = Math.min(noClicks, 3);

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
      <div className="flex flex-col min-h-screen bg-background text-foreground outer-pad">
        <TopNav
          links={[
            { label: "Home", to: "/", variant: "ghost" },
            { label: "Create quiz", to: "/create-quiz", variant: "secondary" },
          ]}
        />
        <div className="flex flex-1 items-center justify-center">
          <Skeleton width="lg" lines={4} />
        </div>
      </div>
    );
  if (error || !data) return <p>Error loading page.</p>;

  const page = data.page;
  const useGalaxy = page.theme.background === "galaxy";

  return (
    <div
      className="min-h-screen flex flex-col outer-pad relative overflow-hidden"
      style={{
        background: useGalaxy ? "#0f0820" : page.theme.background,
        color: page.theme.text,
        backgroundImage: page.theme.background_image
          ? `url(${page.theme.background_image})`
          : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {useGalaxy && (
        <div className="absolute inset-0 -z-10">
          <Galaxy
            starSpeed={0.5}
            density={0.4}
            hueShift={140}
            speed={0.5}
            glowIntensity={0.15}
            saturation={0}
            mouseRepulsion={false}
            repulsionStrength={1.2}
            twinkleIntensity={0.1}
            rotationSpeed={0.02}
            disableAnimation
            transparent
          />
        </div>
      )}
      <TopNav
        links={[
          { label: "Home", to: "/", variant: "ghost" },
          { label: "Create quiz", to: "/create-quiz", variant: "secondary" },
        ]}
      />
      <div className="flex flex-1 items-center justify-center">
      <Card className="w-full max-w-xl">
        <h1 className="text-3xl font-bold font-display text-center mb-4">
          {page.title}
        </h1>
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
            {answer === "yes" && page.after_yes_gif && (
              <div className="mt-4 flex justify-center">
                <img
                  src={page.after_yes_gif}
                  alt="Celebration"
                  className="max-h-40 rounded-lg"
                />
              </div>
            )}
          </div>
        ) : (
          <div className="flex gap-3 justify-center">
            <Button
              onClick={() => setAnswer("yes")}
              className="min-w-[120px] text-white transition-transform"
              style={{
                background: page.theme.accent,
                transform: `scale(${1 + cappedNoClicks * 0.05})`,
              }}
            >
              {page.yes_text}
            </Button>
            <Button
              variant="ghost"
              onClick={() => setNoClicks((count) => Math.min(count + 1, 3))}
              className="min-w-[120px] border transition-transform"
              style={{
                borderColor: page.theme.accent,
                color: page.theme.accent,
                background: "transparent",
                transform: `scale(${Math.max(0.85, 1 - cappedNoClicks * 0.08)})`,
              }}
            >
              {page.no_text}
            </Button>
          </div>
        )}
      </Card>
      </div>
    </div>
  );
}
