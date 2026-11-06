# Juno logo

Peacock-feather mark for Juno. **Settled: lockup v3 + o-mark v3.** Open `preview.html` to
see every file on light and dark backgrounds, in a mock login card, and at favicon sizes.

## Files

| File | Use |
|---|---|
| `juno-lockup-v3.svg` | **Wordmark.** "Jun" + the o as a ring with five leaves sweeping clockwise over it. Text/ring use `currentColor`; wrap in `<object>` or inline `<svg>` and set `color` (in `<img>` it renders black). Text is live type — outline to paths before shipping. |
| `juno-o-mark-v3-light.svg` / `-dark.svg` | **Mark / favicon.** The o and its sweep, square-ish, ring in dark or light. SVG favicons work in Edge/Chrome/Firefox; make a PNG/ICO for Safari and for uploaders that reject SVG. |
| `archive/` | Superseded iterations: lockup v1/v2, o-mark v1/v2, and the first symmetric five-leaf fan (`juno-mark-*`). |
| `png/` | Transparent PNG renders for uploaders that reject SVG (Keycloak Theme customization takes PNG/JPEG/WebP only: logos ≤ 640×240, browser icon ≤ 256×256). Regenerate with `./render-png.sh` (headless Edge, no ImageMagick needed). The lockup PNGs have the text colour baked in: `-light-` = dark text for light cards, `-dark-` = light text for dark cards. |

## Keycloak upload map

| Theme customization field | File |
|---|---|
| Login card logo, light appearance | `png/juno-o-mark-v3-light-512.png` (or `png/juno-lockup-v3-light-1068x480.png` with the *wordmark* crop) |
| Login card logo, dark appearance | `png/juno-o-mark-v3-dark-512.png` (or the `-dark-` lockup) |
| Browser icon (favicon) | `png/juno-o-mark-v3-light-256.png` |

## Colour = platform layer (smallest → largest leaf)

| Leaf | Hex (light bg) | Hex (dark bg) | Stands for |
|---|---|---|---|
| 1 | `#ff1243` | `#ff4d6d` | Equinor (Energy Red) — the origin |
| 2 | `#17a589` | `#1fbf9f` | Data layer: ADX + Cosmos today, Neo4j later (same colour, so the swap changes nothing) |
| 3 | `#3a86c8` | `#5b9fdb` | HoloViz / Panel |
| 4 | `#f37726` | `#f58a45` | JupyterHub (Jupyter orange) |
| 5 | `#9547c0` | `#a85fd0` | Nebari (platform) — matches the Keycloak theme's default primary |
| ring / text | `#262628` | `#f8f8f8` | Keycloak theme main-text colours |

HoloViz and Jupyter values are close approximations of their brand colours; swap in official
hex if we obtain them. Eye-spots are even-odd holes, so the background shows through.

## Geometry (for anyone regenerating)

One leaf path (length 158, width 64, rounded base r=9, eye hole at 77%), placed around the
ring centre at angles 138° → 30° (o-mark v3: 143° → 35°) in 27° steps, each leaf leaning 6°
clockwise off radial, scales .12 → .34 (o-mark v3: .16 → .44), tips on a growing envelope so
bases float inward with a 16 → 10 px margin off the ring. Details are in each SVG's header.
