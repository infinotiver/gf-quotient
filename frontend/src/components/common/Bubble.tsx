interface BubbleProps {
  title: string;
  subtitle: string;
  children?: React.ReactNode;
  icon?: React.ReactNode;
}

function Bubble({ title, subtitle, children, icon }: BubbleProps) {
  return (
    <div className="relative bg-card border border-border rounded-2xl inner-pad">
      <p className="text-sm uppercase tracking-wide text-muted-foreground font-semibold">
        {subtitle}
        </p>
      <h1 className="text-3xl font-bold text-foreground font-display">
        <span className="flex items-center gap-2">
          {icon}
          <span>{title}</span>
        </span>
      </h1>
      {children}
    </div>
  );
}

export default Bubble;
