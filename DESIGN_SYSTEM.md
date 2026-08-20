# MultiMichel — Design System & Art Direction

This document is the visual source of truth for implementing and extending MultiMichel.

It exists because the original design lives in Figma and may not be accessible to the implementation agent.

The design is intentionally restrained, unusually spacious, editorial, and rhythmic.

Do not treat this as a generic portfolio website.

Do not "improve" the design by adding conventional website UI.

---

# 1. CORE IDEA

MultiMichel is an authored personal publication.

It should feel:

- experienced
- editorial
- energetic
- human
- confident
- slightly unexpected
- rigorously composed

It should NOT feel:

- corporate
- SaaS-like
- like a portfolio template
- like a design-system demo
- like an AI-generated "senior designer website"
- excessively minimal for the sake of looking sophisticated
- busy for the sake of expressing personality

The fundamental principle is:

> **Energy comes from modulation, not noise.**

The site should constantly change its visual volume.

Quiet → loud → conversational → visual → dense → quiet → visual.

This is RHYTHM.

---

# 2. FIGMA SOURCE

The only Figma design that defines this website is node:

`1:1988`

Everything in this document describing the current homepage through WORK is derived from that node.

Do not use other Figma frames as design references.

---

# 3. DESIGN PRINCIPLES

## 3.1 Rhythm over consistency

Do not make every section behave the same way.

The site should have consistent:

- typography
- palette
- grid
- visual language
- attitude

But it should NOT have identical section cadence.

Avoid mechanical repetition of: section heading, fixed gap, content, fixed gap, repeat.

Instead use changes in:

- whitespace
- type scale
- information density
- image scale
- number of columns
- media type
- colour
- interaction
- alignment

to create rhythm.

---

## 3.2 Whitespace is an active compositional element

Large empty areas are intentional.

Do not compress whitespace because:

- "there is room"
- content could fit above the fold
- the layout feels inefficient
- conventional responsive design would use less
- a section looks empty

Empty space creates anticipation.

The opening specifically uses:

masthead → silence → enormous headline

The silence is what makes the headline hit.

Do not interpret this as "every section needs huge whitespace." Whitespace is one instrument in the rhythm.

---

## 3.3 Deep data, simple presentation

The content system can know a lot. The visitor does not need to see all of it.

Internal metadata may contain: publication date, provenance, source URLs, verification status, language, topic, event, recording, slides, press coverage, artifacts.

Do NOT automatically render those fields. The public interface should be ruthlessly edited.

For example:

`Fast ≠ Good                         Medium`

is better than:

```
Fast ≠ Good
Essay · June 2026
Design practice, speed
Read on Medium →
Language: English
```

The website is editorial, not transactional.

---

# 4. COLOUR

Use these exact colours unless a future design deliberately introduces something new.

## Main canvas
Paper: `#F8F5F2` — do not replace with pure white.

## Primary dark
Slate: `#33291D`

## Secondary dark
Oak: `#4A3A2A`
Dim: `#5C5141`
Dark headline/row text: approximately `#1A1916` / `#1C1A15`

## Secondary text
Muted brown: `#7A6D59`

## Rules
Light rule: `#ECE8DF`
Underline / stronger rule: `#C9C4B8`

## Main orange
`#FF6C00` — high-impact accent, used sparingly. Large orange blocks have more power than dozens of tiny orange interface details.

## Work label orange
The current case-study label uses `#FF5226`. Preserve where matching the existing design.

---

# 5. TYPOGRAPHY

Typography is one of the primary identity systems. Do not substitute generic fonts simply because they are easier to load.

Do NOT use: Inter, Arial, Helvetica, Archivo, Newsreader as replacements for the actual design fonts.

Michel has the font assets. Use them when available and licensed for web use.

> **What actually ships.** Agrandir is licensed and ships as-is. Family and
> Founders Grotesk are not, so the site sets them in Fraunces and Hanken
> Grotesk — see §7.1. Everything in §5 below stays written as the ORIGINAL
> design, because it is the target: the replacement sizes were tuned until the
> composition matched these values on screen, not until the CSS matched them on
> paper. Read a size here as "what this must look like", not "what to type".

## 5.1 Masthead
Font: **Agrandir — Tight Black**, weight 900, size 24px, tracking approx `-0.096px`, colour `#2E2C29`, uppercase.

## 5.2 Navigation and section labels
Font: **Agrandir — Tight Black**, weight 900, size 13px, line-height 1.5, letter spacing 1.3px.
Colour: `#5C5141` for navigation. Section headings: `#7A6D59`.
Examples: WRITING, SPEAKING, WORK. Deliberately small relative to the content around them.

