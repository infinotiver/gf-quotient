import type { CrushCreate } from "@features/crush/types";
import CrushHeroCard, { accentGradient } from "@components/crush/CrushHeroCard";
import type { Dispatch, SetStateAction } from "react";

type Props = {
  form: CrushCreate;
  answer: "yes" | "no" | null;
  setAnswer: Dispatch<SetStateAction<"yes" | "no" | null>>;
  noClicks: number;
  setNoClicks: Dispatch<SetStateAction<number>>;
};

export default function CrushPreviewCard({
  form,
  answer,
  setAnswer,
  noClicks,
  setNoClicks,
}: Props) {
  const heroPage = {
    page_id: "preview",
    ...form,
  };
  return (
    <div
      className="rounded-2xl border border-border p-6"
      style={{
        background: accentGradient(form.theme.accent),
        color: form.theme.text,
        backgroundImage: form.theme.background_image
          ? `url(${form.theme.background_image})`
          : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <CrushHeroCard
        page={heroPage}
        answer={answer}
        onAnswer={setAnswer}
        noClicks={noClicks}
        setNoClicks={setNoClicks}
      />
    </div>
  );
}
