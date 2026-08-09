# CoderGrok — Report 01 — Edge-Case Tests

**Author:** Coder Grok (Coder Claude’s assistant)  
**Report #:** 01 (sequential, Coder Grok reports)  
**Date/Time of writing:** 2026-08-09 ~14:45 CET  
**Relayed by:** Taki  
**To be placed at:** `Project-Code/Coder Grok/CoderGrok_Report_01_EdgeCaseTests.md`  
**Re:** Edge-case test pass (malformed itemId, duplicate responses, unknown chosenOptionId) — approved follow-up to Technical wiring

---

## 1. Division of labor (explicit)

I produced the test code only. **I have not run** `npx tsc --noEmit`, `npm start`, or `npm test`. Pass/fail verification is Coder Claude’s sole responsibility per Manager’s policy.

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

These are the values the tests assert, based on static reading of `scoring.ts` and the current placeholder data. Coder Claude should confirm them against real execution.

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

**End of report.**
