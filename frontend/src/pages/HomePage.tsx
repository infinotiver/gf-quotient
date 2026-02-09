import Bubble from "../components/common/Bubble";
import InfoBox from "../components/common/InfoBox";
import CreateQuizButton from "../components/common/CreateQuizButton";
import Footer from "../components/common/Footer";
import ResultsQuickLink from "../components/common/ResultsQuickLink";
import Button from "../components/common/Button";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getStats } from "../features/quiz/api";
import Card from "../components/common/Card";

function HomePage() {
  const { data } = useQuery({
    queryKey: ["stats"],
    queryFn: getStats,
    staleTime: 60_000,
    refetchOnWindowFocus: false,
  });

  return (
    <>
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center outer-pad">
        <div className="w-full max-w-lg flex flex-col stack-gap-lg">
          <Bubble subtitle="A small love quiz to see if they" title="Know You" />
          <Card className="text-center">
            <div className="text-sm text-muted-foreground">Community Stats</div>
            <div className="mt-2 flex items-center justify-center">
              <div>
                <div className="text-2xl font-bold">
                  {data?.total_quizzes ?? "—"}
                </div>
                <div className="text-xs text-muted-foreground">Quizzes</div>
              </div>
            </div>
          </Card>
          <InfoBox />
          <CreateQuizButton />
          <Card className="text-center">
            <div className="text-sm text-muted-foreground mb-3">
              Want to ask your crush out?
            </div>
            <Link to="/crush/create">
              <Button className="w-full">Create a crush page</Button>
            </Link>
          </Card>
        </div>
      </div>
      <Footer />
      <ResultsQuickLink />
    </>
  );
}

export default HomePage;
