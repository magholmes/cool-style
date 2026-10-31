# The canon

What 916 cool websites have in common, in numbers, and what sets the best of them apart. Caveats: `method.md`. Measured figures are shares of the 755 sites still online in October 2026; tag figures are shares of all 916.

## Where the sites come from

A long-running collection of cool websites on Are.na: 916 sites saved from 2013 to 2026 (200 in 2020 alone, 174 in 2022, 77 so far in 2026). Its sub-collections are named like a taxonomy of the small web — *website as a collection of boxes*, *search engines for wandering*, *websites with clocks*, *websites as calendars*, *text-based websites*, *poetic sites*, *whimsical computing*, *low-tech network*, *expressive domain names* — and its own notes add two more: **website as atlas**, **website as notebook**. Alongside the sites sit saved techniques: pure-CSS solar systems, orbiting dots, items on a circle, an SVG marquee, a holographic card, spider webs drawn in canvas.

**What kinds of site** (study notes): publications and essays 13%, net art 11%, portfolios 11%, tools and toys 9%, archives 6%, studios 6%, events 5%, references and manifestos 5%, personal sites 5%, institutions 5%, communities 4%, shops 4%, directories 4%, music 4%, courses 3%, type foundries 3%.

## Built how

| | |
|---|---|
| no platform detectable (hand-written or plain static) | 48% |
| WordPress / Next.js / Cargo / Tumblr / Webflow / Substack | 11% / 10% / 6% / 4% / 4% / 3% |
| hosting: Cloudflare / Vercel / GitHub Pages / Netlify / Neocities + Glitch | 157 / 92 / 80 / 68 / ~27 sites |
| first-party HTML+CSS+JS (no images, no third parties) | median **250 KB** · 25% under 50 KB · 32% under 100 KB · 10% over 1.3 MB |
| visible words on the landing page | median 221 · **31% under 50 words** |
| DOM elements | median 203 |
| jQuery still present | 37% |
| canvas / three.js / p5.js / GSAP / Web Audio | 12% / 3% / 2% / 5% / 4% |

Platforms don't decide coolness — four Cargo sites in one batch looked unrelated (#470, #485, #486, #505) — but builders were rated least distinctive: 2% of the 5/5 sites vs 8% of the ≤ 2/5 sites.

## Type, colour, CSS

- **Faces:** 69% self-host; 12% Google Fonts; 4% Adobe; 23% only system faces; 9% no face at all; monospace in 55% of stacks; Inter or Geist on ~4%. → `type.md`
- **Sizes:** smallest ≤ 11px on 47%; largest ≥ 100px on 23%; ≤ 4 distinct sizes on 34%; most common body size 16px.
- **Colour:** ≤ 3 hex colours on 24%; median 11; after the greys, `#ffff00`, `#ff0000`, `#0000ff` are the most-used colours. → `colour.md`
- **CSS features** (share of sites): hover states 83% · keyframes 56% · uppercase somewhere 52% · grid 48% · sticky 34% · dotted/dashed borders 33% · `transition: all` 31% · `::selection` 23% · `mix-blend-mode` 22% (difference/exclusion 10%) · `backdrop-filter` 22% · `clip-path` 21% · `:has()` 18% · **`prefers-reduced-motion` 17%** · variable-font settings 16% · `scroll-snap` 10% · `cursor: none` 8% · `text-wrap: balance` 8% · custom `cursor: url()` 5% · `writing-mode` 4% · pixelated images 4% · view transitions 2%.
- **Behaviour signals** (scripts): `document.title` rewritten 8% · a pointer follower 7% · clocks 6% · hit counters 4% · webrings 2% · guestbooks 1.5% · device orientation 1.5% · geolocation 1%.
- **HTML:** `lang` on 73% · viewport meta 82% · **zoom blocked 18%** · RSS/Atom 15% · median alt-text coverage **17%** (0% on 212 sites) · `<table>` 8% · `<details>` 4% · `<marquee>` 2% · `<font>` 2% · `<frameset>` 2 sites · 26% carry ≥ 10 outbound links · 6% link to Are.na.

## What everyone does (study notes)

Tags given to the most sites:

