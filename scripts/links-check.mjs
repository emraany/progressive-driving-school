#!/usr/bin/env node
/**
 * Verifies every externally-hosted URL the site links to still resolves.
 *
 * The site sends visitors to six Ohio government URLs that this business does
 * not control. One of them was already dead when the client handed it over -
 * publicsafety.ohio.gov/links/bmv5791.pdf returned 404, and the BMV's own
 * forms page still advertises it. They will rot again.
 *
 * Run before every deploy, and whenever you touch src/content/bmv.ts.
 */
import { readFileSync } from "node:fs";

const files = ["src/content/bmv.ts", "src/content/site.ts"];
const urls = new Set();

for (const file of files) {
  const src = readFileSync(file, "utf8")
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/^\s*\/\/.*$/gm, "")
    // `url:` is this site's own canonical origin, which does not exist until
    // the first deploy. Only third-party links are checked here.
    .replace(/^\s*url:.*$/gm, "");
  for (const m of src.matchAll(/"(https?:\/\/[^"\s]+)"/g)) urls.add(m[1]);
}

if (urls.size === 0) {
  console.error("links:check found no URLs - did the content files move?");
  process.exit(1);
}

console.log(`\nChecking ${urls.size} external links...\n`);

let failed = 0;
await Promise.all(
  [...urls].map(async (url) => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 20_000);
    try {
      let res = await fetch(url, {
        redirect: "follow",
        signal: controller.signal,
        headers: { "user-agent": "Mozilla/5.0 (links-check)" },
      });
      // Some government hosts reject HEAD but answer GET; we only use GET.
      if (res.ok) {
        console.log(`  ✓  ${res.status}  ${url}`);
      } else {
        failed++;
        console.error(`  ✗  ${res.status}  ${url}`);
      }
    } catch (err) {
      failed++;
      console.error(`  ✗  ${err.name === "AbortError" ? "timeout" : "error"}  ${url}`);
    } finally {
      clearTimeout(timer);
    }
  }),
);

if (failed) {
  console.error(
    `\n${failed} link(s) failed. Find the current URL, update ` +
      "src/content/bmv.ts, and bump `lastVerified`.\n",
  );
  process.exit(1);
}
console.log("\nAll external links resolve.\n");
