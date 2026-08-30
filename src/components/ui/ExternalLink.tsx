import type { ReactNode } from "react";

/**
 * A link to a site we don't control - in practice, the Ohio BMV.
 *
 * Always opens in a new tab so a visitor part-way through reading the
 * requirements doesn't lose their place, and always announces that to screen
 * readers rather than surprising them.
 */
export function ExternalLink({
  href,
  children,
  className = "",
  newTabLabel,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  /** copy.a11y.opensInNewTab */
  newTabLabel: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`underline decoration-brand-300 decoration-1 underline-offset-4 hover:decoration-brand-600 ${className}`}
    >
      {children}
      <span className="sr-only"> ({newTabLabel})</span>
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="ml-1 inline-block h-[0.8em] w-[0.8em] align-baseline"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M7 17 17 7M9 7h8v8" />
      </svg>
    </a>
  );
}
