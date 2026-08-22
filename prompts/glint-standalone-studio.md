# Prompt: Migrate Glint Studio from embedded app/studio to standalone studio/ workspace

## Goal
Move the Sanity Studio from the embedded Next.js route `app/studio/[[...tool]]/page.tsx` to a standalone Studio workspace at `studio/` per AGENTS.md §5 and sanity-best-practices `project-structure` / `nextjs`. The embedded scaffold is uncommitted but must be removed; the new standalone workspace preserves independent deploys, Studio auto-updates, and TypeGen watch mode, and is required before the Sanity Context MCP will serve the dataset (§12).

## Skills Read
- AGENTS.md §5 — two standalone workspaces, Studio holds schema only, web holds Next.js + server-side read client
- sanity-best-practices `project-structure` — standalone studio layout `studio/` vs `web/`, monorepo placement, lockfile co-location, kebab-case file naming
- sanity-best-practices `nextjs` — Option A standalone vs Option B embedded (not recommended), migration steps, CORS origins, TypeGen via sanity.cli.ts
- sanity-best-practices `schema` — defineType/defineField/defineArrayMember usage (already applied in existing schemaTypes)
- sanity-best-practices `typegen` — typegen.enabled in sanity.cli.ts, path/generates config
- node_modules/next/dist/docs — App Router server/client boundaries (Studio route is client component NextStudio)
- Existing repo: sanity-best-practices references, create-agent-with-sanity-context context plugin notes

## Code Inspected
- `sanity.config.ts:1` — uses `basePath: '/studio'`, imports `projectId,dataset,apiVersion` from `./sanity/env`, schema from `./sanity/schemaTypes`, structure from `./sanity/structure`, plugins `structureTool` + `visionTool`
- `sanity.cli.ts:1` — `defineCliConfig({ api: { projectId, dataset } })` only; no typegen config
- `sanity/env.ts:1` — asserts NEXT_PUBLIC_SANITY_PROJECT_ID / DATASET / API_VERSION
- `sanity/schemaTypes/index.ts:1` — registers course, lesson, instructor, category, video + objects module (courseModule), learningOutcome, resource, chapter, transcriptChunk
- `sanity/schemaTypes/*` — 10 types already implemented per Glint content model §8 (course with modules embedded, lesson with Portable Text notes, instructor, category, video with chapters/chunks)
- `sanity/structure.ts:1` — custom resolver listing Courses, Lessons, Instructors, Categories, Video Index
- `sanity/lib/client.ts:1` — base client `useCdn:true, perspective:published` no token
- `sanity/lib/serverClient.ts:1` — server-only client with `SANITY_API_READ_TOKEN`, useCdn false
- `sanity/lib/queries.ts:1` — COURSES_QUERY etc via defineQuery, imageFragment
- `app/studio/[[...tool]]/page.tsx:1` — `import { NextStudio } from 'next-sanity/studio'` + `import config from '../../../sanity.config'` + `export const dynamic='force-static'`
- `app/lib/courses.ts:1` etc — server-only data layer already uses serverClient + fallback
- `.env.local:1` — NEXT_PUBLIC_SANITY_PROJECT_ID=cgcaxwb9, DATASET=production, no SANITY_API_READ_TOKEN
- `.env.example:1` — now documents SANITY_API_READ_TOKEN (server-only)
- `package.json:11` — single workspace with sanity 5.31.2, @sanity/vision, next-sanity, next 16.3.2
- Git status: embedded studio files uncommitted per task description

## Decisions & Assumptions
- Recommendation is **Move to standalone studio/** — per AGENTS.md and `nextjs` skill Option A. Keeping embedded violates §5 and blocks Context MCP (needs deployed Studio application, not just schema).
- Studio lives at `studio/` next to web root (web remains at repo root, not `web/` subfolder, to avoid moving all Next files). This still satisfies “two standalone workspaces in one repo” and matches migration checklist step 1 (create sibling folder, reuse projectId/dataset).
- `studio/package.json` is independent workspace with `sanity`, `@sanity/vision`, `styled-components` (Studio peer), scripts `dev`, `build`, `deploy`, `typegen`. Web root `package.json` retains `next-sanity` & `sanity` runtime for fetching only; Studio deps can stay duplicated or be deduped via npm workspaces — minimal change is to keep both, but document that Studio deps are authoritative.
- No npm workspaces config required for correctness; lockfile at root suffices. If adding `workspaces: ["studio"]` would change install behavior, defer unless user requests monorepo workspaces.
- `studio/sanity.config.ts` mirrors root config but imports from `./schemaTypes` and `./structure` inside studio, and reads env from `./env` that mirrors web’s env.ts (NEXT_PUBLIC vars) for consistency. Alternatively could read directly from process.env; choose `./env` to keep single source of validation.
- `studio/sanity.cli.ts` will define `api: { projectId, dataset }` and `typegen: { enabled: true, path: "../sanity/lib/queries.ts" varies — but web queries now live at `sanity/lib/queries.ts` (root). For standalone, typegen path must point to web queries: `path: "../**/*.{ts,tsx}"` or more narrow. Start with `path: "../app/**/*.{ts,tsx}"` + `../sanity/lib/**/*.{ts,tsx}` and `generates: "../sanity.types.ts"` or `generates: "./sanity.types.ts"`? Evaluate: web needs types at root `sanity.types.ts`; studio is the one extracting schema. Simplest: `sanity.cli.ts` typegen `{ path: "../{app,sanity}/**/*.{ts,tsx}", schema: "./schema.json", generates: "../sanity.types.ts" }` — but will verify against typegen.md examples. Decision: set `typegen.path` to `../sanity/lib/queries.ts` + `../app/lib/**` and `generates` to `../sanity.types.ts` so web can import types.
- Delete `app/studio/` entirely (including page.tsx) and delete root `sanity.config.ts` + `sanity.cli.ts` after copying; root `sanity/` folder will remain for web runtime (`sanity/lib/*`, `sanity/env.ts`) but `sanity/schemaTypes` moves to `studio/schemaTypes`. To avoid confusion, root will keep `sanity/lib` + `sanity/env.ts` only; studio keeps `studio/schemaTypes` + `studio/structure.ts`. No duplicate schema.
- CORS origins must include `http://localhost:3000` and `http://localhost:3333` — document as manual step via `npx sanity cors add` (cannot auto-add without token in CI).
- Vision plugin stays in Studio only.
- Keep web’s `sanity/lib/image.ts` and client helpers — Studio does not need them.
- Branding unchanged (Glint per BRAND.md).

