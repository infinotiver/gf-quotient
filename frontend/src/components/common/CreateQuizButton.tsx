import { Link } from "react-router-dom";
import { buttonClassName } from "./Button";

function CreateQuizButton() {
  return (
    <div className="bg-card border border-border rounded-2xl inner-pad">
      <div className="text-lg font-semibold text-foreground mb-3">
        Create your quiz
      </div>
      <Link
        to="/create-quiz"
        className={buttonClassName("primary", "lg", "w-full")}
      
      >
        Start
      </Link>
    </div>
  );
}

export default CreateQuizButton;
