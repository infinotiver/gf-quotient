import { useState } from "react";
import { useParams } from "react-router-dom";
import useCrushPage from "@hooks/crush/useCrushPage";
import Card from "@components/common/Card";
import Button from "@components/common/Button";
import Skeleton from "@components/common/Skeleton";
import TopNav from "@components/common/TopNav";

export default function CrushPage() {
  const { pageId } = useParams();
  const [answer, setAnswer] = useState<"yes" | "no" | null>(null);
  const [noClicks, setNoClicks] = useState(0);
  const cappedNoClicks = Math.min(noClicks, 5);
  const [heroError, setHeroError] = useState(false);

  const { data, isLoading, error } = useCrushPage(pageId);

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
  const accentGradient = (color: string) => {
    const hex = color.replace("#", "");
    const isShort = hex.length === 3;
    const isLong = hex.length === 6;
    if (!isShort && !isLong) {
      return "linear-gradient(135deg, rgba(0,0,0,0.04), rgba(0,0,0,0.02))";
    }
    const toByte = (value: string) =>
      parseInt(isShort ? value + value : value, 16);
    const r = toByte(hex.slice(0, 2));
    const g = toByte(hex.slice(2, 4));
    const b = toByte(hex.slice(4, 6));
    return `linear-gradient(135deg, rgba(${r}, ${g}, ${b}, 0.14) 0%, rgba(${r}, ${g}, ${b}, 0.04) 100%)`;
  };
  const pageBackground = accentGradient(page.theme.accent);
  const imageSrc = page.after_yes_gif || page.hero_image;

  return (
    <div
      className="min-h-screen flex flex-col outer-pad relative overflow-hidden"
      style={{
        background: pageBackground,
        color: page.theme.text,
        backgroundImage: page.theme.background_image
          ? `url(${page.theme.background_image})`
          : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <TopNav
        links={[
          { label: "Home", to: "/", variant: "ghost" },
          { label: "Create quiz", to: "/create-quiz", variant: "secondary" },
        ]}
      />
      <div className="flex flex-1 items-center justify-center">
      <Card
        className="w-full max-w-xl bg-card"
        style={{ color: page.theme.text }}
      >
        <h1 className="text-3xl font-bold font-display text-center mb-4">
          {page.title}
        </h1>
        {page.hero_image && !heroError ? (
          <div className="flex justify-center mb-4">
            <img
              src={page.hero_image}
              alt=""
              className="max-h-48 rounded-lg"
              referrerPolicy="no-referrer"
              crossOrigin="anonymous"
              onError={() => setHeroError(true)}
            />
          </div>
        ) : null}
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
                  alt=""
                  className="max-h-40 rounded-lg"
                  referrerPolicy="no-referrer"
                  crossOrigin="anonymous"
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
                transform: `scale(${1 + cappedNoClicks * 0.1})`,
              }}
            >
              {page.yes_text}
            </Button>
            <Button
              variant="ghost"
              onClick={() => setNoClicks((count) => Math.min(count + 1, 5))}
              className="min-w-[120px] border transition-transform"
              style={{
                borderColor: page.theme.accent,
                color: page.theme.accent,
                background: "transparent",
                transform: `scale(${Math.max(0.85, 1 - cappedNoClicks * 0.1)})`,
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
