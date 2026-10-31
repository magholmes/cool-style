#!/usr/bin/env node
/**
 * audit.mjs — "cool-check": reads a site's source and reports
 *   errors    template tells and harm (fail CI)
 *   warnings  drift toward the generic, and craft gaps
 *   moves     the cool moves it already makes (from the study's moves library)
 *
 *   node audit.mjs [dir] [--json] [--github] [--strict] [--max-kb 600] [--quiet]
 *
 * Zero dependencies, Node 18+. Reads .html/.htm/.css/.scss/.js/.mjs/.ts/.jsx/.tsx/
 * .vue/.svelte/.astro/.mdx, skipping node_modules, build output and minified
 * vendor files. Exit code 1 on any error (or any warning with --strict).
 * --github prints workflow annotations so findings land on the PR diff.
 *
 * Heuristic by design. It cannot tell whether a site is cool — only whether it
 * arrived wearing a template, skipped the guardrails, or already makes some of
 * the moves the 916 studied sites make. Read every warning as a question.
 * A deliberate counter-example can sit between `cool-check:off` and
 * `cool-check:on` comments; that span is skipped.
 */

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, extname, resolve } from "node:path";

const args = process.argv.slice(2);
const valueFlags = new Set(["--max-kb"]);
const root = resolve(args.find((a, i) => !a.startsWith("--") && !valueFlags.has(args[i - 1])) ?? ".");
const asJson = args.includes("--json");
const github = args.includes("--github");
const strict = args.includes("--strict");
const quiet = args.includes("--quiet");
const maxKb = Number(args[args.indexOf("--max-kb") + 1]) || 600;

const SKIP_DIRS = new Set(["node_modules", ".git", ".next", ".nuxt", ".svelte-kit", ".output",
  ".vercel", ".netlify", ".turbo", ".cache", "dist", "build", "out", "coverage", "vendor", "_site"]);
const STYLE = new Set([".css", ".scss", ".sass", ".less", ".pcss"]);
const MARKUP = new Set([".html", ".htm", ".vue", ".svelte", ".astro", ".mdx", ".jsx", ".tsx"]);
const SCRIPT = new Set([".js", ".mjs", ".cjs", ".ts"]);

/* Faces that every scaffold arrives wearing. Inter and Geist are errors; the
   rest are template staples worth a second thought. */
const GENERATED_FACES = ["inter", "inter var", "inter display", "inter tight", "geist", "geist sans", "geist mono"];
const TEMPLATE_FACES = ["poppins", "montserrat", "roboto", "open sans", "lato", "raleway", "nunito",
  "nunito sans", "dm sans", "plus jakarta sans", "manrope", "outfit", "figtree"];
