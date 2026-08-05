import {
  computeInterestScores,
  computeAptitudeScores,
  getGradeModifier,
  computePersonalityScores,
} from './scoring';
import {
  placeholderInterestItems,
  placeholderAptitudeItems,
  placeholderPersonalityItems,
  specialtyDisambiguationInterestItems,
} from './placeholderItems';
import { StudentProfile } from './types';

describe('computeInterestScores', () => {
  it('scores Technical 100 and Droit 100 when student picks those options on the respective items', () => {
    const responses = [
      { itemId: 'int-1', chosenOptionId: 'int-1-a' }, // Technical
      { itemId: 'int-2', chosenOptionId: 'int-2-a' }, // Technical
      { itemId: 'int-3', chosenOptionId: 'int-3-b' }, // Droit
      { itemId: 'int-4', chosenOptionId: 'int-4-b' }, // Droit
    ];

    const scores = computeInterestScores(placeholderInterestItems, responses);

    expect(scores).toEqual({
      Technical: 100,
      Business: 0,
      Social: 0,
      Droit: 100,
    });
  });

  it('returns 0 for every cluster when there are no responses (no NaN / undefined)', () => {
    const scores = computeInterestScores(placeholderInterestItems, []);

    expect(scores).toEqual({
      Technical: 0,
      Business: 0,
      Social: 0,
      Droit: 0,
    });
    // Explicitly guard against NaN
    for (const value of Object.values(scores)) {
      expect(Number.isNaN(value)).toBe(false);
      expect(value).toBeDefined();
    }
  });

  it('correctly normalizes scores for partial responses', () => {
    // Only answer int-1 (Technical) and int-3 (Droit).
    // Appearances are still counted for all options in all items.
    // Technical appears in int-1 and int-2 → 2 appearances, 1 win → 50
    // Droit appears in int-3 and int-4 → 2 appearances, 1 win → 50
    // Business appears in int-2 and int-3 → 2 appearances, 0 wins → 0
    // Social appears in int-1 and int-4 → 2 appearances, 0 wins → 0
    const responses = [
      { itemId: 'int-1', chosenOptionId: 'int-1-a' }, // Technical
      { itemId: 'int-3', chosenOptionId: 'int-3-b' }, // Droit
    ];

    const scores = computeInterestScores(placeholderInterestItems, responses);

    expect(scores).toEqual({
      Technical: 50,
      Business: 0,
      Social: 0,
      Droit: 50,
    });
  });
});

describe('computeAptitudeScores', () => {
  it('scores 100 for every cluster when student picks the correct-instinct option on every item', () => {
    // Technical now has 4 items; the other clusters still have 1 each.
    const responses = [
      { itemId: 'apt-technical-1', chosenOptionId: 'apt-technical-1-a' },
      { itemId: 'apt-technical-2', chosenOptionId: 'apt-technical-2-a' },
      { itemId: 'apt-technical-3', chosenOptionId: 'apt-technical-3-a' },
      { itemId: 'apt-technical-4', chosenOptionId: 'apt-technical-4-a' },
      { itemId: 'apt-business-1', chosenOptionId: 'apt-business-1-a' },
      { itemId: 'apt-social-1', chosenOptionId: 'apt-social-1-a' },
      { itemId: 'apt-droit-1', chosenOptionId: 'apt-droit-1-a' },
    ];

    const scores = computeAptitudeScores(placeholderAptitudeItems, responses);

    expect(scores).toEqual({
      Technical: 100,
      Business: 100,
      Social: 100,
      Droit: 100,
    });
  });

  it('scores 0 for Business and 100 for the others when only Business is answered incorrectly', () => {
    const responses = [
      { itemId: 'apt-technical-1', chosenOptionId: 'apt-technical-1-a' },
      { itemId: 'apt-technical-2', chosenOptionId: 'apt-technical-2-a' },
      { itemId: 'apt-technical-3', chosenOptionId: 'apt-technical-3-a' },
      { itemId: 'apt-technical-4', chosenOptionId: 'apt-technical-4-a' },
      { itemId: 'apt-business-1', chosenOptionId: 'apt-business-1-b' }, // not correct
      { itemId: 'apt-social-1', chosenOptionId: 'apt-social-1-a' },
      { itemId: 'apt-droit-1', chosenOptionId: 'apt-droit-1-a' },
    ];

    const scores = computeAptitudeScores(placeholderAptitudeItems, responses);

    expect(scores).toEqual({
      Technical: 100,
      Business: 0,
      Social: 100,
      Droit: 100,
    });
  });

  it('returns 0 for every cluster when there are no responses (no NaN)', () => {
    const scores = computeAptitudeScores(placeholderAptitudeItems, []);

    expect(scores).toEqual({
      Technical: 0,
      Business: 0,
      Social: 0,
      Droit: 0,
    });
    for (const value of Object.values(scores)) {
      expect(Number.isNaN(value)).toBe(false);
    }
  });

  it('scores Technical at 50% when only 2 of 4 Technical items are answered correctly', () => {
    // Partial correctness now meaningful because Technical has multiple items.
    const responses = [
      { itemId: 'apt-technical-1', chosenOptionId: 'apt-technical-1-a' }, // correct
      { itemId: 'apt-technical-2', chosenOptionId: 'apt-technical-2-a' }, // correct
      { itemId: 'apt-technical-3', chosenOptionId: 'apt-technical-3-b' }, // incorrect
      { itemId: 'apt-technical-4', chosenOptionId: 'apt-technical-4-b' }, // incorrect
      // other clusters unanswered → 0 for them
    ];

    const scores = computeAptitudeScores(placeholderAptitudeItems, responses);

    expect(scores.Technical).toBe(50);
    expect(scores.Business).toBe(0);
    expect(scores.Social).toBe(0);
    expect(scores.Droit).toBe(0);
  });
});