- **type:** grotesk 30% · small (≤ 13px body) 25% · mono 22% · mixed faces 17% · all caps 15% · text serif 14% · giant 13% · display serif 12%
- **colour:** black & white 30% · one accent 22% · tinted monochrome 16% · pastel 14% · saturated field 13% · multicolour 13% · dark ground 11%
- **layout:** single screen 20% · text column 19% · grid 17% · centred object 17% · split 14% · full bleed 11% · index list 11% · collage 8% · canvas 7% · table 7%
- **imagery:** photographs 23% · text only 21% · illustration 15% · diagrams/data 9% · texture 8% · collage 7% · 3D 6% · cut-out objects 5%
- **behaviour:** 86% do *something*. Sound 8% · scroll 8% · filter/sort 8% · drag 7% · participation 7% · generative 6% · view toggle 6% · random 6% · time 5% · custom cursor 5%
- **ethos:** polish 27% · community 14% · poetic 13% · handmade 13% · teaching 13% · archive 12% · humour 10% · critical 9% · collector 8% · cute 8% · old web 8% · ecology 7% · low-tech 6%

## What sets the best apart

Each site was rated for distinctiveness (1–5). Comparing the 116 rated **5** with the 72 rated **2 or less**:

| trait | rated 5 | rated ≤ 2 | |
|---|---|---|---|
| does nothing at all (static) | 4% | 35% | the forgettable ones sit still |
| generative | 19% | 3% | |
| uses time | 16% | 0% | |
| drag / things to pick up | 16% | 1% | |
| sound | 16% | 1% | |
| live data | 15% | 0% | |
| participation | 12% | 1% | |
| poetic | 34% | 3% | |
| humour | 14% | 1% | |
| handmade | 15% | 3% | |
| hand-coded | 33% | 17% | |
| site builder | 2% | 8% | |
| single screen | 26% | 10% | |
| collage | 16% | 0% | |
| a plain text column | 11% | 46% | a column is only as good as its idea |
| small type | 32% | 17% | |
| mixed faces | 16% | 6% | |
| multicolour / gradient / saturated field | 14% / 10% / 10% | 4% / 3% / 4% | colour reads as authored when committed |
| default link colours | 7% | 14% | defaults need an idea to carry them |

The pattern: **the memorable sites are alive in one specific way, have a point of view (poetic, funny, handmade), and commit — to a single screen, a collage, a colour.** The forgettable ones are well-made columns of text and lists with nothing that moves and nothing to say.

## Where the taste is heading

Splitting by when each site was saved (≤ 2020: 266 · 2021–23: 389 · 2024–26: 261):

| tag | ≤ 2020 | 2021–23 | 2024–26 |
|---|---|---|---|
| hand-coded | 19% | 15% | **28%** |
| browser-default type | 6% | 5% | **12%** |
| old-web ethos | 6% | 7% | **11%** |
| archive ethos | 9% | 13% | **14%** |
| giant type | 14% | 15% | **7%** |
| gradient | 8% | 8% | **3%** |
| saturated field | 16% | 14% | **9%** |
| "polish" | 29% | 29% | **21%** |

From loud (acid lime, giant wordmarks, gradients — the 2020–23 poster) toward quiet: hand-written HTML, browser type, archives, the old web taken seriously.

## How they age

Of sites saved by 2020, only **45%** still look as they did; 2021–23, 65%; 2024–26, 83%. The notes agree: hand-made static pages (often on GitHub Pages) survive; JavaScript-only shells, retired hosts (Glitch), lapsed domains — some now casino spam — do not. If you want your site to be in someone's channel in ten years, make it static, self-contained and small, and keep paying for the domain.

## Recurring makers and places

Some names and domains recur in the collection: Tiger Dingsun's projects on `tdingsun.github.io` (9 entries), hoverstat.es (6, itself a gallery of alternative sites), Special Offer, Inc. (4), The Creative Independent's pieces on making websites (4), Julijonas Urbonas (3), untold stories (3), Other Office (3), MODEM (3), Fuse.kiwi (3), Found Color (3), A Website Is A Room (3), taichi.pink (3). Around them: the Are.na community's own sites (starstar.website, Are.na-fed tools), art-school servers (RISD, Rietveld, KABK, Werkplaats Typografie, HFBK, Cooper Union, UCLA DMA), the html review, Handmade Web, Low-tech Magazine, Neocities and Nekoweb homepages, and essays about the small web (Figma's "Making Space for a Handmade Web", "a website is a sanctuary", "My website is a shifting house next to a river of knowledge"). The channel is a scene as much as a style: people who make websites for each other, by hand, and link to each other.
