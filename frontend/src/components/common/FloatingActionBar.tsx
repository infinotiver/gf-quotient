import type { ReactNode } from "react";

type FloatingActionBarProps = {
  children: ReactNode;
};

export default function FloatingActionBar({
  children,
}: FloatingActionBarProps) {
  return (
    <div
      className="fixed left-1/2 z-40 -translate-x-1/2 pointer-events-none px-4"
      style={{ bottom: "max(1rem, env(safe-area-inset-bottom))" }}
    >
      <div className="pointer-events-auto inline-flex items-center justify-center gap-2 rounded-full border border-border/25 bg-card/75 px-2.5 py-2 sm:px-4 backdrop-blur-2xl">
        {children}
      </div>
    </div>
  );
}
