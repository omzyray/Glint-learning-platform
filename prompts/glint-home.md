# Prompt: Implement Glint Home Page from glint-home.png

## Goal
Reproduce the Glint home page exactly as shown in `design/glint-home.png` (desktop reference) while adapting responsively to mobile. The page is marketing + discovery: header, centered hero with intelligent learning badge, large serif headline, sub-copy, primary CTA, prominent search bar with ⌘K hint, "All Courses" grid (3 cards), and bottom tagline with decorative blurred bars, using existing Tailwind v4 tokens and component patterns. Course content is fetched from the server-side content path (Sanity) via typed fields; displayed course and lesson details must come only from returned data.

## Skills Read
- AGENTS.md §3 UI work: reproduce layout/spacing/typography/color exactly, desktop exact, responsive stack/collapse, reuse existing Tailwind patterns before adding new components.
- AGENTS.md §5 structure: keep Studio vs web separation (not needed here), page is read-only display, no client token, no server writes.
- AGENTS.md §6 stack: Next.js App Router, Tailwind with typography, lucide-react, clsx+tailwind-merge, TypeScript.
- Checked `node_modules/next/dist/docs/` existence – App Router conventions, server/client boundaries.
- Tailwind v4 CSS-first via `@import "tailwindcss"` + `@theme inline` in `app/globals.css:1`.
- `next/font/google` for Inter + Playfair Display already in `app/layout.tsx:5`.

## Code Inspected
- `app/layout.tsx:1` – loads Inter (400,500,600,700) + Playfair Display (700), exposes `--font-inter/--font-playfair`, bg #FAFAFC, metadata "Glint — Design System".
- `app/globals.css:1` – defines tokens: primary 500 #F97316, primary 400 #FB923C, etc., neutral 900 #0F172A, 500 #64748B, 200 #E2E8F0, 100 #F1F5F9, 50 #FAFAFC, shadows, radii, type scale utilities.
- `app/page.tsx:1` – currently Design System showcase (14 sections, ~510 lines) – will be replaced by Home page.
- `app/components/navigation.tsx:1` – Logo (orange V + Glint text), HeaderNav, Breadcrumbs, Pagination – reference for header pattern.
- `app/components/ui/button.tsx:1` – variant primary #F97316 etc., but Home CTA needs orange pill; can reuse or inline for exact match.
- `app/components/ui/card.tsx:1` – CourseCard pattern (N logo, meta row) – similar but Home cards have specific icons/descriptions/meta (Intermediate/Beginner etc.).
- `app/components/ui/input.tsx:1` – SearchInput pattern – Home search is larger (56px) with ⌘K hint on right, not left 36 K.
- `app/lib/cn.ts:1` – helper.
- `package.json:11` – next 16.3.2, react 19, lucide-react, clsx, tailwind-merge.
- `design/glint-home.png` – source of truth for layout/spacing/typography/color, but branding in image shows Vertex — per BRAND.md implement all brand text as Glint: header Glint logo + Courses/My Learning + bell + avatar; hero badge INTELLIGENT LEARNING pill, headline "Search your learning in plain English." (Playfair bold), sub-copy Glint understands..., Explore Courses → button, search placeholder "Ask anything about your learning..." + ⌘K, section All Courses with View all courses → link, 3 cards (Next.js for Production / Docker Essentials / TypeScript Deep Dive) with N black, Docker whale blue, TS blue, descriptions, meta Intermediate/Beginner + durations 18h24m/10h12m/14h36m + modules 12/8/10, bottom divider with star "New courses and lessons added every week.", blurred orange bars at bottom, outer diagonal hatch side borders, page bg #FFFCFA cream.
- `prompts/glint-design-system.md:1` – documents token mapping – reuse same tokens.

