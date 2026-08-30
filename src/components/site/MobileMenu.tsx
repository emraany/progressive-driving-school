"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import type { NavItem } from "@/lib/nav";

export function MobileMenu({
  items,
  navLabel,
  openLabel,
  closeLabel,
}: {
  items: NavItem[];
  navLabel: string;
  openLabel: string;
  closeLabel: string;
}) {
  const pathname = usePathname();
  const panelId = useId();

  // The menu is open only for the path it was opened on, so navigating away
  // closes it during render - no effect, no cascading re-render.
  const [openFor, setOpenFor] = useState<string | null>(null);
  const open = openFor === pathname;
  const setOpen = (next: boolean) => setOpenFor(next ? pathname : null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenFor(null);
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? closeLabel : openLabel}
        className="grid h-11 w-11 place-items-center rounded-lg border border-line text-ink-900 hover:bg-surface-sunken lg:hidden"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
        </svg>
      </button>

      {open ? (
        <>
          {/* Tap anywhere outside to close. aria-hidden because the toggle
              button above is already the close affordance.

              Portaled to <body> deliberately: the header bar uses
              backdrop-blur, and backdrop-filter establishes a containing block
              for position:fixed descendants. Rendered in place, this scrim
              would size itself against the 64px header bar and collapse to
              zero height instead of covering the viewport. */}
          {createPortal(
            <div
              aria-hidden="true"
              onClick={() => setOpenFor(null)}
              className="fixed inset-0 top-26 z-40 bg-ink-900/35 lg:hidden"
            />,
            document.body,
          )}
          <div
            id={panelId}
            className="absolute inset-x-0 top-full border-b border-line bg-surface-raised shadow-lg lg:hidden"
          >
            <nav aria-label={navLabel} className="px-5 py-2 sm:px-6">
              <ul className="divide-y divide-line">
                {items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="block py-4 text-base font-medium text-ink-900"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </>
      ) : null}
    </>
  );
}
