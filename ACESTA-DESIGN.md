# Acesta Analytics — Design System

> Digital intelligence for brands that need clarity.
> Noise resolving into order, on black.

**Theme:** dark
**Status:** authoritative. Every colour, type, spacing and motion decision in the codebase derives from this file. If something isn't here, it doesn't ship.

---

## 1. Direction

Acesta operates as a **dark stage**. Pure black is not a background — it is the material. A single champagne-gold accent carries every action, every emphasis, every brand moment. There is no second brand colour.

Typography is **monolithic and weightless**: one typeface, weight 400 at enormous scale for headlines, weight 200 for body. Hierarchy comes from *scale and tracking*, never from bold. A monospace face handles data, labels and metrics — the instrument voice of an intelligence consultancy.

Layout is a **spacious two-column zigzag**: oversized left-aligned headline paired with generous body copy, alternating visual-left / visual-right down the page. One or two elements per viewport. Never information-dense.

**The signature is The Resolve** (§7) — a gold particle field that begins as chaotic drift and resolves into ordered structure. It is the tagline made literal, and it is the only thing on this site allowed to be loud.

---

## 2. Tokens — Colour

| Name | Value | Token | Role |
|------|-------|-------|------|
| Void | `#000000` | `--color-void` | Page canvas, all section backgrounds. Pure black, never dark grey. The void is the design. |
| Vitrine | `#0A0A0A` | `--color-vitrine` | **Restricted.** The only non-black surface. Used *exclusively* as the ground for service-proof artifacts (dashboard, SEO panel, growth diagram) so they read as objects on display. Never for cards, nav, or general UI. |
| Bone | `#FFFFFF` | `--color-bone` | Headlines, primary body, icon fills, active nav. The only typographic white. |
| Ash | `#9A9A9A` | `--color-ash` | Inactive nav, ghost links, secondary labels. Recedes without disappearing. |
| Mist | `#BDBDBD` | `--color-mist` | Tertiary body, captions, supporting context. Quietest readable grey. |
| **Gold** | `#C9A961` | `--color-gold` | **The single accent.** Filled CTAs, logo mark, brand moments, particle core. 9.3:1 on black — passes AA for text *and* for black text sitting on a gold fill. |
| Gold Bright | `#F2DFA8` | `--color-gold-bright` | Hover states, emphasis text, glow highlights, particle sparks. |
| Gold Deep | `#6E5A28` | `--color-gold-deep` | Gradient stops, hairline strokes, dimmed particle tails, disabled gold. |
| Steel | `#5B8FB9` | `--color-steel` | **Data-visualisation only.** The single comparison/benchmark series colour in charts. Never in UI chrome, never as a button, never as body copy, never outside a chart. Permitted as text only where the colour carries meaning — a legend label naming the steel series. Axis labels, gridline values and neutral annotations stay in ash. Clears the 4.5:1 text bar on both void and vitrine. |

### Hairlines
There are no borders in this system except one: `--stroke-hairline: 1px solid rgba(201, 169, 97, 0.12)`. It is permitted **only** on vitrine surfaces. Nowhere else.

### Glow
`--glow-gold: 0 0 60px rgba(201, 169, 97, 0.15)` — used sparingly on the signature visual and on primary CTA hover. This replaces shadow entirely; there is no elevation system.

---

## 3. Tokens — Typography

### Faces

| Role | Face | Source | Notes |
|------|------|--------|-------|
| Display + Body | **Switzer** | Fontshare (free, commercial use) | Neo-grotesque, near-identical geometry to PP Neue Montreal. Variable. |
| Data + Labels | **Geist Mono** | Vercel (OFL, free) | Metrics, chart axes, eyebrow labels, timestamps, code. The instrument voice. |

Swap path: if PPNeueMontreal is licensed later, change `--font-display` only. Nothing else moves.

### The weight rule

- **Headlines: weight 400.** Never 600, never 700. Scale and negative tracking create hierarchy.
- **Body: weight 300.** Not 200. Light type on pure black suffers halation — strokes bloom into the background on LED and OLED displays — so light-on-dark needs *more* weight than dark-on-light to read equally well, not less. 300 keeps the airy register while staying legible at 16–18px. Never 400 for body.
- **Lead paragraphs at 20px and above: weight 200 is permitted.** At that size the strokes are thick enough to survive. This is where the ultra-light signature lives.
- **Mono labels: weight 500, uppercase, `0.08em` tracking.**

### Fluid type scale

Mobile floors are set so nothing breaks below 380px. **Desktop ceilings are deliberately restrained.** An earlier revision capped display at 113px, which forced a seven-word headline onto five lines and consumed an entire viewport before any body copy appeared. Oversized type is the signature, but a headline that fills the screen reads as shouting rather than confidence.

