# Recipes

Small, dependency-free code for the moves the studied sites make most. Each recipe is the version that keeps the move *and* the guardrail (keyboard, touch, reduced motion, screen readers) — the studied sites often skip the second half; you shouldn't. Copy, then tune to your idea. Which sites do each move: `node scripts/examples.mjs <tag>`.

Contents: [floating preview](#1-floating-preview-on-hover-and-focus) · [custom cursor](#2-a-custom-cursor-the-cheap-honest-way) · [cursor follower](#3-a-thing-that-follows-the-pointer) · [ticker](#4-ticker-marquee) · [living tab title](#5-a-tab-title-that-lives) · [glyph favicon](#6-a-favicon-in-one-line) · [hour-aware ground](#7-the-ground-follows-the-hour) · [season / date](#8-the-site-knows-the-season) · [chance](#9-chance-a-different-page-each-visit) · [draggable things](#10-things-you-can-pick-up) · [sound on request](#11-sound-on-request) · [difference layer](#12-a-difference-blend-layer) · [ASCII / pre art](#13-ascii-and-pre-art) · [vertical type](#14-vertical-and-rotated-type) · [view toggle + filters in the URL](#15-view-toggle-and-filters-that-live-in-the-url) · [sidenotes](#16-sidenotes) · [fit a word to the screen](#17-fit-a-word-to-the-screen) · [clocks](#18-a-clock-that-means-something) · [last updated](#19-last-updated) · [neighbours / webring](#20-neighbours-and-webrings) · [the inspector as a room](#21-the-inspector-is-a-room-too) · [dither](#22-dithered-images-low-tech) · [selection + scrollbar](#23-selection-and-scrollbar) · [one reduced-motion switch](#24-one-reduced-motion-switch) · [page transitions](#25-page-transitions-without-a-framework) · [details as an index](#26-an-index-that-unfolds) · [scroll-linked](#27-scroll-linked-without-a-library) · [type that breathes with data](#28-type-that-breathes-with-real-data) · [a page that reports on itself](#29-a-page-that-reports-on-itself) · [print](#30-a-print-stylesheet)

---

## 1. Floating preview on hover and focus

The archive/portfolio move: a list of names, and the image appears under the pointer. Full version in `assets/starters/index/`.

```html
<ul class="works">
  <li><a href="/chairs" data-img="/img/chairs.jpg" data-alt="Six borrowed chairs in a row">Archive of borrowed chairs</a></li>
</ul>
<img class="float" alt="" aria-hidden="true">
```

```css
.float { position: fixed; left: 0; top: 0; width: min(30vw, 340px); pointer-events: none; opacity: 0;
  transform: translate3d(var(--x, 50vw), var(--y, 50vh), 0) translate(16px, -50%); transition: opacity 120ms linear; }
.float.on { opacity: 1; }
@media (hover: none) { .float { display: none; } }          /* touch: the link just navigates */
@media (prefers-reduced-motion: reduce) { .float { transition: none; } }
```

```js
const float = document.querySelector(".float");
const show = (a) => { float.src = a.dataset.img; float.classList.add("on"); };
const hide = () => float.classList.remove("on");
for (const a of document.querySelectorAll("[data-img]")) {
  a.addEventListener("pointerenter", () => show(a));
  a.addEventListener("pointerleave", hide);
  a.addEventListener("focus", () => {               // keyboard users get it too, next to the link
    const r = a.getBoundingClientRect();
    float.style.setProperty("--x", `${r.right}px`); float.style.setProperty("--y", `${r.top + r.height / 2}px`);
    show(a);
  });
  a.addEventListener("blur", hide);
}
addEventListener("pointermove", (e) => {
  float.style.setProperty("--x", `${Math.min(e.clientX, innerWidth - float.offsetWidth - 24)}px`);
  float.style.setProperty("--y", `${e.clientY}px`);
}, { passive: true });
```

The preview is decoration (`aria-hidden`), so the link text must say what the work is.

## 2. A custom cursor, the cheap honest way

`cursor: url()` keeps the system's speed and accessibility. Always give a hotspot and a fallback keyword.

```css
@media (hover: hover) and (pointer: fine) {
  body { cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Ccircle cx='12' cy='12' r='5' fill='%23ff3b1f'/%3E%3C/svg%3E") 12 12, auto; }
  a, button { cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Ccircle cx='12' cy='12' r='9' fill='none' stroke='%23ff3b1f' stroke-width='2'/%3E%3C/svg%3E") 12 12, pointer; }
}
```

Keep it ≤ 32×32 px. A slideshow can use the cursor as the control: left half shows a ← cursor and goes back, right half → and goes forward (`cursor: url(prev.svg) 6 6, w-resize`), with real buttons for keyboards.

## 3. A thing that follows the pointer

Only when the follower *is* the idea (a light, a name tag, a creature). Hide the system cursor only where a fine pointer exists, and never hide focus rings.

```css
.follower { position: fixed; left: 0; top: 0; pointer-events: none; z-index: 999;
  transform: translate3d(var(--fx, -100px), var(--fy, -100px), 0) translate(-50%, -50%); }
@media (hover: hover) and (pointer: fine) { body.has-follower { cursor: none; } }
@media (hover: none) { .follower { display: none; } }
```

```js
const f = document.querySelector(".follower"); document.body.classList.add("has-follower");
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
let x = -100, y = -100, tx = x, ty = y;
addEventListener("pointermove", (e) => { tx = e.clientX; ty = e.clientY; }, { passive: true });
(function loop() {
  x += (tx - x) * (reduce ? 1 : 0.22); y += (ty - y) * (reduce ? 1 : 0.22);   // a little lag, none if reduced
  f.style.setProperty("--fx", x + "px"); f.style.setProperty("--fy", y + "px");
  requestAnimationFrame(loop);
})();
```

## 4. Ticker (marquee)

Not `<marquee>`: it can't pause. Duplicate the content once, slide by exactly half, pause on hover and focus, stop for reduced motion.

```html
<div class="ticker" aria-label="News: residency open until May 1 · new fonts · studio closed Fridays">
  <div class="ticker-track" aria-hidden="true">
    <span>residency open until May 1 · new fonts · studio closed Fridays · </span>
    <span>residency open until May 1 · new fonts · studio closed Fridays · </span>
  </div>
</div>
```

```css
.ticker { overflow: hidden; white-space: nowrap; }
.ticker-track { display: inline-flex; animation: tick 30s linear infinite; }
.ticker:is(:hover, :focus-within) .ticker-track { animation-play-state: paused; }
@keyframes tick { to { transform: translateX(-50%); } }
@media (prefers-reduced-motion: reduce) { .ticker-track { animation: none; } .ticker { white-space: normal; } }
```

## 5. A tab title that lives

The tab is the one bit of the site people see while they're elsewhere. Scroll it, count something, or answer the visitor leaving.

```js
const base = document.title;
document.addEventListener("visibilitychange", () => {
  document.title = document.hidden ? "come back ☾" : base;
});
// a scrolling title, the 2004 way — slow, and only while the tab is visible
let msg = "  ✿ the studio is open on thursdays ✿ ", i = 0, timer;
const scroll = () => { document.title = msg.slice(i) + msg.slice(0, i); i = (i + 1) % msg.length; };
document.addEventListener("visibilitychange", () => {
  clearInterval(timer); if (!document.hidden) timer = setInterval(scroll, 400);
});
```

Screen readers announce title changes on some setups: keep it slow (≥ 400 ms) or event-driven.

## 6. A favicon in one line

```html
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext y='.9em' font-size='90'%3E%E2%9C%BF%3C/text%3E%3C/svg%3E">
```

Any glyph works (✿ ※ ☾ ⌖ ✎ ◐). Swap it by time or state with `document.querySelector("link[rel=icon]").href = …`.

## 7. The ground follows the hour

```js
const DAY = [[0, "#0b0b2e", "#e8e6ff"], [5, "#ff8a65", "#1b0b06"], [9, "#1a1aff", "#ffffff"],
             [13, "#ffe600", "#141414"], [18, "#ff3b1f", "#140503"], [21, "#2a1060", "#f2e9ff"]];
function paint() {
  const h = new Date().getHours();
  const [, ground, ink] = [...DAY].reverse().find(([from]) => h >= from);
  document.documentElement.style.setProperty("--ground", ground);
  document.documentElement.style.setProperty("--ink", ink);
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", ground);
}
paint(); setInterval(paint, 60_000);
```

Check contrast for every pair; six chosen pairs beat a computed hue wheel, which always passes through an illegible yellow-on-white hour.

## 8. The site knows the season

```js
const m = new Date().getMonth();             // 0 = January
document.documentElement.dataset.season = ["winter","winter","spring","spring","spring","summer","summer","summer","autumn","autumn","autumn","winter"][m];
```

```css
[data-season="autumn"] { --accent: #c4501b; }
[data-season="winter"] .leaves { display: none; }
```

Southern-hemisphere visitors get the wrong season — say "our autumn" in the copy, or base it on your place, not theirs.

## 9. Chance: a different page each visit

```js
// truly random per visit
const pick = (a) => a[Math.floor(Math.random() * a.length)];
document.querySelector(".greeting").textContent = pick(["hello", "hi again", "oh, it's you", "welcome in"]);

// or the same for everyone today, different tomorrow (seeded by date)
const seed = Number(new Date().toISOString().slice(0, 10).replaceAll("-", ""));
let s = seed; const rand = () => (s = (s * 1664525 + 1013904223) % 2 ** 32) / 2 ** 32;
for (const el of document.querySelectorAll(".scatter > *")) {
  el.style.translate = `${rand() * 80}vw ${rand() * 70}vh`;
  el.style.rotate = `${rand() * 10 - 5}deg`;
}
```

## 10. Things you can pick up

Pointer events cover mouse, pen and touch in one path; arrow keys cover keyboards. Full version with persistence and "tidy" in `assets/starters/room/`.

```js
for (const el of document.querySelectorAll(".thing")) {
  let x = el.offsetLeft, y = el.offsetTop;
  const place = () => (el.style.translate = `${x - el.offsetLeft}px ${y - el.offsetTop}px`);
  el.tabIndex = 0;
  el.style.touchAction = "none";
  el.addEventListener("pointerdown", (e) => {
    const dx = e.clientX - x, dy = e.clientY - y;
    el.setPointerCapture(e.pointerId);
    const move = (ev) => { x = ev.clientX - dx; y = ev.clientY - dy; place(); };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", () => el.removeEventListener("pointermove", move), { once: true });
  });
  el.addEventListener("keydown", (e) => {
    const s = e.shiftKey ? 40 : 8;
    const d = { ArrowLeft: [-s, 0], ArrowRight: [s, 0], ArrowUp: [0, -s], ArrowDown: [0, s] }[e.key];
    if (d) { e.preventDefault(); x += d[0]; y += d[1]; place(); }
  });
}
```

```css
.thing { cursor: grab; user-select: none; }
.thing:active { cursor: grabbing; }
```

## 11. Sound on request

Sound never starts by itself. A visible switch starts it, and the same switch stops it.

```html
<button class="sound" aria-pressed="false">sound off</button>
```

```js
let ctx, gain;
document.querySelector(".sound").addEventListener("click", async (e) => {
  const b = e.currentTarget, on = b.getAttribute("aria-pressed") !== "true";
  if (on && !ctx) {
    ctx = new AudioContext(); gain = ctx.createGain(); gain.gain.value = 0.04; gain.connect(ctx.destination);
    for (const f of [220, 277.18, 329.63]) {                  // a soft A-major drone
      const o = ctx.createOscillator(); o.type = "sine"; o.frequency.value = f; o.connect(gain); o.start();
    }
  }
  on ? await ctx.resume() : await ctx.suspend();
  b.setAttribute("aria-pressed", String(on)); b.textContent = on ? "sound on" : "sound off";
});
```

## 12. A difference-blend layer

A fixed name or nav that stays legible over any image or colour by inverting what's beneath it.

```css
.mark { position: fixed; inset: 12px 16px auto; z-index: 10; color: #fff; mix-blend-mode: difference; }
```

Works on white text only (white − background = its inverse). Over mid-grey it goes mud: check the darkest and lightest images you have.

## 13. ASCII and pre art

```html
<pre class="art" role="img" aria-label="A small house with smoke from the chimney">
    (
     )
   _|__
  /    \
 /______\
 | []   |
</pre>
```

```css
.art { font: 14px/1 ui-monospace, Menlo, Consolas, monospace; font-variant-ligatures: none; letter-spacing: 0; white-space: pre; overflow-x: auto; }
```

`role="img"` + `aria-label` stops a screen reader spelling out every slash.

## 14. Vertical and rotated type

```css
.spine { writing-mode: vertical-rl; text-orientation: mixed; }          /* a book spine, a margin label */
.spine-up { writing-mode: vertical-rl; rotate: 180deg; }                 /* reads bottom-to-top */
.cjk { writing-mode: vertical-rl; text-orientation: upright; }          /* CJK stacked upright */
```

Rotate labels, not paragraphs: more than a line or two sideways stops being read.

## 15. View toggle and filters that live in the URL

Any state a visitor might want to send someone belongs in the URL.

```js
const params = new URLSearchParams(location.search);
const state = { view: params.get("view") ?? "list", tag: params.get("tag") ?? "all" };
function apply() {
  document.body.dataset.view = state.view;
  for (const item of document.querySelectorAll("[data-tags]"))
    item.hidden = state.tag !== "all" && !item.dataset.tags.split(" ").includes(state.tag);
  for (const b of document.querySelectorAll("[data-set]")) {
    const [k, v] = b.dataset.set.split("=");
    b.setAttribute("aria-pressed", String(state[k] === v));
  }
  const q = new URLSearchParams(Object.entries(state).filter(([k, v]) => v !== { view: "list", tag: "all" }[k]));
  history.replaceState(null, "", q.size ? "?" + q : location.pathname);
}
document.addEventListener("click", (e) => {
  const b = e.target.closest("[data-set]"); if (!b) return;
  const [k, v] = b.dataset.set.split("="); state[k] = v; apply();
});
apply();
```

```html
<button data-set="view=list">list</button> <button data-set="view=grid">grid</button>
<button data-set="tag=all">all</button> <button data-set="tag=print">print</button>
```

## 16. Sidenotes

Inline on phones, in the margin on wide screens, no JavaScript. Full version in `assets/starters/notebook/`.

```css
.page { display: grid; grid-template-columns: [text-start] minmax(0, 34em) [text-end]; gap: 0 32px; }
.page > * { grid-column: text; }
.note { font-size: 0.8em; color: #0008; }
@media (min-width: 1100px) {
  .page { grid-template-columns: 1fr [text-start] 34em [text-end note-start] 15em [note-end] 1fr; }
  .note { grid-column: note; }   /* placed right after its paragraph, it lands on the same row */
}
```

## 17. Fit a word to the screen

```js
const word = document.querySelector(".word");
function fit() {
  word.style.fontSize = "100px";
  const w = word.scrollWidth;                                  // .word { display: inline-block; white-space: nowrap }
  word.style.fontSize = Math.min(innerWidth * 0.92 / w * 100, innerHeight * 0.6) + "px";
}
fit(); addEventListener("resize", fit); document.fonts.ready.then(fit);
```

## 18. A clock that means something

A bare clock is a widget. A clock with a reason is a move: the studio's time zone, how long until the show, the day of the year, the visitor's own hour.

```js
const fmt = new Intl.DateTimeFormat(undefined, { hour: "2-digit", minute: "2-digit", second: "2-digit", hourCycle: "h23", timeZone: "Asia/Seoul" });
const el = document.querySelector("time.studio");
const tick = () => { const n = new Date(); el.dateTime = n.toISOString(); el.textContent = `seoul ${fmt.format(n)}`; };
tick(); setInterval(tick, 1000);
```

```css
time.studio { font-variant-numeric: tabular-nums; }   /* or the digits jitter every second */
```

## 19. Last updated

Write the date by hand, or at build time. `document.lastModified` works on many static hosts, but falls back to "now" when the server sends no Last-Modified header — check yours before trusting it.

```html
<p>Last updated <time datetime="2026-10-30">30 October 2026</time>.</p>
```

## 20. Neighbours and webrings

The studied sites link out far more than templates do (a quarter carry ten or more outbound links on the landing page). Give your friends a door.

```html
<nav aria-label="neighbours">
  <a href="https://previous.example/" rel="prev">← previous</a> ·
  <a href="https://ring.example/random">random</a> ·
  <a href="https://next.example/" rel="next">next →</a>
</nav>
```

## 21. The inspector is a room too

Some studied sites hide a second layer for anyone who opens view-source or the console — a poem in the comments, a hello in the log.

```html
<!--
  hello, you found the back room.
  this site is hand-written. take anything you like.
-->
```

```js
console.log("%c hello from the back room ", "background:#ff0;color:#000;font:16px serif");
```

Put nothing there you'd mind being quoted.

## 22. Dithered images (low-tech)

A dithered image is a fraction of the bytes and looks like a choice. Pillow's 1-bit conversion uses Floyd–Steinberg dithering:

```bash
python -c "from PIL import Image; im=Image.open('in.jpg').convert('L'); im.thumbnail((800,800)); im.convert('1').save('out.png', optimize=True)"
```

```css
img.dither { image-rendering: pixelated; background: #d0c8b0; mix-blend-mode: multiply; }   /* tint by the paper underneath */
```

Offer the full image on click for anyone who needs the detail.

## 23. Selection and scrollbar

```css
::selection { background: #ffff00; color: #000; }
html { scrollbar-color: #1a1aff transparent; scrollbar-width: thin; }   /* Firefox + Chrome 121+ */
```

## 24. One reduced-motion switch

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: 1ms !important; animation-iteration-count: 1 !important;
    transition-duration: 1ms !important; scroll-behavior: auto !important; }
}
```

```js
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;   // read it in JS before any rAF loop
```

The blanket rule is the floor. Better: design a still version of each moving thing (the ticker wraps, the follower snaps, the field stops changing mid-visit).

## 25. Page transitions without a framework

Same-origin page loads cross-fade in modern Chromium and Safari with two lines and no JavaScript:

```css
@view-transition { navigation: auto; }
@media (prefers-reduced-motion: reduce) { @view-transition { navigation: none; } }
```

Name an element on both pages (`view-transition-name: hero`) and it morphs between them.

## 26. An index that unfolds

```html
<details>
  <summary>2024 — Signage for a very small museum</summary>
  <p>Twelve signs, one typeface, a museum with four rooms.</p>
  <img src="/img/museum.jpg" alt="Hand-painted room number 3 on a white wall" loading="lazy" width="1200" height="800">
