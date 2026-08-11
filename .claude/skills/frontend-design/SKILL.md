---
name: frontend-design
description: Design system and animation conventions for the Lumina Beans site — brand tokens, typography, layout patterns, Framer Motion rules, and image-placeholder conventions. Read before writing or editing any component, section, or stylesheet in this project (site/ or app/).
---

# Lumina Beans — Frontend Design Rules

## Color tokens (primary / neutral / accent — no random hex codes)

Every color used in this project must resolve to one of these named roles. If a design needs a color not listed here, add it to this table (with a role) before using it — never inline a bare hex value in a component. The brand direction is toasty, energetic, handcrafted — warm cream paired with a deep maroon/brick-red family (moved from the earlier rust/terracotta accent palette to a darker red-brown range at the user's request), no cool tones.

```
Role                 Token                  Hex        Usage
------------------------------------------------------------------------------
primary              --color-primary        #F6DCC2    Light section background (default)
primary-warm         --color-primary-warm   #E77B49    Warm orange — hover text/links on
                                                          DARK-anchor sections only (nav links,
                                                          footer links, form msg); NOT used as a bg
primary-deep         --color-primary-deep   #60241E    Dark anchor bg: header, footer, hero/
                                                          parallax chrome, process section,
                                                          mobile nav panel
accent               --color-accent         #B34A44    h3 tags, CTA button fills (w/ cream text),
                                                          hover states, focus rings — on LIGHT bg
accent-secondary     --color-accent-secondary #95271D  Headings (h1/h2-level: display-xl/md,
                                                          hero/parallax headlines, footer brand)
                                                          on LIGHT bg
neutral-text         --color-neutral-text   #F6DCC2    Text on dark-anchor sections (same value
                                                          as primary — light-on-dark role)
neutral-text-dark    --color-neutral-text-dark #3D3230 Paragraph text on light sections
                                                          (unchanged legacy dark-neutral; kept as-is
                                                          for body-copy readability, not part of the
                                                          new red palette)
depth                --color-depth          #B34A44    Reserved/unused; not currently referenced
logo                 --color-logo           #f7c56e    Brand mark color — header logo, footer
                                                          brand only
heading-highlight    --color-heading-highlight #ffc14d Amber accent — select standout headings
                                                          on dark bg
offer-card-bg        --color-offer-card-bg  #571F19    Offer-card and frame-loader (hero loading
                                                          screen) backgrounds, a dark maroon by request
title-dark            --color-title-dark     #241308    Section eyebrow titles (Our Offer, Our
                                                          Vision, How to Brew, Roasting) + the
                                                          vision-copy base text color, by request
```

Note on h3 vs h1/h2: `accent` (#B34A44) is for literal `<h3>` elements, `accent-secondary` (#95271D) is for h1/h2-level headlines — these are deliberately different roles even where a class like `.display-md` is shared between both levels. When a shared class needs to render as an h3 in one place and h2 elsewhere (see the roasting-row in `Process.jsx`), use a compound selector (`h3.display-md{ color: var(--color-accent); }`) rather than duplicating the class — see `app/src/index.css`.

Note on contrast: `primary-warm` (#E77B49) is the only one of the four new red-family colors bright enough to read as text on the dark `primary-deep` bg (~4.1:1) — the darker two (`accent`, `accent-secondary`) only work as text on the light `primary` bg (~4–6:1), not on dark anchor sections. Don't repurpose them for dark-bg text.

Fonts:
- Display headlines: `Anton` (uppercase, tight line-height ~1.0)
- Script accents ("eyebrow" labels above headlines): `Petit Formal Script`
- Body/UI text: `Jost` (weights 300/400/500/600)

Don't introduce new colors or fonts without adding them to the token table above and asking first — the palette is intentionally small.

## Typography scale (a real type system, not ad hoc sizes)

Use this fixed scale everywhere — never pick an arbitrary `font-size` outside it. Each step has one job; don't reach for a bigger step just to "make it pop."

```
Step      rem     px (@16px root)   Weight/font           Use
-----------------------------------------------------------------------------------
xs        0.75    12                Jost 500              micro-labels, badges, legal
sm        0.85    13.6              Jost 400/500          nav links, form labels
base      1       16                Jost 300/400          body copy
md        1.05    16.8              Jost 400              lead paragraphs
lg        1.3–2.1 clamp             Anton, uppercase       h3 / process taglines
xl        1.8–3.2 clamp             Anton, uppercase       h2 / section headlines (display-md)
2xl       2.6–5.5 clamp             Anton, uppercase       h1 / hero headlines (display-xl)
script    1.5–2.4 clamp             Petit Formal Script    eyebrow accents above headlines
```

- Always use `clamp(min, preferred-vw, max)` for the `lg` step and above so headlines scale fluidly instead of jumping at breakpoints — follow the existing pattern in `.display-md` / `.display-xl` / `.hs-headline`.
- Line-height: `~1.0–1.05` for Anton display steps, `1.35` for lead/vision copy, `1.6` (body default) for regular paragraphs.
- Never mix in a system font (`-apple-system`, `Arial`, `Helvetica`) as a fallback ahead of the brand fonts except as the final generic fallback (`sans-serif`/`serif`/`cursive`).

## Spacing system (8px base grid)

All padding, margin, and gap values must be multiples of 8px (use 4px only as a rare half-step for tight icon/text gaps). Don't hand-pick spacing like `18px` or `26px` — round to the nearest token.

```
Token   px     Use
-----------------------------------------------
space-0.5  4   icon-to-label gaps, tight inline spacing
space-1    8   tight stacks (badge padding, small gaps)
space-2   16   default gap between related elements
space-3   24   card padding, small section side padding
space-4   32   gap between grid items, card padding (roomy)
space-5   48   spacing between a heading and its body copy
space-6   64   gap between stacked components inside a section
space-8   96   section vertical padding (mobile)
space-10 120   inter-section spacing accumulation (`60px+60px` etc.)
```

- Section vertical padding on desktop generally lands around `90–110px` (round to `space-8`/`96px` or the nearest 8px multiple) — see `.offer`, `.process-row`, `.subscribe`.
- Existing values in `site/styles.css` were hand-tuned before this system existed and are slightly off-grid in places (e.g. `18px`, `26px`, `50px`) — when touching those rules, nudge them onto the nearest 8px multiple rather than leaving new off-grid values, but don't do a drive-by mass-reflow of unrelated CSS just to fix this.

## Layout conventions

- Shared container max-width: `1200px` (`--container`), centered with `margin: 0 auto`, `padding: 0 24px` (`space-3`).
- Two-column "process row" pattern (`.process-row`): image/photo slot + text block in a `1fr 1fr` grid, alternating sides via a `.reverse` modifier. Collapses to a single column under 900px.
- Full-bleed viewport sections (hero, parallax intro) use `height: 100vh` stages with absolutely-positioned layers inside, not padding-based height.

## Component patterns

**Buttons** (see `.shop-now-btn`, `.subscribe-form button`) — every button must define all four states, not just hover:
- Default: solid `accent` (lime) background, `primary-deep` text, or an outlined `accent-secondary` (tan) variant on dark sections.
- Hover: `whileHover` scale `1.03–1.06` (Framer Motion in `app/`) or `transform: scale(1.04)` (legacy CSS) — never a color-only hover with no motion.
- Active/pressed: `whileTap` scale down slightly (~`0.97`) so a click reads as a press.
- Focus-visible: a visible outline/ring in `accent` — required for keyboard nav, don't suppress `outline` without replacing it.
- Disabled (if applicable): reduced opacity (~0.5) and no hover/tap motion.

**Cards** (see `.offer-card`): a fixed internal structure — image/icon slot (fixed aspect-ratio, empty per the placeholder rule below) → heading (`lg` type step, `accent-secondary`) → body copy (`base` step, `neutral-text`, opacity ~0.85) → optional meta/badge row. Padding uses `space-4`. Hover lifts the whole card (`translateY(-6px)` / Framer Motion `whileHover={{ y: -6 }}`) plus a border-color shift to `accent` — don't animate only one of the two.

**Forms** (see `.subscribe-form`): label-less placeholder inputs are the existing pattern (underline style, transparent background, `border-bottom` only) — keep new form fields consistent with that unless a form genuinely needs visible labels for accessibility (in which case add a visually-styled label, don't silently drop the existing underline aesthetic). Inputs and the submit button live in one flex row on desktop, stack full-width on mobile (`max-width: 480px`).

## Avoid generic AI aesthetic

This brand has a specific, editorial identity (toasty cream/rust/dark roasted-brown, Anton display type, hand-drawn line-art SVGs, asymmetric two-column process rows). Do not let it drift toward generic template look:

- No purple/blue gradient blobs, no glassmorphism, no default Tailwind-gray-on-white SaaS look — this is not a SaaS product.
- No `Inter`/system-ui font stack — always the three brand fonts.
- No uniform `border-radius: 12px` on literally everything "because that's the modern default" — check what the existing component actually uses (circles for offer photos, `16–18px` for cards, `30px`/pill for buttons, square/sharp for the hero and process photos).
- No stock hero pattern of "centered headline + centered subhead + centered button + generic illustration" for every section — vary composition the way `.process-row` (alternating two-column) and `.subscribe` (asymmetric photo + content block) already do.
- No emoji in UI copy or headings.
- No invented generic feature/pricing/FAQ/testimonial sections unless the user actually asks for that content — this is a coffee brand site (offer/vision/process/product/subscribe), not a SaaS template. If a request looks like a generic SaaS landing-page template (hero + 3 feature cards + pricing + FAQ + social proof), stop and confirm with the user before building it — that shape doesn't fit this brand and may indicate a mismatched or copy-pasted prompt.

## Animation rules

- **Framer Motion is the only animation library in `app/`.** Do not add GSAP or another animation library there — GSAP was used in the legacy static prototype (`site/`) but the React app re-implements every scroll effect with Framer Motion primitives (`useScroll`, `useTransform`, `motion.*`).
- Scroll-linked parallax/pin effects: use `useScroll({ target, offset })` + `useTransform`, driving `motion.div style={{ y }}` — not manual scroll-event listeners.
- Section entrances: fade/slide in via `whileInView` (with `viewport={{ once: true, amount: ... }}`), not on every re-scroll.
- Grids/lists (offer cards, process rows, footer columns): stagger children with a parent `variants` + `staggerChildren`, not per-item hardcoded delays.
- Interactive elements (buttons, cards, nav links, icon buttons): `whileHover` / `whileTap` for subtle scale/color transitions — keep the motion small (e.g. `scale: 1.03–1.06`), matching the existing hover feel in `styles.css` (`transform: scale(1.04)`-class subtlety). Nothing bouncy or exaggerated unless explicitly requested.
- Always respect `prefers-reduced-motion`: skip or flatten scroll-linked transforms and large entrance motion when the user has it set.
- A full-bleed scroll-linked image sequence (like the hero) is built with a tall wrapper + `position: sticky` inner stage + `useScroll` progress driving canvas frame draws — this replaces GSAP `ScrollTrigger.pin` in the React app.

## Image placeholders

- Several sections originally used hand-drawn decorative SVGs as stand-ins for real photography (offer card icons, process photos, the product-reveal bag, the subscribe background). **Do not add new decorative SVG placeholders for photography.** Leave an empty container sized/aspect-ratio'd to match where the final image will go, so a real `<img>` or background photo can drop straight in later.
- Keep SVGs that carry real information or brand identity: the logo mark, nav/menu icons. Those are not photo placeholders. (The Colombia origin map that used to live in the Vision section was removed at the user's request — don't re-add it.)

## Project structure

- `app/` — the only active build: Vite + React + Framer Motion. This is the site.
- `site/` — the old static HTML/CSS/JS prototype has been deleted; only `site/assets/hero-frames/` remains (source frame images, duplicated into `app/public/assets/hero-frames/` for the app). Don't recreate `site/index.html`/`styles.css`/`script.js` — that build is gone for good.
- Global styles live in one stylesheet imported once (`app/src/index.css`) — no CSS modules or per-component stylesheets unless asked.
