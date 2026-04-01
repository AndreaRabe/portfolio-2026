export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="border-t border-[var(--color-border)] py-8 px-6"
      aria-label="Pied de page"
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-mono text-xs text-[var(--color-muted)]">
          © {year} Andrea — Data Engineer & Analyst
        </p>
        <div className="flex items-center gap-6">
          {[
            { label: "GitHub",   href: "https://github.com" },
            { label: "LinkedIn", href: "https://linkedin.com" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="
                font-mono text-xs text-[var(--color-muted)]
                hover:text-[var(--color-cyan)] transition-colors duration-200
              "
              aria-label={`${link.label} (ouvre dans un nouvel onglet)`}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
