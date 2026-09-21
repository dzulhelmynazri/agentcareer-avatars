const year = new Date().getFullYear();

export const Footer = () => (
  <footer className="border-border border-t border-dotted">
    <div className="mx-auto max-w-6xl px-6 py-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-muted-foreground text-xs">
          &copy; {year} Dzulhelmy Nazri
        </p>
        <p className="text-muted-foreground font-mono text-xs">MIT License</p>
      </div>
    </div>
  </footer>
);
