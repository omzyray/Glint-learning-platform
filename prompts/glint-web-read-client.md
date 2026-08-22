# Prompt: Web app Sanity read path — server-only client + tagged fetch helper

## Goal
Implement the web app's Sanity data reading per AGENTS.md §5 as a server-only client holding SANITY_API_READ_TOKEN plus a typed fetch helper using Next cache tags. The dataset is private, so no token ever reaches the browser. Drop the scaffolded `sanity/lib/live.ts` (Live Content API) for now.

## Skills Read
- AGENTS.md §5 — Data access is a server-only Sanity client and fetch helper, reading a private dataset with a token; browser holds no token, never calls MCP/LLM, never writes content/progress; any write goes through server route; UI only shows stored data
- AGENTS.md §6 — Stack: Next.js App Router, next-sanity, @sanity/image-url, TypeScript, Zod for validation, server/client boundaries
- AGENTS.md §12 — Dataset is private, keep read token on server, never expose to client, fetch all content server side; keep project ids/keys in env, expose only client-safe values, committed .env.example canonical
- sanity-best-practices `nextjs` — Data fetching section, `createClient` with `useCdn`, `perspective`, `defineLive` vs manual `sanityFetch` helper with `revalidate`/`tags`, tag-based revalidation pattern
- sanity-best-practices `groq` — defineQuery for TypeGen, projections must include _id and needed fields, avoid fetching whole documents
- node_modules/next/dist/docs — App Router server/client boundaries, fetch caching via `next: { revalidate, tags }`, `revalidateTag` server route
- Current codebase — see Code Inspected

## Code Inspected
- `sanity/env.ts:1` — exports apiVersion/dataset/projectId from NEXT_PUBLIC vars, asserts presence
- `sanity/lib/client.ts:1` — base client `createClient({ projectId, dataset, apiVersion, useCdn:true, perspective:'published', stega:false })` — currently no token, no server-only guard
- `sanity/lib/serverClient.ts:1` — `import 'server-only'` + `createClient({ projectId, dataset, apiVersion, useCdn:false, perspective:'published', token: process.env.SANITY_API_READ_TOKEN, stega:false })` + `hasServerReadToken()` — already server-only
- `sanity/lib/live.ts:1` — `import { defineLive } from 'next-sanity/live'` + `export const { sanityFetch, SanityLive } = defineLive({ client: client.withConfig({ stega:false }), serverToken: process.env.SANITY_API_READ_TOKEN, browserToken: undefined })` — scaffolded Live Content API, to be removed per this task
- `sanity/lib/queries.ts:1` — `imageFragment` + 10 queries via `defineQuery` (CATEGORIES_QUERY, CATEGORY_BY_SLUG_QUERY, INSTRUCTORS_QUERY, INSTRUCTOR_BY_SLUG_QUERY, LESSONS_QUERY, LESSON_BY_SLUG_QUERY, LESSON_SLUGS_QUERY, COURSES_QUERY, COURSE_BY_SLUG_QUERY, COURSE_SLUGS_QUERY, VIDEO_BY_URL_QUERY, VIDEOS_QUERY) — all token-agnostic
- `sanity/lib/image.ts:1` — `createImageUrlBuilder({ projectId, dataset })` + `urlFor`
- `app/lib/courses.ts:1` — `import 'server-only'`, imports COURSES_QUERY etc + serverClient, `getCourses()` checks `process.env.SANITY_API_READ_TOKEN` fallback to STORED_COURSES, maps `modulesCount` via count, `deriveIcon`/`deriveDuration`, tags `['course']`; `getCourseBySlug`/`getCourseSlugs` use tags `course:${slug}`
- `app/lib/lessons.ts:1` — server-only, fetches LESSONS_QUERY etc with tags `['lesson']` / `lesson:${slug}`
- `app/lib/instructors.ts:1` — similar with tags `['instructor']`
- `app/lib/categories.ts:1` — similar with tags `['category']`
- `app/page.tsx:1` — `import { getCourses } from "@/app/lib/courses"` + `const courses = await getCourses()` — server component, already grounded
- `.env.example:1` — now documents NEXT_PUBLIC_SANITY_PROJECT_ID/DATASET/API_VERSION + SANITY_API_READ_TOKEN (server-only) + SANITY_API_WRITE_TOKEN (server-only)
- `.env.local:1` — has NEXT_PUBLIC vars, no SANITY_API_READ_TOKEN (so current fallback is exercised)
- `studio/` — standalone workspace already migrated (no longer relevant to web read path)
- No `sanity/lib/fetch.ts` or typed helper yet; no `app/api/revalidate` webhook route yet (deferred)

