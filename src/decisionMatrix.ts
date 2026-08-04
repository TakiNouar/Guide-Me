// Step 5 (report Section 5): combine Interest + Aptitude + Grade Modifier
// into a label (never a single blended number). Personality is attached
// separately as a qualifier, not as a branch in this matrix — it sits
// outside the decision matrix by design (Section 2.4).

import { BigFiveTrait, Cluster, StudentProfile } from './types';
import { getGradeModifier } from './scoring';

export type OutputLabel =
  | 'Strong match'
  | 'Strong match — worth a conversation'
  | 'Interested, instincts still developing'
  | 'Possible hidden strength'
  | 'Deprioritize'
  | 'Ambiguous';

// Report Section 5, Step 5: "(70/40 thresholds are placeholders — real
// cutoffs should come from piloting, not asserted in advance.)"
// Keeping these as named, exported constants (not magic numbers) so
// swapping them post-pilot is a one-line change, not a code hunt.
export const HIGH_THRESHOLD = 70;
export const LOW_THRESHOLD = 40;

type Band = 'high' | 'mid' | 'low';

function band(score: number): Band {
  if (score >= HIGH_THRESHOLD) return 'high';
  if (score < LOW_THRESHOLD) return 'low';
  return 'mid';
}

/**
 * The four-combination table from Section 5, Step 5, plus the mid-range
 * "Ambiguous" catch-all. Grade modifier only ever adjusts the label within
 * the high/high case (per the report's table) — it never re-ranks or
 * changes the interest/aptitude branch itself.
 */
export function getOutputLabel(
  interestScore: number,
  aptitudeScore: number,
  gradeModifier?: number
): OutputLabel {
  const interestBand = band(interestScore);
  const aptitudeBand = band(aptitudeScore);

  if (interestBand === 'mid' || aptitudeBand === 'mid') {
    return 'Ambiguous';
  }

  if (interestBand === 'high' && aptitudeBand === 'high') {
    const gradeIsLow = gradeModifier !== undefined && gradeModifier < LOW_THRESHOLD;
    return gradeIsLow ? 'Strong match — worth a conversation' : 'Strong match';
  }

  if (interestBand === 'high' && aptitudeBand === 'low') {
    return 'Interested, instincts still developing';
  }

  if (interestBand === 'low' && aptitudeBand === 'high') {
    return 'Possible hidden strength';
  }

  // low interest + low aptitude
  return 'Deprioritize';
}

export interface ClusterRecommendation {
  cluster: Cluster;
  interestScore: number;
  aptitudeScore: number;
  gradeModifier?: number;
  label: OutputLabel;
}

/**
 * "Ranking to a final specialty list", steps 1 & 3 (Section 5):
 * rank clusters by Interest_Score; grade modifier only adjusts the
 * confidence label (already folded into getOutputLabel above), never
 * re-ranks clusters.
 *
 * Step 2 of that same list (ranking specialties *within* the winning
 * cluster using cluster-specific disambiguation items) is out of scope
 * for this scaffold — those items don't exist yet (report Section 9,
 * item #3) and are Researcher Claude's territory once drafted.
 */
export function rankClusters(
  interestScores: Record<Cluster, number>,
  aptitudeScores: Record<Cluster, number>,
  profile: StudentProfile
): ClusterRecommendation[] {
  const clusters = Object.keys(interestScores) as Cluster[];

  const recommendations: ClusterRecommendation[] = clusters.map((cluster) => {
    const interestScore = interestScores[cluster] ?? 0;
    const aptitudeScore = aptitudeScores[cluster] ?? 0;
    const gradeModifier = getGradeModifier(cluster, profile);
    return {
      cluster,
      interestScore,
      aptitudeScore,
      gradeModifier,
      label: getOutputLabel(interestScore, aptitudeScore, gradeModifier),
    };
  });

  return recommendations.sort((a, b) => b.interestScore - a.interestScore);
}

/**
 * Personality qualifier — descriptive only, attached to the final result,
 * never a match/mismatch judgment (Section 2.4, Section 5 Step 4).
 * Scaffold behavior: surface the strongest trait signal as a one-line note.
 */
export function getPersonalityQualifier(
  personalityScores: Partial<Record<BigFiveTrait, number>>
): string {
  const entries = Object.entries(personalityScores) as [BigFiveTrait, number][];
  if (entries.length === 0) {
    return 'No personality signal available yet.';
  }
  const [topTrait, topScore] = entries.reduce((a, b) => (b[1] > a[1] ? b : a));
  return `Working-style lean: ${topTrait} (${topScore.toFixed(0)}%) — descriptive only, not a fit judgment.`;
}
