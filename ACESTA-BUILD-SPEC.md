# Acesta Analytics — Website Elevation Build Spec

**Read `ACESTA-DESIGN.md` before writing a single line of code. It is authoritative. Every colour, type size, spacing value and motion curve comes from it. If a decision isn't covered there, ask before inventing.**

---

## Objective

Acesta Analytics is a Mumbai-based premium digital intelligence consultancy. This website is the primary sales asset. It must look expensive enough that a prospect is willing to commit **₹50,000+ per project** on the strength of the site alone, before any call.

The current site is competent but reads as a conventional 2019-era business site: icon-heavy, card-based, statically composed. The target is the dark-void / oversized-typography / signature-motion register occupied by Linear, Vercel and Runway.

**Four services must each be represented with a working proof artifact — not a description, a demonstration:**

1. **Premium Web Development** — the site itself is the proof.
2. **Executive Data Intelligence** — a boardroom-grade dashboard sample.
3. **Search Visibility Foundation** — an SEO audit / visibility panel sample.
4. **Growth Systems Architecture** — a growth systems flow diagram.

### Where the services live

- **`/services` is the destination.** All four services get their full treatment here: complete positioning copy, scope, deliverables, and the full-scale proof artifact for each.
- **The homepage carries snippets only.** A condensed four-service sequence — eyebrow, name, one-line proposition, and a *reduced* visual moment — each linking through to its section on `/services`. The homepage's job is to establish the register and pull the visitor to `/services`. It must not duplicate the detail.
- Do not build the same component twice. Each service artifact is one component with a `variant="snippet" | "full"` prop. The snippet is a genuinely reduced composition, not the full artifact scaled down.

---

## Hard constraints

- **Do not break the backend, routing, auth, or data layer.** This is a visual and motion rebuild of the presentation layer only.
- Existing component architecture is fine. Refactor presentation; don't restructure the app.
- Work **phase by phase**. Do not start a phase until the previous one is approved.
- Commit at the end of each phase with a clear message. Never bundle two phases into one commit.
- Every phase must be verified on **desktop (1440px) and mobile (390px)** before it's called done.

---

## Decisions log — resolved after Phase 0

These are settled. Do not re-open them.

**A. Scroll-snap is removed.** In Phase 1, delete `md:h-[100dvh] md:overflow-y-auto md:snap-y md:snap-mandatory` from `<main>` in `app/page.tsx` and return to normal document scroll. **Also remove `min-h-[100dvh]` from all four homepage sections** — sections size to their content and are separated by the 180px / 96px rhythm instead. Stripping the snap container while leaving the sections at full viewport height would leave large dead gaps; both changes go together.

No content is removed. Hero, HomeServices, Process and FinalCTA all stay.

Two reasons this is settled: Lenis and ScrollTrigger both target the window, and — more importantly — the particle formation morph needs continuous scroll progress to interpolate against. Mandatory snap gives discrete jumps, which would make The Resolve teleport between formations rather than travel, killing the signature effect. Full-viewport snap sections are also the specific thing that makes the current site feel dated; the zigzag rhythm replaces them.

**B. The serif goes.** Cormorant Garamond → Switzer is a full re-set, not a variable swap: every `font-display` element also drops from `font-semibold` (600) to weight 400. Touch all 12 page/component files in Phase 1. This is the single largest lever on the brief — a gold-on-black serif at weight 600 *is* the "old premium website" look being replaced.

**C. Gold moves to `#C9A961`, and the brand routes are re-cut.** The existing `#d8b25e` is a perfectly good gold (10.5:1 on black vs 9.3:1 for the new value) and the difference is subtle — but every one of the ~150 hardcoded instances is being converted to a token regardless, so the swap costs nothing extra. `#C9A961` is the more restrained champagne register, which suits an accent that should read as precious rather than loud.
Re-cut `app/icon.tsx`, `app/apple-icon.tsx` and `app/opengraph-image.tsx` to the new palette and typeface in **Phase 2**. The OG image is the first thing a prospect sees when the site is shared on WhatsApp or LinkedIn; leaving it on the old gold and Georgia while the site is Switzer is a visible inconsistency at the worst possible moment.

