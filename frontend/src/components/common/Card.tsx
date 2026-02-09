import type { HTMLAttributes, ReactNode } from "react";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  title?: string;
  subtitle?: string;
  children?: ReactNode;
};

export default function Card({
  title,
  subtitle,
  className = "",
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={`bg-card text-card-foreground border border-border rounded-2xl inner-pad ${className}`}
      {...props}
    >
      {title && <div className="text-lg font-bold">{title}</div>}
      {subtitle && (
        <div className="text-sm text-muted-foreground mt-1">{subtitle}</div>
      )}
      {children && <div className={title || subtitle ? "mt-3" : ""}>{children}</div>}
    </div>
  );
}
