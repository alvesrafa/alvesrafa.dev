'use client';

interface FooterProps {
  dictionary: {
    build: string;
    tagline: string;
    scrollTop: string;
    copyright?: string;
    builtWith?: string;
    and?: string;
    deployedOn?: string;
  };
}

export function Footer({ dictionary }: FooterProps) {
  const buildDate = new Date().toISOString().slice(0, 10).replace(/-/g, '.');

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer
      className="flex items-center justify-between px-6 md:px-12 py-8"
      style={{
        borderTop: '1px solid #18181b',
        fontFamily: 'var(--font-mono)',
        fontSize: '11px',
        color: '#71717a',
        letterSpacing: '0.06em',
      }}
    >
      {/* Left: build info */}
      <span className="flex items-center gap-2">
        <span
          className="block w-1.5 h-1.5 rounded-full bg-primary-400"
          aria-hidden="true"
        />
        {dictionary.build} · {buildDate}
      </span>

      {/* Center: tagline */}
      <span className="hidden md:inline">{dictionary.tagline}</span>

      {/* Right: scroll top */}
      <button
        onClick={scrollToTop}
        className="hover:text-neutral-50 transition-colors duration-200"
        aria-label="Scroll to top"
      >
        {dictionary.scrollTop}
      </button>
    </footer>
  );
}
