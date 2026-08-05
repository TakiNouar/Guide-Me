# Report — Schema Extension (specialty + trait) + Dual-Tagging + Wire T-INT-2/3/4

**From:** Grok (Coder Claude’s assistant)  
**Relayed by:** Taki  
**To:** Coder Claude / Manager  
**Re:** Reply to *Grok_Instruction_03_SchemaExtension_TraitTagging*  
**Date:** 2026-08-05  
**Repo:** `TakiNouar/Guide-Me` (private)

---

## 1. Scope completed

1. Added optional `specialty?: string` and `trait?: BigFiveTrait` to `InterestOption` and `AptitudeOption` in `types.ts`.
2. Extended `computePersonalityScores` to the 6-argument signature; scans personality + interest + aptitude for trait tags; untagged options are skipped entirely for appearances/picks.
3. Tagged `apt-technical-1-a` and `apt-technical-3-a` with `trait: 'Conscientiousness'`.
4. Added separate export `specialtyDisambiguationInterestItems` containing T-INT-2/3/4 (not added to `placeholderInterestItems`).
5. Updated `demo.ts` call site + dual-tagging demo section exercising `t-int-4-a`.
6. Updated and extended `scoring.test.ts` for the new signature and dual-tagging cases.

No changes to `computeInterestScores`, `computeAptitudeScores`, or `decisionMatrix.ts`.

---

## 2. Changes by file

### 2.1 `src/types.ts`
- Moved `BigFiveTrait` above the option interfaces so it can be referenced.
- Added `specialty?: string` and `trait?: BigFiveTrait` to both `InterestOption` and `AptitudeOption`.

### 2.2 `src/scoring.ts`
- `computePersonalityScores` now takes 6 arguments.
- Personality-item scan unchanged.
- Interest and aptitude scans only count options where `option.trait` is defined.
- Unified `appearances` / `picks` tallies across all three sources.

### 2.3 `src/placeholderItems.ts`
- Header comment updated to document the new separate export and why it is separate.
- `apt-technical-1-a` and `apt-technical-3-a` now carry `trait: 'Conscientiousness'`.
- New export `specialtyDisambiguationInterestItems` with t-int-2, t-int-3, t-int-4 exactly as specified (t-int-4-b deliberately untagged).

### 2.4 `src/demo.ts`
- Call site updated to 6-argument form, passing existing interest/aptitude data.
- Added dual-tagging demo section: sample student answers `t-int-4-a`; resulting Extraversion contribution comes from an InterestOption, not a dedicated personality item.

### 2.5 `src/scoring.test.ts`
- Existing personality test updated to pass empty arrays for interest/aptitude (regression check).
- New tests:
  - InterestOption trait contribution (`t-int-4-a` → Extraversion 100).
  - AptitudeOption trait contribution (`apt-technical-1-a` → Conscientiousness 50, because two tagged aptitude options exist and only one was answered).
  - Untagged option: choosing `t-int-4-b` yields `{ Extraversion: 0 }` (sibling tagged option still creates an appearance; the untagged choice itself contributes neither a pick nor a new trait key).

---

## 3. Verification (actually run)

### 3.1 `npx tsc --noEmit`
```
(no output)
TSC_EXIT=0
```
Clean.

### 3.2 `npm start`
```
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
1. Technical — Strong match  (interest 100%, aptitude 100%, grade modifier 82.5)
2. Droit — Strong match  (interest 100%, aptitude 100%, grade modifier n/a)
3. Business — Deprioritize  (interest 0%, aptitude 0%, grade modifier n/a)
4. Social — Possible hidden strength  (interest 0%, aptitude 100%, grade modifier n/a)

Personality qualifier: Working-style lean: Conscientiousness (100%) — descriptive only, not a fit judgment.

--- Dual-tagging demo (t-int-4-a contributes Extraversion) ---
Personality scores with interest-sourced Extraversion: {
  Conscientiousness: 100,
  Extraversion: 50,
  Openness: 100,
  Agreeableness: 0
}
START_EXIT=0
```

Notes on numbers:
- Base personality: Conscientiousness 100 / Openness 100 (from personality items) plus the two Conscientiousness-tagged aptitude options also picked → still 100% Conscientiousness.
- Dual-tagging demo: Extraversion appears at 50% because `per-1` contributes an Extraversion *appearance* (even though the student did not pick it) and `t-int-4-a` contributes 1 pick → 1/2 = 50%.

### 3.3 `npm test`
```
PASS src/scoring.test.ts
PASS src/decisionMatrix.test.ts

Test Suites: 2 passed, 2 total
Tests:       30 passed, 30 total
Snapshots:   0 total
Time:        1.649 s
Ran all test suites.
TEST_EXIT=0
```

All 30 tests green.

---

## 4. What was deliberately not done

1. Did not add t-int-2/3/4 to `placeholderInterestItems`.
2. Did not modify `computeInterestScores` or `computeAptitudeScores`.
3. Did not put `trait: 'Extraversion'` (or invent `'Introversion'`) on `t-int-4-b`.
4. Did not populate `specialty` on any `AptitudeOption`.

---

**End of report.**
