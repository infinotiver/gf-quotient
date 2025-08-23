import Bubble from "../components/ui/Bubble";
import InfoBox from "../components/ui/InfoBox";
import CreateQuizButton from "../components/ui/CreateQuizButton";
import Footer from "../components/ui/Footer";

function HomePage() {
  return (
    <>
      <div className="flex flex-col md:flex-row justify-center items-center w-full min-h-screen bg-gray-900 gap-4 p-4">
        {/* Left Section */}
        <div className="flex flex-col justify-center items-center w-full md:w-1/2 gap-4">
          <Bubble subtitle="Does your BF actually" title="KNOW YOU?" />
          <InfoBox />
        </div>

        {/* Right Section */}
        <div className="flex flex-col justify-center items-center w-full md:w-1/2 gap-4">
          <CreateQuizButton />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default HomePage;
