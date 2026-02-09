import ResultsQuickLink from "./ResultsQuickLink";

function Footer() {
  return (
    <div className="fixed bottom-3 left-1/2 -translate-x-1/2 w-auto flex items-center gap-3 py-2 px-3 bg-card border border-border rounded-full text-muted-foreground text-xs z-50">
      <ResultsQuickLink />
      <span className="hidden md:inline text-muted-foreground">
        Made with love by
      </span>
      <a
        href="https://github.com/infinotiver"
        target="_blank"
        rel="noreferrer"
        className="hover:text-foreground font-medium"
      >
        infinotiver
      </a>
      <a
        href="https://github.com/infinotiver/gf-quotient"
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-muted text-foreground hover:bg-muted/70"
      >
        <div className="hidden md:inline">Star on</div> GitHub
      </a>
    </div>
  );
}

export default Footer;
