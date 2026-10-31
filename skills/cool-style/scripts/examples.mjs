#!/usr/bin/env node
/**
 * examples.mjs — find real sites from the study that show a move.
 *
 *   node examples.mjs <tag|word ...> [--kind <kind>] [--live] [--exemplars]
 *                     [--top N] [--random N] [--json] [--tags]
 *
 *   node examples.mjs ix-hover-reveal               sites tagged with a move
 *   node examples.mjs clock time --live              free-text search (all words must match)
 *   node examples.mjs --kind type-foundry --top 8    best of a kind
 *   node examples.mjs layout-desktop-windows --exemplars
 *   node examples.mjs --random 5                     five sites to look at before starting
 *   node examples.mjs --tags                         every tag with its count
 *
 * Reads ../data/sites.json (the 916 sites behind this skill, noted
 * October 2026). Zero dependencies. Ranking: exemplars first, then
 * distinctiveness + craft. Dead sites are kept (their move is still on record)
 * but marked; pass --live to hide them.
 */

import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const sites = JSON.parse(readFileSync(join(here, "..", "data", "sites.json"), "utf8"));

const args = process.argv.slice(2);
const flag = (name) => args.includes(name);
const opt = (name) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : undefined;
};
const valueFlags = new Set(["--kind", "--top", "--random"]);
const terms = args
  .filter((a, i) => !a.startsWith("--") && !valueFlags.has(args[i - 1]))
  .map((t) => t.toLowerCase());

if (flag("--tags")) {
  const counts = new Map();
  for (const s of sites) for (const t of s.tags ?? []) counts.set(t, (counts.get(t) ?? 0) + 1);
  const groups = new Map();
  for (const [t, c] of [...counts].sort((a, b) => b[1] - a[1])) {
    const g = t.split("-")[0];
    if (!groups.has(g)) groups.set(g, []);
    groups.get(g).push(`${t} ${c}`);
  }
  for (const [g, items] of groups) console.log(`${g}: ${items.join(", ")}\n`);
  process.exit(0);
}

const haystack = (s) =>
  [s.name, s.domain, s.title, s.one_line, s.signature, s.why, s.steal, s.behaviour,
   ...(s.moves ?? []), ...(s.tags ?? []), ...Object.values(s.look ?? {})]
    .filter(Boolean).join(" ").toLowerCase();

let hits = sites.filter((s) => {
  if (flag("--live") && !["live", "changed"].includes(s.status)) return false;
  if (flag("--exemplars") && !s.exemplar) return false;
  if (opt("--kind") && s.kind !== opt("--kind")) return false;
  if (!terms.length) return true;
  const tags = new Set(s.tags ?? []);
  const text = haystack(s);
  return terms.every((t) => tags.has(t) || text.includes(t));
});

const score = (s) => (s.exemplar ? 20 : 0) + (s.distinct ?? 0) * 2 + (s.craft ?? 0);
if (opt("--random")) {
  hits = hits.filter((s) => (s.distinct ?? 0) >= 4);
  for (let i = hits.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [hits[i], hits[j]] = [hits[j], hits[i]];
  }
  hits = hits.slice(0, Number(opt("--random")) || 5);
} else {
  hits.sort((a, b) => score(b) - score(a));
  hits = hits.slice(0, Number(opt("--top")) || 12);
}

if (flag("--json")) {
  console.log(JSON.stringify(hits, null, 2));
  process.exit(0);
}
if (!hits.length) {
  console.log("no matches — try a broader word, or `--tags` to see the vocabulary");
  process.exit(0);
}
for (const s of hits) {
  const mark = s.exemplar ? "★" : " ";
  const state = ["live", "changed"].includes(s.status) ? "" : `  [${s.status}]`;
  console.log(`${mark} #${s.n} ${s.name ?? s.domain} — ${s.url}${state}`);
  if (s.signature) console.log(`    move:  ${s.signature}`);
  if (s.steal) console.log(`    steal: ${s.steal}`);
  if (s.look?.type) console.log(`    type:  ${s.look.type}`);
  console.log(`    tags:  ${(s.tags ?? []).join(" ")}  · distinct ${s.distinct ?? "?"} · craft ${s.craft ?? "?"}`);
  console.log("");
}
