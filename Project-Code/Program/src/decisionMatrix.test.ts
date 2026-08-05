import {
  getOutputLabel,
  rankClusters,
  getPersonalityQualifier,
  HIGH_THRESHOLD,
  LOW_THRESHOLD,
} from './decisionMatrix';
import { StudentProfile, Cluster } from './types';

describe('exported thresholds', () => {
  it('exports HIGH_THRESHOLD = 70 and LOW_THRESHOLD = 40', () => {
    expect(HIGH_THRESHOLD).toBe(70);
    expect(LOW_THRESHOLD).toBe(40);
  });
});

describe('getOutputLabel', () => {
  it('interest=100, aptitude=100, gradeModifier=undefined → "Strong match"', () => {
    expect(getOutputLabel(100, 100, undefined)).toBe('Strong match');
  });

  it('interest=100, aptitude=100, gradeModifier=30 (below LOW_THRESHOLD) → "Strong match — worth a conversation"', () => {
    expect(getOutputLabel(100, 100, 30)).toBe('Strong match — worth a conversation');
  });

  it('interest=100, aptitude=100, gradeModifier=60 (mid-range) → "Strong match" (only downgrades when low)', () => {
    expect(getOutputLabel(100, 100, 60)).toBe('Strong match');
  });

  it('interest=100, aptitude=20 → "Interested, instincts still developing"', () => {
    expect(getOutputLabel(100, 20)).toBe('Interested, instincts still developing');
  });

  it('interest=20, aptitude=100 → "Possible hidden strength"', () => {
    expect(getOutputLabel(20, 100)).toBe('Possible hidden strength');
  });

  it('interest=20, aptitude=20 → "Deprioritize"', () => {
    expect(getOutputLabel(20, 20)).toBe('Deprioritize');
  });

  it('interest=55, aptitude=100 (interest mid-band) → "Ambiguous"', () => {
    expect(getOutputLabel(55, 100)).toBe('Ambiguous');
  });

  it('interest=100, aptitude=55 (aptitude mid-band) → "Ambiguous"', () => {
    expect(getOutputLabel(100, 55)).toBe('Ambiguous');
  });

  describe('boundary checks', () => {
    it('interest=70 exactly counts as high (>=70)', () => {
      // 70 high + 100 high → Strong match
      expect(getOutputLabel(70, 100)).toBe('Strong match');
    });

    it('interest=69.9 counts as mid', () => {
      expect(getOutputLabel(69.9, 100)).toBe('Ambiguous');
    });

    it('interest=40 exactly counts as mid (low band is <40)', () => {
      // 40 mid + 100 high → Ambiguous
      expect(getOutputLabel(40, 100)).toBe('Ambiguous');
    });

    it('interest=39.9 counts as low', () => {
      // 39.9 low + 100 high → Possible hidden strength
      expect(getOutputLabel(39.9, 100)).toBe('Possible hidden strength');
    });
  });
});

describe('rankClusters', () => {
  const emptyProfile: StudentProfile = {
    id: 'test',
    name: 'Test',
    bacFiliere: 'Test',
    gradeModifierInputs: { Technical: 82.5 }, // only Technical present
    interestResponses: [],
    aptitudeResponses: [],
    personalityResponses: [],
  };

  it('sorts output descending by interestScore and includes both clusters on a tie', () => {
    const interestScores: Record<Cluster, number> = {
      Technical: 80,
      Business: 80, // tie with Technical
      Social: 50,
      Droit: 20,
    };
    const aptitudeScores: Record<Cluster, number> = {
      Technical: 90,
      Business: 70,
      Social: 60,
      Droit: 40,
    };

    const ranked = rankClusters(interestScores, aptitudeScores, emptyProfile);

    // Should be sorted descending by interestScore
    expect(ranked[0].interestScore).toBeGreaterThanOrEqual(ranked[1].interestScore);
    expect(ranked[1].interestScore).toBeGreaterThanOrEqual(ranked[2].interestScore);
    expect(ranked[2].interestScore).toBeGreaterThanOrEqual(ranked[3].interestScore);

    // Both tied clusters (Technical & Business at 80) appear
    const clustersAt80 = ranked.filter((r) => r.interestScore === 80).map((r) => r.cluster);
    expect(clustersAt80).toContain('Technical');
    expect(clustersAt80).toContain('Business');
    expect(ranked).toHaveLength(4);
  });

  it('sets gradeModifier to undefined (not 0) for clusters missing from gradeModifierInputs', () => {
    const interestScores: Record<Cluster, number> = {
      Technical: 100,
      Business: 50,
      Social: 30,
      Droit: 10,
    };
    const aptitudeScores: Record<Cluster, number> = {
      Technical: 100,
      Business: 50,
      Social: 30,
      Droit: 10,
    };

    const ranked = rankClusters(interestScores, aptitudeScores, emptyProfile);

    const technical = ranked.find((r) => r.cluster === 'Technical')!;
    const business = ranked.find((r) => r.cluster === 'Business')!;

    expect(technical.gradeModifier).toBe(82.5);
    // Key assertion: property exists and is undefined, not 0 or omitted
    expect(business).toHaveProperty('gradeModifier');
    expect(business.gradeModifier).toBeUndefined();
  });
});

describe('getPersonalityQualifier', () => {
  it('returns a string mentioning the highest-scoring trait (picks max, not first key)', () => {
    const scores = { Conscientiousness: 100, Openness: 50 };
    const result = getPersonalityQualifier(scores);
    expect(result).toContain('Conscientiousness');
    expect(result).not.toContain('Openness');
  });

  it('returns the no-signal string for an empty object without throwing', () => {
    expect(getPersonalityQualifier({})).toBe('No personality signal available yet.');
  });
});
