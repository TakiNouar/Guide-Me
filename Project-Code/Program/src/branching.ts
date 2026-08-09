// Phase 1 scoring + branch-point cluster selection (v2-lite engine, part 1 of 2).
// Final-output / result-screen logic is deliberately out of scope — pending a
// design decision on whether the final result ranks across all 4 clusters or
// ranks specialties within the winning cluster.

import { computeInterestScores } from './scoring';
import {
  placeholderAptitudeItems,
  placeholderInterestItems,
  specialtyDisambiguationInterestItems,
} from './placeholderItems';
import { AptitudeItem, Cluster, InterestItem, StudentResponse } from './types';

/**
 * Phase 1 — cluster-gate interest scores.
 * Thin named wrapper around computeInterestScores so the Phase 1 step is
 * self-documenting and testable in isolation. Built generically against
 * whatever placeholderInterestItems currently contains (currently 4 items,
 * not hardcoded to 6).
 */
export function computePhase1InterestScores(
  phase1Responses: StudentResponse[]
): Record<Cluster, number> {
  return computeInterestScores(placeholderInterestItems, phase1Responses);
}

/**
 * Placeholder threshold — same pattern as HIGH_THRESHOLD / LOW_THRESHOLD in
 * decisionMatrix.ts. Starting value pending real pilot data, not a validated cutoff.
 */
export const TIE_MARGIN = 15;

/**
 * Given Phase 1 interest scores, return the winning cluster(s).
 * Every cluster whose score is within TIE_MARGIN points of the maximum
 * (inclusive) is returned. The max itself is always included.
 * Throws on empty input rather than inventing a default leading cluster.
 */
export function getLeadingClusters(
  interestScores: Record<Cluster, number>
): Cluster[] {
  const entries = Object.entries(interestScores) as [Cluster, number][];
  if (entries.length === 0) {
    throw new Error(
      'getLeadingClusters: interestScores is empty — cannot determine a leading cluster'
    );
  }

  const maxScore = Math.max(...entries.map(([, score]) => score));
  return entries
    .filter(([, score]) => maxScore - score <= TIE_MARGIN)
    .map(([cluster]) => cluster);
}

export interface Phase2ItemSet {
  interestItems: InterestItem[]; // from specialtyDisambiguationInterestItems
  aptitudeItems: AptitudeItem[]; // from placeholderAptitudeItems
}

/**
 * Given the leading cluster(s), return the Phase 2 item set to show the student.
 * Union across all leading clusters if there is a tie.
 * Clusters with no specialty-disambiguation content yet contribute an empty
 * interest-item slice (expected today for Business / Social / Droit).
 */
export function getPhase2ItemsForClusters(clusters: Cluster[]): Phase2ItemSet {
  const clusterSet = new Set(clusters);

  const interestItems = specialtyDisambiguationInterestItems.filter((item) => {
    // By construction every option within one of these items shares the same
    // cluster — checking the first option is sufficient.
    const firstCluster = item.options[0]?.cluster;
    return firstCluster !== undefined && clusterSet.has(firstCluster);
  });

  const aptitudeItems = placeholderAptitudeItems.filter((item) =>
    clusterSet.has(item.targetCluster)
  );

  return { interestItems, aptitudeItems };
}
