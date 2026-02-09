interface BubbleProps {
  title: string;
  subtitle: string;
}

function Bubble({ title, subtitle }: BubbleProps) {
  return (
    <div className="relative bg-card border border-border rounded-2xl inner-pad">
      <p className="text-sm uppercase tracking-wide text-muted-foreground font-semibold">
        {subtitle}
      </p>
      <h1 className="text-3xl font-bold text-foreground font-display">
        {title}
      </h1>
    </div>
  );
}

export default Bubble;