## Decisions & Assumptions
- Recommendation — **Server-only client + tagged fetch helper** (not Live Content API) — per AGENTS.md §5 private dataset rule and user prompt; Live Content via `defineLive`/`<SanityLive />` is deferred (would need serverToken+browserToken setup, PPR, and a deploy decision). Removing `live.ts` now keeps browser token-free and simplifies caching.
- Keep `sanity/lib/client.ts` as the **browser-safe** base client (useCdn:true, no token) for `urlFor` and any client components that need projectId/dataset only. It must never import `server-only` nor hold a token.
- Keep `sanity/lib/serverClient.ts` as the **server-only** client (`import 'server-only'`, `useCdn:false`, `perspective:'published'`, `token: SANITY_API_READ_TOKEN`). This is the only file that reads the private token. `useCdn:false` ensures freshness after webhook revalidation; individual fetches can opt `useCdn:true` if needed via `withConfig`.
- Add `sanity/lib/fetch.ts` as the **typed fetch helper** — `export async function sanityFetch<QueryString>(opts: { query, params?, revalidate?, tags? })` that delegates to `serverClient.fetch(query, params, { next: { revalidate, tags }, perspective:'published', useCdn:false })` and enforces `server-only`. This matches the `nextjs` skill manual helper pattern and centralizes tag usage so web files don't duplicate `next:{tags}` boilerplate and don't import `serverClient` directly. Alternative is to keep direct `serverClient.fetch` in app/lib — decision is to introduce the helper and migrate app/lib to it for consistency.
- Tags follow `nextjs` skill tag-based revalidation convention: `['course']`, `['course:${slug}']`, `['lesson']`, `['instructor']`, `['category']`, `['video']`. No `stega` or `draftMode` for now; `stega:false` everywhere to keep strings clean for logic.
- No `browserToken` — intentionally undefined; the browser never holds SANITY_API_READ_TOKEN.
- Validation: use `isAvailableCourse`-style guards (already in courses) and never invent records when fetch returns null/empty — fall back to stored demo or empty array.
- `.env.example` already correct — no change needed beyond confirming token remains without NEXT_PUBLIC prefix.
- Out of scope for this slice: draftMode route, Presentation Tool, webhook revalidation API route (`/api/revalidate/tag`), TypeGen generation, and the search/MCP integration (later).

## Files to Touch
- Create `sanity/lib/fetch.ts` — new server-only typed helper (`import 'server-only'`, `import { serverClient }`, `import type { QueryParams }`, export `sanityFetch`)
- Modify `sanity/lib/client.ts` — ensure it stays browser-safe (no token, no server-only, add comment clarifying it must not hold SANITY_API_READ_TOKEN)
- Delete `sanity/lib/live.ts` — remove scaffolded Live Content API (defineLive, SanityLive) per task instruction
- Modify `app/lib/courses.ts` — switch from direct `serverClient.fetch` + inline `next:{tags}` to `sanityFetch` helper, keep fallback logic, keep `import 'server-only'`
- Modify `app/lib/lessons.ts` — same migration to helper
- Modify `app/lib/instructors.ts` — same
- Modify `app/lib/categories.ts` — same
- Modify `app/layout.tsx` — remove any `<SanityLive />` import/render if present (currently not rendered, but verify)
- No changes to `sanity/lib/queries.ts`, `sanity/lib/image.ts`, `sanity/env.ts`, `studio/` workspace

