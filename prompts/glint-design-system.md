# Prompt: Implement Glint Design System

## Goal
Implement the Glint Design System exactly as shown in `design/glint-designsystem.png`. Establish Tailwind v4 theme tokens, typography, spacing, radius/shadows, and reusable UI primitives so all future pages (catalog, course, lesson, instructor, My Learning, search) can reuse them without redesign. Match desktop exactly; adapt responsively to mobile by stacking/collapsing. Do not overbuild beyond the reference.

## Skills Read
- No dedicated design-system skill exists; inferred from AGENTS.md §3 (reuse components & Tailwind patterns, exact reproduction, responsive adaptation).
- Checked `node_modules/next/dist/docs/` existence (Next 16.3.2 App Router conventions) – server/client boundaries respected.
- Tailwind v4 CSS-first config via `@import "tailwindcss"` + `@theme inline` in `app/globals.css:1`.
- `next/font/google` patterns for Inter + Playfair Display.

## Code Inspected
- `app/layout.tsx:1` – currently uses Geist fonts, minimal layout. Replaced with Inter + Playfair Display.
- `app/globals.css:1` – only background/foreground vars. Replaced with full token set.
- `app/page.tsx:1` – default Next starter, replaced with design-system showcase (12 sections).
- `app/*`, `public/*`, `package.json:11`, `tsconfig.json:21`, `next.config.ts:1`, `eslint.config.mjs:1`, `postcss.config.mjs:1` – bare install, Tailwind v4 (`@tailwindcss/postcss`), no UI libs yet.
- `design/glint-designsystem.png` – source of truth for sections 01–14.
- `.claude/skills` / `agent/skills` – no design token skill; using Tailwind + next/font patterns.
- `tsconfig.json` paths `@/*` -> `["./*"]` verified for `@/app/lib/cn` alias.

## Decisions & Assumptions
- **Branding**: Product is Glint. Visual tokens are Glint; expose Glint in metadata/title and logo. No functional change.
- **Tailwind v4**: Use CSS `@theme inline` in `app/globals.css` for all tokens (colors, radii, shadows, fonts). No `tailwind.config.ts` needed.
- **Fonts**: `next/font/google` for Inter (weights 400,500,600,700) and Playfair Display (700). Variables `--font-inter`, `--font-playfair`. Body uses Inter; Display uses Playfair. Geist Mono kept for mono fallback.
- **Color mapping** (`01 COLORS`):
  - Primary 500 #F97316, 400 #FB923C, 300 #FDBA74, 200 #FED7AA, 100 #FFEEE5
  - Neutral 900 #0F172A, 700 #334155, 500 #64748B, 300 #CBD5E1, 200 #E2E8F0, 100 #F1F5F9, 50 #FAFAFC, White #FFFFFF
  - Expose as `--color-primary-*`, `--color-neutral-*` and semantic `--color-background/foreground`.
- **Type Scale** (`03 TYPE SCALE`):
  - Display 1: Playfair 48/56 Bold → `text-display-1`
  - Display 2: 36/44 Bold → `text-display-2`
  - Heading 1: Inter 28/36 Semi Bold (600) → `text-heading-1`
  - Heading 2: 22/30 Semi Bold → `text-heading-2`
  - Heading 3: 18/26 Medium (500) → `text-heading-3`
  - Body Large: 16/24 Regular → `text-body-large`
  - Body: 14/20 Regular → `text-body`
  - Small: 12/16 Regular → `text-small`
  - Implement as utility classes in globals.css.
