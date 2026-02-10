import Bubble from "@components/common/Bubble";
import CreateQuizButton from "@components/common/CreateQuizButton";
import CreateCrushCard from "@components/common/CreateCrushCard";
import Footer from "@components/common/Footer";
import ResultsQuickLink from "@components/common/ResultsQuickLink";
import TopNav from "@components/common/TopNav";
import Card from "@components/common/Card";
import useStats from "@hooks/quiz/useStats";

function HomePage() {
  const { data } = useStats();

  return (
    <>
      <div className="min-h-screen bg-background text-foreground outer-pad">
        <div className="w-full max-w-5xl mx-auto flex flex-col stack-gap-lg">
          <TopNav
            links={[
              { label: "Create quiz", to: "/create-quiz", variant: "primary" },
              { label: "Ask them out", to: "/crush/create", variant: "secondary" },
            ]}
          />
          <div className="grid grid-cols-1 md:grid-cols-[1.2fr,0.8fr] gap-4">
            <Bubble
              subtitle="Ask your crush or send them a quiz about yourself!"
              title="LoveMeter"
            />
            <Card className="text-center flex flex-col justify-center">
              <div className="text-sm text-muted-foreground">Website's tiny stats</div>
              <div className="mt-2 flex items-center justify-center">
                <div className="flex items-center gap-6">
                  <div>
                    <div className="text-2xl font-bold">
                      {data?.total_quizzes ?? "--"}
                    </div>
                    <div className="text-xs text-muted-foreground">Quizzes</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">
                      {data?.total_crush_pages ?? "--"}
                    </div>
                    <div className="text-xs text-muted-foreground">Crush pages</div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CreateQuizButton />
            <CreateCrushCard />
          </div>
        </div>
      </div>
      <Footer />
      <ResultsQuickLink />
    </>
  );
}

export default HomePage;
