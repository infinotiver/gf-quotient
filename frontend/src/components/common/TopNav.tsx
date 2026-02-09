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
    <div className="flex items-center justify-between mb-4">
      <Link to="/" className="text-sm font-semibold font-display tracking-wide">
        LoveMeter
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
