# Manager — Report 04
**Report #:** 4 (Manager's sequence)
**Date/Time:** 2026-08-09 14:52 CET
**Re:** Plan change — accelerating to a working demo, v2-lite adaptive engine

---

## What's changing
Taki wants to move faster toward a working demo rather than continuing the current incremental pace. Two changes:
1. **We're building adaptive delivery now, not deferring it to a later "v2."** Not full IRT-calibrated CAT — that needs pilot data we don't have. A **rule-based adaptive engine**: Phase 1 asks the 6 cluster-gate items to every student; Phase 2 asks only the winning cluster's specialty-disambiguation + aptitude items. Genuinely adaptive (not everyone sees the same fixed set), but honest about not having statistical calibration behind it yet.
2. **Priority is now a working end-to-end demo**, not perfecting every item before anything ships.

## Your immediate priorities, in order

**1. Fix L-INT-3 (blocking, re-issued from Report 03).** Repoint from Legal-vs-Business to Legal-vs-Technical. This is likely a scenario rewrite for option B, not just a relabel — the current Discord-server-moderation scenario is Business-flavored. Needed for the round-robin balance (6 pairings, 4 clusters, 3 appearances each).

**2. Confirm/push Business and Social/Helping content into `Project-Research/Research Folder/Item_Bank_Drafts/`** — matching the file structure already used for Technical and Legal. If this content isn't already sitting in Researcher Grok's working files, request the full item text from Taki rather than reconstructing from memory.

**3. Tag every interest item as Phase 1 (cluster-gate) or Phase 2 (specialty-disambiguation).** This is mostly already implicit in the existing content — the "true" gate items (T-INT-1, B-INT-1, S-INT-1, L-INT-1/2/3) are Phase 1; everything else (T-INT-2/3/4, B-INT-2/3, S-INT-2/3) is Phase 2. Make this explicit in the compiled item bank so Coder doesn't have to infer it. Aptitude items are all Phase 2 by nature (cluster-specific, only relevant once a cluster is known).

**4. Once L-INT-3 is fixed and all 4 clusters are confirmed present, compile the full item bank into one clean reference file** (`Full_Item_Bank_Compiled.md` or similar) in `Item_Bank_Drafts/`, with every item tagged: cluster, specialty (where applicable), phase (1 or 2), and personality trait (where tagged). This is what Coder wires in next.

## What's NOT changing
Content quality standards stay exactly the same — strict review, no failure-answer options, real rationale per aptitude item, honest attribution. Moving faster doesn't mean lowering the bar on what's already been reviewed.