| Role | Clamp | Line height | Tracking | Token |
|------|-------|-------------|----------|-------|
| display | `clamp(2.75rem, 6.5vw, 5.5rem)` | 1.05 | -0.04em | `--text-display` |
| heading-lg | `clamp(2.5rem, 5vw, 3.75rem)` | 1.1 | -0.035em | `--text-heading-lg` |
| heading | `clamp(1.875rem, 4vw, 2.5rem)` | 1.15 | -0.03em | `--text-heading` |
| heading-sm | `clamp(1.625rem, 3vw, 2.125rem)` | 1.2 | -0.03em | `--text-heading-sm` |
| subheading | `clamp(1.375rem, 2.25vw, 1.75rem)` | 1.25 | -0.02em | `--text-subheading` |
| heading-xs | `1.5rem` | 1.15 | -0.02em | `--text-heading-xs` |
| heading-2xs | `1.25rem` | 1.3 | -0.01em | `--text-heading-2xs` |
| lead | `clamp(1.25rem, 1.6vw, 1.5rem)` | 1.45 | normal | `--text-lead` |
| body | `clamp(1rem, 1.2vw, 1.125rem)` | 1.6 | normal | `--text-body` |
| caption | `0.8125rem` | 1.5 | normal | `--text-caption` |
| mono-label | `0.75rem` | 1.2 | 0.08em | `--text-mono-label` |
| mono-metric | `clamp(1.75rem, 3vw, 2.5rem)` | 1.0 | -0.02em | `--text-mono-metric` |

**Headline length constraint.** Display type must never exceed three lines at any desktop width. If a headline breaks to four, either widen its column or the headline is too long for display size — reduce it, don't shrink the type below the scale.

OpenType: enable `"ss01"`, `"cv01"`, and `"tnum"` on all mono numerals.

---

## 4. Tokens — Spacing, Layout, Shape

**Base unit:** 6px. **Density:** comfortable → spacious.

`--space-6 12 18 24 30 36 60 96 120 180` (px)

| Property | Value |
|----------|-------|
| Page max-width | `1280px` |
| Gutter (desktop / mobile) | `60px` / `24px` |
| Section gap (desktop / mobile) | `180px` / `96px` |
| Vitrine padding | `36px` (desktop) / `24px` (mobile) |
| Element gap | `6–18px` |

### Radius
Single token: `--radius: 24px` for buttons, vitrine surfaces, image crops, nav.
`--radius-full: 9999px` only for tags and dots.
Nothing else has a radius. Nothing has a shadow.

---

## 5. Components

### Primary Action — Gold Pill
Fill `--color-gold`. Text `--color-void` (black on gold, 9.3:1). Mono, 14px, weight 500, uppercase, `0.08em` tracking. Padding `14px 24px`. Radius `--radius`.
Hover: fill shifts to `--color-gold-bright`, `--glow-gold` fades in over 300ms.
**One per viewport.** Two filled gold buttons in proximity is a violation.

### Ghost Link
No background, no border. `--color-ash` at rest, `--color-bone` on hover. Switzer 14px weight 400. Hover transition 200ms. Optional 1px gold underline that wipes in from left on hover.

### Eyebrow Label
Geist Mono, 12px, weight 500, uppercase, `0.08em` tracking, `--color-gold`. Sits above every section headline. This is the *only* place gold text appears in body flow.

### Section Headline Block
Two-column asymmetric. Left: eyebrow → headline at `--text-heading-lg` weight 400 white. Right or below: body at `--text-body` weight 200 in `--color-mist`, max-width `520px`. No box, no border, no card. Pure typographic composition on void.

### Vitrine (service-proof surface)
`--color-vitrine` background, `--radius`, `--stroke-hairline`, `--glow-gold` at 50% opacity. Contains dashboard samples, SEO panels, growth diagrams. This is the **only** container permitted in the system, and it exists so proof artifacts read as exhibits rather than UI. Never nest a vitrine inside a vitrine.

### Nav
Transparent, sits directly on void. No backdrop blur at top of page; blur + `rgba(0,0,0,0.6)` fades in after 80px scroll. Logo left. Links centre-right, mono 14px uppercase, `--color-ash` → `--color-bone`. Gold pill CTA anchors right. Mobile: full-screen overlay, links stagger in at 60ms intervals.

### Footer
Typographic and quiet — a closing signature, not a second page.

**Desktop:** wordmark at `--text-heading-xs`, page links and contact on a single row, legal beneath.

**Mobile:** single column with consistent `--space-24` rhythm between groups. Contact details **stack** rather than sitting side by side — an email address and a phone number sharing one line at 390px is cramped.

