# Archetypes

Fourteen containers the studied sites keep reaching for. The collection they come from names two of them itself — "website as atlas" and "website as notebook" — and its sub-collections name more ("website as a collection of boxes", "Websites as Calendars", "Websites with clocks", "search engines for wandering", "Text-based Websites", "Poetic sites", "Whimsical Computing").

An archetype is the answer to "what is this website *like*?" Pick the one your subject already resembles; one leads, others can visit. Site numbers (#n) are in `data/sites.json` — `node scripts/examples.mjs <word>` prints them with URLs.

---

## 1. Notebook — *a notebook kept in public*

**For** essays, diaries, research logs, reading notes, zines, single long pieces.

**Defining moves**
- A browser serif or one good text face at 17–20px, a 30–36em measure, dates on everything (`<time>`), newest first.
- Notes in the margin on wide screens, inline on phones; footnotes as numbered circles; quotations with their source.
- Honest links: default blue and purple-for-visited, underlined. Many outbound links.
- Something the subject would do: the essay about waves loops forever (#214); the essay about century-scale storage runs one small machine per section, each a medium you can watch fail (#124); the solar magazine prints its own weight and battery level (#34).
- A colophon and an RSS feed. Last-updated in the footer.

**Studied** #34 Low-tech Magazine (dithered images, system type, battery meter) · #124 Century-Scale Storage (16,000 words + eight p5 sketches + a blend-mode sticky nav) · #214 A wave is a dynamic system in catastrophe (cloned section, endless scroll, 810px gaps) · #362 handwritten.blog (posts as scanned handwriting) · #703 La luce alpina (chapters numbered by scroll distance in px) · #431 On Publishing (a book spread with a gutter shadow and an edition colophon stamped at load).

**Watch out** 190-character lines (#32); text as images; a reading page that needs 2 MB of JavaScript to show a paragraph.

**Start** `scripts/new.mjs notebook <dir>` · recipes §16 sidenotes, §19 last updated, §30 print.

---

## 2. Index — *a catalogue, a ledger, a database*

**For** portfolios, studios, archives, collections, libraries, directories.

**Defining moves**
- The list or table *is* the homepage. Rows with real columns (number, title, kind, year, size, place); identical slots for every item.
- Rules, not boxes: hairline, dotted, or box-drawing characters. Counts beside every category.
- Images arrive on demand: hover/focus floats a picture under the pointer, or a tiny thumbnail rides inline.
- Filters and sort as words or pills, kept in the URL.
- A per-item twist that makes the collection one object: each row carries a sliding strip of sky (#522); every book is a coloured cell that resolves into its cover (#439); archive photos all multiplied into the page's sepia (#892).

**Studied** #3 symbools (1,504 trademarks; accent from the book's red jacket; counts on every chapter) · #535 JaJa Co (office as spreadsheet: SF column, a $ column of = / + / −) · #522 Cloud Index (emissions table, sky strip per row) · #288 Plain Text Sports (ASCII box scores, freshness stamp) · #179 Source Type index (letterspaced Times, an apple and an essay listed as equals) · #447 Dweller Forever (ASCII thumbnails, hex line numbers, Unix timestamps) · #906 (dead links struck through, not deleted).

**Watch out** grey 11px metadata on grey; thumbnails behind bare numerals with no preview (#560); hiding everything behind accordions with no hint of what's inside (#170).

**Start** `scripts/new.mjs index <dir>` · recipes §1 floating preview, §15 filters in the URL, §26 an index that unfolds.

---

## 3. Sentence — *one sentence you can click*

**For** studios, bios, manifestos, small organisations, anything whose description is short and good.

**Defining moves**
- The description is the navigation: noun phrases are links, nothing else is. No nav bar.
- Set large (40–100px), in one face, often a serif; the links in one saturated colour that fills on hover.
- Pictures stand in for words: logos in place of client names (#856), drawings in place of nouns (#547), thumbnails at text height (#783).
- Colour-code word roles if there are several (identity / filters / actions in #282).
- Small mono metadata pinned to an edge.

**Studied** #316 Printed Web (one 6rem Times sentence, 3 KB) · #282 Systemantics (black = who, grey = sector filters, lime = contact) · #530 Radical web design (adjectives as doorways over a giant hairline logo) · #783 Extra-curricular (images inline, signup form as the last clause) · #856 Max Kaplun (bio with logos for names) · #547 Tools & Utensils (rebus: sketches instead of nouns) · #340 Tomorrow Happens ("Tomorrow" beside the centre line, 64 endings scroll past) · #720 Wattis (the sentence in floated blocks; punctuation animates in first).

**Watch out** a sentence too long to scan (keep it under ~60 words); links that only reveal themselves on hover.

**Start** `scripts/new.mjs sentence <dir>` · recipes §1 floating preview.

---

## 4. Poster — *one screen, one word, one ink*

**For** studios, record labels, events, releases, holding pages, foundries.

**Defining moves**
- One word or name as large as the screen allows (fit to width), often clipped or pinned to an edge.
- A saturated field — pure `#0000ff`, red on orange, acid lime with black — and tonal type.
- Everything else in the four corners at 11–13px: what it is, where, when, contact.
- Scale contrast is the hierarchy: 110–300px against 10–12px; nothing in between.
- One live detail: the studio's local time, a countdown, the field that follows the hour.

**Studied** #7 Atlantis (FK Raster Grotesk pixel wordmark) · #776 Klim (a giant letter as its Bézier skeleton on #0000ff) · #201 APOD.LI (110px caps nearly clipping, a tilted sticker) · #599 Wette auf die Zukunft (colossal violet title, tiny neon-green flight console) · #452 Sounds Like These · #794/#829 Special Offer (red on orange, a gradient spine) · #234 brat generator (lime, one word).

**Watch out** text baked into images (#677); white text on pastel; holding pages that stay holding pages for years.

**Start** `scripts/new.mjs poster <dir>` · recipes §7 hour-aware ground, §17 fit a word, §18 clocks.

---

## 5. Room — *a place with things in it*

**For** personal sites, collections, shops, studios with objects, anything tactile.

**Defining moves**
- One screen, a surface (paper, desk, grass, sky), objects lying on it at slight angles.
- You can pick things up; they stay where you leave them.
- Physical materials for UI: washi-tape headings, paper cards, binder rings (#92), embossed pebbles for nav (#436).
- Navigation is the furniture: a door, a shelf, a window, a cairn.
- One sentence that tells the visitor what to do — #277 hands the decorating over to them.

**Studied** #9 work.peter.stream (subdomain per room) · #277 irony machine (twelve draggable GIFs and a blank page) · #92 manacake guestbook (stationery UI) · #423 A Website Is A Room (indents as a poem, a ledger of submitted rooms) · #793 TWOMUCH (projects as floating 3D objects, a live clock) · #673 (nav as pebbles) · #899 (the desk photo's screen shows the wallpaper beside it).

**Watch out** first visit on a phone with objects stacked off-screen; nothing reachable by keyboard; meaning that only exists in position.

**Start** `scripts/new.mjs room <dir>` · recipes §10 things you can pick up, §9 chance.

---

## 6. Almanac — *a calendar, a clock, a season*

**For** diaries, daily practices, schedules, dated series, shops with hours, anything regular.

**Defining moves**
- The year (or day) as a grid: done days filled, future days empty, today marked.
- The page knows the time and says so with a reason: the studio's city, how long until, the visitor's own hour.
- Opening hours, closed states, seasons (#828 Gossip's Cafe: struck-through hours and a note box for whoever comes back in the morning).
- Idle states that are part of the idea: a square sun sets when you stop moving (#243).
- Tabular figures for every number.

**Studied** #21 SNAKKEBOB (one red year; published days are white cells; visited cells darken) · #128 time.sprig (a year of lilac squares filled from an Are.na channel) · #243 Handmade Web library (idle sunset, 30 seconds, palettes swap) · #718 Memory Work (your real clock, the year fixed at 2038) · #592 (a ticking countdown at poster scale) · #866 2727 California St (a calendar homepage).

**Watch out** clocks with no reason; 12-hour clocks with AM/PM jitter; time zones that silently mean the visitor's when they should mean yours.

**Start** `scripts/new.mjs almanac <dir>` · recipes §7, §8, §18.

---

## 7. Atlas — *a map, a garden, a network*

**For** link pages, directories, research maps, gardens of notes, "search engines for wandering".

**Defining moves**
- Things placed in space, joined by paths; wander by scroll or drag.
- A random door.
- Size or colour encodes something true (a treemap sized by entries, #81).
- Links visible as relations, not hidden behind menus.
- A list underneath for keyboards and screen readers.

**Studied** #81 garden of blues (treemap; flower glyph per entry; water turns blue) · #139 diagram.website · #578 hyper (fly between documents on a sphere grid) · #284 Critical Atlas of Internet · #222 (navigation drawn as a branching tree) · #232 Our Networks (sitemap as `tree`) · #479 Fuse.kiwi (a ball-pit filter over a hairline directory) · #257 Museo (visual search).

**Watch out** a beautiful map with no list; panning that fights the scroll wheel; nodes too small to tap.

**Start** `scripts/new.mjs atlas <dir>` · recipes §9 chance, §20 neighbours.

---

## 8. Instrument — *something you play*

**For** type specimens, toys, generators, small single-purpose tools, interactive essays.

**Defining moves**
- The homepage *is* a working thing; instructions are one line or none.
- One control that reshapes everything (a lens you drag, #254; pointer bound to two font axes, #615).
- Live readouts in the corners (axis values, counts, the current state).
- A system UI primitive turned into material: 190 loading spinners to touch (#622), native buttons as poem words (#463).
- Output styled as the artefact it imitates: a colour analysis typeset as a book plate (#97); a risograph emulator that prints in riso colours (#64).

**Studied** #108/#254 Trekker (drag-me lens, concave panels, sound) · #615 OnX Variable · #622 Field · #353/#558 Ezekiel Aquino (a playable score bent into a ring) · #97 Color Problems · #64 riiso · #276 Tooooools · #29 Grid Drawing Club.

**Watch out** an instrument nobody knows how to start — one visible affordance ("drag me", blinking arrows); sound without a switch.

**Start** `poster` starter for the frame; recipes §2 cursor, §11 sound, §28 data-driven type.

---

## 9. Broadcast — *a live feed of the world*

**For** webcams, radios, sensors, live data, anything that is happening now somewhere else.

**Defining moves**
- The feed is the hero; metadata is honest and precise (time of capture, freshness, source).
- Data becomes material: every frame scored like an instrument (#12); weather drives a gradient and is narrated as a sentence (#832); every train is a note (#51).
- Two colours or one: an LCD (#76), a field of grey with one red strike (#900).
- What happens when the feed fails is designed (`null` left showing in #900 is part of the piece).

**Studied** #12 Fog-Bank (FogCam frames with motion, lamp, focus scores; moon phase) · #76 Bop Spotter (a lamppost microphone's song log as a two-colour LCD) · #51 trainjazz (every NYC subway train a note) · #832 weather gradient · #678 SILO (weather, moon, your screen size in hairline cells) · #521 tree.fm · #405 wilding.radio · #147 a live webcam since 2007.

**Watch out** autoplaying sound; a blank page while the feed loads; data with no timestamp.

**Start** `almanac` starter for the frame; recipes §18, §28, §29.

---

## 10. Costume — *a borrowed interface from another era*

**For** music, archives of a period, parody, launches, anything with a strong cultural reference.

**Defining moves**
- Pick one period idiom and rebuild the real controls in it: a 1984 Mac window (#501), a 2005 media player (#116), a 2000s ISP portal with a weather widget and a $1999.99 MSRP (#631), Windows 95 (#61, #695), Frutiger Aero (#588), an iPhone frame (#133).
- Keep the joke consistent: the cookie banner is a Clippy dialog (#179); the cart is renamed a to-do list (#635).
- Everything functional still works (filters, play, buy).

**Studied** #501 Classic HCI Demos · #116 After · #631 Toro y Moi · #61/#55/#58 (Are.na channels rendered as a Win95 desktop, a scrapbook, classifieds — one engine, three costumes) · #179 Source Type · #701 Moving Parts (the landing page built from its own product's UI).

**Watch out** a costume that's only skin; inaccessible fake controls; period-accurate low contrast.

**Start** no starter; build from the real UI's anatomy. Recipes §2 cursor, §5 living title.

---

## 11. Exhibition — *an issue, a show, an object to turn*

**For** online journals, degree shows, biennials, catalogues, festivals, special issues.

**Defining moves**
- The contents are a figure: a sunburst of names that turns with scroll (#263), a ring of letters rewriting itself (#838), a sun whose rays point at numbered rooms (#677).
- One numbering system ties schedule, map and works together (#677).
- Each issue or contributor gets its own colour pair or face inside a fixed frame (#734, #722).
- Headlines as tickers with thumbnails as words (#865 Stedelijk).

**Studied** #263 the html review 03 · #838 e-flux SUPERCOMMUNITY · #677 Werkplaats Typografie 2018 · #865 Stedelijk · #732 CSM Degree Show (identity as an instrument panel with a timeline scrubber) · #619 RISD GD Triennial · #600 Kunsthalle Osnabrück (nav by tense: War / Ist / Kommt).

**Watch out** event sites die fastest; archive the show as static files when it ends.

**Start** `index` starter; recipes §4 ticker, §27 scroll-linked.

---

## 12. Specimen — *the typeface is the interface*

**For** type foundries, lettering, type projects, anything about letters.

**Defining moves**
- The face is the hero at enormous size; the UI is set in it, small.
- Each font name set in its own face (#352); quotations as specimens (#325, #847).
- One tool instead of a tester: a draggable lens (#254), pointer-bound axes (#615), anatomy painted on a giant pangram with clickable parts (#342).
- The craft shown as image: a letter's Bézier skeleton (#776).

**Studied** #776 Klim · #195 Plain Form (130px jagged display, open menus, blend mode) · #254/#108 Trekker · #352 nan.xyz · #7 FK Raster Grotesk · #458 Font Interceptor · #119 Commercial Type.

**Watch out** specimens as images (unsearchable, uncopyable); 5 MB of font files to show one word.

**Start** `poster` starter; recipes §17 fit a word, §28 data-driven type.

---

## 13. Commons — *made by its visitors*

**For** guestbooks, anthologies, communities, open calls, collaborative poems.

**Defining moves**
- One small, clear contribution: one line of a haiku (#654), one room (#423), one stamp of a flower (#410).
- Contributions shown as a ledger or as objects, with names and timestamps.
- Presence: anonymous visitor names ("adjective-animal") and "left the site" (#95); counts of who's here.
- A rule that makes the whole cohere (frosted blobs with a different outline per card, #654).

**Studied** #654 Haiku-Haiku · #423 A Website Is A Room · #92 manacake guestbook · #249 bookshelf.town · #250 The Wanderverse Project · #789 The Life and Death of an Internet Onion (peel a layer; the next reply waits as ghost text) · #653.

**Watch out** moderation; spam; a commons with no contributions yet — seed it.

**Start** `notebook` starter for the frame; a form posting to whatever store you trust.

---

## 14. Shrine — *a love letter to the old web*

**For** fan pages, personal homepages, collages, tributes, Neocities and Nekoweb sites.

**Defining moves**
- Old-web material with provenance: GIFs cut from GeoCities and linked back to their sources (#586 Cameron's World).
- Tiled backgrounds, 88×31 buttons, webrings, guestbooks, hit counters — chosen, not inherited.
- Dense, joyful, handmade; a voice that talks to the visitor.
- Every button its own tiny poem (#265).

**Studied** #586/#415 Cameron's World · #265 Everything I Love: Buttons · #441 cinni's dream home · #31 The Summerlands · #751 Shrekfest · #412 STAR CODE · #910 Nookipedia.

**Watch out** a headline warning that the page is slow is honest but still slow (#504): lazy-load, and give GIFs alt text.

**Start** `room` starter; recipes §5 living title, §6 favicon, §20 webrings.
