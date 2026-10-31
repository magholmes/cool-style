#!/usr/bin/env node
/**
 * new.mjs — start a site from one of the archetype starters.
 *
 *   node new.mjs <archetype> <dir> [--force]
 *   node new.mjs --list
 *
 * Archetypes (see references/archetypes.md for when each fits):
 *   index     archive / portfolio as one ruled list; hover floats the image
 *   sentence  the whole site is one sentence; its noun phrases are the links
 *   room      one screen of things you can pick up and move; remembers them
 *   notebook  text first: browser serif, margin notes, dates, RSS, colophon
 *   poster    one word as big as the screen, four corners, a field that follows the hour
 *   almanac   the year as 365 squares; the page knows what day it is
 *   atlas     links as places on a plane you wander; a random door
 *
 * Each starter is one self-contained index.html (4–9 KB, no dependencies) that
 * passes `audit.mjs --strict`. Copy it, then make it yours: the placeholder
 * words are there to be replaced, not kept.
 */

import { cpSync, existsSync, readdirSync, readFileSync, mkdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const starters = join(here, "..", "assets", "starters");
const names = readdirSync(starters).filter((n) => existsSync(join(starters, n, "index.html")));
const args = process.argv.slice(2);

if (!args.length || args.includes("--list") || args.includes("-h") || args.includes("--help")) {
  for (const n of names) {
    const html = readFileSync(join(starters, n, "index.html"), "utf8");
    const blurb = /<!--\s*\n?\s*The [^—]+—\s*([^\n]+)/.exec(html)?.[1]?.trim() ?? "";
    console.log(`${n.padEnd(9)} ${blurb}`);
  }
  console.log("\nusage: node new.mjs <archetype> <dir> [--force]");
  process.exit(args.length ? 0 : 1);
}

const [kind, dir] = args.filter((a) => !a.startsWith("--"));
if (!names.includes(kind)) {
  console.error(`unknown archetype "${kind}". choose one of: ${names.join(", ")}`);
  process.exit(1);
}
if (!dir) {
  console.error("say where to put it: node new.mjs <archetype> <dir>");
  process.exit(1);
}
const target = resolve(dir);
if (existsSync(join(target, "index.html")) && !args.includes("--force")) {
  console.error(`${join(target, "index.html")} exists — pass --force to overwrite it.`);
  process.exit(1);
}
mkdirSync(target, { recursive: true });
cpSync(join(starters, kind), target, { recursive: true });
console.log(`${kind} → ${join(target, "index.html")}`);
console.log("next: replace every placeholder word, choose your one idea (SKILL.md § Find the idea), then run audit.mjs.");