## 5.3 Hero
Font style: **Family / Heavy**. Resolve to Michel's supplied font asset rather than guessing.
Desktop size: 148px. Tracking approx `-2.664px`. Colour `#33291D`.
Current copy: **Olá & Welcome**
Intentionally enormous. Do not shrink it merely so it behaves like a conventional hero heading.

## 5.4 Intro body
Font: **Founders Grotesk — Regular**, size 24px, line-height 1.48 (~35.5px), colour `#33291D`.
Bold emphasis: **Founders Grotesk Bold**.
Current maximum paragraph width: approximately 1030px.
Deliberately large body typography — do not reduce to generic 16–18px website body text.

## 5.5 Editorial row title
Font style: **Family / Medium**, size 18px, line-height 28.8px, colour `#1A1916`.
Used for article titles, event names.

## 5.6 Editorial row metadata
Font: **Founders Grotesk — Medium**, size 14px, line-height 18px, colour `#4A3A2A`.
Examples: Medium · A List Apart · Tokyo · Nov 2026 · London, United Kingdom · 2016

## 5.7 Quote
Font style: **Family / Medium**, size 48px, line-height 50px, tracking -0.5px, colour `#1C1A15`. Centered.
Current quote: "Design is the labour of understanding people"
The hand-drawn/highlight treatment under "understanding people" is part of the visual language.

---

# 6. GRID & DESKTOP COMPOSITION

The reference desktop canvas is approximately 1496px wide.

Main document gutter begins at approximately `72px`.

Primary content starts around `88px` because the content sits inside the larger page gutter.

The layout is intentionally left-oriented rather than conventionally centered in a narrow `max-width` wrapper. Do not convert the entire site to a simple `max-width: 1200px; margin: 0 auto;` centered layout.

---

# 7. FONT ASSET MAPPING (resolved from supplied files)

Verified by reading each file's embedded name table:

| Design system name | File | Embedded family/style |
|---|---|---|
| Agrandir — Tight Black | `Agrandir-TightBlack.ttf` | Agrandir / Tight Black |
| Family — Heavy | `family-heavy.ttf` | Family / Heavy |
| Family — Medium | `family-medium.ttf` | Family / Medium |
| Founders Grotesk — Regular | `2d0b7e287a2fa837-s.p.ttf` | Founders Grotesk / Regular |
| Founders Grotesk — Medium | `FoundersGroteskWeb-Medium.ttf` | Founders Grotesk / Medium |
| Founders Grotesk — Bold | `foundersgrotesk-700.ttf` | Founders Grotesk Bold / Regular |

`family-regular.ttf` embeds a Klim Type Foundry "Not Licensed for Desktop Use" notice — excluded from web use pending licensing confirmation. Not required by the current spec (only Heavy and Medium weights of Family are used).

## 7.1 What the site actually loads

The same "Not Licensed for Desktop Use" notice turned out to sit in
`family-heavy.ttf`, `family-medium.ttf` and `FoundersGrotesk-Medium.ttf` too, so
the Klim files were removed from the repo and both text faces now ship as
open-licence replacements. Agrandir is untouched — it is the identity, not a
substitute, and it is not up for replacement.

| Design system name | Ships as | File | Licence |
|---|---|---|---|
| Agrandir — Tight Black | Agrandir — Tight Black | `Agrandir-TightBlack.ttf` | licensed for this site |
| Family — Heavy / Medium | **Fraunces** (variable: opsz · wght · SOFT · WONK) | `Fraunces-latin.woff2`, `Fraunces-latin-ext.woff2` | OFL — `Fraunces-OFL.txt` |
| Founders Grotesk — Regular / Medium / Bold | **Hanken Grotesk** (variable: wght) | `HankenGrotesk-latin.woff2`, `HankenGrotesk-latin-ext.woff2` | OFL — `HankenGrotesk-OFL.txt` |

### Final visual system — semantic roles

The type system is expressed as ROLES, not as per-section styles. Two things
that do the same job take the same token; a section never gets typography
because it is that section.

| Role | Token | Face | Value |
|---|---|---|---|
| Lede | `--type-lede-size` · `-leading` · `-tracking` | Hanken | 24px (clamped down on phones) / 1.4 / −0.033em, 400, emphasis 800 |
| Body | `--type-body-fluid` · `--type-body-leading-ratio` | Hanken | clamp(15.5, 1.8vw, 21.25) / 1.5 |
| Row title | `--type-row-title-size` · `-leading` | Fraunces | 21px / 28.8px, editorial recipe |
| Row metadata | `--type-row-meta-size` · `-leading` · `-weight` · `-tracking` | Hanken | 14px / 18px / 650 / −0.4px |
| Card title, primary | `--type-card-primary-size` | Fraunces | 24px — Work case-study covers |
| Card title, secondary | `--type-card-secondary-size` | Fraunces | 21px — Media cards |
| Card title leading | `--type-card-leading` | — | 1.2, shared by both cards |
| Action mark | `--type-arrow-size` | Agrandir | 1.18rem, 900 |