**D. `/services` is a rewrite, not a refactor.** Confirmed. Build the four anchored sections fresh.

**E. Steel is strokes and fills only.** At ~4.0:1 on the vitrine it clears the 3:1 bar for non-text graphical objects but fails the 4.5:1 text bar. Chart marks in steel, legend and axis text in ash. As proposed.

**F. Delete the dead code.** `components/Services.tsx` and `components/Tools.tsx` are imported by nothing. Remove both in Phase 1.

**G. Mobile LCP is a gate, not a Phase 7 concern.** The `/` mobile baseline is already 87 with a 4.1s LCP on the `<h1>`, before any WebGL lands. Measure `/` mobile at the **end of Phases 1, 3 and 4** and report the number each time. If LCP regresses past 4.1s at any gate, stop and fix before continuing. Specifically: self-host Switzer via `next/font/local` with `display: "swap"` and preload the display weight; dynamically import the three.js canvas with `ssr: false` and do not mount it until after first paint. A consultancy selling ₹50,000 projects to prospects opening the site on Indian mobile networks cannot ship a four-second headline.

**H. Accessibility fixes carried into Phase 2.** Convert the raw `<img>` logos in `Navbar.tsx:61` and `Footer.tsx:50` to `next/image` with explicit dimensions and WebP. Fix the `label-content-name-mismatch` on the logo link so the `aria-label` matches its visible text.

---

## Decisions log — resolved after Phase 2

**I. Uninstall framer-motion.** Zero call sites remain and none are planned; CSS covered the overlay, stagger, wipe and nav fade. The bundle impact is nil either way — unimported packages don't ship — so this is dependency hygiene, not performance. Remove it so it isn't reached for out of habit in later phases. If Phase 5 genuinely needs it, reinstalling is trivial.

**J. Keep the View Transitions approach, with conditions.** The technique is correct and same-document transitions are now Baseline (Chrome 111+, Safari 18+, Firefox 144+). But `experimental.viewTransition` is marked "not recommended for production" in the Next.js 16 docs, and React's `<ViewTransition>` ships only in Canary/Experimental channels. Therefore:
- Verify the wipe against a **production build** (`next build && next start`), not `next dev`. There is a known failure mode where view transitions work in dev and silently stop after build.
- Add to Phase 7: confirm graceful degradation in a browser without support — navigation must remain correct, just un-animated.
- If it proves unreliable, fall back to calling `document.startViewTransition` directly. That is the stable browser API and needs no experimental flag.

**K. Do the Next.js upgrade before Phase 5, not after.** The `next` advisory from the Phase 1 audit is still open, and an experimental React API (per J) is precisely what a framework bump breaks. Land the upgrade as its own isolated commit, re-run the full Lighthouse set, and re-verify the page wipe on a production build. Do it while the diff is small.

---

## Decisions log — resolved after Phase 3

**L. Phase 3 passes. Do not build hand-written WebGL.** PageSpeed Insights against the deployed build returns mobile performance **97**, LCP **2.4s**, FCP **0.9s**, accessibility 100, best practices 100, SEO 100. Local headless emulation reported 88 with TBT 336ms — a nine-point gap that confirms the SwiftShader caveat was correct and the local figure was measuring software rasterisation more than the site. Option 4 is cancelled; three.js stays.

The visual review also passes: all five formations read as distinct, and the mid-morph frame is a field in transit rather than a crossfade.

Two items carried to Phase 7, neither blocking:
- PageSpeed reports 2.7s total main-thread work and four long tasks. The idle-mount defers most of this past the TBT window, which is legitimate optimisation rather than metric-gaming, but the user still pays it. Worth one look at whether the three.js chunk can be split further.
- Open diagnostics: unused JavaScript ~80 KiB, render-blocking requests ~130ms, legacy JavaScript ~14 KiB.

