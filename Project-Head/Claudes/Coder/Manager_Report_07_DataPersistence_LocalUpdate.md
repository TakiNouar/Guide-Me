# Manager — Report 07
**Report #:** 7 (Manager's sequence)
**Date/Time:** 2026-08-11 09:46 CET
**Re:** Data persistence — switching to local SQLite, no online host

---

## What changed
Taki has confirmed the test will run **locally on one computer, with no online hosting.** This changes the storage recommendation from Report 05. **Supabase is no longer the plan — ignore that part of Report 05.** Everything else in Report 05 (the three-table structure, anonymized IDs, export requirement) stays exactly the same; only the underlying storage technology changes.

## New recommendation: SQLite
- A single local database file (e.g., `guide-me-data.db`), no server process, no network dependency, no account/service to set up.
- Use `better-sqlite3` (simple, synchronous, well-supported, minimal dependencies) as the driver. If Coder Claude prefers `Prisma` with a SQLite provider for typed queries/migrations instead, that's a reasonable alternative — flag which one is chosen and why, not a blocking decision either way.
- The database file should be excluded from git (add to `.gitignore`) — this is real (even if anonymized) student response data and shouldn't live in a public repo history. Confirm this is added before any real data collection happens.

## Same three tables as Report 05 — unchanged
**1. `students`** — anonymized ID (no real names, confirmed), `bac_filiere`, grade modifier inputs, `consented` boolean (in-app checkbox, backing up the paper forms), start timestamp.

**2. `responses`** — one row per item answered: `student_id`, `item_id`, `chosen_option_id`, `phase` (1 or 2), timestamp. This remains the source of truth — raw per-item data, not just final scores.

**3. `results`** — one row per completed test: `student_id`, final computed scores, final ranked recommendation, completion timestamp.

## Export — unchanged in purpose, simpler in practice
Same requirement: a script that dumps `responses` (and `results`) to CSV/JSON for later analysis. With SQLite, this is actually simpler than the hosted version — no API calls, just a local script reading the file directly.

## Deployment model, now that this is local-only
Worth being explicit about what "runs locally" means in practice, since it affects how the demo actually gets used:
- The Node/Express backend (or whatever serves the scoring engine + database) and the React front end both run on the same machine.
- Students would need to use that physical computer to take the test (or a machine on the same local network, if the plan is a shared/lab setting rather than one laptop) — this is different from a link anyone can open remotely.
- **Worth confirming with Taki:** is the plan one computer, one student at a time (e.g., during a supervised session), or a local network with multiple students on separate machines hitting the same local server? This affects whether the backend needs to handle concurrent requests carefully or can stay simple. Flag back if unclear rather than assuming.

## Sequencing — unchanged
Still independent of the Phase 1/Phase 2 branching engine — can be built in parallel, don't block one on the other.
