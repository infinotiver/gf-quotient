const base =
  "inline-flex items-center justify-center gap-2 rounded-2xl font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed";

const variantClasses = {
  primary: "bg-primary text-primary-foreground hover:bg-primary/90",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
  danger: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
  ghost: "bg-transparent text-foreground hover:bg-accent",
} as const;

const sizeClasses = {
  xs: "text-xs px-2 py-1",
  sm: "text-sm px-3 py-1.5",
  md: "text-sm px-4 py-2",
  lg: "text-base px-5 py-3",
} as const;

export type ButtonVariant = keyof typeof variantClasses;
export type ButtonSize = keyof typeof sizeClasses;

export const buttonClassName = (
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
  className = "",
) =>
  `${base} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`.trim();