## Decisions & Assumptions
- **Branding**: Reference image shows "Vertex" in header and hero copy ("Vertex understands..."), but per `BRAND.md` persistent rule always render as **Glint** — override the image. Header logo text and hero copy must say "Glint" ("Glint understands..."). Logo V shape stays same (#F97316 + #FB923C). Do not use Vertex anywhere in UI, code, prompts, metadata or docs; `app/layout.tsx` title/description and `app/page.tsx` header/hero already use Glint per `BRAND.md:13`.
- **Outer striped borders**: Image shows ~12px diagonal hatch on far left/right outside central card. Implement as outer wrapper with `repeating-linear-gradient(-45deg, #FFE8D5 0 1px, transparent 1px 12px)` on bg #FFFBF8, and inner container `max-w-[1120px] mx-auto bg-[#FFFCFA] border-x border-[#F1E8E0]` to leave gutters where hatch shows on desktop. On mobile gutters collapse (no side borders, full-width).
- **Page background**: Central content bg #FFFCFA / #FFFAF7 (same as hero). Use #FFFBF8 for outer, #FFFCFA for inner card – matches cream. All Courses section same bg, separated by thin border-t #F1E8E0.
- **Header**: Height ~64px, border-b #F1E8E0, px 6-8, flex justify-between. Left: logo V (24px) + "Glint" 16-18px semibold #0F172A (image shows Vertex — implement as Glint per BRAND.md). Center: nav Courses / My Learning 14px medium #0F172A / #64748B, gap 6-8. Right: Bell 20px #64748B + avatar 32px circle (use `https://i.pravatar.cc/100?img=5` or unsplash, fallback gray). Hide nav on <640 behind hamburger is not in image, but for responsiveness collapse nav to hidden and show hamburger icon may be extra; instead keep nav visible and wrap. To stay faithful, desktop shows nav, mobile stacks/hides nav into hamburger (using hidden sm:flex).
- **Hero badge**: Inline pill `INTELLIGENT LEARNING` tracking-[0.18em] text-[11px] font-semibold text-[#E86A2E] bg-[#FFF1E8] border border-[#FFE4D1] rounded-[8px] px-3 py-1.5 – matches image peach pill.
- **Headline**: Playfair Display bold, centered, text-[#0F172A], leading 1.05, sizes: 36px mobile, 48px tablet, 56px desktop. Content break after "learning" as in image – use `<br class="hidden sm:block">` or two lines via max-width.
- **Sub-copy**: Inter 15-16px #64748B, max-w-[560px] centered, mt-4, two lines as in image.
- **CTA**: `Explore Courses →` bg #EA580C / #F97316 (use #E86A2E / #F97316), text white 15px medium, px-6 py-3 h-11 rounded-[8px] shadow-sm hover:bg-[#EA580C], gap-2 with ArrowRight 16px. Centered mt-8.
- **Search bar**: Container max-w-[720px] mx-auto mt-10, bg white border border-[#F1E8E0] rounded-[12px] shadow-sm h-[56px] flex items-center px-4 gap-3. Left Search icon 20px #64748B, input flex-1 placeholder "Ask anything about your learning..." text-[15px] #9CA3AF, right hint `⌘ K` in box border border-[#E2E8F0] rounded-[6px] px-2 py-1 text-[12px] font-medium #64748B bg-[#F8FAFC]. Focus ring hidden for static.
- **All Courses header**: Flex justify-between items-center mt-0? Actually section has border-t. Title "All Courses" font-display bold 22-24px #0F172A, link "View all courses →" 13px #F97316 medium.
- **Cards**: Grid 1 col mobile, 2 col tablet, 3 col desktop gap-5-6. Each card bg white border #F1E8E0 / #E2E8F0 rounded-[16px] p-6 flex flex-col gap-3 min-h-[260px] shadow-sm. Icon 48x48 rounded-[12px]: N black bg #0F172A? Actually #000? Use #111111 or #0F0F0F with "N" white 24px diagonal N (use font bold). Docker: white bg with blue whale – implement SVG whale with containers (approx #2496ED) on white, border maybe none. TS: bg #3178C6 with "TS" white 20px bold. Title 16px font-semibold #0F172A mt-2 (use font-display or font-sans semibold). Desc 13px #64748B leading-5 line-clamp 3. Footer meta row border-t #F1F5F9 pt-4 mt-auto flex gap-3 text-[11px] #64748B: level (BarChart3), duration (Clock), modules (FileText). Values exactly: Card1 Intermediate 18h24m 12 modules, Card2 Beginner 10h12m 8 modules, Card3 Intermediate 14h36m 10 modules.
- **Bottom tagline**: Divider with lines + star. Use flex items-center gap-4 py-8: left hr flex-1 h-px bg-[#F1E8E0], center Star orange outline + text "New courses and lessons added every week." 13-14px #64748B, right hr. Star icon Lucide Star 16px #F97316 stroke 1.5 maybe.
- **Blurred bars**: Bottom decorative area h-28-32 overflow-hidden, flex justify-between items-end gap-2 px-0. Create 12-14 bars varying heights 40-100%, widths 6-8% (flex-1), bg gradient #FFC8A8 → #FFEEE5 with blur and opacity 0.6-0.8, rounded-t maybe. Use `blur-[1px]` or `backdrop-blur`. Mirror left/right symmetry with central gap where no bars. Implement with Tailwind arbitrary values and inline styles for heights.
- **Fonts**: Reuse Inter + Playfair already loaded. Ensure headline uses `font-display` (Playfair), body uses `font-sans` (Inter). No new font needed.
- **Reuse vs new**: Reuse `cn` helper, Button pattern (but inline for hero), Card base (or inline). No need to modify `components/ui/*` – keep them for future pages; page will be self-contained but can import `Bell, Search, ArrowRight, Clock, BarChart3, FileText, Star` from lucide-react.
- **Responsiveness**: Mobile <640: header nav hidden (show hamburger placeholder), hero headline wraps to 3 lines, search bar full-width with smaller placeholder, cards stack single column, tagline text wraps, blurred bars still show but fewer. No horizontal overflow at 375px.
- **Data fetching**: Cards render only grounded stored records from the server-side content path (typed fields from Sanity); unavailable courses are omitted. Displayed course and lesson details must come only from returned data. No auth gating for this slice.
- **Tailwind**: Use v4 utilities exclusively, no custom CSS beyond tokens already in globals.css. Add outer hatch via arbitrary value or inline style.

## Files to Touch
- `app/page.tsx` – replace Design System showcase with Home page implementation (header, hero, search, All Courses, tagline, blurred bars, outer wrapper).
- `app/layout.tsx` – update metadata title/description to reflect Home ("Glint — Search your learning in plain English") and ensure body bg matches outer hatch (keep `bg-[#FFFBF8]` or via page wrapper). Minimal change – title is "Glint — Search your learning in plain English" per BRAND.md (do not use Vertex).
- `app/globals.css` – no token change needed; verify striped pattern can be done via arbitrary tailwind, not needed to add CSS. If needed, add `.bg-hatch` utility.
- `prompts/glint-home.md` – this file.
- No changes to `app/components/*` unless header reuse needed – will inline for pixel control.

## Requirements
### Functional
- Header matches image layout: Glint V logo + Glint text left (image shows Vertex — implement as Glint per BRAND.md), Courses / My Learning center, bell + avatar right, border-b.
- Hero badge "INTELLIGENT LEARNING" centered pill orange on peach.
- Headline "Search your learning in plain English." centered Playfair bold, two lines desktop, wraps mobile.
- Sub-copy "Glint understands what you want to learn and finds the exact lessons across all your courses." centered gray, two lines (image shows Vertex — implement as Glint per BRAND.md).
- CTA "Explore Courses →" orange button centered, arrow right, hover darkens.
- Search bar centered max-w ~700, white, Search icon left, placeholder, ⌘K hint right, 56px height, rounded 12px.
- Section "All Courses" with title left, "View all courses →" orange link right, grid 3 cards with exact content/icons/meta as above, card hover lifts slightly.
- Bottom tagline divider with star and "New courses and lessons added every week."
- Bottom blurred orange bars decorative, symmetric, gradient fade.
- Outer diagonal hatch side gutters visible on desktop, hidden/collapsed on mobile.
- Responsive: at 1280px matches reference within 2px; at 375px no overflow, stacked, readable.
- No extra sections beyond reference (do not retain Design System sections).

### Non-Functional
- TypeScript strict, no `any`.
- Tailwind v4, no custom CSS beyond globals.css tokens.
- Accessible contrast (orange on white meets AA for large text, gray #64748B on cream meets).
- No secrets, no client token, static page (no "use client" needed unless search interactivity, but keep as server component; search bar is presentational).
- Keep existing font loading and alias `@/*`.

## Security Considerations
- No secrets in this slice. No env keys, no Sanity token, no Clerk, no PostHog. Ensure no client-side token exposure.
- Avatar image uses external unsplash/pravatar – ensure `next.config.ts` allows if using Next Image; avoid Next Image to sidestep config – use plain <img>.
- No writes, no API routes.

## Acceptance Criteria
- Visual: at 1280x800 screenshot comparison to `design/glint-home.png` – header, hero, search, cards, tagline, bars align within 2px spacing, colors hex within tolerance, typography matches (Playfair/Inter), icons match.
- `npm run lint` passes (0 errors in app files).
- `npx tsc --noEmit` passes (no type errors, agent excluded).
- `npm run build` succeeds (Next 16.3.2, static route /).
- `npm run dev` serves without console errors; curl shows header/hero text.
- File `prompts/glint-home.md` exists.
- No horizontal scroll at 375px.

## Checks to Run
- `npm run lint` (root)
- `npx tsc --noEmit`
- `npm run build`
- Manual `npm run dev` smoke + curl grep for hero title

## Manual Test Steps
1. `npm run dev` open http://localhost:3000 at 1280×800 – compare to `design/glint-home.png` (image shows Vertex — verify implementation shows Glint): verify header Glint + bell/avatar, badge pill, headline two lines Playfair, sub-copy two lines, orange CTA, search bar with ⌘K, All Courses header + link, 3 cards with N/Docker/TS icons and meta exactly, star divider, blurred bars, side hatch.
2. Resize to 375×800 – verify no horizontal overflow, header nav collapses, hero stacks, search full-width, cards single column, tagline wraps, bars still visible.
3. Inspect CTA button computed bg `rgb(249,115,22)` or `#F97316`, radius 8-12px, height 44px.
4. Inspect search input placeholder color and border #E2E8F0, height 56px.
5. Inspect card border #E2E8F0, radius 16px, padding 24px, meta icons align.
6. Run `npm run lint && npx tsc --noEmit && npm run build` – all pass.
7. `curl -s http://localhost:3000 | grep -i "Search your learning"` – returns headline.

