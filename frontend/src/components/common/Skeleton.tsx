import Card from "./Card";

type SkeletonProps = {
  lines?: number;
  width?: "sm" | "md" | "lg";
};

const widthMap = {
  sm: "w-1/3",
  md: "w-1/2",
  lg: "w-2/3",
};

export default function Skeleton({ lines = 4, width = "md" }: SkeletonProps) {
  const lineClass = widthMap[width];

  return (
    <Card className="w-full">
      <div className="flex flex-col gap-3">
        <div className={`h-6 ${lineClass} bg-muted rounded animate-pulse`} />
        {Array.from({ length: lines }).map((_, i) => (
          <div key={i} className="h-4 w-full bg-muted rounded animate-pulse" />
        ))}
        <div className="h-10 w-full bg-muted rounded animate-pulse" />
      </div>
    </Card>
  );
}