**Legal block — set in Switzer, not mono, and in sentence case, not uppercase.** Mono uppercase at small sizes reads as noise when applied to sentences; it is a label treatment, not a text treatment. Use `--text-caption` in `--color-ash`, with a mid-dot separating Privacy and Terms. The GST notice is statutory and stays, but it is the quietest element on the page: last line, tight leading, no wrapping mid-phrase where avoidable.

Total footer height on mobile should not exceed roughly 40% of viewport height.

### Metric Readout
Geist Mono. Value at `--text-mono-metric` in `--color-bone`. Label below at `--text-mono-label` in `--color-ash`. Delta indicator in `--color-gold` (positive) or `--color-ash` (negative — we don't use red; this is a consultancy, not a trading terminal). Numbers count up on scroll-into-view.

---

## 6. Imagery

Primarily **procedural and abstract** — the particle system is the brand.

Photography is permitted but **strictly disciplined**:
- Only in team/about contexts and where a human presence genuinely helps.
- Large rounded-rect crops at `--radius`, no frames, no overlays, floating on void.
- Every photo gets a **gold-duotone treatment** (`--color-gold-deep` shadows → `--color-gold-bright` highlights) so it reads as part of the system, not stock.
- No lifestyle stock in the hero region. Ever.

**Icons: near-zero.** The previous build was icon-heavy and it read as templated. Icons are permitted only where they label a genuine interactive control. Decorative icons beside headings, feature bullets, and service cards are removed — replaced by type, number, or particle formation.

---

## 7. The Signature — "The Resolve"

The one thing this site is remembered by, and the answer to the brief.

**Concept.** A field of ~4,000 gold particles begins as chaotic, drifting noise. On page load — and again at each service section — it *resolves* into an ordered formation. Noise becoming clarity. That is the company tagline, executed as motion.

**Formations (one per service, same particle system throughout):**

| Section | Resolves into |
|---------|---------------|
| Hero | A slowly rotating lattice/constellation — order emerging from drift |
| Web Development | A wireframe grid, viewport-shaped |
| Executive Data Intelligence | A bar/line chart silhouette |
| Search Visibility Foundation | A radial search graph — hub with orbiting nodes |
| Growth Systems Architecture | A directed flow diagram — nodes and connecting paths |

The particles never reset to zero between sections; they *morph* from one formation to the next as the user scrolls. This single continuous system is what unifies four services into one company.

**Rendering.** Points in three.js, additive blending, gold ramp from `--color-gold-deep` → `--color-gold` → `--color-gold-bright`. 1–2px, sharp. Never grayscale.

**Restraint clause.** The Resolve is where all boldness is spent. Every other element on the page stays quiet, flat, and disciplined. If a second attention-grabbing effect appears anywhere, cut it.

---

## 8. Motion

| Property | Value |
|----------|-------|
| Easing (default) | `cubic-bezier(0.16, 1, 0.3, 1)` — expo out |
| Easing (morph) | `cubic-bezier(0.65, 0, 0.35, 1)` |
| Duration — micro | 200ms |
| Duration — reveal | 700ms |
| Duration — formation morph | 1400ms |
| Stagger | 60ms |
| Scroll smoothing | Lenis, `lerp: 0.09` |

**Rules**
- Text reveals: mask-up (translateY 24px + opacity), staggered by line. Never fade-only.
- Section entries: trigger at 75% viewport, fire once.
- Hover: 200ms, gold-tinted, never scale beyond 1.02.
- Page transitions: 400ms void wipe.
- `prefers-reduced-motion: reduce` → all transforms become instant opacity changes; particle field renders as a **static** resolved formation. This is a hard requirement, not a nice-to-have.

---

## 9. Do / Don't

### Do
- Keep `#000000` as every section background. The void is the design.
- Set every headline at weight 400. Achieve hierarchy through scale and `-0.04em` tracking.
- Use weight 200 for body copy. This is the signature reading experience.
- Reserve gold for singular primary actions, eyebrow labels, and the particle system.
- Let The Resolve be the only loud element on the page.
- Use Geist Mono for anything numeric — it is what makes an intelligence consultancy read as credible.
- Keep one or two elements per viewport. Spaciousness *is* the premium signal.

### Don't
- Don't use gold as a large background fill or full-section surface. It is an accent, not a surface.
- Don't add card containers with borders, shadows, or fills. The only exception is the vitrine, and only for proof artifacts.
- Don't set body text at weight 400.
- Don't place two filled gold buttons in proximity.
- Don't add gradients to UI components. Gradients belong to the logo and the particle ramp only.
- Don't reintroduce decorative icons beside headings or service items.
- Don't use red/green for metric deltas. Gold and ash only.
- Don't put stock photography in the hero.

---

## 10. Quick Start — CSS Custom Properties

```css
:root {
  /* Colour */
  --color-void: #000000;
  --color-vitrine: #0A0A0A;
  --color-bone: #FFFFFF;
  --color-ash: #9A9A9A;
  --color-mist: #BDBDBD;
  --color-gold: #C9A961;
  --color-gold-bright: #F2DFA8;
  --color-gold-deep: #6E5A28;
  --color-steel: #5B8FB9;

  /* Strokes & glow */
  --stroke-hairline: 1px solid rgba(201, 169, 97, 0.12);
  --glow-gold: 0 0 60px rgba(201, 169, 97, 0.15);

  /* Type — families */
  --font-display: 'Switzer', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
  --font-mono: 'Geist Mono', ui-monospace, SFMono-Regular, Menlo, monospace;

  /* Type — scale */
  --text-display: clamp(2.75rem, 6.5vw, 5.5rem);
  --text-heading-lg: clamp(2.5rem, 5vw, 3.75rem);
  --text-heading: clamp(1.875rem, 4vw, 2.5rem);
  --text-heading-sm: clamp(1.625rem, 3vw, 2.125rem);
  --text-subheading: clamp(1.375rem, 2.25vw, 1.75rem);
  --text-heading-xs: 1.5rem;
  --text-heading-2xs: 1.25rem;
  --text-lead: clamp(1.25rem, 1.6vw, 1.5rem);
  --text-body: clamp(1rem, 1.2vw, 1.125rem);
  --text-caption: 0.8125rem;
  --text-mono-label: 0.75rem;
  --text-mono-metric: clamp(1.75rem, 3vw, 2.5rem);

  /* Type — tracking */
  --tracking-display: -0.04em;
  --tracking-heading: -0.035em;
  --tracking-mono: 0.08em;

  /* Type — weights */
  --weight-body: 300;
  --weight-lead: 200;
  --weight-display: 400;
  --weight-mono: 500;

  /* Spacing */
  --space-6: 6px;   --space-12: 12px; --space-18: 18px;
  --space-24: 24px; --space-30: 30px; --space-36: 36px;
  --space-60: 60px; --space-96: 96px; --space-120: 120px;
  --space-180: 180px;

  /* Layout */
  --page-max-width: 1280px;
  --gutter: 60px;
  --section-gap: 180px;

  /* Shape */
  --radius: 24px;
  --radius-full: 9999px;

  /* Motion */
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-morph: cubic-bezier(0.65, 0, 0.35, 1);
  --dur-micro: 200ms;
  --dur-reveal: 700ms;
  --dur-morph: 1400ms;
}

@media (max-width: 768px) {
  :root {
    --gutter: 24px;
    --section-gap: 96px;
  }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

## 11. Quick Start — Tailwind v4

```css
@theme {
  --color-void: #000000;
  --color-vitrine: #0A0A0A;
  --color-bone: #FFFFFF;
  --color-ash: #9A9A9A;
  --color-mist: #BDBDBD;
  --color-gold: #C9A961;
  --color-gold-bright: #F2DFA8;
  --color-gold-deep: #6E5A28;
  --color-steel: #5B8FB9;

  --font-display: 'Switzer', ui-sans-serif, system-ui, sans-serif;
  --font-mono: 'Geist Mono', ui-monospace, monospace;

  --text-display: clamp(2.75rem, 6.5vw, 5.5rem);
  --text-heading-lg: clamp(2.5rem, 5vw, 3.75rem);
  --text-heading: clamp(1.875rem, 4vw, 2.5rem);
  --text-heading-sm: clamp(1.625rem, 3vw, 2.125rem);
  --text-subheading: clamp(1.375rem, 2.25vw, 1.75rem);
  --text-lead: clamp(1.25rem, 1.6vw, 1.5rem);
  --text-body: clamp(1rem, 1.2vw, 1.125rem);
  --text-mono-label: 0.75rem;
  --text-mono-metric: clamp(1.75rem, 3vw, 2.5rem);

  /* Spacing — NAMED keys only.
     Do NOT declare numeric keys such as --spacing-6 or --spacing-24 here.
     In Tailwind v4 the --spacing-* namespace IS the built-in spacing scale,
     so a numeric key silently redefines every existing p-6 / gap-8 / mt-10
     in the codebase. Named keys add new utilities without collision. */
  --spacing-gutter: 60px;
  --spacing-gutter-sm: 24px;
  --spacing-section: 180px;
  --spacing-section-sm: 96px;
  --spacing-vitrine: 36px;

  --radius-3xl: 24px;
  --radius-full: 9999px;

  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-morph: cubic-bezier(0.65, 0, 0.35, 1);
}
```

This yields `px-gutter`, `gap-section`, `p-vitrine` and `ease-out-expo` as real utilities. For the finer 6px ladder, use the `--space-*` custom properties from §10 via arbitrary values — those live in `:root`, not `@theme`, and cannot collide.
