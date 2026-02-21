import Button from "./Button";
type FooterProps = {
  stats?: {
    totalQuizzes?: number;
    totalCrushPages?: number;
  };
};

function Footer({ stats }: FooterProps) {
  return (
    <footer className="mt-6 pb-4">
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
        <div className="flex flex-col gap-3 px-3 py-3 text-xs text-muted-foreground backdrop-blur-2xl sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1 ">
            <div className="flex items-center gap-1">
              <span>Made by</span>
              <a
                href="https://github.com/infinotiver"
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-foreground hover:opacity-80"
              >
                infinotiver
              </a>
            </div>
            {stats ? (
              <div className="text-[11px] text-muted-foreground/90">
                {stats.totalQuizzes ?? "--"} quizzes |{" "}
                {stats.totalCrushPages ?? "--"} crush pages
              </div>
            ) : null}
          </div>
          <div className="flex items-center gap-2 text-xs">
            <a href="/privacy">
              <Button variant="ghost" size="xs">
                Privacy
              </Button>
            </a>
            <a
              href="https://github.com/infinotiver/gf-quotient"
              target="_blank"
              rel="noreferrer"
              
            >
              <Button variant="ghost" size="xs">
              GitHub</Button>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
