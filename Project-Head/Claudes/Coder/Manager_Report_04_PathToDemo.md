# Manager — Report 04
**Report #:** 4 (Manager's sequence)
**Date/Time:** 2026-08-09 14:52 CET
**Re:** Plan change — accelerating to a working demo, v2-lite adaptive engine + minimal front end

---

## What's changing
Same context as Researcher's version (attached for reference): moving to a rule-based adaptive engine now (not full IRT — no calibration data exists yet, and building fake statistical rigor would be worse than being honest about not having it). Priority is now a working end-to-end demo, not further scaffold polish first.

## Your work, in order

**1. Finish wiring what's already approved.** Technical is done. Once Researcher confirms Business/Social/Legal content (including the L-INT-3 fix) is compiled and ready, wire all three in the same way Technical was — same verification standard, no exceptions (you run and verify, always, per the standing policy).

**2. Build the Phase 1 / Phase 2 branching logic.** This is the actual "v2-lite" engine:
- **Phase 1:** every student answers the 6 cluster-gate interest items (all clusters, no branching yet). Compute `Interest_Score` per cluster from these responses alone.
- **Branch point:** identify the leading cluster (highest `Interest_Score`). If two clusters are within a small margin of each other (exact threshold: use the same `HIGH_THRESHOLD`/`LOW_THRESHOLD`-style named-constant pattern already in `decisionMatrix.ts` — pick a reasonable starting value, e.g. 15 points, flagged as a placeholder the same way 70/40 are), treat it as a tie and include **both** leading clusters' Phase 2 items rather than arbitrarily picking one.
- **Phase 2:** show only the winning cluster's (or clusters', if tied) specialty-disambiguation interest items and all of that cluster's aptitude items. Other clusters' Phase 2 items are never shown to this student.
- **Personality:** continues to be scored from whatever items the student actually saw (dual-tagged interest/aptitude items), exactly as the existing `computePersonalityScores` extension already handles — no change needed there, just confirm it still works correctly against a student who only saw a subset of items (not all 26).
- Grade modifier and final decision-matrix logic: unchanged, still consumes whatever scores come out of Phase 1+2 combined.

**3. Build a minimal working front end.** React/TypeScript/Tailwind, per the confirmed stack. Doesn't need to be polished — needs to be a real, clickable, end-to-end experience: student sees a question, picks an option, sees the next question (Phase 1 sequence, then the branched Phase 2 sequence), and finally sees the ranked result screen (matching the report's example result format — labeled recommendations, not a single verdict). This is what makes it an actual demo instead of a CLI script.

**4. Everything above still goes through Grok as first-draft, you as sole verifier** — no change to that policy regardless of the faster pace. Speed is not a reason to skip independent verification.

## What's explicitly NOT being built right now
No IRT, no calibrated item parameters, no statistically-derived stopping rule — flagged in code comments the same way the 70/40 thresholds already are, so nobody mistakes this for more rigorous than it is.