## Requirements
### Functional
- `sanity/lib/client.ts` is browser-safe: no `server-only`, no `SANITY_API_READ_TOKEN`, `useCdn:true`, `perspective:'published'`
- `sanity/lib/serverClient.ts` is server-only (`import 'server-only'` first line), holds `SANITY_API_READ_TOKEN`, `useCdn:false`, `perspective:'published'`
- `sanity/lib/fetch.ts` exists, `import 'server-only'`, exports `sanityFetch` that takes `{ query, params?, revalidate?, tags? }` and calls `serverClient.fetch` with `next:{ revalidate, tags }`, typed via `defineQuery`
- `sanity/lib/live.ts` does not exist
- `app/lib/courses.ts`, `lessons.ts`, `instructors.ts`, `categories.ts` all `import 'server-only'` and delegate to `sanityFetch` with appropriate tags, never import `client` with token, never expose token to browser
- `app/page.tsx` continues to render only grounded data (fallback when token missing, no invented courses)
- `app/layout.tsx` does not import or render `SanityLive`

### Non-Functional
- TypeScript strict passes (`npx tsc --noEmit`)
- ESLint passes (`npm run lint`) for app/sanity files
- `npm run build` passes for web (no SanityLive, no client token)
- No `SANITY_API_READ_TOKEN` appears in any client component or browser bundle

## Security Considerations
- SANITY_API_READ_TOKEN is read only inside `sanity/lib/serverClient.ts` (and thus `sanity/lib/fetch.ts` via that import) — both `import 'server-only'` so any client import fails at build
- Never prefix token with NEXT_PUBLIC; keep `.env.example` entry as `SANITY_API_READ_TOKEN=` (no prefix)
- `sanity/lib/client.ts` must not accept token even optionally — keep it token-free to prevent accidental browser leakage
- Tag-based revalidation is server-only; no webhook secret exposed to browser (future `/api/revalidate/tag` will validate signature server-side)

## Acceptance Criteria
- `cat sanity/lib/client.ts` — shows no `server-only`, no `process.env.SANITY_API_READ_TOKEN`, has `useCdn:true`
- `cat sanity/lib/serverClient.ts` — first line `import 'server-only'`, has `token: process.env.SANITY_API_READ_TOKEN`, `useCdn:false`
- `cat sanity/lib/fetch.ts` — exists, first line `import 'server-only'`, exports `sanityFetch` with `next:{ tags, revalidate }`
- `cat sanity/lib/live.ts` — file does not exist
- `grep -R "SanityLive\|defineLive" app/ sanity/ --include="*.ts" --include="*.tsx"` — no matches
- `grep -R "SANITY_API_READ_TOKEN" --include="*.ts" --include="*.tsx"` — only in `sanity/lib/serverClient.ts` (and fetch via serverClient), not in `sanity/lib/client.ts` or any component
- `npm run lint && npx tsc --noEmit && npm run build` — all pass

## Checks to Run
- `npm run lint` (root)
- `npx tsc --noEmit` (root, studio excluded)
- `npm run build` (root)
- Manual: `grep -R "live" sanity/lib/ --include="*.ts"` confirms removal, `cat sanity/lib/fetch.ts` inspection, `grep -R SANITY_API_READ_TOKEN` shows only server files

## Manual Test Steps
1. `cat sanity/lib/client.ts` — verify browser-safe, no server-only, no token, useCdn true
2. `cat sanity/lib/serverClient.ts` — verify first line `import 'server-only'`, token present, useCdn false
3. `cat sanity/lib/fetch.ts` — verify helper exists, wraps serverClient.fetch with next tags
4. `test ! -f sanity/lib/live.ts && echo "live removed"` — must print
5. `grep -R "SanityLive\|defineLive" app/ sanity/` — must be empty
6. `grep -R "SANITY_API_READ_TOKEN" --include="*.ts" --include="*.tsx" | grep -v ".next" | cat` — only serverClient (and fetch via it)
7. `cat app/lib/courses.ts | head -n 20` — shows `import 'server-only'` and `import { sanityFetch } from '@/sanity/lib/fetch'` and tagged fetch
8. `npm run lint && npx tsc --noEmit && npm run build` — all pass; open `/` still renders 3 fallback courses when token missing

