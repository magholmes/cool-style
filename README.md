# cool-style

A skill for Claude about what makes a website *cool* — distilled from a close look at hundreds of independent websites: personal sites, net art, type foundries, archives, studios, small tools, journals. It's what they have in common, what each does that nobody else does, and how to do it yourself.

> A template answers "what does a website look like?" Every one of these sites answers "what is *this* website about?" — and then lets the answer decide the layout, the type, the colour and the one thing that moves.

**Counted, not guessed.** Every site got a written note — what it is, its type, colour, layout and imagery, its signature move, why it works, and one instruction you could steal — and the figures below are measured, not estimated. 108 sites are flagged as exemplars.

A few things that turned up:

- 69% self-host a typeface; only 12% use Google Fonts; Inter or Geist appear on ~4%. The exemplars' most-used faces are Arial, Times and Helvetica.
- A quarter use three colours or fewer. After the greys, the most-used colours in the canon are pure `#ffff00`, `#ff0000` and `#0000ff`.
- Median first-party weight is ~250 KB; a quarter are under 50 KB. About a third of the saved sites are already dead, redesigned or walled — plain static pages survived best.
- The most distinctive sites are far more often *alive* (time, live data, sound, things to drag, visitors) and poetic or funny than the least distinctive — and far less often a static column of text.
- Their blind spots: only 17% honour reduced motion, median alt-text coverage is 17%, 56% remove focus outlines, 18% block zoom. The skill keeps the moves and adds the guardrails.

## What's in it

| path | what |
|---|---|
| `skills/cool-style/SKILL.md` | the idea interview, 12 laws, 14 archetypes, the workflow and checklist |
| `references/canon.md` | the evidence: what the sites share, in numbers; what separates the most distinctive from the least |
| `references/archetypes.md` | notebook, index, sentence, poster, room, almanac, atlas, instrument, broadcast, costume, exhibition, specimen, commons, shrine |
| `references/moves.md` | 82 named moves by dimension, each with the sites that make it |
| `references/recipes.md` | 30 dependency-free code recipes, each with its keyboard / touch / reduced-motion guardrail |
| `references/type.md`, `colour.md`, `voice.md` | what the sites actually set, and how to choose |
| `references/never.md` | template tells (absent from the canon) and the canon's own bad habits |
| `references/catalogue.md` | the strongest sites, by kind, with their signature moves |
| `references/method.md` | where it comes from and how sure to be |
| `data/sites.json` | the note on every site, with a few measured facts |
| `assets/starters/` | seven one-file starter sites (4–9 KB, no dependencies), one per archetype |
| `scripts/new.mjs` | start a site from a starter |
| `scripts/examples.mjs` | find studied sites that make a move (`ix-drag`, `clock`, `--kind type-foundry`, `--random 5`) |
| `scripts/audit.mjs` | cool-check: template tells, craft gaps, accessibility guardrails, and the moves you already make |
| `action.yml` | cool-check as a GitHub Action |

## Install

**Claude Code, as a plugin.**

```
/plugin marketplace add magholmes/cool-style
/plugin install cool-style@cool-style
```

**Claude Code, as a personal skill.** Shorter to call (`/cool-style`), and yours to edit.

```bash
git clone https://github.com/magholmes/cool-style
```

```bash
cp -r cool-style/skills/cool-style ~/.claude/skills/
```

On Windows: `Copy-Item -Recurse cool-style\skills\cool-style $HOME\.claude\skills\`. For one project only, copy the folder into that project's `.claude/skills/`.

**claude.ai and Claude Desktop.** Download `cool-style.zip` from the latest release and upload it under Settings → Capabilities → Skills.

## Use

Ask in plain words; the skill loads when the request is about making a site feel original.

- "Make my portfolio cool — it looks like every other template."
- "Build a one-page site for our risograph studio."
- "This archive of 400 posters needs a homepage that isn't a grid of cards."
- "Review this site against cool-style."

Or `/cool-style`. Claude starts with five questions about what the site *is*, picks an archetype, then makes one signature move.

## Scripts

```bash
node skills/cool-style/scripts/new.mjs --list                     # the seven starters
node skills/cool-style/scripts/new.mjs sentence ./site            # start one
node skills/cool-style/scripts/examples.mjs ix-time --live        # studied sites that use time
node skills/cool-style/scripts/examples.mjs --random 5            # five strong sites to look at first
node skills/cool-style/scripts/audit.mjs ./site                   # cool-check
```

## cool-check in GitHub Actions

```yaml
# .github/workflows/cool-check.yml
name: cool-check
on: [push, pull_request]
jobs:
  audit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: magholmes/cool-style@v1
        with:
          path: site          # folder with your HTML/CSS/JS
          max-kb: "600"       # first-party source budget
          strict: "false"     # "true" fails on warnings too
```

Errors fail the job and land as annotations on the pull request: scaffold titles, Inter/Geist, the indigo-violet gradient, `transition: all`, removed focus outlines with no replacement, motion without `prefers-reduced-motion`, images without alt, blocked zoom, autoplaying sound, lorem ipsum. It also lists the cool moves the site already makes.

## Credits

With thanks to the people who collect cool websites on Are.na — the taste behind this is theirs. Every site belongs to its makers; this repository holds descriptions and measurements of them, not copies. Go and look at them while they're still up.

MIT licence for the code and the writing.
