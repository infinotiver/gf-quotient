import { useState } from "react";
import { useParams } from "react-router-dom";
import useCrushPage from "@hooks/crush/useCrushPage";
import Skeleton from "@components/common/Skeleton";
import TopNav from "@components/common/TopNav";
import CrushHeroCard, {
  accentGradient,
} from "@components/crush/CrushHeroCard";

export default function CrushPage() {
  const { pageId } = useParams();
  const [answer, setAnswer] = useState<"yes" | "no" | null>(null);
  const [noClicks, setNoClicks] = useState(0);

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
  const pageBackground = accentGradient(page.theme.accent);

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
        <CrushHeroCard
          page={page}
          answer={answer}
          onAnswer={setAnswer}
          noClicks={noClicks}
          setNoClicks={setNoClicks}
        />
      </div>
    </div>
  );
}
