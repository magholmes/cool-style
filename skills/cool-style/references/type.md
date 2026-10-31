# Type

What the 755 sites still online in October 2026 actually set, and what the strongest ones do with it.

## The numbers

| | share of live sites |
|---|---|
| self-host at least one face (`@font-face`) | 69% |
| use Google Fonts | 12% |
| use Adobe Fonts | 4% |
| use **only** system or generic faces (Times, Helvetica, Arial, monospace, system-ui) | 23% |
| declare no face at all — the browser's default serif | 9% |
| have a monospace in some font stack | 55% |
| go down to 11px or smaller somewhere | 47% |
| go up to 100px or larger somewhere | 23% |
| use four distinct font sizes or fewer | 34% (median: 9) |
| most-used body size | 16px (219 sites), then 14px (71), 12px (39) |

**The faces that recur** (distinct sites declaring each family): Times, set explicitly (55 — plus the 67 that declare nothing and get it anyway), Courier (54), Neue Haas Grotesk / Unica (43), ABC Diatype with its mono and semi-mono cuts (33), Monument Grotesk (19), Space Mono (13), IBM Plex (12), Grilli Type's GT families (11), Inconsolata (11), Pangram Pangram's PP families (10), EB Garamond (10), Suisse (9), Charter (7), Favorit (6); and Helvetica Neue and Arial everywhere as stacks.

**The faces that don't:** Inter on 21 sites, Geist on 8 — about 4% together, almost all product or framework pages. Roboto 27 (largely WordPress themes), Montserrat 10, Poppins 8.

**Among the exemplars** (the 108 sites flagged as teach-from-this), the most-declared faces are **Arial, Times New Roman and Helvetica**. The best sites rarely depend on an expensive face; they depend on what they do with a plain one.

## Five ways the studied sites choose

1. **The browser's own, on purpose.** Times at 16px, blue links, no stylesheet, or one line of CSS. Reads as honest, archival, of-the-web. Right for plain-HTML essays (#146), indexes (#179), research, anything about the web itself (#316 is 3 KB and one 96px Times sentence). Wrong for anything that must feel finished in a commercial sense — and that's the point.
2. **System faces as a material.** Helvetica/Arial or `system-ui` + `ui-monospace`. The look of a document or a tool; costs nothing; never fails to load. The default of a large share of the canon's tool and index sites.
3. **One foundry face with a reason.** A grotesk with character (Diatype, Monument, Neue Haas, Söhne, Favorit), a period serif for a period subject (blackletter for a manuscript, #62; LM Roman for a book plate, #97), a pixel or dot-matrix face for a screen subject (#76, #36). Self-host it (`font-display: swap`, preload the one weight above the fold).
4. **A display face that *is* the brand, everything else plain.** Dots (#1), dot-matrix (#36, #39), blackletter (#27), pixel (#7, #40), bubble (#6). One appearance — wordmark, headings — then system text.
5. **Mono for the machine voice.** Dates, counts, file sizes, coordinates, metadata, buttons — in monospace, beside a grotesk or serif for the human voice. Over half the canon does this.

## Scale

- **Few sizes.** A third of the sites use four or fewer. Try: 11–12px (labels, mono), 15–18px (text), and one enormous size (a word, a number, a headline). Skip the in-between "h3".
- **Contrast is the hierarchy.** 110–300px against 10–12px (#195, #201, #599). No bold needed.
- **Small is a style; small and grey is a wall.** Half the sites go to 11px or below — fine in full ink at ≥ 4.5:1. Grey 9px captions on a tinted ground are the most-cited weakness in the study notes.
- **Fit to width** for one-word posters (`recipes.md` §17), not a fixed size.

## Behaviour

- **Type that acts out the subject** — letters on waves (#347), spacing from wind data (#669), a variable axis that grows (#320), a word ring rewriting itself letter by letter (#838), bio letters as physics particles kept legible in a default serif (#608). One behaviour, on headings or a single line; body copy stays still.
- **Variable fonts as instruments** — pointer bound to axes with the values printed in the corners (#615); a weight ramp across one word (#738).
- **Mixed faces inside one sentence** — grotesk for facts, italic serif for titles, like a concert programme (#353); sans-to-serif switch mid-line (#804).

## Details that read as care

- `text-wrap: balance` on headings, `pretty` on paragraphs (8% of sites; cheap).
- `font-variant-numeric: tabular-nums` for clocks, counts, tables (14%).
- Curly quotes, real ellipses (…), `&nbsp;` between a number and its unit.
- `hanging-punctuation: first` for serif text where supported.
- Lowercase as a voice (about 1 in 20 sites run almost entirely lowercase; 1 in 20 entirely caps): choose one register for chrome and keep it.
- No faux bold or italic: if a face has no italic, don't fake it — switch faces (the serif italic inside a grotesk line is a classic).

## Pairings seen working

| pairing | where |
|---|---|
| grotesk (Diatype / Helvetica) + system mono | studios, indexes, tools (most common) |
| browser serif + system mono | notebooks, research, archives |
| giant display serif + Courier body, one ink | #157 |
| blackletter display + one ink, everything else plain | #27, #62 |
| pixel/dot face for the wordmark + system UI | #7, #36, #40, #76 |
| default Times + default blue, nothing else | #316, #125, #146, #608 |

## Never

Inter or Geist as the face (the audit errors on both — they're what generated apps arrive in); five families on one page; type set in images; `font-weight: 700` as the only hierarchy; letter-spaced lowercase.
