// Steps 1-4 of the Engine Logic (report Section 5).
// Each function is a direct implementation of its corresponding formula —
// no design decisions made here beyond what the report already specifies.

import {
  ALL_CLUSTERS,
  AptitudeItem,
  BigFiveTrait,
  Cluster,
  InterestItem,
  PersonalityItem,
  StudentProfile,
  StudentResponse,
} from './types';

function findResponse(
  responses: StudentResponse[],
  itemId: string
): StudentResponse | undefined {
  return responses.find((r) => r.itemId === itemId);
}

/**
 * Step 1 — Interest score per cluster.
 * Interest_Score(cluster) = (times cluster won) / (times cluster appeared) x 100
 * Normalized by appearances, not raw wins, so a cluster that simply shows up
 * more often doesn't look artificially stronger (Section 5, Step 1).
 */
export function computeInterestScores(
  items: InterestItem[],
  responses: StudentResponse[]
): Record<Cluster, number> {
  const appearances: Record<Cluster, number> = { Technical: 0, Business: 0, Social: 0, Droit: 0 };
  const wins: Record<Cluster, number> = { Technical: 0, Business: 0, Social: 0, Droit: 0 };

  for (const item of items) {
    for (const option of item.options) {
      appearances[option.cluster] += 1;
    }
    const response = findResponse(responses, item.id);
    if (!response) continue;
    const chosen = item.options.find((o) => o.id === response.chosenOptionId);
    if (!chosen) continue;
    wins[chosen.cluster] += 1;
  }

  const scores = {} as Record<Cluster, number>;
  for (const cluster of ALL_CLUSTERS) {
    scores[cluster] = appearances[cluster] > 0 ? (wins[cluster] / appearances[cluster]) * 100 : 0;
  }
  return scores;
}

/**
 * Step 2 — Aptitude score per cluster.
 * Aptitude_Score(cluster) = (correct answers for that cluster) / (total aptitude items for that cluster) x 100
 */
export function computeAptitudeScores(
  items: AptitudeItem[],
  responses: StudentResponse[]
): Record<Cluster, number> {
  const total: Record<Cluster, number> = { Technical: 0, Business: 0, Social: 0, Droit: 0 };
  const correct: Record<Cluster, number> = { Technical: 0, Business: 0, Social: 0, Droit: 0 };

  for (const item of items) {
    total[item.targetCluster] += 1;
    const response = findResponse(responses, item.id);
    if (!response) continue;
    const chosen = item.options.find((o) => o.id === response.chosenOptionId);
    if (chosen?.isCorrectInstinct) {
      correct[item.targetCluster] += 1;
    }
  }

  const scores = {} as Record<Cluster, number>;
  for (const cluster of ALL_CLUSTERS) {
    scores[cluster] = total[cluster] > 0 ? (correct[cluster] / total[cluster]) * 100 : 0;
  }
  return scores;
}

/**
 * Step 3 — Grade modifier per cluster.
 * TODO — pending Section 9 item #4 (Manager-approved as-is, Response v2):
 * the Arabic / French / both decision for the 5 non-technical clusters
 * (and how to combine E-commerce's dual-language case specifically) isn't
 * resolved yet. This function stays a pure pass-through by design — it
 * consumes a single pre-computed 0-100 value per cluster from
 * StudentProfile.gradeModifierInputs, however that upstream decision
 * eventually lands. Returns undefined if no grade signal exists yet for
 * that cluster (e.g. before the policy above is decided).
 */
export function getGradeModifier(cluster: Cluster, profile: StudentProfile): number | undefined {
  return profile.gradeModifierInputs[cluster];
}

/**
 * Step 4 — Personality trait profile (descriptive, not right/wrong).
 * Trait_Score(trait) = (times trait-linked option chosen) / (times trait appeared) x 100
 * Attached to the final result as a working-style descriptor only — never
 * a pass/fail branch (Section 2.4 / Section 5, Step 4).
 */
export function computePersonalityScores(
  items: PersonalityItem[],
  responses: StudentResponse[]
): Partial<Record<BigFiveTrait, number>> {
  const appearances: Partial<Record<BigFiveTrait, number>> = {};
  const picks: Partial<Record<BigFiveTrait, number>> = {};

  for (const item of items) {
    for (const option of item.options) {
      appearances[option.trait] = (appearances[option.trait] ?? 0) + 1;
    }
    const response = findResponse(responses, item.id);
    if (!response) continue;
    const chosen = item.options.find((o) => o.id === response.chosenOptionId);
    if (!chosen) continue;
    picks[chosen.trait] = (picks[chosen.trait] ?? 0) + 1;
  }

  const scores: Partial<Record<BigFiveTrait, number>> = {};
  for (const trait of Object.keys(appearances) as BigFiveTrait[]) {
    const appeared = appearances[trait] ?? 0;
    const chosen = picks[trait] ?? 0;
    scores[trait] = appeared > 0 ? (chosen / appeared) * 100 : 0;
  }
  return scores;
}
