import { Link } from "react-router-dom";
import { buttonClassName } from "./buttonClassName";

function CreateQuizButton() {
  return (
    <div className="bg-card border border-border rounded-2xl inner-pad">
      <div className="text-lg font-semibold text-foreground mb-3">
        Create your quiz
      </div>
      <div className="text-sm text-muted-foreground mb-3">
        Create a personalized quiz to share with your partner and see how well they know you.
      </div>
      <Link
        to="/create-quiz"
        className={buttonClassName("primary", "lg", "w-full")}
      >
        Create the quiz
      </Link>
    </div>
  );
}

export default CreateQuizButton;
