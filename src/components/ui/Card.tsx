import type { ReactNode } from "react";

export function Card({
  children,
  className = "",
  as: Tag = "div",
  id,
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "li";
  id?: string;
}) {
  return (
    <Tag
      id={id}
      className={`rounded-(--radius-card) border border-line bg-surface-raised shadow-[0_1px_2px_rgba(20,26,33,0.04)] ${className}`}
    >
      {children}
    </Tag>
  );
}
