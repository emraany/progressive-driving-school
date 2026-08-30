import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

const variants = {
  /** The conversion action - Register. Warm accent, used sparingly. */
  primary:
    "bg-accent-600 text-white hover:bg-accent-700 active:bg-accent-700 shadow-sm",
  /** Supporting action - Call, Contact. */
  secondary: "bg-brand-700 text-white hover:bg-brand-800 active:bg-brand-800",
  /** Quiet action on a light background. */
  outline:
    "border border-line-strong bg-surface-raised text-ink-900 hover:bg-surface-sunken",
  /** For use on a dark background. */
  onDark:
    "border border-white/25 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm",
} as const;

/* Every size clears the 44px minimum tap target. */
const sizes = {
  sm: "h-11 px-3.5 text-sm gap-1.5",
  md: "h-12 px-5 text-[0.9375rem] gap-2",
  lg: "h-14 px-7 text-base gap-2.5",
} as const;

export type ButtonVariant = keyof typeof variants;
export type ButtonSize = keyof typeof sizes;

export function buttonClasses(
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
  className = "",
) {
  return [
    "inline-flex items-center justify-center rounded-lg font-semibold",
    "transition-colors duration-150 whitespace-nowrap",
    "disabled:cursor-not-allowed disabled:opacity-60",
    variants[variant],
    sizes[size],
    className,
  ].join(" ");
}

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...rest
}: {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
} & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">) {
  return (
    <Link href={href} className={buttonClasses(variant, size, className)} {...rest}>
      {children}
    </Link>
  );
}
