# MultiMichel — multimichel.com

Personal site for Michel Ferreira. Static HTML, CSS and vanilla JS — no build step,
no dependencies. Open `index.html` or serve the folder.

```bash
python3 -m http.server 8080
```

## Structure

| File | What it is |
|---|---|
| `tokens.css` | **The only place visual values live.** Colour, type, spacing, grid, and the `@font-face` block. Loaded first, once. |
| `multimichel.css` | Page styles. References tokens, defines nothing itself. |
| `case-study.css` | Dark theme for the two case-study pages. |
| `content.js` | Content graph (`window.MM`): experience + every item. Writing, Speaking and Around-the-internet all render from it. |

Pages: `index.html`, `about.html`, `contact.html`, `work-atlassian.html`,
`work-booking.html`, `archive.html`.

## Fonts

Three faces, self-hosted from `fonts/`, no external requests:

| Role | Face | Note |
|---|---|---|
| Identity — wordmark, nav, section labels | **Agrandir Tight Black** | licensed for this site |
| Display + editorial serif | **Fraunces** (variable) | OFL, standing in for Klim's *Family* |
| Body + metadata | **Hanken Grotesk** (variable) | OFL, standing in for Klim's *Founders Grotesk* |

The Klim files were removed: their name tables carry a "Not Licensed for
Desktop Use" notice, so they could not ship. The replacement sizes in
`tokens.css` are **not** the original design's numbers — the faces set on
different bodies, so each was re-tuned until the composition matched on screen.
`tokens.css` explains every value under "REPLACEMENT TUNING", and
`DESIGN_SYSTEM.md` §7.1 records the mapping.

Arrows are drawn by **Agrandir**, not by a symbol font and not by the platform:
it is the only face on the site carrying `↗` and `→`, which makes the mark one
designed glyph everywhere and structurally incapable of resolving to a colour
emoji. Its size comes from the rendered glyph height (`--type-arrow-size`), not
from the type around it.

Fraunces is set **three ways, not one** — `--serif-hero`, `--serif-statement`
and `--serif-editorial` — because the original design does not use its serif the
same way at 148px and at 18px. Each pins `opsz`, `SOFT` and `WONK` together with
a weight. None of those are defaults: `WONK 0` is what keeps the conventional
ampersand in *Olá & Welcome*, `SOFT` carries the small serif's warmth, and
`opsz` is pinned per role because Family is non-optical and automatic optical
sizing ran the serif 10–20% wide at text sizes.

## Design rules

Governed by `DESIGN_SYSTEM.md`. The short version:

- **Never hardcode a visual value.** It goes in `tokens.css` or it doesn't exist.
- **8pt grid** — 8 / 16 / 32 / 48 / 72. The overlay audits this live and flags
  anything off-scale.
- **The rail is real.** The page ground is white; the paper canvas is inset by
  `--rail-width` on both sides. Orange blocks sit *in* the white.
- **One column.** Masthead, hero, section labels and row titles all start at
  `--content-start`. Markers are absolutely positioned so they never push text.
- **One orange** — `#FF6C00`.
- Mobile is authored, not shrunk: the frame tightens, the hero does not.

## Deploying

Static — any host works. `vercel.json` is set up for Vercel (clean URLs, cache
headers for `fonts/`, `img/`, `video/`):

```bash
npx vercel --prod
```

## Known TODOs

- **Contact form has no backend.** `ENDPOINT` in `contact.html` is empty, so the
  form falls back to opening a mail client. Paste a Formspree URL to go live.
- **Two Speaking rows have no link** — UXCamp (YouTube) and AIxDesign (Conffab).
- **The homepage quote's "Watch the talk" link** points at the *Fast ≠ Good*
  Medium essay, not the talk recording.
- **1997 vs 1998** — the Figma frame says 1997; `content.js` and the meta
  descriptions say 1998.
