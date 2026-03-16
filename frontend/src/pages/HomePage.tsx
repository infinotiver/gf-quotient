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
                {
                  label: "Create quiz",
                  to: "/create-quiz",
                  variant: "primary",
                },
                {
                  label: "Will you be my valentine?",
                  to: "/crush/create",
                  variant: "secondary",
                },
              ]}
            />
            <div className="relative rounded-3xl flex flex-col justify-center items-center text-center inner-pad">
              <p className="text-lg uppercase tracking-wide text-muted-foreground font-semibold font-gaegu">
                Valentine's special
              </p>

              <div className="p-2 text-4xl font-bold font-display text-foreground">
                Make love notes and quizzes
              </div>
              <div className="text-xl font-gyg">
                Best way to share your feelings and test your relationship!
              </div>
            </div>
            <section className="flex flex-col lg:flex-row gap-4">
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