</details>
```

```css
summary { list-style: none; cursor: pointer; padding: 6px 0; border-bottom: 1px solid #0002; }
summary::-webkit-details-marker { display: none; }
details[open] summary { font-style: italic; }
```

Keyboard and screen reader support is built in; the open state survives without JavaScript.

## 27. Scroll-linked, without a library

```css
@supports (animation-timeline: scroll()) {
  @media (prefers-reduced-motion: no-preference) {
    .sun { animation: rise linear both; animation-timeline: scroll(root); }
    @keyframes rise { from { translate: 0 60vh; } to { translate: 0 -20vh; } }
  }
}
```

Browsers without support get a still page, which is fine. Never take over the wheel to do this.

## 28. Type that breathes with real data

From taichi.pink's wind poem (#669): each letter's spacing follows a day of measured wind speeds, so the line drifts apart and together like the weather that day. Any series works — tides, a heartbeat, your step count, train arrivals.

```html
<p class="breathe">wind curls in a leaf’s palm then unwinds</p>
```

```js
const series = [9.6, 8.5, 7.9, 6.4, 5.2, 4.8, 6.1, 9.9, 12.3, 14.0, 13.1, 11.7];   // e.g. hourly wind, mph
const line = document.querySelector(".breathe");
const letters = [...line.textContent].map((ch) => Object.assign(document.createElement("span"), { textContent: ch }));
line.setAttribute("aria-label", line.textContent);               // read as one sentence, not 40 letters
letters.forEach((s) => s.setAttribute("aria-hidden", "true"));
line.replaceChildren(...letters);
let offset = 0;
const step = () => {
  letters.forEach((s, i) => (s.style.letterSpacing = `${series[(i + offset) % series.length] * 0.02 - 0.1}em`));
  offset = (offset + series.length - 1) % series.length;
};
step();
if (!matchMedia("(prefers-reduced-motion: reduce)").matches) setInterval(step, 120);
```

Letter-spacing is a layout property, so keep this to a line or two.

## 29. A page that reports on itself

Low-tech Magazine (#34) prints its own weight and its solar battery; SILO (#678) fills its corners with weather, moon phase and the visitor's own screen size. Reflect facts back — never send them anywhere.

```js
const kb = Math.round(performance.getEntriesByType("resource").concat(performance.getEntriesByType("navigation"))
  .reduce((n, e) => n + (e.transferSize || 0), 0) / 1024);
document.querySelector(".weight").textContent = `this page weighed ${kb} KB on its way to you`;
document.querySelector(".you").textContent =
  `${screen.width}×${screen.height}, ${navigator.language}, ${Intl.DateTimeFormat().resolvedOptions().timeZone.replace("_", " ")}`;
```

`transferSize` is 0 for cached or cross-origin resources without `Timing-Allow-Origin`; say "about".

## 30. A print stylesheet

Several studied sites are publications; print is a second edition for free.

```css
@media print {
  nav, .ticker, .follower, .sound { display: none; }
  body { font: 11pt/1.4 Georgia, serif; color: #000; background: none; }
  a[href^="http"]::after { content: " (" attr(href) ")"; font-size: 0.8em; }
}
```
