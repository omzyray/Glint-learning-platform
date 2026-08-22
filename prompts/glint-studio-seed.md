# Glint — Seed Sanity from provided seed.ndjson and videos.json

## Goal

Seed project `cgcaxwb9` / dataset `production` from the two provided files instead of generating content:

- `studio/seed.ndjson` — 141 documents: 6 categories, 10 courses, 5 instructors, 120 lessons. Images are `_sanityAsset` references to external URLs that the importer downloads and uploads.
- `studio/videos.json` — 120 entries keyed by lesson slug (YouTube id, title, channel, duration, query). Not ndjson, so not directly importable.

Then verify document counts against expected numbers.

## Skills read

- `sanity-migration` (import workflow, `--replace` convergence rule, count/reference validation).
- `AGENTS.md` sections 5, 8, 9, 12, 13.

## Code inspected

- `studio/.env` — `SANITY_STUDIO_PROJECT_ID=cgcaxwb9`, `SANITY_STUDIO_DATASET=production`.
- `studio/sanity.cli.ts`, `studio/env.ts` — CLI resolves project/dataset from env.
- `studio/schemaTypes/video.ts` — `video` document type exists (url required; chapters/chunks arrays optional).
- Dataset state (via MCP): already contains exactly the 141 seed docs with matching ids (prior import), plus image assets; **0** `video` documents.
- `~/.config/sanity/config.json` — CLI auth token present, so non-interactive import works.

## Decisions and assumptions

1. Re-run the import with `--replace` even though matching docs exist, so the dataset converges to exactly what the files say (per sanity-migration guidance). Ids are stable, so this is safe and deterministic. Asset uploads dedupe by hash.
2. `videos.json` handling — decided by your selection below:
   - **Option A (create video docs):** derive one `video` document per entry into a generated temp ndjson (`/tmp/opencode/videos.import.ndjson`; provided file untouched) and import it with the same CLI. Doc shape: `{_id: "video.<youtube-id-normalized>", _type: "video", url: "https://www.youtube.com/watch?v=<id>"}`. Normalization: lowercase, any char outside `[a-z0-9-]` becomes `-`; assert all 120 normalized ids stay unique. Chapters/chunks stay empty until the ingestion-pipeline task fills them.
   - **Option B (defer):** import only seed.ndjson; videos.json stays as input for the future video-ingestion pipeline task (AGENTS.md §9 reserves video docs for that tooling).
3. If the import rejects `video` docs because the deployed schema lacks the type, run `npx sanity schema deploy` in `studio/` first, then retry (schema deploy is already part of the standing studio checks).
4. No source files modified. No application code touched.

## Files touched

- None in the repo. Only `/tmp/opencode/videos.import.ndjson` (generated scratch, Option A only).

## Requirements

- Use the Sanity CLI import (`npx sanity dataset import …`) from `studio/`, not MCP writes.
- Do not modify `studio/seed.ndjson` or `studio/videos.json`.
- Verify counts afterwards with GROQ: expect category=6, course=10, instructor=5, lesson=120 (+ video=120 under Option A).
- Spot-check integrity: one lesson's `videoUrl` equals the videos.json mapping (e.g. `lesson.nextjs-app-router-in-depth-file-system-routing` → `9602Yzvd7ik`); course module → lesson references resolve (no dangling refs).

## Security considerations

- CLI uses the local auth token from `~/.config/sanity`; never print tokens.
- Dataset stays private; no env changes; no new keys introduced.

## Acceptance criteria

- Import exits successfully reporting 141 documents imported (and 120 more under Option A).
- GROQ counts match expectations exactly.
- Spot checks pass (sample lesson videoUrl, no dangling course→lesson references).
- Both provided files unchanged (`git status` clean apart from untracked prompt file).

## Checks to run

- The import itself, then the verification GROQ queries (report real output).
- No lint/typecheck/build — no code changed.

## Manual test steps

1. In `studio/`, run the import commands shown above.
2. Run the verification GROQ (Vision or MCP):
   `{'category': count(*[_type=='category']), 'course': count(*[_type=='course']), 'instructor': count(*[_type=='instructor']), 'lesson': count(*[_type=='lesson']), 'video': count(*[_type=='video'])}`
3. Open the Studio (`npm run dev`) and browse a course to confirm modules/lessons/images render.
