import Bubble from "@components/common/Bubble";
import CreateQuizButton from "@components/common/CreateQuizButton";
import CreateCrushCard from "@components/common/CreateCrushCard";
import Footer from "@components/common/Footer";
import ResultsQuickLink from "@components/common/ResultsQuickLink";
import TopNav from "@components/common/TopNav";
import useStats from "@hooks/quiz/useStats";

function HomePage() {
  const { data } = useStats();

  return (
    <>
      <div className="homepage-bg min-h-screen text-foreground flex flex-col">
        <main className="outer-pad flex-1">
          <div className="w-full max-w-5xl mx-auto flex flex-col gap-5">
            <TopNav
              links={[
                { label: "Create quiz", to: "/create-quiz", variant: "primary" },
                { label: "Will you be my valentine?", to: "/crush/create", variant: "secondary" },
              ]}
            />
            <Bubble subtitle="Valentine's Special" title="Know your love, know yourself" />
            <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <CreateQuizButton />
                <CreateCrushCard />
            </section>
          </div>
        </main>
        <Footer
          stats={{
            totalQuizzes: data?.total_quizzes,
            totalCrushPages: data?.total_crush_pages,
          }}
        />
      </div>
      <ResultsQuickLink />
    </>
  );
}

export default HomePage;