**M. Less content, more motion — across every page.** Direction from the client after reviewing the live build: the site is still reading as "box, information, box, information." The design system already bans containers (§9), but these phases hadn't executed yet. Reinforcing it as a standing instruction: on every page from here, **cut copy first and let motion and whitespace carry the page.** If a section can lose a third of its words without losing meaning, it must.

---

## Dependencies to install

```bash
npm i three @react-three/fiber @react-three/drei
npm i gsap
npm i lenis
npm i clsx tailwind-merge
```

- **three / r3f / drei** — the particle signature ("The Resolve").
- **gsap + ScrollTrigger** — scroll choreography, pinning, formation morphs. Framer Motion stays for component-level transitions; GSAP handles scroll.
- **lenis** — smooth scroll. This single dependency is a large share of why premium sites *feel* premium.

**Fonts (both free, commercial use permitted):**
- **Switzer** — https://www.fontshare.com/fonts/switzer — download, self-host in `/public/fonts`, load via `next/font/local`.
- **Geist Mono** — available via `next/font/google` or npm `geist`.

Do not load fonts from a CDN link tag. Self-host or use `next/font` so there is no layout shift.

---

## Phase 0 — Audit (no code changes)

Before touching anything, read the repository and report back:

1. Complete route map — every page and its current composition.
2. Current styling setup — Tailwind version, config, global CSS, any existing token system.
3. Inventory of every component currently using an icon, with file path and line. We are removing most of these.
4. Existing Framer Motion usage — what's already animated and where.
5. Any component that must not be touched because it's wired to backend logic.
6. Current Lighthouse scores (mobile + desktop) as a baseline.

**Output:** a written audit. Change nothing. Wait for approval.

---

## Phase 1 — Foundation

1. Install dependencies above.
2. Load Switzer and Geist Mono via `next/font/local` / `next/font`. Remove Cormorant Garamond, Inter and IBM Plex Mono from `app/layout.tsx` — IBM Plex Mono is currently loaded and never consumed, so this is a straight payload win.
3. Port the full token block from `ACESTA-DESIGN.md` §10/§11 into the Tailwind theme and global CSS. Delete conflicting legacy tokens — don't leave two systems fighting.
4. Set global defaults: `background: var(--color-void)`, body text at weight 200, headings at weight 400. Enable `ss01` and `tnum`.
5. Wire Lenis smooth scroll at the app shell level, with a `prefers-reduced-motion` bypass.
6. Register GSAP ScrollTrigger and sync it to Lenis.
7. Build reusable motion primitives:
   - `<Reveal>` — mask-up text reveal, staggered by line, fires once at 75% viewport.
   - `<StaggerGroup>` — 60ms child stagger.
   - `useReducedMotion()` — single hook every animated component respects.

**Acceptance:** the site renders unstyled-but-correct on pure black, scroll is buttery, no font flash, no console errors, reduced-motion disables all transforms.

---

## Phase 2 — Shell

**Attempt this phase without framer-motion.** It is currently imported by nothing, and the two jobs assigned to it here — a mobile nav overlay and a 400ms page wipe — are both achievable with CSS transitions plus a small amount of state. Mobile LCP is the binding constraint on this build, so a ~40KB animation library earning its keep on two effects is not a given. Build it in CSS first, measure, and only reach for framer-motion if CSS genuinely cannot deliver the result. If CSS wins, uninstall the package. Apply the same measure-then-decide discipline used for the reveal implementation in Phase 1.

1. **Nav** — rebuild per §5. Transparent at top; backdrop blur + `rgba(0,0,0,0.6)` fades in after 80px scroll. Mono uppercase links, ash → bone on hover. One gold pill CTA at the right edge. Mobile: full-screen void overlay, links stagger in at 60ms.
2. **Footer** — spacious, typographic, no icon grid. Large wordmark, mono column labels, ghost links.
3. **Page transitions** — 400ms void wipe between routes.
4. **Brand routes** — re-cut `app/icon.tsx`, `app/apple-icon.tsx` and `app/opengraph-image.tsx` to `#C9A961` and Switzer per Decision C.
5. **Accessibility** — per Decision H: convert the raw `<img>` logos in `Navbar.tsx` and `Footer.tsx` to `next/image` with explicit dimensions and WebP output, and fix the `label-content-name-mismatch` on the logo link.
6. Delete the old nav/footer once parity is confirmed.

