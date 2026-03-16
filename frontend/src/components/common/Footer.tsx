import Button from "./Button";
type FooterProps = {
  stats?: {
    totalQuizzes?: number;
    totalCrushPages?: number;
  };
};

function Footer({ stats }: FooterProps) {
  return (
    <footer className="mt-10 pb-6 w-full bg-transparent">
      <div className="mx-auto w-full max-w-5xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 px-4 py-4 m">
          <div className="flex flex-col items-center md:items-start gap-1">
            <div className="flex items-center gap-2 font-display text-lg text-foreground">
              <span>
                Made with love by
              </span>
              <a
                href="https://github.com/infinotiver"
                target="_blank"
                rel="noreferrer"
                className="font-semibold underline underline-offset-2 hover:text-primary transition-colors"
              >
                infinotiver
              </a>
            </div>
            {stats ? (
              <div className="text-xs font-gaegu text-muted-foreground/90 tracking-wide">
                {stats.totalQuizzes ?? "--"} quizzes &bull;{" "}
                {stats.totalCrushPages ?? "--"} crush pages
              </div>
            ) : null}
          </div>
          <div className="flex items-center gap-3 mt-2 md:mt-0">
            <a href="/privacy">
              <Button variant="ghost" size="sm" className="font-gaegu px-3">
                Privacy
              </Button>
            </a>
            <a
              href="https://github.com/infinotiver/gf-quotient"
              target="_blank"
              rel="noreferrer"
            >
              <Button variant="ghost" size="sm" className="font-gaegu px-3">
                GitHub
              </Button>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