- **Spacing** (`04`): Base 4px – Tailwind default already 4px (0.25rem). Document mapping 4=1, 8=2, 12=3, 16=4, 24=6, 32=8, 40=10, 48=12, 64=16. Bars bg #FFEEE5.
- **Radius** (`05`): xs 4px, sm 8px, md 12px, lg 16px, xl 24px, full 9999px → `--radius-xs` etc.
- **Shadows** (`05`): Sm `0 1px 2px rgba(15,23,42,0.05)`, Md `0 4px 12px -2px rgba(15,23,42,0.08)`, Lg `0 12px 24px -4px rgba(15,23,42,0.10)`, Xl `0 20px 40px -8px rgba(15,23,42,0.12)` → `--shadow-sm/md/lg/xl`.
- **Icons** (`06`): Outline 24x24, 2px stroke, rounded caps. Use `lucide-react` (outline, 2px default) matching spec. Include bell, search, play-circle, file-text, bookmark, bar-chart, clock, user, chevron-right.
- **Buttons** (`07`): 4 variants Primary/Secondary/Tertiary/Text × 3 states Default/Hover/Disabled. Height 44px, padding 0 16px (lg) / 0 12px (md), radius 12px (md), font Inter Medium 14-16px. Primary `bg-primary-500`, Secondary `bg-white border neutral-200`, Tertiary + ExternalLink icon, Text `text-primary-500` + circle arrow.
- **Inputs** (`08`): Search/Text 44px height, 12px radius, 1px solid #E2E8F0, padding 0 16px, focus `border-primary-400` + ring. Select 44px similar. Implemented as `SearchInput`, `Select`, `TextInput`.
- **Badges/Tags** (`09`): Video (bg #FFEEE5 text #F97316), Lesson (bg #EEF2FF text #6366F1), Popular (bg #FFF7ED text #F97316) – uppercase 10px tracking-widest.
- **Status/Indicators** (`10`): In Progress (clock orange), Completed (check green #22C55E), Now Playing (play orange), Locked (gray lock).
- **Progress Bar** (`11`): Thin track bg neutral-100, fill primary-500, 35% demo, label `35% complete`.
- **Cards** (`12`): Course Card, Lesson Card (Video), Lesson Card (Lesson), Resource Card – all `bg-white border border-neutral-200 rounded-xl shadow-sm p-5` with specific inner layout.
- **Navigation** (`13`): Header `Glint` logo (orange V) + Courses/My Learning, Breadcrumbs, Pagination (active orange). Components in `navigation.tsx`.
- **Principles** (`14`): Four principles Clarity First, Consistency, Focus & Calm, Accessible – with Eye, LayoutGrid, Target, Accessibility icons.
- **Assumes** no Sanity/Clerk/PostHog integration needed for this task – purely presentational tokens + primitives. Mobile adaptation via stacking grid columns, nav collapse to hamburger, no separate mobile design provided.

## Files to Touch
- `app/globals.css` – replace with full `@theme inline` tokens + base resets + type scale utilities.
- `app/layout.tsx` – load Inter + Playfair Display via next/font, update metadata, apply font variables.
- `app/page.tsx` – replace starter with Design System showcase reproducing every section 01–14 in responsive grid.
- `app/components/ui/button.tsx` – new, 4 variants, 2 sizes, focus ring.
- `app/components/ui/input.tsx` – new, SearchInput + Select + TextInput.
- `app/components/ui/badge.tsx` – new, 3 variants.
- `app/components/ui/card.tsx` – new, exports CourseCard, LessonVideoCard, LessonCard, ResourceCard.
- `app/components/ui/progress.tsx` – new.
- `app/components/ui/status.tsx` – new, StatusRow.
- `app/components/navigation.tsx` – new, Logo, HeaderNav, Breadcrumbs, Pagination.
- `app/lib/cn.ts` – new, clsx+tailwind-merge helper.
- `package.json` – add `lucide-react`, `clsx`, `tailwind-merge`.
- `tsconfig.json` – add `agent` to exclude to avoid reference ecommerce type errors.

## Requirements
### Functional
- Reproduce colors section 01 as swatches with hex labels (5 primary + 8 neutral).
- Reproduce typography section 02 (Ag glyphs + font names + descriptors) and type scale table section 03 (8 rows).
- Reproduce spacing bars section 04 (9 bars 4-64), radius circles + shadow boxes section 05 (6 radii, 4 shadows).
- Reproduce icons section 06 (outline + filled rows, 9 icons) + specs footer.
- Reproduce buttons section 07 matrix (4 variants × 3 states) + specs footer; Buttons must be 44px height, 12px radius.
- Reproduce inputs section 08 (search input with 36 K hint, select dropdown Most Relevant, field specs).
- Reproduce badges 09 (3), status 10 (4), progress 11 (35%).
- Reproduce cards 12 (4 cards with exact copy: "Next.js for Production", "Data Fetching in Server Components" etc., metadata like Intermediate, 18h 24m, 12 modules, Lesson 5.1 12:45, Module 5, PDF 1.2 MB).
- Reproduce navigation 13 (Glint logo, Courses active orange, My Learning, breadcrumbs, pagination 1 active).
- Reproduce principles 14 (4 icons + titles + descriptions).
- Desktop layout exact to reference: grid sections 12-col as in image, consistent gaps (gap-6), rounded cards 16px, border neutral-200, page bg #FAFAFC.
- Mobile: stack columns (grid-cols-1 at <lg), buttons full-width where sensible, cards single column, nav collapses (hidden nav + hamburger), no horizontal overflow at 375px.

### Non-Functional
- TypeScript strict, no `any`, isolatedModules.
- Tailwind v4 best practice, no custom CSS beyond tokens + utilities.
- Accessible contrast (neutral 900 on white, primary 500 for interactive).
- No client-side secret exposure (not applicable, but keep future server boundaries clean).
- Build must be static (no server deps).

## Security Considerations
- No secrets in this task. Ensure `app/globals.css` and components contain no env keys.
- Verify `lucide-react`, `clsx`, `tailwind-merge` have no extra permissions; no browser token writes.
- Keep `public` assets without sensitive data.
- Middleware/guard not needed for design system (public page).

## Acceptance Criteria
- `npm run lint` passes (0 errors; warnings only from excluded agent reference allowed but our app files must be clean).
- `npx tsc --noEmit` passes after excluding `agent`.
- `npm run build` succeeds (Next 16.3.2 Turbopack, static generation).
- `npm run dev` serves page without console errors; visual inspection at 1280px matches reference spacing/color/type within 2px tolerance; at 375px no horizontal overflow, cards stack, nav wraps.
- Tokens verifiable: inspecting `app/globals.css` shows all hex values from 01; Playfair/Inter loaded via next/font; button/input/card components exist and are used on showcase.
- File `prompts/glint-design-system.md` exists at repo root.

## Checks to Run
- `npm run lint` (root)
- `npx tsc --noEmit` (with agent excluded)
- `npm run build`
- Manual dev server smoke: `npm run dev` then `curl http://localhost:3000 | head`

## Manual Test Steps
1. `npm install` (if not done) then `npm run dev`.
2. Open http://localhost:3000 at 1280×800 – compare to `design/glint-designsystem.png`: verify 01 swatches (13 colors with hex), 02 Ag Playfair/Inter, 03 type scale 8 rows, 04 spacing bars 4-64, 05 radius 6 circles + 4 shadows, 06 two icon rows + specs, 07 button matrix 3×4, 08 search input + select + specs, 09 three badges, 10 four statuses, 11 progress 35%, 12 four cards, 13 nav + breadcrumbs + pagination, 14 four principles.
3. Resize to 375px – confirm columns stack, nav hamburger appears, buttons remain 44px height, no overflow, cards single column.
4. Inspect element on Primary button – computed background `rgb(249,115,22)` (#F97316), radius 12px, height 44px.
5. Inspect search input – border `rgb(226,232,240)` (#E2E8F0), focus border `rgb(251,146,60)` (#FB923C).
6. Run `npm run build` – ensure no TypeScript or Tailwind errors, output shows Route (app) ○ / .
7. Run `npx tsc --noEmit` – 0 errors after exclude fix.

