#!/usr/bin/env node
/**
 * Regenerate src/content/copy/so.ts from en.ts.
 *
 * Every English string is carried over, prefixed with "TODO(so): ", so the
 * file is fill-in-the-blank with the English original sitting right there for
 * reference. Structure is identical to en.ts by construction, so `tsc` and
 * i18n:check agree with it from the start.
 *
 * To translate a string: replace the whole value, TODO marker included.
 *
 * Refuses to clobber an existing so.ts unless run with --force, so a partial
 * translation is never destroyed by a stray re-run.
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";

const EN = "src/content/copy/en.ts";
const SO = "src/content/copy/so.ts";
const MARKER = "TODO(so): ";

const force = process.argv.includes("--force");
if (existsSync(SO) && !force) {
  console.error(
    `${SO} already exists. Re-run with --force to overwrite it.\n` +
      "Warning: that discards any translation already in the file.",
  );
  process.exit(1);
}

const lines = readFileSync(EN, "utf8").split("\n");
const out = [];
let inBlockComment = false;

for (let line of lines) {
  const trimmed = line.trim();

  // Track block comments so quotes inside prose are never treated as code.
  if (inBlockComment) {
    if (trimmed.includes("*/")) inBlockComment = false;
    out.push(line);
    continue;
  }
  if (trimmed.startsWith("/*")) {
    if (!trimmed.includes("*/")) inBlockComment = true;
    out.push(line);
    continue;
  }
  if (trimmed.startsWith("//") || trimmed.startsWith("*")) {
    out.push(line);
    continue;
  }
  if (/^\s*import\s/.test(line)) {
    out.push(line);
    continue;
  }

  line = line
    .replace(/export const en = \{/, "export const so = {")
    .replace(/^export default en;/, "export default so;");

  // Prefix every string literal value. Object keys in en.ts are bare
  // identifiers, so every quoted run on a code line is a value.
  line = line.replace(/"((?:[^"\\]|\\.)*)"/g, (whole, body) =>
    body.startsWith(MARKER) ? whole : `"${MARKER}${body}"`,
  );

  out.push(line);
}

let src = out.join("\n");
src = src.replace(
  "ENGLISH COPY",
  "SOMALI COPY  (Af-Soomaali)",
);
src = src.replace(
  " * All visible English text.",
  " * SCAFFOLD - not yet translated. Every string below is still English,\n" +
    ' * prefixed with "TODO(so): ". Replace each value with its Somali\n' +
    " * translation, marker included. Run `npm run i18n:check` to see what's left.\n" +
    " *\n" +
    " * Somali is written in Latin script, left to right. Expect translated text\n" +
    " * to run 15-25% longer than English - the layout allows for it.\n" +
    " *\n" +
    " * All visible Somali text.",
);

writeFileSync(SO, src);
const remaining = (src.match(/TODO\(so\): /g) || []).length;
console.log(`Wrote ${SO} - ${remaining} strings awaiting translation.`);