**Writing, Speaking, Around the internet and the entire Archive are one
component.** They render through the same `.row` and take the same two row
tokens. There is no `--writing-title`, and there must never be one: a list of
titled links anywhere on this site uses the row role.

**Work and Media are the one place two card sizes are correct**, because they
carry genuinely different hierarchy — a case-study cover outranks a media card.
Everything else about them is shared: one label rule, one title rule, one
leading, one spacing stack.

### Spacing roles

| Relationship | Token | Value | Used by |
|---|---|---|---|
| Label → title | `--gap-label-to-title` | 8px | row kicker → title, Work label → title, Media label → title |
| Card cover → label | `--gap-cover-to-label` | 16px | both card types |
| Row title → metadata | `--gap-row-title-to-meta` | 12px | every row |
| Between lede paragraphs | `--gap-lede-paragraph` | 24px | every lede |

Repeated relationships are declared ONCE, for every component that performs
them. No component owns a private copy of a shared value, and none of them is
achieved with a positional offset.

### Fraunces is set three ways, not one

The original design does not use its serif the same way at 148px and at 18px,
so neither does the replacement. Three recipes, defined in `tokens.css`:

| Recipe | Axes | Weight | Used by |
|---|---|---|---|
| `--serif-hero` | `opsz 48, SOFT 18, WONK 0` | 700 | `h1.display` on every page, case-study stat figures |
| `--serif-statement` | `opsz 56, SOFT 6, WONK 0` | 625 | the homepage quote, `.yearhead`, case-study pull quotes |
| `--serif-editorial` | `opsz 80, SOFT 40, WONK 0` | 500 | row titles, card titles, case-study headings — inherited from `<body>`, so it is the default |

What each axis is doing, and why none of it is a default to be tidied away:

- **WONK 0 in all three.** Fraunces ships its wonky alternates on, which is
  where the ornamental, circled ampersand in *Olá & Welcome* came from. `WONK 0`
  is Fraunces' own conventional set — the fix is family-native; no second font
  is borrowed for one glyph. SOFT above 0 does *not* bring the ornamental form
  back at these optical sizes; that was checked on the rendered hero.
- **opsz is pinned per role, not `auto`.** Family is a single non-optical face
  holding one proportion from 14px to 148px, and automatic optical sizing made
  Fraunces do the opposite. Note the hero takes the LOW opsz and the row titles
  the high one — the inverse of automatic optical sizing, because here opsz is
  being used for character, not size compensation.
- **SOFT carries the warmth** of the small editorial serif without adding
  weight. Deliberately near zero on the quote: SOFT and a large size together
  go blobby.

The editorial recipe lands within 0.2% of Family Medium's set width, which is
why row titles, card titles and case-study headings sit at the ORIGINAL sizes
with no scaling at all — and reproduce the original's line breaks across all 57
archive rows. Only the two display tiers are scaled, on cap-height.

`--weight-emphasis` (800) covers `<strong>` in running copy, and
`--type-row-meta-weight` (650) the metadata line under a row title: Hanken's
nominal weights sit much closer to its own regular than Founders' did, so both
were reading thin. The metadata one also reads as a spacing problem rather than
a weight one — the line floats away from the title it belongs to — but
`--gap-row-title-to-meta` is unchanged and the box geometry is identical to the
original's; it is weight alone. Heading and label weights are untouched.

### The arrow is drawn by Agrandir

Neither replacement text face carries U+2197 or U+2192, so the action mark is
never drawn by the type it sits next to. The original design only got a real
arrow in one place — the Media cards, where the mark inherited the serif stack
and Family drew it — and fell through to a platform font everywhere else, which
is how ↗ reached a colour emoji font on macOS.

Agrandir carries both glyphs, is licensed, is already loaded, and is the
identity face, so it now draws every arrow on the site. That is also what keeps
the mark off the emoji font: the first family in the stack owns the glyph, so
nothing falls through. The symbol fonts on the tail of `--font-arrow`, the
`font-variant-emoji` declaration and the U+FE0E in the markup are all still
there, but only as a net for the moment before Agrandir loads.

`--type-arrow-size` (1.18rem) is set from the RENDERED GLYPH HEIGHT, not from
the surrounding type. Agrandir draws a small arrow on a large em — 0.39em where
Family drew 0.71em — so matching font-sizes would produce a mark half the size
the original showed. 1.18rem puts ↗ at 7.4px tall, which is what Family drew on
the Media cards. One size, every context; no surface may override it.

The re-tuned sizes and the reasoning behind each live in `tokens.css` under
"REPLACEMENT TUNING".
