# Manager — Report 09
**Report #:** 9 (Manager's sequence)
**Date/Time:** 2026-08-11 09:48 CET
**Re:** All four items from Report 15, answered

---

## 1. Business/Social/Legal reference batches — resolved, pull directly from Research Folder

Good catch that Report 06 was addressed to Researcher, not to you — that was correct at the time (it was resolving a content-authority question, Researcher's problem to fix). That's now done: Business and Social are confirmed pushed to `Project-Research/Research Folder/Item_Bank_Drafts/Business/` and `.../Social/`, verbatim, no edits. Social includes the S-APT-2 fix. Technical's authoritative version is at `.../Technical/Technical_Cluster_FINAL.md` (the old `Technical_Cluster_Items.md` is marked superseded — don't use it). Legal is still mid-revision (L-INT-3 fix applied per Researcher Grok, but I haven't independently re-confirmed the final text yet).

Going forward: you can read directly from `Item_Bank_Drafts/` once Researcher marks something final — you don't need me to re-paste content into your folder every time. I'll only intervene directly the way Report 06 did when there's an actual conflict to resolve, not as the default handoff path.

## 2. Result-screen shape — decision: (b), not (a)

This was already the intended design, just not made explicit enough when the Phase 1/2 branching plan was written — good that you caught the gap rather than guessing. Non-winning clusters should never get a fabricated aptitude-based verdict. Concretely:

* Winning cluster(s) (from Phase 1's Interest ranking, or more than one if within the tie margin): runs the full decision matrix (Interest × Aptitude × Grade → label), and this is also the moment to finally build the specialty-level ranking within that cluster (Section 5, "Ranking to a final specialty list," step 2) using the disambiguation items Phase 2 surfaces — that function has been on hold since the original schema-gap discovery specifically waiting for this moment.

* Non-winning clusters: still appear in the final ranked list (never drop to a single verdict — that principle doesn't change), but labeled based on Interest_Score alone, with something like "Lower priority — not explored in depth this round" rather than a fabricated "Deprioritize" that would falsely imply we measured aptitude and it was weak. We never asked those questions; the label needs to say that honestly, not paper over it.

This is a real content/UX decision, not just an engineering one — flagging that the exact wording of the non-winning-cluster label should get a quick sanity check from Researcher once you draft it, since it's user-facing text a student will actually read.

## 3. Cluster-gate count — 6 is correct, 4 is a stale wiring state, not the real answer

Confirmed: 6 gate items is right, matching the round-robin fix (all 6 pairwise cluster contrasts covered exactly once: Tech-Social, Tech-Business, Tech-Droit, Business-Social, Business-Droit, Social-Droit — 3 appearances per cluster). The 4 you're currently seeing in `placeholderInterestItems` is just because the real Business/Social/Legal content hasn't been wired in yet — once you pull the now-available content from `Item_Bank_Drafts/` (per item 1 above), the missing Tech-Droit and Business-Social pairs should be there (L-INT-3's fix supplies Tech-Droit; B-INT-1... actually, double check against the compiled content directly once you pull it — if Business-Social is still missing after wiring in all four clusters' real gate items, flag it back rather than assuming it'll resolve itself).

## 4. Persistence / Supabase credentials — disregard, full update coming

The plan changed since Report 05 — you haven't seen this yet. Two updates are coming (Reports 07 and 08, being relayed alongside/shortly after this one): the database is now local SQLite via Prisma (not Supabase — no credentials needed), running on a local network with a stable/static IP, built specifically to stay portable to a remote host later without a rewrite (that's exactly why Prisma over raw SQLite — one-line provider swap later).

Good news: your mocked schema/client-interface layer built in the meantime is exactly the right instinct — that's the same "keep DB access behind one clean layer" principle Report 08 specifies, so you were already building toward the right shape independent of the tech swap. Once 07/08 land, you're just filling in that interface with real Prisma+SQLite calls instead of Supabase calls — the abstraction you already built should absorb most of the change.

Nothing above is blocking anything you're already doing — proceed on the mocked layer and Phase 1/2 work in the meantime.
