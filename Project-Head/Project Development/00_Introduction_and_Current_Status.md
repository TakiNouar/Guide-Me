# HIS Orientation Test — Project Report
**Context:** Internal project for HIS University's Orientation Department. Author: Taki (intern, Orientation Department; also president of HigherX Scientific Club).
**Goal:** Design a specialty-recommendation test for incoming/uncertain students, to help them identify which HIS Licence specialty they might excel in — not just which they'd enjoy.

---

## 📍 Current Status (updated 2026-08-09)

**Design phase: complete.** Format (forced-choice), scoring engine (Sections 3-6), 8-specialty/4-cluster mapping (Section 4, fully re-verified against HIS's live site), advisor scripts (5.1), career pathways (4.5), and sourcing (Section 7) are all settled and stable — no open design questions remain.

**Item bank status:** Near-complete. Technical cluster fully wired and independently verified. Legal cluster present (L-INT-3 fix still required for round-robin balance). Business and Social/Helping content approved in prior rounds but still needs to be confirmed/pushed into the repo. Once L-INT-3 is fixed and all four clusters are present, the full bank will be compiled for Coder.

**Active development (path to working demo):**
- Rule-based adaptive engine ("v2-lite") now in progress — Phase 1 cluster-gate items for every student, then Phase 2 only the winning cluster's specialty-disambiguation + aptitude items (see Section 5.2). Explicitly **not** full IRT-calibrated CAT; true IRT deferred until real pilot data exists.
- Minimal React/TypeScript/Tailwind front end for an end-to-end clickable demo.
- Data persistence (Supabase) planned so real student responses can be saved for future calibration.

**Still blocking full defensibility:**
1. No pilot with real HIS students yet — aptitude "correct answers" remain informed guesses until validated (Section 9, item #6).
2. Final compilation and wiring of the remaining clusters after the L-INT-3 fix and Business/Social repo push.

**Source verification:** HIS's own 8 Licence + 5 Master program pages have been independently re-verified against the live site (Sections 4, 4.5, 10.2) — confirmed accurate. Several *external* sources have not been independently re-checked yet and are explicitly flagged as such where they appear (Section 7 and Section 10.1) — flagged, not fixed, since re-verifying them isn't currently a priority.

---
