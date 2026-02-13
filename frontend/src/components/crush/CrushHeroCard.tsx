import { useState, type Dispatch, type SetStateAction } from "react";
import type { CrushPublic } from "@features/crush/types";
import Button from "@components/common/Button";
import Card from "@components/common/Card";

type Props = {
  page: CrushPublic;
  answer: "yes" | "no" | null;
  onAnswer: (value: "yes" | "no") => void;
  noClicks: number;
  setNoClicks: Dispatch<SetStateAction<number>>;
};

export const accentGradient = (color: string) => {
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

export default function CrushHeroCard({
  page,
  answer,
  onAnswer,
  noClicks,
  setNoClicks,
}: Props) {
  const [heroError, setHeroError] = useState(false);
  const cappedNoClicks = Math.min(noClicks, 5);
  const heroImage =
    answer === "yes" && page.after_yes_gif ? page.after_yes_gif : page.hero_image;
  const accentBg = accentGradient(page.theme.accent);
  return (
    <Card
      className="w-full max-w-xl bg-card"
      style={{ color: page.theme.text, background: accentBg }}
    >
      <h1 className="text-3xl font-bold font-display text-center mb-4">
        {page.title}
      </h1>
      {heroImage && !heroError ? (
        <div className="flex justify-center mb-4">
          <img
            src={heroImage}
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
        </div>
      ) : (
        <div className="flex gap-3 justify-center">
          <Button
            onClick={() => onAnswer("yes")}
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
  );
}