## Files to Touch
- Create `studio/package.json` — new workspace, deps sanity 5.31.2, @sanity/vision, styled-components, scripts
- Create `studio/sanity.config.ts` — moved/adjusted from root, basePath '/studio' not needed for standalone (Studio serves at root), but keep or remove per standalone defaults (standalone Studio has no basePath)
- Create `studio/sanity.cli.ts` — with api + typegen config pointing to web queries
- Create `studio/env.ts` — projectId/dataset/apiVersion exports (copy from root sanity/env.ts)
- Move `sanity/schemaTypes` → `studio/schemaTypes` (index.ts + category, course, instructor, lesson, video, objects/*)
- Move `sanity/structure.ts` → `studio/structure.ts` (update import paths)
- Delete `app/studio/[[...tool]]/page.tsx` and `app/studio` directory
- Delete `sanity.config.ts` and `sanity.cli.ts` at repo root
- Keep `sanity/env.ts`, `sanity/lib/*` at root for web
- Optionally update `tsconfig.json` exclude/include to cover studio, and update README / .env.example with studio dev instructions
- No change to web pages or Sanity data layer logic beyond import path adjustments if any

## Requirements
### Functional
- Repo has `studio/` standalone workspace with its own `package.json`, `sanity.config.ts`, `sanity.cli.ts`, `env.ts`, `schemaTypes/` (10 types), `structure.ts`
- Root no longer has `sanity.config.ts` or `sanity.cli.ts`; embedded route `app/studio` removed
- `studio/sanity.config.ts` correctly imports schema and structure, uses projectId/dataset from `studio/env.ts`, registers structureTool and visionTool
- `studio/sanity.cli.ts` defines `typegen.enabled` and points to web queries, so `npx sanity typegen generate` in studio works
- Web still builds and serves catalog via `sanity/lib/serverClient` and `sanity/lib/queries`
- Studio can be run independently via `npm run dev --workspace=studio` or `cd studio && npm run dev` on port 3333

### Non-Functional
- No embedded Studio remains — `app/studio` does not exist
- No duplicate schema at root — single source in `studio/`
- TypeScript strict passes for both workspaces
- No secrets exposed to browser — Studio env still public vars only, web serverClient stays server-only
- Preserve Glint branding

## Security Considerations
- Keep SANITY_API_READ_TOKEN server-only in web (`sanity/lib/serverClient.ts` + `live.ts`); Studio does not need read/write tokens (uses logged-in Sanity auth)
- Do not add token to `studio/package.json` or `studio/env.ts` as NEXT_PUBLIC
- Verify `sanity/lib/serverClient.ts` retains `import 'server-only'`
- CORS origins added with `--credentials` only for localhost and production Vercel URL

## Acceptance Criteria
- `ls studio/` shows package.json, sanity.config.ts, sanity.cli.ts, env.ts, schemaTypes/, structure.ts
- `ls sanity/` at root shows only env.ts and lib/ (no schemaTypes, no config)
- `ls app/studio` fails (directory removed)
- `cat studio/sanity.config.ts` imports from `./schemaTypes` and `./structure` (not from `../sanity`)
- `cat studio/sanity.cli.ts` has `typegen` enabled with path covering `../sanity/lib/queries.ts` or `../app/**/*`
- `npm run build` at root still succeeds (web build without Studio route)
- `npx tsc --noEmit` passes (web)
- `npx tsc --noEmit` in `studio/` passes (if run)
- `npx sanity schema extract --path ./studio/schema.json` from studio/ succeeds

## Checks to Run
- `ls -R` before and after to confirm move
- `npm run lint` (root)
- `npx tsc --noEmit` (root)
- `npm run build` (root)
- `npx sanity schema extract --path /tmp/studio-schema.json --enforce-required-fields` from studio/ (or root with --project-id) to validate schema
- Verify embedded route removed: `test ! -d app/studio && echo "removed"`

## Manual Test Steps
1. `ls studio` — verify workspace exists with package.json, sanity.config.ts, sanity.cli.ts, env.ts, schemaTypes/, structure.ts
2. `ls sanity` — verify root sanity now only has env.ts and lib/ (no schemaTypes)
3. `test ! -d app/studio && echo "embedded removed"` — must print removed
4. `cat studio/sanity.config.ts` — confirm imports are relative to studio (./schemaTypes, ./structure) and schema includes 10 types
5. `cat studio/sanity.cli.ts` — confirm typegen.enabled true and api projectId/dataset set, path points to web queries
6. `npm run lint && npx tsc --noEmit && npm run build` — all pass at root
7. `cd studio && npx sanity schema extract --enforce-required-fields --path /tmp/verify.json && ls -lh /tmp/verify.json` — schema extracts without errors
8. `cd studio && npm run dev` in one terminal, `npm run dev` at root in another — Studio on 3333, web on 3000, both start; web catalog still renders stored fallback when token missing
9. Confirm no `SANITY_API_READ_TOKEN` appears in `studio/` files via `grep -R SANITY_API studio/`