**Acceptance:** nav and footer match §5 exactly on both breakpoints. Keyboard focus is visible everywhere. Report `/` mobile Lighthouse as a median of three runs — single runs are not acceptable evidence.

---

## Phase 3 — The Signature: "The Resolve"

This is the most important phase in the build. Read §7 of the design system carefully.

Build a single reusable three.js particle system, mounted once, that persists across the whole page.

- ~4,000 points, additive blending, gold ramp (`--color-gold-deep` → `--color-gold` → `--color-gold-bright`), 1–2px, sharp-edged, never grayscale.
- **Initial state:** chaotic drift — visible noise.
- **On load:** resolves into a slowly rotating lattice constellation over 1400ms using `--ease-morph`.
- **On scroll:** morphs between formations as each service section enters view. Particles never reset — they travel from one formation to the next.

Formations required: `lattice` (hero), `grid` (web dev), `chart` (data intelligence), `radial` (search), `flow` (growth).

Implement formations as target position buffers and lerp between them. Do not destroy and rebuild the system per section.

**Performance requirements — non-negotiable:**
- Cap device pixel ratio at 2.
- Pause the render loop when the canvas is offscreen.
- Mobile: reduce to ~1,200 particles, disable rotation.
- `prefers-reduced-motion`: render a single **static** resolved formation, no animation loop.
- Must hold 60fps on desktop and not drop below 30fps on a mid-range Android.

**Hard gates — Phase 3 does not close until all four pass:**

Phase 2 closed at mobile perf 96 / LCP 2.80s / TBT 22ms. That headroom exists specifically to absorb this phase, and it is not a licence to spend all of it.

| Metric | Ceiling |
|---|---|
| `/` mobile performance | ≥ 90 (median of 3) |
| `/` mobile LCP | ≤ 3.2s |
| `/` mobile TBT | ≤ 200ms |
| Desktop performance | ≥ 98 |

- The canvas must never be in the LCP path. Dynamic import with `ssr: false`, and do not mount until after first paint. If LCP rises at all, the canvas is mounting too early.
- **Test on a real mid-range Android device, not only Lighthouse's emulated throttling.** Emulation does not model actual GPU limits, and most prospects will open this site on a mid-range Android on an Indian mobile network. If no device is available, say so explicitly rather than reporting emulated numbers as if they were device numbers.
- If a gate fails, reduce particle count before reducing visual quality elsewhere. 4,000 is a target, not a requirement — 2,500 particles that hold frame rate beat 4,000 that stutter.

**Review deliverables:**
- A dev-only formation switcher (query param or keyboard shortcut) that jumps directly to any of the five formations without scrolling the page. This is for human review and can ship behind a `NODE_ENV` check.
- A still screenshot of each of the five formations, plus one mid-morph frame, at both breakpoints.

**Acceptance:** the morph between formations is legible — a viewer should be able to *read* each formation as grid, chart, radial, flow — and the transition must feel like travel, not a cut. The system is clearly one continuous object across the page. Mobile does not stutter on a real device.

---

## Phase 4 — Homepage

**0. Compact the footer first.** The Phase 2 footer is too tall. Reduce the wordmark from `--text-heading-lg` to `--text-heading-xs` or smaller, tighten vertical padding, and collapse the three columns into a single row on desktop with the legal line inline. The footer should read as a quiet closing signature, not a second page. It is global, so this lands before the homepage work.

