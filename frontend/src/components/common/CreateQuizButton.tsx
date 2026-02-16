import { Link } from "react-router-dom";
import { buttonClassName } from "./buttonClassName";
import Card from "./Card";
function CreateQuizButton() {
  return (
    <Card>
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
    </Card>
  );
}

export default CreateQuizButton;
