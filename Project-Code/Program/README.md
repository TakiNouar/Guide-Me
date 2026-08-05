# HIS Orientation Test — Scoring Engine Scaffold

Implements report Section 5 (Engine Logic — Scoring & Grading), Steps 1–5, per the onboarding brief and Manager's Response v2.

## Structure
- `src/types.ts` — data types (item schema per Section 5's "Item metadata," treated as final per Manager's answer).
- `src/scoring.ts` — Steps 1–4: interest win-rate, aptitude correct-rate, grade modifier (generic pass-through), personality trait-rate.
- `src/decisionMatrix.ts` — Step 5: the four-combination table + Ambiguous catch-all, cluster ranking, personality qualifier.
- `src/placeholderItems.ts` — placeholder interest/aptitude/personality items (not real content — see file header).
- `src/demo.ts` — standalone demo: builds a sample student, runs all steps, prints output.

## Run it
```
npm install
npm start
```

## Known open items (not bugs — intentionally deferred, see inline comments)
- **Grade modifier language source** (Section 9 item #4): which language grade(s) feed non-technical clusters, and how E-commerce's dual-language case combines, is still undecided upstream. `getGradeModifier` is a pure pass-through by design — see `types.ts` and `scoring.ts` comments.
- **70/40 thresholds** (Section 5, Step 5): explicitly flagged in the report as placeholders pending pilot data. Exported as named constants (`HIGH_THRESHOLD`, `LOW_THRESHOLD`) in `decisionMatrix.ts` for a one-line swap later.
- **Specialty-level ranking within a winning cluster** (Section 5, "Ranking to a final specialty list," step 2): out of scope for this scaffold — needs Researcher Claude's cluster-specific disambiguation items, which don't exist yet (Section 9 item #3).
- **Item content**: everything in `placeholderItems.ts` is scaffold-only, generated to exercise the scoring functions. Not validated, not final wording, not final "correct instinct" answers.