1. **Hero** — full-bleed void. Two-column asymmetric. Left: mono eyebrow in gold, headline at `--text-display` weight 400 white with `-0.04em` tracking, body at weight 200 in mist (max-width 520px), one gold pill CTA. Right: The Resolve in its `lattice` formation at large scale. No stock photography anywhere in this region.
2. **Section rhythm** — build the zigzag: visual-left/text-right, then text-left/visual-right, alternating down the page. Section gap 180px desktop / 96px mobile.
3. **Service snippets** — a four-part sequence, one per service. Each carries: mono eyebrow, service name at `--text-heading-lg`, a single-sentence proposition at weight 200, a reduced visual moment, and a ghost link reading "See the work" that deep-links to that service's section on `/services`.
   - As each snippet enters view, The Resolve morphs to that service's formation (`grid` → `chart` → `radial` → `flow`). On the homepage this is the *entire* visual payload for each service — no vitrine, no dashboard, no data tables. The particle formation alone carries it.
   - **One sentence. Not two.** The detail lives on `/services`. Per Decision M, the homepage's job is to establish register and create pull, not to inform.
4. Remove every legacy card container, bordered box, and background panel. Content floats on void with whitespace alone.
5. Remove decorative icons per §6. Icons survive only where they label a real interactive control.

**Acceptance:** one or two elements per viewport. Nothing boxed. A reader should be able to scroll the whole homepage in well under a minute and come away knowing what Acesta does and wanting to see more. The four snippets read as a single continuous sequence because the particle system never resets between them.

---

## Phase 5 — `/services` page and proof artifacts

This is the page that closes the sale. Build it as a single long-scroll page with four anchored sections (`#web`, `#data`, `#search`, `#growth`) so the homepage snippets can deep-link in.

Each service section runs: eyebrow → oversized headline → weight-200 positioning copy → scope and deliverables → **the proof artifact inside a vitrine** (§5). The particle system morphs to that service's formation as the section enters view — same continuous system as the homepage, mounted once.

Build the artifacts as **real components with plausible dummy data**, not images. They must survive a prospect zooming in.

### On dummy data
There is no real client data available. Invent it, and invent it *credibly*:

- Use a **fictional but realistic client context** and label it as illustrative — a small line reading "Illustrative sample" in mono ash beneath each artifact. Never imply these are real client results; a prospect who later discovers invented numbers were presented as real is a lost prospect and a legal exposure.
- Numbers should be **modest and internally consistent**. Revenue that ladders sensibly month to month, conversion rates in the 1–4% band, keyword positions that move 3–8 places rather than 1–90. Fantasy figures read as fake and cost you the credibility the whole site is built to establish.
- Pick one coherent scenario and hold it across all artifacts — e.g. a mid-size D2C brand — so the dashboard, SEO panel and growth diagram feel like one engagement rather than three unrelated demos.

### 5.1 Executive Data Intelligence — dashboard sample
A boardroom-grade **sales and revenue** panel. 3–4 metric readouts (mono, count-up on scroll-into-view) covering revenue, orders, average order value and conversion rate. One primary time-series chart showing revenue across twelve months. One secondary breakdown — channel or region. One segment filter row that actually filters the rendered data.

Gold as the primary series, `--color-steel` as the single comparison series (prior period), white for reference lines. No red/green deltas — gold and ash only.

### 5.2 Search Visibility Foundation — SEO panel
A visibility panel: keyword position table (mono, tabular numerals), a visibility-score trend line, a Core Web Vitals readout, and a compact before/after lift comparison. Make the numbers realistic — modest, credible gains, not fantasy 900% claims.

### 5.3 Growth Systems Architecture — flow diagram
An animated directed graph: source nodes → qualification → automation → outcome. Gold hairline paths with a travelling pulse along each edge. Nodes as mono labels on void. This should visibly echo the `flow` particle formation from Phase 3 — the diagram is the particles made concrete.

### 5.4 Premium Web Development
No vitrine needed. The proof is the site. Use this section for the strongest typographic moment on the page and a link to work.

### The four-boxes hazard

Four service sections each containing a rectangular vitrine will read as four boxes stacked down a page — which is the exact failure the client has already named. The vitrine exists so proof artifacts read as exhibits, not as a licence to rebuild the card grid in darker paint. Defend against it:

