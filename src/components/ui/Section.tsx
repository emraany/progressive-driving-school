import type { ReactNode } from "react";
import { Container } from "./Container";

const tones = {
  default: "bg-surface",
  sunken: "bg-surface-sunken",
  raised: "bg-surface-raised",
  brand: "bg-brand-800 text-brand-100",
} as const;

export function Section({
  children,
  tone = "default",
  className = "",
  width = "default",
  id,
}: {
  children: ReactNode;
  tone?: keyof typeof tones;
  className?: string;
  width?: "default" | "narrow" | "wide";
  id?: string;
}) {
  return (
    <section id={id} className={`${tones[tone]} py-14 sm:py-20 ${className}`}>
      <Container width={width}>{children}</Container>
    </section>
  );
}

/** Section heading with an optional eyebrow and lede. */
export function SectionHeader({
  eyebrow,
  heading,
  lede,
  inverted = false,
}: {
  eyebrow?: string;
  heading: string;
  lede?: string;
  inverted?: boolean;
}) {
  return (
    <header className="max-w-2xl">
      {eyebrow ? (
        <p
          className={`mb-3 text-xs font-semibold tracking-[0.14em] uppercase ${
            inverted ? "text-brand-200" : "text-brand-600"
          }`}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={`text-(length:--text-h2) leading-[1.15] font-semibold ${
          inverted ? "text-white" : ""
        }`}
      >
        {heading}
      </h2>
      {lede ? (
        <p
          className={`mt-4 text-base leading-relaxed sm:text-lg ${
            inverted ? "text-brand-100" : "text-ink-500"
          }`}
        >
          {lede}
        </p>
      ) : null}
    </header>
  );
}
