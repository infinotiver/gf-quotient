import { Link } from "react-router-dom";
import { buttonClassName } from "./buttonClassName";
import Card from "./Card";
function CreateCrushCard() {
  return (
    <Card>
      <div className="text-lg font-semibold text-foreground mb-3">
        Ask your crush out
      </div>
      <div className="text-sm text-muted-foreground mb-3">
        A tiny utility to ask them out in a creative way (and we'll try to get you a date, hopefully).
      </div>
      <Link
        to="/crush/create"
        className={buttonClassName("secondary", "lg", "w-full")}
      >
        Be bold, ask now!
      </Link>
    </Card>
  );
}

export default CreateCrushCard;
