# Colour

From the 755 sites still online and the notes on all 916.

## The numbers

- **Distinct hex colours per site:** median 11. A quarter use **three or fewer**. 215 sites use 30+ (mostly theme and framework CSS).
- **Most-used colours across all sites**, by number of sites: `#ffffff` 518, `#000000` 433, then a run of greys (`#ccc`, `#333`, `#999`, `#ddd`, `#222`, `#eee`) — and then pure primaries: **`#ffff00` (33), `#ff0000` (30), `#0000ff` (29)**, later `#00ff00` (11). Bright pure colour is the canon's accent.
- **Body backgrounds** declared: white and near-white dominate; then black, `aliceblue`, `honeydew` (`#f0fff0`), `gainsboro`, `mistyrose`, `whitesmoke`, `darkkhaki` — CSS *named* colours, chosen for their names.
- **Study-note tags** (all 916): black-and-white 30% · one accent 22% · one tinted monochrome 16% · pastel 14% · multicolour 13% · a saturated field 13% · dark ground 11% · paper 9% · colour led by photographs 9% · gradient 7% · default link colours 5%.
- The *most distinctive* sites (rated 5/5) use gradients (10% vs 3%), multicolour (14% vs 4%) and saturated fields (10% vs 4%) far more than the least distinctive (rated ≤2), and default link colours less (7% vs 14%): colour reads as authored when it is committed, not when it is timid.

## Six systems the studied sites use

1. **One ink on one ground.** Type, rules, icons and image tints all one colour. Ultramarine on white (#157), vermilion on grey (#551), green on cream (#339), violet (#322), cobalt and cream (#317, #502), olive on gainsboro (#715). The single most repeated pattern across all eighteen study batches.
2. **The work supplies the colour.** The interface is black and white (or one tint); only the photographs, covers, swatches and artworks are coloured (#104, #209, #251, #227). The default for portfolios and archives.
3. **A saturated field.** The whole ground is one strong colour, the type white or black: pure `#0000ff` (#776, #676, #548, #862), acid lime with black (#234, #775, #781, #478), red on orange (#794, #829), flat vermilion (#488).
4. **Tonal zoning.** Two neighbouring hues do the separating instead of borders: red type on orange, a red rule, a thin gradient spine (#829); periwinkle duotone (#173).
5. **Colour from the subject.** The red of the archived book's jacket (#3); green sampled from the artwork (#587); lawn green for a webcam of a lawn (#147); the store theme sampled from the game (#199); every image tinted the brand green (#682).
6. **Colour that changes for a reason.** By the hour (`poster` starter), the weather (#832: hue and speed from live readings, printed as a sentence), the site's "energy" (#283), the issue (#630), a palette per story stored as data attributes (#722).

## Recipes

```css
/* One ink: everything derives from two values. */
:root { --ground: #f4f1ea; --ink: #1d1dff; }
body { background: var(--ground); color: var(--ink); }
hr, .rule { border: 0; border-top: 1px solid currentColor; }
img.inked { filter: grayscale(1) contrast(1.1); mix-blend-mode: multiply; }   /* on a light ground, images take the ink */
::selection { background: var(--ink); color: var(--ground); }
```

```css
/* Tonal zoning: no borders, two neighbouring hues. */
:root { --hot: #ff5a1f; --hotter: #e3001b; }
.zone-a { background: var(--hot); color: var(--hotter); }
.zone-b { background: var(--hotter); color: var(--hot); }
.spine { background: linear-gradient(var(--hot), var(--hotter)); width: 12px; }
```

```css
/* Archive unity: mismatched scans read as one collection. */
.page { background: #e9dcc1; }
.page img { filter: grayscale(1); mix-blend-mode: multiply; transition: filter 200ms linear; }
.page img:hover, .page a:focus-visible img { filter: none; mix-blend-mode: normal; }
```

## Rules of thumb

- **Pick the ground first.** The ground is the room's wall; the ink is everything you write on it.
- **One accent means one meaning.** If the accent marks links, it marks only links. If it marks "now", only now.
- **Named colours are allowed** (`honeydew`, `mistyrose`, `aliceblue`): several studied sites choose them for the name.
- **A gradient must be something** — a sky, a sunset, an aura, the weather, a spine between two zones. The indigo-to-violet "app" gradient appears on zero studied sites.
- **Contrast on every pair.** White on pastel and pale grey on tint are the commonest failures in the notes. Check each ground/ink pair at ≥ 4.5:1 for text (3:1 for 24px+).
- **Dark mode only if both are designed.** Several sites flip ground and ink as a deliberate edition (#724 → #760). A toggle that half-works is worse than one ground.
- **Images in duotone or 1-bit** make a single-ink site whole (`recipes.md` §22).
