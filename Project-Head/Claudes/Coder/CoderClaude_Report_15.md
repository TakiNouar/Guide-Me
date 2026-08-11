# CoderClaude — Report 15
**Author:** Coder Claude
**Report #:** 15
**Date/Time of writing:** 2026-08-11
**Relayed by:** Taki
**To be placed at:** `Project-Head/Claudes/Coder/CoderClaude_Report_15.md`
**Re:** Outstanding inputs needed to keep moving — four items, none of them blocking each other

---

## Context
Taking stock of where Coder's work actually stands against Report 04/05's plan. Core engine (scoring, decision matrix, schema, Phase 1 + branch point) is built and independently verified. Everything past that point is either waiting on an input from you/Researcher, or — in one case — a follow-through gap on my own end that I'm closing regardless of whether the rest of this list gets answered. Listing all of it here in one place rather than trickling in separate asks.

## 1. Business / Social / Legal — cleared reference batches
Checked the repo directly before writing this: `Manager_Report_06_ContentAuthorityResolved.md` shows Business and Social content is being finalized into clean verbatim reference docs (the same treatment Technical got via `Technical_Cluster_FINAL.md`), but that document is addressed to Researcher, not posted to `Project-Head/Claudes/Coder/`. Nothing's reached me yet as a cleared batch I can wire in. Not asking you to rush this — just confirming I'm correctly waiting rather than missing something already sent.

## 2. Final-output / result-screen shape — still open
Flagged in Report 14: under strict Phase 1/2 branching, only the winning cluster(s) get real Phase 2 aptitude data. Feeding the other 2-3 clusters' fabricated `0` aptitude scores into the existing cross-cluster decision matrix would produce misleading labels. Two readings I see:
- **(a)** Rank across all 4 clusters anyway (accepting the untested-cluster caveat somehow, or excluding them from the matrix specifically).
- **(b)** Rank *specialties within the winning cluster* using the specialty-disambiguation items Phase 2 already surfaces — this reuses the Section 5 "Ranking to a final specialty list, step 2" function that's been on hold since the original schema-gap discovery.
I haven't built past the branch point without this answer, since the front end and any result-screen work depend on which shape I'm building toward.

## 3. Cluster-gate item count — 4 vs. 6
Report 04 referenced 6 cluster-gate interest items; `placeholderInterestItems` currently has 4 (the four pairwise items: Technical-Social, Technical-Business, Business-Droit, Social-Droit — missing the Technical-Droit and Business-Social pairs that would make a fully-connected 6-item set). Built the branching engine generically against whatever count exists rather than assume, but flagging: is a second pair of cluster-gate items still coming from Researcher, or is 4 the intended final count and Report 04's "6" was just an earlier assumption that didn't get corrected? Doesn't block anything today, but affects whether Phase 1's balance is considered complete.

## 4. Supabase project credentials
From Report 05 — need a project URL + anon/service key to wire real persistence. **Not waiting on this to make progress:** proceeding now with the mocked schema/client-interface layer (Report 14 said I'd do this "separately" and I hadn't actually sent that instruction yet — sending it alongside this report, closing that gap on my own end regardless of the credentials question). Real wiring still needs the actual credentials whenever they exist.

## Not blocked
Continuing with the mocked persistence layer now. Everything else on this list — Business/Social/Legal content, the ranking-shape decision, and the cluster-gate count — I'm holding rather than guessing at, consistent with not inventing design/content decisions that aren't mine to make.

— Coder Claude
