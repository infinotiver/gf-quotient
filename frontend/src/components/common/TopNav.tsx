import { Link } from "react-router-dom";
import Button from "./Button";
import type { ButtonVariant } from "./buttonClassName";

type NavLink = {
  label: string;
  to: string;
  variant?: ButtonVariant;
};

type NavAction = {
  label: string;
  onClick: () => void;
  variant?: ButtonVariant;
};

type TopNavProps = {
  links?: NavLink[];
  actions?: NavAction[];
};

export default function TopNav({ links = [], actions = [] }: TopNavProps) {
  return (
    <div className="sticky top-0 z-50 flex flex-wrap gap-2 rounded-b-xl px-4 py-2 backdrop-blur-2xl flex-row items-center justify-between">
      <Link to="/" className="flex items-center gap-1">
        💕
        <Button variant="ghost">
          LoveMeter
        </Button>
      </Link>
      <div className="flex flex-wrap items-center gap-2">
        {links.map((link) => (
          <Link key={link.to} to={link.to}>
            <Button
              variant={link.variant ?? "ghost"}
              size="sm"
              className="rounded-full"
            >
              {link.label}
            </Button>
          </Link>
        ))}
        {actions.map((action) => (
          <Button
            key={action.label}
            variant={action.variant ?? "ghost"}
            size="sm"
            className="rounded-full"
            onClick={action.onClick}
          >
            {action.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
