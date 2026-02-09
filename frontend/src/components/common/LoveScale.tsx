type LoveScaleProps = {
  score: number;
  total: number;
  label?: string;
};

export default function LoveScale({ score, total, label }: LoveScaleProps) {
  const safeTotal = total > 0 ? total : 1;
  const pct = Math.round((score / safeTotal) * 100);

  const segments = [
    { label: "Warm", color: "bg-muted" },
    { label: "Spark", color: "bg-accent" },
    { label: "Magnetic", color: "bg-primary/70" },
    { label: "Electric", color: "bg-primary" },
    { label: "All‑In", color: "bg-success" },
  ];
  const filled = Math.round((pct / 100) * segments.length);

  return (
    <div className="w-full flex flex-col items-center gap-2">
      {label && <div className="text-sm text-muted-foreground">{label}</div>}
      <div className="w-full max-w-md">
        <div className="flex items-center gap-1">
          {segments.map((seg, idx) => {
            const isFilled = idx < filled;
            return (
              <div
                key={seg.label}
                className={`h-3 flex-1 rounded ${isFilled ? seg.color : "bg-muted/50"}`}
                title={seg.label}
              />
            );
          })}
        </div>
        <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
          <span>0%</span>
          <span className="text-sm font-bold text-primary">{pct}%</span>
          <span>100%</span>
        </div>
        <div className="mt-1 text-xs text-muted-foreground text-center">
          {score} / {total}
        </div>
      </div>
    </div>
  );
}
