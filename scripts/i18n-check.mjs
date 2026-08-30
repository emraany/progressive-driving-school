#!/usr/bin/env node
/**
 * Checks the Somali copy against the English copy.
 *
 * `tsc` already guarantees every key exists in both languages. This catches
 * the three things the type system cannot see:
 *
 *   1. Array-length drift  - an "includes" list with 4 bullets in English and
 *                            3 in Somali is valid TypeScript and missing info.
 *   2. Placeholder drift   - a translator dropping {supervisedHours} would
 *                            silently delete a legally-significant number.
 *   3. Untranslated strings still carrying the TODO(so) marker.
 *
 * Exits non-zero on 1 or 2 always, and on 3 only once Somali is published.
 */
import { readFileSync } from "node:fs";

const EN = "src/content/copy/en.ts";
const SO = "src/content/copy/so.ts";

const read = (p) => readFileSync(p, "utf8");

/** Strip comments, blank out string values, collapse whitespace. */
function skeleton(src) {
  return src
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/^\s*\/\/.*$/gm, "")
    .replace(/"(?:[^"\\]|\\.)*"/g, '""')
    .replace(/\bconst (en|so) =/, "const X =")
    .replace(/export default (en|so);/, "export default X;")
    .replace(/\s+/g, " ")
    .trim();
}

/** Code lines only, with their 1-based line numbers. */
function codeLines(src) {
  const out = [];
  let inBlock = false;
  src.split("\n").forEach((line, i) => {
    const t = line.trim();
    if (inBlock) {
      if (t.includes("*/")) inBlock = false;
      return;
    }
    if (t.startsWith("/*")) {
      if (!t.includes("*/")) inBlock = true;
      return;
    }
    if (t.startsWith("//") || t.startsWith("*") || t === "") return;
    out.push({ n: i + 1, text: line });
  });
  return out;
}

const placeholders = (s) => (s.match(/\{[a-zA-Z]\w*\}/g) || []).sort();

const enSrc = read(EN);
const soSrc = read(SO);
const problems = [];

// 1. Structure, including array lengths.
if (skeleton(enSrc) !== skeleton(soSrc)) {
  problems.push(
    "Structure mismatch between en.ts and so.ts (a key or an array element " +
      "was added or removed on one side).\n     Fix by hand, or regenerate " +
      "with: node scripts/scaffold-so.mjs --force  (discards translations).",
  );
}

// 2. Placeholders, compared line by line while the files stay parallel.
const enLines = codeLines(enSrc);
const soLines = codeLines(soSrc);
if (enLines.length === soLines.length) {
  for (let i = 0; i < enLines.length; i++) {
    const a = placeholders(enLines[i].text);
    const b = placeholders(soLines[i].text);
    if (a.join("|") !== b.join("|")) {
      problems.push(
        `Placeholder mismatch at so.ts:${soLines[i].n}\n` +
          `     en.ts:${enLines[i].n} has ${a.length ? a.join(" ") : "(none)"}\n` +
          `     so.ts:${soLines[i].n} has ${b.length ? b.join(" ") : "(none)"}`,
      );
    }
  }
} else {
  const a = placeholders(enSrc);
  const b = placeholders(soSrc);
  if (a.join("|") !== b.join("|")) {
    problems.push(
      `Placeholder mismatch: en.ts has ${a.length}, so.ts has ${b.length}.`,
    );
  }
}

// 3. Untranslated strings.
// Counted on code lines only - the file header mentions the marker in prose.
const todos = soLines.reduce(
  (n, l) => n + (l.text.match(/TODO\(so\): /g) || []).length,
  0,
);
const published = /publishedLocales:\s*\[([^\]]*)\]/.exec(
  read("src/content/site.ts"),
);
const soIsPublished = published ? published[1].includes('"so"') : false;

if (problems.length) {
  console.error("\ni18n:check failed\n");
  problems.forEach((p) => console.error(`  ✗  ${p}\n`));
  process.exit(1);
}

if (todos > 0) {
  const total = enLines
    .filter((l) => !/^\s*import\s/.test(l.text))
    .reduce((n, l) => n + (l.text.match(/"(?:[^"\\]|\\.)*"/g) || []).length, 0);
  const done = Math.max(0, total - todos);
  console.log(
    `\nSomali: ${done}/${total} strings translated, ${todos} still marked TODO(so).`,
  );
  if (soIsPublished) {
    console.error(
      '\n  ✗  "so" is in publishedLocales but the translation is incomplete.\n' +
        "     Finish so.ts, or remove \"so\" from publishedLocales in site.ts.\n",
    );
    process.exit(1);
  }
  console.log('Somali is not yet published ("so" is absent from publishedLocales) - OK.\n');
} else {
  console.log("\nSomali: fully translated. Structure and placeholders match.\n");
}
