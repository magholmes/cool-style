# Never (and the canon's own blind spots)

Two lists. The first is what the studied sites almost never do — the template tells. The second is what they *often* do that you shouldn't copy, because it hurts people. Numbers are shares of the 755 sites still online in October 2026.

## 1. Template tells — absent from the canon

| tell | how often in the 755 | instead |
|---|---|---|
| Indigo→violet gradient hero | 0 sites | a field of one colour; a gradient only if it is something (a sky, an aura, the hour) |
| "Get started" / "Book a demo" / "Start your free trial" | 3% (24), mostly SaaS saved for one odd detail | name the destination: "read the zine", "see 40 chairs", "write to me" |
| Brochure verbs: elevate, unlock, seamless, empower, supercharge, revolutionise | 5% | a plain sentence about what it is, as you'd say it aloud |
| A `.hero` section | 6% | the first screen *is* the thing (the index, the object, the word, the tool) |
| Inter or Geist as the face | ~4% (Inter 21, Geist 8 sites) | a face with a reason, or the browser's own — `type.md` |
| Icon fonts (Font Awesome, Material) | 3% | words, or one glyph (→ ↗ ✿ ※ ☾) |
| Chat widget | 1% | an email address |
| Carousel / slider library | 9% | everything visible at once (a grid, a scatter, a list), or the cursor as the control |
| Soft rounded shadowed cards in a 3-up grid | rare enough not to show up as a pattern | rules, tables, lists, objects on a surface, or nothing |
| Stock photography | not observed in exemplars | your own photographs, scans of real things, screenshots, drawings |
| Lorem ipsum, "Your Name Here", scaffold titles ("Vite + React", "Document") | a handful of student sites — and they read as unfinished | the real words; voice is half the site |
| Dark-mode toggle for its own sake | rare | one ground chosen on purpose; a switch only if both grounds are designed |
| Preloader that hides nothing | a few, and they're the slowest pages | show the page; if loading is slow, make the wait part of the idea (a sun that rises, a counter) |
| Scroll-jacking (Lenis, Locomotive) | 1.6% | native scroll. Only take over the wheel when scrolling *is* the work |

The pattern under all of them: **a template answers "what does a website look like?"; every studied site answers "what is this website about?"** If a choice would look the same on a site about anything else, it's a tell.

## 2. Copy the moves, not these habits

The canon is not perfect. These are common in it and you should not inherit them.

| habit | how often | why not | do this |
|---|---|---|---|
| No `prefers-reduced-motion` while things move | only 17% honour it; 56% have keyframes | motion sickness, vestibular disorders, distraction | design a still variant of every moving thing (`recipes.md` §24) |
| Images with no alt text | median alt coverage 17%; 0% on 212 sites | a scan archive is invisible to a screen reader | describe what's in it; `alt=""` only for pure decoration |
| `outline: none` | 56% | keyboard users lose their place | a focus ring in your accent, `:focus-visible` |
| Pinch-zoom disabled | 18% | low-vision visitors can't read the 11px type | never set `maximum-scale=1` / `user-scalable=no` |
| `transition: all` | 31% | animates things you didn't mean to (and layout) | name the properties |
| Tiny grey text | ≤ 11px on 47% of sites | small is a style; small *and* low-contrast is a wall | small type in full ink; grey only for labels ≥ 12px at ≥ 4.5:1 |
| `cursor: none` with a fancy follower | 8% | touch and keyboard users get nothing; laggy followers feel broken | `recipes.md` §3: scope to fine pointers, keep focus rings |
| No `lang` attribute | 27% | screen readers mispronounce, translators guess | `<html lang="en">` |
| Sound that starts by itself | rare, but unforgivable | it's the fastest way to be closed | a visible switch that starts and stops it |
| Content only reachable by hover | common on index sites | touch and keyboard can't hover | reveal on `:focus-within` too; on touch, the tap navigates |
| Text baked into images | common on poster-like sites | unreadable, untranslatable, unsearchable | real text, set large; images for images |

## 3. Things that are fine, despite looking "uncool" by template standards

- **Times New Roman, blue underlined links, a grey background.** 9% of the live sites declare no typeface at all. When it's chosen, the browser default reads as honesty.
- **A long text page with no images.** Many exemplars are essays and lists.
- **Visible seams.** A tiled background with the seam showing, a table with every border, a GIF. If it's deliberate, it's texture.
- **Being small and odd.** A site that only shows rotating sandwiches is in the canon. Scope is not a quality.
- **Platforms.** Cargo (47 sites), WordPress, Squarespace and Next.js all appear. The platform doesn't decide anything; the template does.
