---
name: cool-style
description: How to make a website cool, distilled from a close look at hundreds of independent websites (personal sites, net art, type foundries, archives, studios, small tools, publications). Use it whenever you design, build, restyle or critique a personal site, portfolio, studio or event site, archive, online publication, net-art piece or small web tool that should feel original, handmade, poetic, small-web, Are.na-like or "not like a template" — or when someone says "make it cool", "make it interesting", "less generic", "less corporate", or /cool-style. Gives 12 laws, 14 archetypes, seven one-file starter sites, a moves library with code, a searchable catalogue of examples, and an audit (also a GitHub Action) that flags template tells and the accessibility gaps cool sites tend to have.
license: MIT
compatibility: Claude Code, claude.ai and Claude Desktop. Scripts need Node 18+; nothing to install.
metadata:
  version: "1.0.0"
  author: Magnus Holmes
---

# cool-style

Distilled from a close look at hundreds of independent websites — personal sites, net art, type foundries, archives, studios, small tools, journals — saved by people who collect the web's best corners (`references/method.md`). Nothing here is a trend report. It is what those sites actually do, counted.

> **A template answers "what does a website look like?" Every one of these sites answers "what is *this* website about?" — and then lets the answer decide the layout, the type, the colour and the one thing that moves.**

The canon runs from rough to exacting — a Neocities shrine with a tiled GIF background and a type foundry engineered to the pixel are both in it. Both are cool. What's missing is the middle: the site that could be about anything.

## Before you start

1. **Find the idea first** (next section). No layout, no palette, no font until you can say the idea in one sentence.
2. **Pick an archetype** from the table below and, for a fresh build, start from its starter: `node ${CLAUDE_SKILL_DIR}/scripts/new.mjs <archetype> <dir>`.
3. **Look at real ones.** `node ${CLAUDE_SKILL_DIR}/scripts/examples.mjs <tag or word>` prints studied sites that make a move, best first (`--tags` lists the vocabulary; `--random 5` for a jolt).
4. If another house style is in force (e.g. `magnus-style`), it wins on tokens — faces, colours, timings. Use this skill for the idea, the structure and the moves.

## Find the idea

Ask (yourself, or the person — one question at a time):

1. **What is it, in one plain sentence?** Not what it's *for*. "A log of every song a microphone on a lamppost heard." "Notes from a solar-powered magazine."
2. **What is it *like*?** The object, place or system it already resembles: a calendar, a shop with hours, a spreadsheet, a garden, a radio, a book plate, a ring, a desk. This becomes the container (Law 1).
3. **What is true about it that a template would hide?** Its weight, its age, its hours, its data, the weather where it's made, the number of things in it, who made it.
4. **What is the one thing that moves or changes?** Pick one. Time, a reading, the visitor's pointer, chance, other visitors.
5. **What would make someone send the link to a friend?** That's the signature move. Everything else gets quieter so it can be seen.

Write the answers at the top of the project (a comment in `index.html` is fine). If an answer is "nothing", the site isn't ready for design — it needs content.

## The twelve laws

