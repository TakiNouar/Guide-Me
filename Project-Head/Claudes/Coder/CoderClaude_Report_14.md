# CoderClaude — Report 14
**Author:** Coder Claude
**Report #:** 14
**Date/Time of writing:** 2026-08-09
**Relayed by:** Taki
**To be placed at:** `Project-Head/Claudes/Coder/CoderClaude_Report_14.md`
**Re:** Acknowledging Reports 03/04/05 · sequencing plan · one blocking question on persistence

---

## Report 03 — acknowledged
No action needed on my end beyond continuing as-is. Noted the confirmation on relay mechanics and will keep self-flagging near-misses the same way going forward.

## Report 04 (Path to Demo) — acknowledged, sequencing plan below
Understood the shift in priority and the v2-lite scope (rule-based, not IRT — agreed that's the honest call given no calibration data exists). My sequencing:

1. **Phase 1/Phase 2 branching engine — starting now.** This is unblocked: doesn't need Business/Social/Legal's real content or Supabase credentials to build and test against current data (Technical's real items + the other three clusters' placeholders). Grok instruction going out alongside this report.
2. **Wiring Business/Social/Legal** — waiting on Researcher's compiled batch (including the L-INT-3 fix mentioned). No action needed from me until that lands; will use the same verification standard as Technical, no exceptions.
3. **Front end** — sequenced after the branching engine is real and tested, since the front end needs to call into working Phase 1/2 logic, not scaffold around a guess at its shape.

## One structural ambiguity found while scoping the branching engine — flagging before building the final-output piece
Under strict Phase 1/2 branching, **only the winning cluster (or tied clusters) ever gets Phase 2 aptitude items shown.** The other 2-3 clusters get zero aptitude items. `computeAptitudeScores`'s existing zero-items guard returns `0` for a cluster with no items — which is technically correct math, but semantically wrong here: `aptitude: 0` currently means "answered incorrectly," not "was never tested." If I feed that `0` into the existing `rankClusters`/`getOutputLabel` for all 4 clusters, an untested cluster with modest interest could come out labeled "Deprioritize" based on fabricated absence-of-data, not a real signal.

This also bears on Report 04's front-end spec: "ranked result screen... labeled recommendations, not a single verdict" (plural). Two readings:
- **(a)** Ranked across all 4 clusters — but 3 of them would have fake zero-aptitude data under strict branching, which seems wrong.
- **(b)** Ranked across **specialties within the winning cluster** — using exactly the specialty-disambiguation items Phase 2 already shows (e.g., Informatique-SI vs. Sécurité-SI vs. Électronique, each with their own label). This is literally the "Ranking to a final specialty list, step 2" function from Section 5 that's been deliberately held back since the schema-gap discovery a few rounds back — Phase 2's branching design is what finally makes it buildable.

**(b)** seems like the far more coherent reading given the branching design, but I'm not deciding this myself — it's a real fork in what the final result screen shows. Proceeding now with the unambiguous part (Phase 1 scoring + branch-point cluster selection, including the tie logic) and holding the final-output/result-screen piece until this is confirmed.

## Report 05 (Data Persistence) — acknowledged, one blocking question
No objection to Supabase — reasonable default, fits the stack, and I don't have a real reason to prefer self-hosted Postgres/SQLite for pilot scale.

**Blocking question:** I don't have Supabase project credentials (project URL + anon/service key), and I can't provision a real Supabase project myself — that needs an actual account, which is a Taki-side action, not something I or Grok can create autonomously. I can build the full schema, the TypeScript client interface, and the export function against a **local/mock persistence layer** right now (so the shape is correct and testable without a live database), but actually wiring to real Supabase needs those credentials handed to me first. Should I:
- (a) build the schema + interface + export function now, mocked, ready to swap in real credentials the moment they exist, or
- (b) hold this piece entirely until credentials are available?

My default is (a) — matches the "don't block one piece on another" spirit of Report 05's sequencing note, and it's real progress either way. Proceeding on (a) unless told otherwise.

## Status
Grok instruction sent now for the unambiguous slice: Phase 1 scoring + branch-point cluster selection with tie-margin logic, built generically against however many cluster-gate items actually exist in `placeholderInterestItems` (currently 4, not the 6 Report 04 mentions — flagging that count mismatch too, since Researcher's content determines the real number, not something I should hardcode around). Final-output/result-screen logic held pending the (a)/(b) clarification above. Persistence layer (mocked) instruction to follow separately — not starting it blind in the same breath, given it touches new tooling (Supabase client) that deserves its own scoping pass.

— Coder Claude
