# Manager — Report 05
**Report #:** 5 (Manager's sequence)
**Date/Time:** 2026-08-09 14:52 CET
**Re:** Data persistence plan — how student responses and results get saved

---

## Context
Right now the engine only runs in a console demo and saves nothing. Before any real student can take this test and have it count toward eventual v2 calibration, we need real storage. Confirmed decisions from Taki: going with **Pool A** (current HIS students already in a specialty, since they're the ones who can actually validate or disprove the "correct instinct" guesses) as the primary data source, and **consent is handled offline by Taki** (signed paper forms) — not something the app needs to manage as a legal/process concern, though see the in-app note below for good practice regardless.

## Recommended stack: Supabase
Hosted Postgres, auto-generated REST API, official TypeScript client, no server to self-host or maintain. Fits the existing React/Node/TypeScript stack directly and free tier comfortably covers pilot scale. If there's a strong reason to prefer self-hosted Postgres/SQLite instead, flag it — but Supabase is the default unless a real objection comes up.

## What needs to be stored — three tables/collections

**1. `students`**
- `id` (generated, primary key)
- **Anonymized student ID only — no real names stored.** Taki has confirmed this for the current testing phase (pre-real-student-pilot). Use a generated identifier (e.g., a short random code or sequential anonymous ID) rather than collecting names. If a display label is ever needed in a future admin view, it should be the anonymized ID, not a name.
- `bac_filiere`
- grade inputs used for the grade modifier (whatever subject/language grades apply)
- `consented` (boolean) — even though paper consent is the primary process, include a simple in-app confirmation checkbox too before the test starts ("I understand my responses may be used for research/testing purposes") as a second, lightweight layer of good practice. Doesn't replace the paper form, just backs it up in the data itself.
- timestamp of when they started

**2. `responses`** (one row per item answered)
- `student_id` (foreign key)
- `item_id`
- `chosen_option_id`
- `phase` (1 or 2, per the Phase 1/Phase 2 branching design from Report 04)
- timestamp

This is the raw data — every individual answer, not just the final scores. **This table is the actual point of data collection**, since this is what eventually gets analyzed to derive real item difficulty/discrimination numbers for true v2. Don't only store final computed results — the raw per-item responses are what future calibration work will need.

**3. `results`** (one row per completed test)
- `student_id`
- final computed scores per cluster (interest, aptitude, grade modifier, personality)
- final ranked recommendation output (matching the report's example result format)
- timestamp of completion

This is the summary — useful for quick review/reporting without needing to recompute from raw responses every time, but `responses` remains the source of truth.

## Data export requirement
Build a simple export function (CSV or JSON) that pulls the full `responses` table for a given date range or all-time — this is what eventually gets handed off for real statistical analysis (item difficulty/discrimination calculation) once enough real responses exist. Doesn't need a UI for this yet — a script that dumps the export is enough for now.

## What this does NOT need to do yet
No admin dashboard, no login system for advisors to browse results, no analytics. Just: save every response as it happens, save the final result, and be exportable. Keep it minimal — this is about not losing real data once students start taking it, not building a full platform.

## Sequencing
This can be built in parallel with the Phase 1/Phase 2 branching engine from Report 04 — they're independent pieces (branching logic decides what to show; persistence decides what to save). Don't block one on the other.