1. **Make the form act out the subject.** The strongest sites use their subject's own shape as the container. An essay about waves scrolls forever, each paragraph rising and returning (#214). A guide to machine-learning datasets is laid out as a spreadsheet (#481). A history of interfaces sits in a rebuilt 1984 Mac window (#501). A surveillance music log is one two-colour LCD (#76). A daily comic's archive is a year calendar (#21). *Test: could this layout hold a different subject unchanged? Then it's a template.*
2. **One idea, carried through every layer.** The metaphor reaches the nav, the headings, the pictures, even the page weight. Our Networks (#232) prints its sitemap as a `tree` command, draws its laptop in ASCII and weighs 39 KB. Often the whole idea is one cheap mechanism, fully committed: 36 CSS tiles that hide a poem (#228), letter-spacing driven by a day of wind data (#669).
3. **A website is a place, not a brochure.** Rooms, desks, towns, gardens, bookshelves, cafés with opening hours (#828), radios, kiosks. Navigation becomes furniture: a signpost (#197), a ring (#203), a bookshelf (#652), an onion you peel (#789). Even the domain is a place name — about 1 in 6 use an expressive TLD (.world .garden .cafe .town .computer .zone).
4. **Hold one ink.** One colour on one ground, and the work supplies every other colour. A quarter of the sites use three hex colours or fewer; after the greys, the most-used colours in the whole canon are pure `#ffff00`, `#ff0000` and `#0000ff`. Take the accent from the subject — the red of the book jacket being archived (#3). → `colour.md`
5. **Type with a reason — or the browser's own, on purpose.** 69% self-host a face (Neue Haas, ABC Diatype, Monument Grotesk, Space Mono lead); 23% use only system faces and 9% declare none at all — Times and default blue as a stance. Monospace appears in 55% of stacks. Template faces are nearly absent (Inter or Geist on ~4%). The exemplars' most-declared faces are Arial, Times and Helvetica. Scale is contrast: half go down to 11px or smaller, a quarter go up past 100px, a third use four sizes or fewer. → `type.md`
6. **The index is the homepage.** Lists, tables, calendars and counts beat heroes and cards. Rules (hairline, dotted) instead of boxes; every item in the same slots; real metadata as columns; counts beside categories; timestamps; file weights. An architecture office as a spreadsheet (#535), emissions data with a strip of sky per row (#522), scores as box-drawing text (#288).
7. **Say it in a sentence.** The interface written as prose: the description *is* the navigation (#316, #282, #530), a bio with logos in place of names (#856), a rebus where drawings stand for nouns (#547), a whole page as one sentence with the signup as its last clause (#783). Voice is specific, human, often lowercase, sometimes funny, always honest — a struck-through closing time (#828), a headline that warns you the page is slow (#504). → `voice.md`
8. **Let one thing be alive.** Most studied sites (86%) do *something* — but usually one thing: the hour colours the ground, the weather sets a gradient (#832), a webcam's frames are scored like an instrument (#12), letters drift with the wind (#669), visitors appear as anonymous animals (#95), the site closes at night. A clock needs a reason (whose time? until what?). → `recipes.md`
9. **Defaults and borrowed objects are material.** Native form controls as a poem's stanzas (#123), a frameset as layout (#616), a 2000s ISP portal for an album (#631), a 2005 media player for a band (#116), Clippy as the cookie banner (#179). Quoting a genre gives the site a voice for free. *Roughness reads as intent only when the idea is sharp.*
10. **Reward the curious.** Something for the pointer, the patient and the view-source crowd: hover reveals, words that fade until you touch them (#360), a ball-pit filter (#479), a lens you drag (#254), notes in the HTML comments (#283), a different page each visit. Never hide the essentials there.
11. **Small, static, linked — built to last.** About a third of the saved sites are already dead, redesigned or walled. Plain self-contained pages (often on GitHub Pages) survived; JavaScript shells, retired hosts and lapsed domains died first. Median first-party weight is ~250 KB and a quarter are under 50 KB. Link out: a quarter carry ten or more outbound links on the first page — friends, webrings, directories, sources.
12. **Cool, and kind.** The canon's blind spots: only 17% honour reduced motion, median alt-text coverage is 17%, 56% remove focus outlines, 18% block zoom, half set text at 11px or smaller. Make every move with its guardrail (`never.md`, `recipes.md`). Cool that excludes people is just loud.

## Pick an archetype

The container is the first decision. Full descriptions, defining moves, exemplars and pitfalls: `references/archetypes.md`.

| archetype | the website is… | for | starter | look at |
|---|---|---|---|---|
| **notebook** | a notebook kept in public | essays, diaries, research logs, zines | `notebook` | #34 #124 #214 #362 |
| **index** | a catalogue, a ledger, a database | portfolios, archives, collections | `index` | #3 #522 #535 #288 |
| **sentence** | one sentence you can click | studios, bios, manifestos, small orgs | `sentence` | #316 #282 #530 #783 #856 |
| **poster** | one screen, one word, one ink | studios, labels, events, releases | `poster` | #7 #776 #201 #599 |
| **room** | a place with things in it | personal sites, shops, collections | `room` | #9 #277 #92 #793 |
| **almanac** | a calendar, a clock, a season | diaries, schedules, dated work | `almanac` | #21 #128 #243 #718 |
| **atlas** | a map, a garden, a network | link pages, directories, research | `atlas` | #81 #139 #578 #284 |
| **instrument** | something you play | type specimens, toys, tools, generators | `poster` + recipes | #254 #615 #622 #353 |
| **broadcast** | a live feed of the world | webcams, radios, data, sensors | `almanac` + recipes | #12 #76 #51 #832 |
| **costume** | a borrowed interface from another era | music, archives, parody, launches | — | #501 #116 #631 #61 |
| **exhibition** | an issue, a show, an object to turn | journals, degree shows, catalogues | `index` | #263 #838 #677 #865 |
| **specimen** | the typeface is the interface | foundries, lettering, type projects | `poster` | #776 #195 #254 #352 |
| **commons** | made by its visitors | guestbooks, anthologies, communities | `notebook` | #654 #423 #92 #249 |
| **shrine** | a love letter to the old web | fan sites, collages, personal pages | `room` | #586 #265 #441 #751 |

Archetypes combine (an almanac that is also a commons), but one leads.

## Make moves, not decoration

A move is a decision you can name ("the nav is the sentence", "the ground follows the hour"). Decoration is anything you can't. `references/moves.md` lists 70+ moves by dimension — idea, structure, type, colour, image, interaction, time, voice, details — each with the sites that do it.

- **One signature move**, carried all the way (Law 2). **Two or three supporting moves**, quieter. **Everything else plain.** The studied sites rarely stack more.
- Prefer moves that *come from the content* (the weather where you are, the count of things, the shape of the subject) over moves that come from a library.
- A move that would work identically on any site is decoration.

## Workflow

1. **Idea.** Answer the five questions. Write the one sentence at the top of `index.html`.
2. **Container.** Pick the archetype; `scripts/new.mjs` if starting fresh. Build structure in plain HTML first — the starters show the level of markup (real lists, tables, `<time>`, `<details>`).
3. **Content before style.** Put the real words, real images (alt text written now), real counts and dates in. Cool sites are 80% content.
4. **Type and ink.** Choose one face with a reason (or the system's, on purpose) and one ink on one ground. Four sizes or fewer, one of them very large if the archetype wants it. `type.md`, `colour.md`.
5. **The signature move.** Build it properly from `recipes.md` — with the keyboard path, touch path and reduced-motion variant.
6. **Details.** Favicon, title, selection colour, a colophon, last-updated, links out, a 404 that stays in character. `moves.md` § details.
7. **Audit.** `node ${CLAUDE_SKILL_DIR}/scripts/audit.mjs <dir>` — fix every error; treat warnings as questions. In CI: the `cool-check` GitHub Action (README).
8. **Look at it.** Desktop, a 390px phone, keyboard only, reduced motion on, slow network. Then the question that matters: *would someone send this link to a friend? What would they say it is?*

## Checklist

- [ ] The idea fits in one sentence and the layout couldn't hold a different subject unchanged.
- [ ] One signature move, done all the way; supporting moves quieter; no decoration you can't name.
- [ ] One ink on one ground (or a palette the content supplies); colour means something.
- [ ] Type: a face with a reason or the system's on purpose; ≤ 4 sizes; small text still in full ink.
- [ ] The words are real, specific and in a human voice; no brochure verbs, no scaffold title.
- [ ] Something is true and alive (time, data, count, place) — or the stillness is deliberate.
- [ ] Links out. A favicon of its own. A colophon or an about that sounds like a person.
- [ ] Keyboard: every move reachable; focus visible. Touch: nothing depends on hover. Reduced motion: a still variant exists.
- [ ] Every image has alt text (or `alt=""` if decoration). Zoom works. `lang` is set.
- [ ] Light: first-party HTML+CSS+JS under ~250 KB unless the idea needs more; it works (or says something) without JavaScript.
- [ ] `audit.mjs` passes with no errors.

## References

| file | read when |
|---|---|
| `references/canon.md` | you want the evidence: what the sites have in common, in numbers |
| `references/archetypes.md` | choosing or developing the container |
| `references/moves.md` | choosing the signature and supporting moves |
| `references/recipes.md` | building a move — 30 copy-ready snippets with their guardrails |
| `references/type.md` | choosing faces, sizes and the type's job |
| `references/colour.md` | choosing the ink, the ground, and when colour moves |
| `references/voice.md` | writing titles, nav, bios, about pages, colophons, errors |
| `references/never.md` | reviewing: template tells, and the canon's own bad habits |
| `references/catalogue.md` | browsing the strongest sites by archetype |
| `references/method.md` | where this comes from and how sure to be |
| `data/sites.json` | every site's notes (query with `scripts/examples.mjs`) |