const GENERIC = /^(serif|sans-serif|monospace|cursive|fantasy|system-ui|ui-serif|ui-sans-serif|ui-monospace|ui-rounded|-apple-system|blinkmacsystemfont|segoe ui|segoe ui emoji|segoe ui symbol|apple color emoji|noto color emoji|emoji|inherit|initial|unset|revert|var\(.*|helvetica|helvetica neue|arial|times|times new roman|georgia|courier|courier new|menlo|monaco|consolas|sf mono|sfmono-regular|liberation mono|cascadia code|cascadia mono)$/;
const SCAFFOLD_TITLES = /^(vite \+ \w+|vite app|react app|create next app|next\.js app|svelte app|sveltekit app|nuxt app|astro|document|webpage title|untitled|untitled document|home|index|my website|my app|website|new page|page title)$/i;
const SAAS_COPY = [
  /\belevate (your|the)\b/i, /\bunlock (the|your)\b/i, /\bseamless(ly)?\b/i, /\bsupercharge\b/i,
  /\bempower(s|ing)?\b/i, /\brevolutioni[sz]e/i, /\bnext[- ]gen(eration)?\b/i, /\bcutting[- ]edge\b/i,
  /\bgame[- ]chang/i, /\ball[- ]in[- ]one\b/i, /\btransform your\b/i, /\bto the next level\b/i,
  /\bin today'?s fast[- ]paced\b/i, /\bleverage\b/i, /\bunleash\b/i, /\bworld[- ]class\b/i,
  /\bbest[- ]in[- ]class\b/i, /\bstreamline\b/i, /\bharness the power\b/i, /\beffortless(ly)?\b/i,
];
const CTA_CLICHES = /\b(get started( for free| today| now)?|learn more|book a demo|join the waitlist|sign up for free|start your free trial|request a demo)\b/i;

const findings = [];
const moves = new Map();
const add = (severity, file, line, rule, message) => findings.push({ severity, file, line, rule, message });
const move = (key, label, file) => { if (!moves.has(key)) moves.set(key, { label, file }); };

function walk(dir, out = []) {
  let entries = [];
  try { entries = readdirSync(dir); } catch { return out; }
  for (const name of entries) {
    if (SKIP_DIRS.has(name)) continue;
    const full = join(dir, name);
    let st;
    try { st = statSync(full); } catch { continue; }
    if (st.isDirectory()) walk(full, out);
    else if (st.size < 2_000_000) {
      const ext = extname(name).toLowerCase();
      if (/\.min\.(js|css)$/.test(name) || name.endsWith(".d.ts")) continue;
      if (STYLE.has(ext) || MARKUP.has(ext) || SCRIPT.has(ext)) out.push({ full, ext, size: st.size });
    }
  }
  return out;
}

const lineOf = (text, i) => text.slice(0, i).split("\n").length;
const blankOff = (t) => t.replace(/cool-check:off[\s\S]*?cool-check:on/g, (m) => m.replace(/[^\n]/g, " "));
const stripComments = (css) => css.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "));

const files = walk(root).map((f) => {
  const raw = readFileSync(f.full, "utf8");
  return { ...f, rel: relative(root, f.full).replace(/\\/g, "/"), text: blankOff(raw) };
});
if (!files.length) {
  console.error(`cool-check: no HTML/CSS/JS found under ${root}`);
  process.exit(2);
}

/* Pull CSS and JS out of markup so every rule sees the whole project. */
const cssChunks = [];   // {rel, text, offset}
const jsChunks = [];
const markup = [];
for (const f of files) {
  if (STYLE.has(f.ext)) cssChunks.push({ rel: f.rel, text: stripComments(f.text), base: 0 });
  else if (SCRIPT.has(f.ext)) jsChunks.push({ rel: f.rel, text: f.text, base: 0 });
  if (MARKUP.has(f.ext)) {
    markup.push(f);
    for (const m of f.text.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi))
      cssChunks.push({ rel: f.rel, text: stripComments(m[1]), base: lineOf(f.text, m.index) - 1 });
    for (const m of f.text.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi))
      jsChunks.push({ rel: f.rel, text: m[1], base: lineOf(f.text, m.index) - 1 });
    const inline = [...f.text.matchAll(/\sstyle=["'{]([^"'}]*)["'}]/g)].map((m) => m[1]).join(";\n");
    if (inline) cssChunks.push({ rel: f.rel, text: inline, base: 0, inline: true });
    if ([".jsx", ".tsx", ".vue", ".svelte", ".astro"].includes(f.ext)) jsChunks.push({ rel: f.rel, text: f.text, base: 0 });
  }
}
const allCss = cssChunks.map((c) => c.text).join("\n");
const allJs = jsChunks.map((c) => c.text).join("\n");
const allMarkup = markup.map((f) => f.text).join("\n");
const everything = files.map((f) => f.text).join("\n");
const at = (chunk, i) => chunk.base + lineOf(chunk.text, i);

