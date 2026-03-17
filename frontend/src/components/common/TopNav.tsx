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
    <nav className="w-full  backdrop-blur-3xl rounded-xl flex items-center justify-between px-2 py-1">
      <Link
        to="/"
        className="flex items-center gap-2 font-display text-2xl text-primary hover:opacity-90 transition-all select-none"
      >
        <span className="text-3xl">💕</span>
        <span className="tracking-tight font-bold">LoveMeter</span>
      </Link>
      <div className="flex flex-wrap items-center gap-2 bg-primary/40 p-1 rounded-full">
        {links.map((link) => (
          <Link key={link.to} to={link.to}>
            <Button
              variant={link.variant ?? "ghost"}
              size="sm"
              className="rounded-full font-gaegu px-4 text-base hover:bg-accent/60"
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
            className="rounded-full font-gaegu px-4 text-base hover:bg-accent/60"
            onClick={action.onClick}
          >
            {action.label}
          </Button>
        ))}
      </div>
    </nav>
  );
}
