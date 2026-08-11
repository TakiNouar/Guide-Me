import {
  computePhase1InterestScores,
  getLeadingClusters,
  getPhase2ItemsForClusters,
  TIE_MARGIN,
} from './branching';
import { computeInterestScores } from './scoring';
import { placeholderInterestItems } from './placeholderItems';
import { Cluster } from './types';

describe('TIE_MARGIN', () => {
  it('exports TIE_MARGIN = 15', () => {
    expect(TIE_MARGIN).toBe(15);
  });
});

describe('computePhase1InterestScores', () => {
  it('produces the same output as computeInterestScores(placeholderInterestItems, ...)', () => {
    const responses = [
      { itemId: 'int-1', chosenOptionId: 'int-1-a' }, // Technical
      { itemId: 'int-2', chosenOptionId: 'int-2-a' }, // Technical
      { itemId: 'int-3', chosenOptionId: 'int-3-b' }, // Droit
      { itemId: 'int-4', chosenOptionId: 'int-4-b' }, // Droit
    ];

    const viaWrapper = computePhase1InterestScores(responses);
    const viaDirect = computeInterestScores(placeholderInterestItems, responses);

    expect(viaWrapper).toEqual(viaDirect);
    expect(viaWrapper).toEqual({
      Technical: 100,
      Business: 0,
      Social: 0,
      Droit: 100,
    });
  });
});

describe('getLeadingClusters', () => {
  it('returns a single winner when one cluster is clearly ahead', () => {
    const scores: Record<Cluster, number> = {
      Technical: 100,
      Business: 0,
      Social: 0,
      Droit: 0,
    };
    expect(getLeadingClusters(scores)).toEqual(['Technical']);
  });

  it('returns both clusters when two are within the 15-point margin', () => {
    const scores: Record<Cluster, number> = {
      Technical: 80,
      Business: 0,
      Social: 0,
      Droit: 70, // within 15 of 80
    };
    const leading = getLeadingClusters(scores);
    expect(leading).toHaveLength(2);
    expect(leading).toContain('Technical');
    expect(leading).toContain('Droit');
  });

  it('returns all three when three clusters are within margin of each other', () => {
    const scores: Record<Cluster, number> = {
      Technical: 75,
      Business: 70,
      Social: 65, // 75 - 65 = 10 ≤ 15
      Droit: 0,
    };
    const leading = getLeadingClusters(scores);
    expect(leading).toHaveLength(3);
    expect(leading).toContain('Technical');
    expect(leading).toContain('Business');
    expect(leading).toContain('Social');
  });

  it('includes a cluster exactly TIE_MARGIN points below the max (inclusive boundary)', () => {
    const scores: Record<Cluster, number> = {
      Technical: 80,
      Business: 65, // 80 - 65 = 15 → included
      Social: 0,
      Droit: 0,
    };
    const leading = getLeadingClusters(scores);
    expect(leading).toContain('Technical');
    expect(leading).toContain('Business');
    expect(leading).toHaveLength(2);
  });

  it('excludes a cluster more than TIE_MARGIN points below the max', () => {
    const scores: Record<Cluster, number> = {
      Technical: 80,
      Business: 64.9, // 80 - 64.9 = 15.1 → excluded
      Social: 0,
      Droit: 0,
    };
    const leading = getLeadingClusters(scores);
    expect(leading).toEqual(['Technical']);
  });

  it('throws on empty interestScores rather than inventing a default', () => {
    expect(() => getLeadingClusters({} as Record<Cluster, number>)).toThrow(
      /empty/i
    );
  });
});

describe('getPhase2ItemsForClusters', () => {
  it('returns Technical specialty-disambiguation + aptitude items for [Technical]', () => {
    const { interestItems, aptitudeItems } = getPhase2ItemsForClusters(['Technical']);

    const interestIds = interestItems.map((i) => i.id).sort();
    expect(interestIds).toEqual(['t-int-2', 't-int-3', 't-int-4']);

    const aptitudeIds = aptitudeItems.map((i) => i.id).sort();
    expect(aptitudeIds).toEqual([
      'apt-technical-1',
      'apt-technical-2',
      'apt-technical-3',
      'apt-technical-4',
    ]);

    for (const item of aptitudeItems) {
      expect(item.targetCluster).toBe('Technical');
    }
  });

  it('returns the union for a Technical + Business tie', () => {
    const { interestItems, aptitudeItems } = getPhase2ItemsForClusters([
      'Technical',
      'Business',
    ]);

    const interestIds = interestItems.map((i) => i.id).sort();
    // Technical specialty items + Business specialty items (now real)
    expect(interestIds).toEqual(['b-int-2', 'b-int-3', 't-int-2', 't-int-3', 't-int-4']);

    const aptitudeIds = aptitudeItems.map((i) => i.id).sort();
    expect(aptitudeIds).toContain('apt-technical-1');
    expect(aptitudeIds).toContain('apt-technical-2');
    expect(aptitudeIds).toContain('apt-technical-3');
    expect(aptitudeIds).toContain('apt-technical-4');
    expect(aptitudeIds).toContain('apt-business-1');
    expect(aptitudeIds).toContain('apt-business-2');
    expect(aptitudeIds).toContain('apt-business-3');

    // No Social or Droit aptitude
    expect(aptitudeIds).not.toContain('apt-social-1');
    expect(aptitudeIds).not.toContain('apt-droit-1');
  });

  it('returns Social specialty-disambiguation + aptitude items for [Social]', () => {
    const { interestItems, aptitudeItems } = getPhase2ItemsForClusters(['Social']);

    const interestIds = interestItems.map((i) => i.id).sort();
    expect(interestIds).toEqual(['s-int-2', 's-int-3']);

    const aptitudeIds = aptitudeItems.map((i) => i.id).sort();
    expect(aptitudeIds).toEqual(['apt-social-1', 'apt-social-2', 'apt-social-3']);
  });
});
