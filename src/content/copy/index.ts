import type { Locale } from "@/lib/i18n";
import { en } from "./en";
import { so } from "./so";
import type { Copy } from "./types";

const dictionaries: Record<Locale, Copy> = { en, so };

export function getCopy(locale: Locale): Copy {
  return dictionaries[locale];
}

export type { Copy };
