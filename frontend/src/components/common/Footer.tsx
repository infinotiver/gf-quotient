function Footer() {
  return (
    <div className="fixed bottom-3 right-3 w-auto flex items-center gap-2 py-2 px-3 bg-card/90 border border-border rounded-full text-muted-foreground text-xs z-50 backdrop-blur">
      <span className="hidden md:inline text-muted-foreground">
        Made with love by
      </span>
      <a
        href="https://github.com/infinotiver"
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-muted text-foreground hover:bg-muted/70 font-medium"
      >
        infinotiver
      </a>
      <span className="hidden md:inline text-muted-foreground/60">•</span>
      <a href="/privacy" className="hover:text-foreground font-medium">
        Privacy
      </a>
      <span className="hidden md:inline text-muted-foreground/60">•</span>
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