describe('getGradeModifier', () => {
  const baseProfile: StudentProfile = {
    id: 'test',
    name: 'Test',
    bacFiliere: 'Test',
    gradeModifierInputs: { Technical: 82.5 },
    interestResponses: [],
    aptitudeResponses: [],
    personalityResponses: [],
  };

  it('returns the exact value from gradeModifierInputs when the cluster is present', () => {
    expect(getGradeModifier('Technical', baseProfile)).toBe(82.5);
  });

  it('returns undefined when the cluster key is absent (does not throw or default to 0)', () => {
    expect(getGradeModifier('Business', baseProfile)).toBeUndefined();
    expect(getGradeModifier('Social', baseProfile)).toBeUndefined();
    expect(getGradeModifier('Droit', baseProfile)).toBeUndefined();
  });
});

describe('computePersonalityScores', () => {
  it('scores Conscientiousness 100 and Openness 100 for the specified choices (personality items only, empty interest/aptitude)', () => {
    // Regression: empty interest/aptitude arrays → identical to pre-extension behavior.
    const responses = [
      { itemId: 'per-1', chosenOptionId: 'per-1-a' }, // Conscientiousness
      { itemId: 'per-2', chosenOptionId: 'per-2-a' }, // Openness
    ];

    const scores = computePersonalityScores(
      placeholderPersonalityItems,
      responses,
      [],
      [],
      [],
      []
    );

    expect(scores).toEqual({
      Conscientiousness: 100,
      Extraversion: 0,
      Openness: 100,
      Agreeableness: 0,
    });
  });

  it('InterestOption with trait tag contributes when chosen (t-int-4-a → Extraversion)', () => {
    const scores = computePersonalityScores(
      [],
      [],
      specialtyDisambiguationInterestItems,
      [{ itemId: 't-int-4', chosenOptionId: 't-int-4-a' }],
      [],
      []
    );

    expect(scores.Extraversion).toBe(100);
    // Only Extraversion should appear (t-int-4-a is the only tagged option chosen;
    // t-int-4-b is untagged and the other items have no trait tags).
    expect(scores.Conscientiousness).toBeUndefined();
    expect(scores.Openness).toBeUndefined();
    expect(scores.Agreeableness).toBeUndefined();
  });

  it('AptitudeOption with trait tag contributes when chosen (apt-technical-1-a → Conscientiousness)', () => {
    const scores = computePersonalityScores(
      [],
      [],
      [],
      [],
      placeholderAptitudeItems,
      [{ itemId: 'apt-technical-1', chosenOptionId: 'apt-technical-1-a' }]
    );

    // apt-technical-1-a and apt-technical-3-a both carry Conscientiousness.
    // Only apt-technical-1 was answered, so 1 pick / 2 appearances = 50.
    expect(scores.Conscientiousness).toBe(50);
  });

  it('untagged option does not appear and does not affect other trait percentages', () => {
    // Choose the untagged option t-int-4-b. No trait should be recorded from it.
    const scores = computePersonalityScores(
      [],
      [],
      specialtyDisambiguationInterestItems,
      [{ itemId: 't-int-4', chosenOptionId: 't-int-4-b' }],
      [],
      []
    );

    // Empty record — untagged option is skipped entirely.
    expect(scores).toEqual({});
    expect(scores.Extraversion).toBeUndefined();
  });
});