- **Scale them up.** Vitrines should be large and close to full-bleed, not card-sized. A card is something you scan past; an exhibit is something you stop at.
- **Break the rhythm.** Web Development has no vitrine at all, so the sequence is already exhibit / exhibit / typographic / exhibit rather than four in a row. Vary composition further — one artifact bleeding off the right edge, one centred, one offset.
- **Let them breathe.** 180px between sections is a floor here, not a target.
- **Cut the surrounding copy hard.** Per Decision M, if the artifact demonstrates the point, the paragraph explaining it is redundant. Scope and deliverables should be mono labels and short lines, never prose blocks beside a box.

If a screenshot of the finished page at 25% zoom reads as a stack of rectangles, the phase has failed regardless of how good each artifact is on its own.

**Acceptance:** each artifact looks like a real deliverable, not a decoration. If it wouldn't survive being screenshotted into a proposal, it isn't done.

---

## Phase 6 — Remaining pages

Same tokens, same rhythm, same restraint. Decision M applies throughout: cut copy, let motion and whitespace carry the page. The current versions of all three routes are the worst offenders for the box problem — `/about` is one giant bordered card containing three more cards, a photo card and a quote box.

### 6.1 `/about`
Premium content, zero containers. Narrative-led rather than modular.

- Open with a single oversized statement of position at `--text-display` — what Acesta believes, not what it offers.
- Founder portrait as one large rounded crop with the §6 gold-duotone treatment, floating on void, no frame and no card.
- Credentials and background as mono labels in a sparse row, not as three capability cards.
- The pull-quote becomes typography — large, weight 200, generous leading, set on void with no box, no border, no quotation-mark graphic.
- The Resolve holds a slow `lattice` here. This page should feel still.

### 6.2 `/contact` — the simplest page on the site
This page carries the most visual weight per element precisely because it has the fewest.

- Single column, centred, enormous vertical space. One headline, one line of support copy, the form. Nothing else above the footer.
- **Underlined inputs, not boxed ones.** Bottom hairline only, transparent background, label as a mono eyebrow above each field. Boxed form inputs are the single biggest source of the "boxes everywhere" feeling and are trivially avoidable.
- Focus state: the bottom hairline animates from ash to gold, left to right, 200ms.
- One gold pill submit. Success and error states as typography on void — no alert boxes, no coloured panels.
- The Resolve sits behind at low opacity, drifting slowly. This is the one page where it may run unresolved, as ambient texture rather than a formation.
- Form logic is untouched: state machine, field `name` attributes, `serviceOptions` strings and the `fetch('/api/contact')` call all stay byte-identical per the Phase 0 audit. Restyle the shell only.

### 6.3 `/work`
Project entries as large typographic rows, not cards. Client name at `--text-heading`, a single-line outcome in mist, mono labels for discipline and year, and one large duotone image per project revealed on hover or scroll. No bordered project cards.

### 6.4 Verification
Every homepage snippet deep-links correctly into its `/services` anchor, scroll position lands cleanly below the nav, and the particle system doesn't remount or flash during the route transition.

---

## Phase 7 — QA and hardening

1. **Performance** — Lighthouse ≥ 90 performance on mobile, ≥ 95 on desktop. All images through `next/image` with correct `sizes`. Lazy-load below-fold. Code-split the three.js bundle so it never blocks first paint.
2. **Responsive** — verify at 390, 768, 1024, 1440, 1920. Nothing overflows; display type never breaks the viewport.
3. **Accessibility** — visible keyboard focus on every interactive element, correct heading order, alt text on all imagery, contrast verified against §2, `prefers-reduced-motion` fully honoured.
4. **Cross-browser** — Chrome, Safari, Firefox, iOS Safari. Backdrop-filter and WebGL both need a Safari pass.
5. **Cleanup** — delete dead components, unused icon imports, orphaned CSS.

---

## Working agreement

- Report at the end of each phase: what changed, what files, what's left.
- If any instruction here conflicts with `ACESTA-DESIGN.md`, the design system wins — flag the conflict.
- If a decision isn't specified in either file, ask rather than defaulting. Defaults are how this site got boring the first time.
- Take screenshots as you build and critique your own output against §9 Do/Don't before declaring a phase complete.