/* ---------- project-wide facts ---------- */
const hasReducedMotion = /prefers-reduced-motion/.test(everything);
const hasFocusVisible = /:focus-visible|:focus-within|focus-visible:|focus:/.test(everything);
const pointerFollower = /(pointermove|mousemove)/.test(allJs);
const animates = /@keyframes|animation\s*:|\banimate\(|requestAnimationFrame|gsap|anime\(|motion\.|framer-motion|\banimate-\w+|transition-\w+/.test(everything);

/* ---------- markup ---------- */
for (const f of markup) {
  const t = f.text;
  const isPage = /<html[\s>]/i.test(t);
  if (isPage) {
    const title = /<title[^>]*>([\s\S]*?)<\/title>/i.exec(t);
    if (!title || !title[1].trim()) add("error", f.rel, 1, "title", "no <title> — the tab is the first thing anyone reads; name the place.");
    else if (SCAFFOLD_TITLES.test(title[1].trim()))
      add("error", f.rel, lineOf(t, title.index), "title", `<title>${title[1].trim()}</title> is the scaffold's, not yours.`);
    if (!/<html[^>]*\slang=/i.test(t)) add("warn", f.rel, 1, "lang", "<html> has no lang — screen readers guess, translators garble.");
    const vp = /<meta[^>]+name=["']viewport["'][^>]*>/i.exec(t);
    if (!vp) add("warn", f.rel, 1, "viewport", "no viewport meta — phones render a shrunken desktop page.");
    else if (/user-scalable\s*=\s*(no|0)|maximum-scale\s*=\s*1(\.0)?\b/i.test(vp[0]))
      add("error", f.rel, lineOf(t, vp.index), "zoom", "pinch-zoom is disabled — 18% of the studied sites do this; don't copy it.");
    if (!/<link[^>]+rel=["'][^"']*icon/i.test(t)) add("warn", f.rel, 1, "favicon", "no favicon — one line (an emoji or a glyph in an SVG) makes the tab yours.");
    else move("favicon", "a favicon of its own", f.rel);
  }
  for (const m of t.matchAll(/<img\b[^>]*>/gi)) {
    if (!/\balt\s*=/.test(m[0])) add("error", f.rel, lineOf(t, m.index), "alt", 'an <img> without alt — describe it, or alt="" if it is decoration.');
  }
  for (const m of t.matchAll(/<(audio|video)\b[^>]*\bautoplay\b[^>]*>/gi)) {
    if (m[1].toLowerCase() === "audio" || !/\bmuted\b/i.test(m[0]))
      add("error", f.rel, lineOf(t, m.index), "autoplay-sound", "sound that starts by itself — start it from a click, and show how to stop it.");
  }
  if (/<marquee\b/i.test(t)) add("warn", f.rel, lineOf(t, t.search(/<marquee\b/i)), "marquee",
    "<marquee> can't be paused or reduced — use the CSS ticker in references/interaction.md.");
  const text = t.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " ");
  if (/lorem ipsum/i.test(text)) add("error", f.rel, lineOf(t, t.search(/lorem ipsum/i)), "lorem", "lorem ipsum — write the real words; voice is half the site.");
  const saas = SAAS_COPY.filter((rx) => rx.test(text));
  if (saas.length) add(saas.length >= 3 ? "error" : "warn", f.rel, 1, "voice",
    `brochure words (${saas.map((r) => text.match(r)[0].toLowerCase()).join(", ")}) — say what it is, in your own sentence.`);
  const cta = text.match(CTA_CLICHES);
  if (cta) add("warn", f.rel, lineOf(t, t.indexOf(cta[0])), "voice", `"${cta[0]}" — label the link with where it goes or what happens.`);
  if (/\.\.\.(?!\s*[)\]}])/.test(text) && !/\.\.\.\w/.test(text)) add("info", f.rel, 1, "ellipsis", 'three dots — use the "…" character.');
  if (/<link[^>]+type=["']application\/(rss|atom)\+xml/i.test(t)) move("feed", "an RSS/Atom feed", f.rel);
  if (/last (updated|modified)|updated (on|:)/i.test(text)) move("last-updated", "a last-updated stamp", f.rel);
  if (/colophon|set in |typeset in|built with|made with|hand[- ]coded/i.test(text)) move("colophon", "a colophon (what it's made of)", f.rel);
  if (/<details\b/i.test(t)) move("details", "<details> for things that unfold", f.rel);
  if (/<(form|textarea)\b/i.test(t) && /guestbook|leave a (note|message)|sign the|add your|submit your/i.test(text)) move("participation", "a place for visitors to leave something", f.rel);
  const ext = [...t.matchAll(/<a\b[^>]+href=["'](https?:)?\/\/([^/"']+)/gi)].map((m) => m[2]);
  if (new Set(ext).size >= 5) move("links-out", `links out to ${new Set(ext).size} other sites`, f.rel);
}

/* ---------- CSS ---------- */
const sizes = new Set();
const colours = new Set();
const families = new Map();
let softCards = 0, softFirst = null;
for (const c of cssChunks) {
  const t = c.text;
  for (const m of t.matchAll(/transition(-property)?\s*:\s*([^;}]+)/g)) {
    if (/(^|[\s,])all([\s,]|$)/.test(m[2])) add("error", c.rel, at(c, m.index), "transition-all", "`transition: all` — name the properties you mean to move.");
  }
  for (const m of t.matchAll(/outline\s*:\s*(none|0)\b/g)) {
    if (!hasFocusVisible) add("error", c.rel, at(c, m.index), "focus", "focus outline removed and no :focus-visible style anywhere — keyboard users get lost.");
  }
  for (const m of t.matchAll(/cursor\s*:\s*none/g)) {
    if (!pointerFollower) add("error", c.rel, at(c, m.index), "cursor", "`cursor: none` with nothing following the pointer — the pointer just vanishes.");
    else add("warn", c.rel, at(c, m.index), "cursor", "hidden system cursor — scope it to @media (hover: hover) and (pointer: fine); keep focus rings.");
  }
  for (const m of t.matchAll(/(?:font-family|--font[\w-]*)\s*:\s*([^;}]+)/g)) {
    const stack = m[1].split(",").map((s) => s.trim().replace(/^["']|["']$/g, "").toLowerCase());
    const first = stack[0];
    if (GENERATED_FACES.includes(first)) add("error", c.rel, at(c, m.index), "typeface",
      `${first} — the face every generated app arrives in (Inter: 21 of 755 studied sites, Geist: 8). Pick a face with a reason; see references/type.md.`);
    else if (TEMPLATE_FACES.includes(first)) add("warn", c.rel, at(c, m.index), "typeface",
      `${first} — a template staple. Fine if chosen; otherwise see references/type.md.`);
    for (const fam of stack) if (fam && !GENERIC.test(fam)) families.set(fam, (families.get(fam) ?? 0) + 1);
    if (stack.some((s) => /mono|courier|consolas|menlo/.test(s))) move("mono", "a monospace voice for labels or code", c.rel);
    if (stack.length && /^(times|times new roman|georgia|serif|helvetica|arial|system-ui|-apple-system|monospace|ui-monospace)$/.test(first))
      move("system-face", "a system face used on purpose", c.rel);
  }
  for (const m of t.matchAll(/@font-face\s*{[^}]*font-family\s*:\s*["']?([^"';}]+)/g)) {
    const fam = m[1].trim().toLowerCase();
    if (!GENERATED_FACES.includes(fam)) move("own-face", `a self-hosted face (${m[1].trim()})`, c.rel);
  }
  for (const m of t.matchAll(/font-size\s*:\s*([\d.]+)(px|rem|em)\b/g)) sizes.add(m[1] + m[2]);
  for (const m of t.matchAll(/#([0-9a-f]{6}|[0-9a-f]{3})\b/gi)) {
    let h = m[1].toLowerCase(); if (h.length === 3) h = [...h].map((x) => x + x).join("");
    colours.add(h);
  }
  if (/linear-gradient\([^)]*(#6366f1|#8b5cf6|#a855f7|#7c3aed|#9333ea|#4f46e5|#ec4899)[^)]*(#6366f1|#8b5cf6|#a855f7|#7c3aed|#9333ea|#4f46e5|#ec4899|#3b82f6)/i.test(t))
    add("error", c.rel, at(c, t.search(/linear-gradient/i)), "gradient", "indigo-to-violet gradient — the generated-app sky. If you want a gradient, take it from something real (weather, a photo, the hour).");
  for (const m of t.matchAll(/{[^{}]*}/g)) {
    const body = m[0];
    const r = /border-radius\s*:\s*(\d+)px/.exec(body);
    const s = /box-shadow\s*:\s*[^;]*?\d+px\s+\d+px\s+(\d+)px/.exec(body);
    if (r && s && Number(r[1]) >= 12 && Number(s[1]) >= 16) { softCards++; softFirst ??= { rel: c.rel, line: at(c, m.index) }; }
  }
  if (/mix-blend-mode\s*:\s*(difference|exclusion)/.test(t)) move("blend", "a difference-blend layer", c.rel);
  if (/cursor\s*:\s*url\(/.test(t)) move("cursor", "a custom cursor (with a fallback keyword)", c.rel);
  if (/::selection/.test(t)) move("selection", "a styled text selection", c.rel);
  if (/writing-mode\s*:\s*vertical/.test(t)) move("vertical", "vertical or rotated type", c.rel);
  if (/text-wrap\s*:\s*(balance|pretty)/.test(t)) move("balance", "balanced/pretty line breaks", c.rel);
  if (/tabular-nums|"tnum"/.test(t)) move("tnum", "tabular figures for numbers", c.rel);
  if (/view-transition/.test(t)) move("view-transition", "view transitions between pages", c.rel);
  if (/:hover[^{]*{[^}]*(opacity|display|visibility|transform)/.test(t)) move("hover-reveal", "something revealed on hover", c.rel);
  if (/@media\s+print/.test(t)) move("print", "a print stylesheet", c.rel);
  if (/image-rendering\s*:\s*(pixelated|crisp-edges)/.test(t)) move("pixelated", "pixels kept crisp", c.rel);
}
const tailwindCards = (allMarkup.match(/rounded-(xl|2xl|3xl)[^"'`]*shadow-(md|lg|xl|2xl)|shadow-(md|lg|xl|2xl)[^"'`]*rounded-(xl|2xl|3xl)/g) || []).length;
if (softCards + tailwindCards >= 4) add("warn", softFirst?.rel ?? markup[0]?.rel ?? ".", softFirst?.line ?? 1, "soft-cards",
  `${softCards + tailwindCards} soft rounded shadowed cards — the template grid. The studied sites use rules, lists, tables, objects or nothing.`);
if (/\btransition-all\b/.test(allMarkup)) add("error", markup.find((f) => /\btransition-all\b/.test(f.text))?.rel ?? ".", 1, "transition-all", "`transition-all` — name the properties.");
if (/from-(indigo|violet|purple)-\d00[^"'`]*to-(purple|pink|violet|indigo|blue)-\d00/.test(allMarkup))
  add("error", markup.find((f) => /from-(indigo|violet|purple)/.test(f.text))?.rel ?? ".", 1, "gradient", "indigo/violet Tailwind gradient — the generated-app sky.");
if (animates && !hasReducedMotion) add("error", ".", 1, "reduced-motion",
  "things move and nothing honours prefers-reduced-motion (only 17% of the studied sites did — be in that 17%).");
if (sizes.size > 10) add("warn", ".", 1, "type-scale", `${sizes.size} distinct font sizes — a third of the studied sites use four or fewer.`);
else if (sizes.size && sizes.size <= 5) move("few-sizes", `a short type scale (${sizes.size} sizes)`, ".");
const customFaces = [...families.keys()].filter((f) => !GENERATED_FACES.includes(f));
if (customFaces.length > 3) add("info", ".", 1, "typefaces", `${customFaces.length} typefaces (${customFaces.slice(0, 6).join(", ")}) — one or two, each with a job, reads as authored.`);
const generatedSky = findings.some((f) => f.rule === "gradient");
if (colours.size >= 2 && colours.size <= 6 && !generatedSky) move("few-colours", `a held palette (${colours.size} colours)`, ".");
else if (colours.size > 24) add("info", ".", 1, "palette", `${colours.size} distinct hex colours — the studied median is 11; a quarter use three or fewer.`);
const saturated = [...colours].filter((h) => {
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b);
  return mx - mn > 0.75 && mx > 0.8;
});
if (saturated.length && colours.size <= 8) move("field", `a saturated colour held with restraint (#${saturated[0]})`, ".");

/* ---------- JS ---------- */
for (const c of jsChunks) {
  const t = c.text;
  if (/document\.title\s*=/.test(t)) move("living-title", "a tab title that changes", c.rel);
  if (/rel\*?=.?icon|\.href\s*=.*(svg|png|ico)/.test(t) && /icon/.test(t)) move("living-favicon", "a favicon that changes", c.rel);
  if (/getHours\(\)|toLocaleTimeString|Intl\.DateTimeFormat|new Date\(\)/.test(t)) move("time", "the page knows what time it is", c.rel);
  if (/Math\.random\(\)/.test(t)) move("chance", "chance: each visit differs", c.rel);
  if (/(pointerdown|mousedown)[\s\S]{0,400}(pointermove|mousemove)/.test(t)) move("drag", "things you can pick up and move", c.rel);
  if (/AudioContext|new Audio\(/.test(t)) {
    move("sound", "sound", c.rel);
    if (!/(click|pointerdown|keydown|touchstart)/.test(t)) add("warn", c.rel, at(c, t.search(/AudioContext|new Audio\(/)), "autoplay-sound", "audio created with no user gesture in sight — start sound from a click.");
  }
  if (/localStorage/.test(t)) move("memory", "the page remembers the visitor", c.rel);
  if (/addEventListener\(\s*["']wheel["'][\s\S]{0,200}preventDefault/.test(t))
    add("warn", c.rel, at(c, t.search(/["']wheel["']/)), "scroll", "the wheel is hijacked — the studied sites scroll natively; only 1.6% use smooth-scroll libraries.");
  if (/fetch\(|EventSource|WebSocket\(/.test(t)) move("live", "live data from somewhere else", c.rel);
}
if (/["'](lenis|locomotive-scroll)["']|new Lenis\(|LocomotiveScroll/.test(everything))
  add("info", ".", 1, "scroll", "smooth-scroll library — native scrolling is the norm in the studied sites; keep it only if scroll is the idea.");
const heavyFramework = /["'](react|vue|svelte|next|nuxt|@angular\/core)["']/.test(everything);
if (!heavyFramework) move("hand-made", "hand-made: no framework", ".");

const totalKb = Math.round(files.reduce((n, f) => n + f.size, 0) / 1024);
if (totalKb > maxKb * 3) add("error", ".", 1, "weight", `${totalKb} KB of source — over 3× the ${maxKb} KB budget. The studied median is ~250 KB; a quarter are under 50 KB.`);
else if (totalKb > maxKb) add("warn", ".", 1, "weight", `${totalKb} KB of source — over the ${maxKb} KB budget.`);
else if (totalKb < 100) move("light", `light: ${totalKb} KB of source`, ".");

/* ---------- report ---------- */
const counts = { error: 0, warn: 0, info: 0 };
for (const f of findings) counts[f.severity]++;
const failed = counts.error > 0 || (strict && counts.warn > 0);

if (asJson) {
  console.log(JSON.stringify({ root, counts, findings, moves: [...moves].map(([k, v]) => ({ key: k, ...v })), kb: totalKb }, null, 2));
  process.exit(failed ? 1 : 0);
}
if (github) {
  for (const f of findings) {
    const kind = f.severity === "error" ? "error" : f.severity === "warn" ? "warning" : "notice";
    const file = f.file === "." ? "" : `file=${relative(process.cwd(), join(root, f.file)).replace(/\\/g, "/")},line=${f.line},`;
    console.log(`::${kind} ${file}title=cool-check ${f.rule}::${f.message}`);
  }
}
const order = { error: 0, warn: 1, info: 2 };
const label = { error: "ERROR", warn: "warn ", info: "info " };
findings.sort((a, b) => order[a.severity] - order[b.severity] || a.file.localeCompare(b.file) || a.line - b.line);
for (const f of findings) {
  if (quiet && f.severity === "info") continue;
  console.log(`${label[f.severity]}  ${f.file}${f.file === "." ? "" : ":" + f.line}  [${f.rule}]  ${f.message}`);
}
if (!quiet) {
  console.log(`\ncool moves present (${moves.size}):`);
  for (const [, v] of moves) console.log(`  + ${v.label}${v.file && v.file !== "." ? `  (${v.file})` : ""}`);
  if (moves.size < 5) console.log("  — few moves yet. Open references/moves.md, pick one idea, and carry it all the way.");
}
console.log(`\ncool-check: ${counts.error} error(s), ${counts.warn} warning(s), ${counts.info} note(s) · ${files.length} files · ${totalKb} KB${strict ? " · strict" : ""}`);
process.exit(failed ? 1 : 0);
