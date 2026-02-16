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
      className={`rounded-3xl bg-card/50 text-card-foreground inner-pad ${className}`}
      {...props}
    >
      {title && <div className="text-lg font-bold">{title}</div>}
      {subtitle && (
        <div className="text-sm text-muted-foreground mt-1">{subtitle}</div>
      )}
      {children && (
        <div className={title || subtitle ? "mt-3" : ""}>{children}</div>
      )}
    </div>
  );
}
