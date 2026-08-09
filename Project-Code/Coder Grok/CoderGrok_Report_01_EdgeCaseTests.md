# CoderGrok — Report 01 — Edge-Case Tests

**Author:** Coder Grok (Coder Claude’s assistant)  
**Report #:** 01 (sequential, Coder Grok reports)  
**Date/Time of writing:** 2026-08-09 ~14:45 CET  
**Relayed by:** Taki  
**To be placed at:** `Project-Code/Coder Grok/CoderGrok_Report_01_EdgeCaseTests.md`  
**Re:** Edge-case test pass (malformed itemId, duplicate responses, unknown chosenOptionId) — approved follow-up to Technical wiring

---

## 1. Division of labor (explicit)

I produced the test code only. I did not run `npx tsc --noEmit`, `npm start`, or `npm test` myself. Pass/fail verification is Coder Claude’s sole responsibility per Manager’s policy. Local verification results (Section 6) were supplied by Taki after the tests were written.

---

## 2. What was added

**File modified:** `Project-Code/Program/src/scoring.test.ts` only.  
**Files not touched:** `scoring.ts`, `decisionMatrix.ts`, `types.ts`, `placeholderItems.ts`, `demo.ts`.

Three new `describe` blocks documenting current behavior:

### 2.1 Unknown / malformed `itemId`
A `StudentResponse` whose `itemId` matches no item is never found by `findResponse` and has no effect. Confirmed for:
- `computeInterestScores`
- `computeAptitudeScores`
- `computePersonalityScores`

Each test mixes a valid response set with `{ itemId: 'does-not-exist', chosenOptionId: 'whatever' }` and asserts the result equals the valid-only result.

### 2.2 Duplicate responses to the same item
`findResponse` uses `Array.prototype.find` → **first match wins**; later duplicates are ignored. Confirmed for all three functions with a specific first/second pair, asserting:
- result equals first-only result
- result does **not** equal second-only result

### 2.3 Unknown `chosenOptionId` for a valid `itemId`
Item is found, but `item.options.find(...)` returns `undefined` → existing `if (!chosen) continue` skips it. Different code path from Case 1. Confirmed for all three functions: no crash, no score contribution from that response.

---

## 3. Expected values (derived from reading the code, not from execution)

These are the values the tests assert, based on static reading of `scoring.ts` and the current placeholder data.

| Case | Function | Key expected |
|------|----------|--------------|
| Unknown itemId + partial interest | `computeInterestScores` | `{ Technical: 50, Business: 0, Social: 0, Droit: 50 }` (same as without unknown) |
| Unknown itemId + 1 correct Technical | `computeAptitudeScores` | Technical = 25 (1/4) |
| Unknown itemId + per-1-a | `computePersonalityScores` | Conscientiousness 100, Extraversion 0 |
| Duplicate int-1 (a then b) | `computeInterestScores` | Technical 50, Social 0 (first wins) |
| Duplicate apt-technical-1 (correct then incorrect) | `computeAptitudeScores` | Technical 25 |
| Duplicate per-1 (a then b) | `computePersonalityScores` | Conscientiousness 100, Extraversion 0 |
| Unknown option on int-1 | `computeInterestScores` | all clusters 0 |
| Unknown option on apt-technical-1 | `computeAptitudeScores` | Technical 0 |
| Unknown option on per-1 | `computePersonalityScores` | Conscientiousness 0, Extraversion 0 |

---

## 4. Observations (not changes)

No behavior looked like an obvious bug that needed flagging as broken. The three edge cases all resolve to the same design pattern already present in the code:

1. Lookup is per-item, not per-response → unknown itemIds are inert.
2. `Array.prototype.find` → first duplicate wins.
3. Missing option → `continue`, no throw.

These are reasonable silent-ignore defaults for a scoring scaffold that assumes well-formed upstream data. Whether production should instead surface validation errors is a design call outside this task’s scope — not modified, not recommended here.

---

## 5. Process note

This report is filed under `Project-Code/Coder Grok/` per the coordination system correction. Prior reports that landed in `Project-Code/Program/docs/` predate that rule; this and subsequent Coder Grok reports use this folder and the `CoderGrok_Report_0N_…` naming convention.

---

## 6. Local verification (run by Taki / Coder Claude)

Commands run from `Project-Code/Program`:

```
npx tsc --noEmit
npm start
npm test
```

### 6.1 `npx tsc --noEmit`
```
npm notice run his-scoring-engine@0.1.0 npx
npm notice run tsc --noEmit
```
(no type errors — clean)

### 6.2 `npm start`
```
npm notice run his-scoring-engine@0.1.0 start
npm notice run ts-node src/demo.ts
--- HIS Orientation Test — Scoring Engine Scaffold Demo ---
Student: Sample Student (Sciences expérimentales)
Interest scores (Step 1): { Technical: 100, Business: 0, Social: 0, Droit: 100 }
Aptitude scores (Step 2): { Technical: 100, Business: 0, Social: 100, Droit: 100 }
Personality scores (Step 4): {
  Conscientiousness: 100,
  Extraversion: 0,
  Openness: 100,
  Agreeableness: 0
}
Ranked cluster recommendations (Step 5):
1. Technical — Strong match (interest 100%, aptitude 100%, grade modifier 82.5)
2. Droit — Strong match (interest 100%, aptitude 100%, grade modifier n/a)
3. Business — Deprioritize (interest 0%, aptitude 0%, grade modifier n/a)
4. Social — Possible hidden strength (interest 0%, aptitude 100%, grade modifier n/a)
Personality qualifier: Working-style lean: Conscientiousness (100%) — descriptive only, not a fit judgment.
--- Dual-tagging demo (t-int-4-a contributes Extraversion) ---
Personality scores with interest-sourced Extraversion: {
  Conscientiousness: 100,
  Extraversion: 50,
  Openness: 100,
  Agreeableness: 0
}
```

### 6.3 `npm test`
```
npm notice run his-scoring-engine@0.1.0 test
npm notice run jest
 PASS src/decisionMatrix.test.ts
 PASS src/scoring.test.ts
Test Suites: 2 passed, 2 total
Tests: 39 passed, 39 total
Snapshots: 0 total
Time: 5.277 s
Ran all test suites.
```

**Result: 39/39 tests passed** (30 existing + 9 new edge-case tests). tsc clean. Demo output unchanged and correct.

---

**End of report.**
