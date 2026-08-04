# Report — Unit Test Suite for HIS Scoring Engine Scaffold

**From:** Grok (Coder Claude’s assistant)  
**Relayed by:** Taki  
**To:** Manager / Coder Claude  
**Re:** Reply to *Grok_Instruction_01_UnitTests.md*  
**Date:** 2026-08-04  
**Repo:** `TakiNouar/Guide-Me` (private)

---

## 1. Task summary

Write a Jest unit-test suite covering `src/scoring.ts` and `src/decisionMatrix.ts` against the existing implementation and `placeholderItems.ts`.  
No scoring logic was designed or changed. All expected values were derived strictly from the current code and placeholder data.

## 2. Deliverables created / updated

| File | Action | Purpose |
|------|--------|---------|
| `src/scoring.test.ts` | **Created** | Unit tests for `computeInterestScores`, `computeAptitudeScores`, `getGradeModifier`, `computePersonalityScores` |
| `src/decisionMatrix.test.ts` | **Created** | Unit tests for `getOutputLabel`, `rankClusters`, `getPersonalityQualifier` + exported thresholds |
| `jest.config.js` | **Created** | Jest + ts-jest configuration |
| `package.json` | **Updated** | Added `jest`, `ts-jest`, `@types/jest` as devDependencies; set `"test": "jest"` |
| `tsconfig.json` | **Updated** | Added `"types": ["node", "jest"]` so test files type-check cleanly |

**Source files left completely untouched** (as required):  
`src/scoring.ts`, `src/decisionMatrix.ts`, `src/types.ts`, `src/placeholderItems.ts`, `src/demo.ts`.

## 3. How to run

```bash
npm install
npm test
```

(`npm start` continues to run the existing demo and is unaffected.)

## 4. Test coverage vs. requested cases

### `computeInterestScores`

| Requested case | Test name / assertion | Expected result |
|----------------|-----------------------|-----------------|
| Technical on int-1 & int-2 + Droit on int-3 & int-4 | “scores Technical 100 and Droit 100…” | `{ Technical: 100, Business: 0, Social: 0, Droit: 100 }` |
| No responses | “returns 0 for every cluster… (no NaN / undefined)” | All four clusters = `0` (explicitly not `NaN`) |
| Partial responses | “correctly normalizes scores for partial responses” | Only int-1 (Technical) + int-3 (Droit) answered → `{ Technical: 50, Business: 0, Social: 0, Droit: 50 }` |

### `computeAptitudeScores`

| Requested case | Expected result |
|----------------|-----------------|
| Correct instinct on every item | `{ Technical: 100, Business: 100, Social: 100, Droit: 100 }` |
| Non-correct on `apt-business-1`, correct on the other three | `{ Technical: 100, Business: 0, Social: 100, Droit: 100 }` |
| No responses | All clusters = `0` (no `NaN`) |

### `getGradeModifier`

| Requested case | Expected result |
|----------------|-----------------|
| Cluster present in `gradeModifierInputs` | Returns the exact stored number (e.g. `82.5`) |
| Cluster absent | Returns `undefined` (does **not** throw, does **not** default to `0`) |

### `computePersonalityScores`

| Requested case | Expected result |
|----------------|-----------------|
| Conscientiousness on per-1 + Openness on per-2 | `{ Conscientiousness: 100, Extraversion: 0, Openness: 100, Agreeableness: 0 }` |

### `getOutputLabel` (every branch of the table + boundaries)

| Input | Expected label |
|-------|----------------|
| interest=100, aptitude=100, gradeModifier=undefined | `"Strong match"` |
| interest=100, aptitude=100, gradeModifier=30 (< 40) | `"Strong match — worth a conversation"` |
| interest=100, aptitude=100, gradeModifier=60 (mid) | `"Strong match"` |
| interest=100, aptitude=20 | `"Interested, instincts still developing"` |
| interest=20, aptitude=100 | `"Possible hidden strength"` |
| interest=20, aptitude=20 | `"Deprioritize"` |
| interest=55 (mid), aptitude=100 | `"Ambiguous"` |
| interest=100, aptitude=55 (mid) | `"Ambiguous"` |
| interest=70 exactly (≥ HIGH) | treated as **high** → `"Strong match"` (with aptitude=100) |
| interest=69.9 | treated as **mid** → `"Ambiguous"` |
| interest=40 exactly | treated as **mid** (low is `< 40`) → `"Ambiguous"` |
| interest=39.9 | treated as **low** → `"Possible hidden strength"` |

Also asserts the exported constants:  
`HIGH_THRESHOLD === 70`, `LOW_THRESHOLD === 40`.

### `rankClusters`

| Requested case | Expected behaviour |
|----------------|--------------------|
| Two clusters tie on interestScore | Output sorted descending by `interestScore`; both tied clusters appear; no crash |
| Cluster missing from `gradeModifierInputs` | `gradeModifier` property is present on the object and its value is `undefined` (not `0`, not omitted) |

### `getPersonalityQualifier`

| Requested case | Expected result |
|----------------|-----------------|
| `{ Conscientiousness: 100, Openness: 50 }` | String contains `"Conscientiousness"` (max score), does **not** mention Openness |
| `{}` | Exactly `"No personality signal available yet."` (no throw) |

## 5. Design / implementation notes (for manager review)

- All expected values were reverse-engineered from the live implementation and the current `placeholderItems.ts` (no guessing).
- Partial-response interest test uses the real appearance counts (each cluster appears twice across the four items), producing the mathematically correct 50/50 split.
- Boundary tests follow the exact predicates in `band()`: `>= HIGH_THRESHOLD` = high, `< LOW_THRESHOLD` = low, otherwise mid.
- `gradeModifier` is tested both for the pass-through value and for the intentional `undefined` behaviour (scaffold design).
- No thresholds, TODOs, or placeholder logic were “fixed” or altered.

## 6. Status

- Files are committed on `main` of `TakiNouar/Guide-Me`.
- Ready for local verification by Coder Claude / Manager via `npm install && npm test`.
- No open ambiguities were encountered that required guessing; all requested cases map cleanly to the existing code.

---

**End of report.**  
Ready for line-by-line review.
