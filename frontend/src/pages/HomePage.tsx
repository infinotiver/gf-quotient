import Bubble from "../components/ui/Bubble";
import InfoBox from "../components/ui/InfoBox";
import CreateQuizButton from "../components/ui/CreateQuizButton";
import Footer from "../components/ui/Footer";

function HomePage() {
  return (
    <>
      <div className="flex flex-col justify-center items-center w-full min-h-screen bg-gray-900 gap-4 p-4">
        <div className="w-full max-w-md flex flex-col gap-4">
          <Bubble subtitle="Does your BF actually" title="KNOW YOU?" />
          <InfoBox />
          <CreateQuizButton />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default HomePage;
