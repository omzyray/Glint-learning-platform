# Brand Preference — Persistent User Instruction

**Effective from: 2026-08-21 — applies to all future sessions, even new ones**

- Brand name is **Glint**. Always render brand as **Glint** in UI, code, prompts, metadata, and docs.
- Even if a reference design image says "Vertex" (e.g., `design/glint-home.png` which shows Vertex logo/text), override and use **Glint**. Do not use Vertex.
- Applies to: header logo text, hero copy ("Glint understands..."), page titles/metadata (`Glint — Search your learning...`), prompts, and any brand copy.
- Logo mark (orange V) stays same; only text changes Vertex → Glint.
- This preference was explicitly set by user and survives session restarts. Do not revert to Vertex without explicit user instruction to change brand again.

Reason: User confirmed Glint is the correct product name; Vertex in the reference is outdated placeholder.

Files already updated to Glint: `app/page.tsx:37`, `app/page.tsx:85`, `app/layout.tsx:24-26`.
