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
    // Appearances after Business/Social wiring: T:2, B:3, S:3, D:2
    const responses = [
      { itemId: 'int-1', chosenOptionId: 'int-1-a' }, // Technical
      { itemId: 'int-2', chosenOptionId: 'int-2-a' }, // Technical
      { itemId: 'int-3', chosenOptionId: 'int-3-b' }, // Droit
      { itemId: 'int-4', chosenOptionId: 'int-4-b' }, // Droit
      // int-5 unanswered
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
    for (const value of Object.values(scores)) {
      expect(Number.isNaN(value)).toBe(false);
      expect(value).toBeDefined();
    }
  });

  it('correctly normalizes scores for partial responses', () => {
    // Only answer int-1 (Technical) and int-3 (Droit).
    // Appearances: T:2, B:3, S:3, D:2
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
    // Technical: 4, Business: 3, Social: 3, Droit: 1
    const responses = [
      { itemId: 'apt-technical-1', chosenOptionId: 'apt-technical-1-a' },
      { itemId: 'apt-technical-2', chosenOptionId: 'apt-technical-2-a' },
      { itemId: 'apt-technical-3', chosenOptionId: 'apt-technical-3-a' },
      { itemId: 'apt-technical-4', chosenOptionId: 'apt-technical-4-a' },
      { itemId: 'apt-business-1', chosenOptionId: 'apt-business-1-a' },
      { itemId: 'apt-business-2', chosenOptionId: 'apt-business-2-a' },
      { itemId: 'apt-business-3', chosenOptionId: 'apt-business-3-a' },
      { itemId: 'apt-social-1', chosenOptionId: 'apt-social-1-a' },
      { itemId: 'apt-social-2', chosenOptionId: 'apt-social-2-a' },
      { itemId: 'apt-social-3', chosenOptionId: 'apt-social-3-a' },
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
      { itemId: 'apt-business-1', chosenOptionId: 'apt-business-1-b' }, // incorrect
      { itemId: 'apt-business-2', chosenOptionId: 'apt-business-2-b' }, // incorrect
      { itemId: 'apt-business-3', chosenOptionId: 'apt-business-3-b' }, // incorrect
      { itemId: 'apt-social-1', chosenOptionId: 'apt-social-1-a' },
      { itemId: 'apt-social-2', chosenOptionId: 'apt-social-2-a' },
      { itemId: 'apt-social-3', chosenOptionId: 'apt-social-3-a' },
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
    const responses = [
      { itemId: 'apt-technical-1', chosenOptionId: 'apt-technical-1-a' }, // correct
      { itemId: 'apt-technical-2', chosenOptionId: 'apt-technical-2-a' }, // correct
      { itemId: 'apt-technical-3', chosenOptionId: 'apt-technical-3-b' }, // incorrect
      { itemId: 'apt-technical-4', chosenOptionId: 'apt-technical-4-b' }, // incorrect
    ];

    const scores = computeAptitudeScores(placeholderAptitudeItems, responses);

    expect(scores.Technical).toBe(50);
    expect(scores.Business).toBe(0);
    expect(scores.Social).toBe(0);
    expect(scores.Droit).toBe(0);
  });

  it('scores Business at ~33% when only 1 of 3 Business items is answered correctly', () => {
    const responses = [
      { itemId: 'apt-business-1', chosenOptionId: 'apt-business-1-a' }, // correct
      { itemId: 'apt-business-2', chosenOptionId: 'apt-business-2-b' }, // incorrect
      { itemId: 'apt-business-3', chosenOptionId: 'apt-business-3-b' }, // incorrect
    ];

    const scores = computeAptitudeScores(placeholderAptitudeItems, responses);

    expect(scores.Business).toBeCloseTo(100 / 3);
  });

  it('scores Social at ~33% when only 1 of 3 Social items is answered correctly', () => {
    const responses = [
      { itemId: 'apt-social-1', chosenOptionId: 'apt-social-1-a' }, // correct
      { itemId: 'apt-social-2', chosenOptionId: 'apt-social-2-b' }, // incorrect
      { itemId: 'apt-social-3', chosenOptionId: 'apt-social-3-b' }, // incorrect
    ];

    const scores = computeAptitudeScores(placeholderAptitudeItems, responses);

    expect(scores.Social).toBeCloseTo(100 / 3);
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
    // specialtyDisambiguationInterestItems now also carries Business/Social trait tags.
    // Extraversion-tagged options: t-int-4-a, s-int-2-b, s-int-3-b → 3 appearances.
    // Picking only t-int-4-a → 1/3.
    const scores = computePersonalityScores(
      [],
      [],
      specialtyDisambiguationInterestItems,
      [{ itemId: 't-int-4', chosenOptionId: 't-int-4-a' }],
      [],
      []
    );

    expect(scores.Extraversion).toBeCloseTo(100 / 3);
    expect(scores.Openness).toBe(0);
    expect(scores.Conscientiousness).toBe(0);
  });

  it('AptitudeOption with trait tag contributes when chosen (apt-technical-1-a → Conscientiousness)', () => {
    // Conscientiousness-tagged aptitude options: apt-technical-1-a, apt-technical-3-a,
    // apt-business-3-a → 3 appearances. Only apt-technical-1 answered → 1/3.
    const scores = computePersonalityScores(
      [],
      [],
      [],
      [],
      placeholderAptitudeItems,
      [{ itemId: 'apt-technical-1', chosenOptionId: 'apt-technical-1-a' }]
    );

    expect(scores.Conscientiousness).toBeCloseTo(100 / 3);
  });

  it('untagged option does not contribute a pick and does not invent a trait', () => {
    // Choose untagged t-int-4-b. Sibling + other items still create trait appearances
    // with 0 picks for the unchosen traits.
    const scores = computePersonalityScores(
      [],
      [],
      specialtyDisambiguationInterestItems,
      [{ itemId: 't-int-4', chosenOptionId: 't-int-4-b' }],
      [],
      []
    );

    expect(scores.Extraversion).toBe(0);
    expect(scores.Openness).toBe(0);
    expect(scores.Conscientiousness).toBe(0);
    // Untagged choice itself did not invent a new trait key beyond those that appeared.
    expect(scores.Agreeableness).toBeUndefined();
  });
});

// ---------------------------------------------------------------------------
// Edge-case hardening — documents current behavior only, does not change it.
// ---------------------------------------------------------------------------

describe('edge cases — unknown itemId is silently ignored', () => {
  it('computeInterestScores: unknown itemId mixed with valid responses has no effect', () => {
    const validOnly = [
      { itemId: 'int-1', chosenOptionId: 'int-1-a' }, // Technical
      { itemId: 'int-3', chosenOptionId: 'int-3-b' }, // Droit
    ];
    const withUnknown = [
      ...validOnly,
      { itemId: 'does-not-exist', chosenOptionId: 'whatever' },
    ];

    const scoresValid = computeInterestScores(placeholderInterestItems, validOnly);
    const scoresMixed = computeInterestScores(placeholderInterestItems, withUnknown);

    expect(scoresMixed).toEqual(scoresValid);
    expect(scoresMixed).toEqual({
      Technical: 50,
      Business: 0,
      Social: 0,
      Droit: 50,
    });
  });

  it('computeAptitudeScores: unknown itemId mixed with valid responses has no effect', () => {
    const validOnly = [
      { itemId: 'apt-technical-1', chosenOptionId: 'apt-technical-1-a' }, // correct
      { itemId: 'apt-business-1', chosenOptionId: 'apt-business-1-b' }, // incorrect
    ];
    const withUnknown = [
      ...validOnly,
      { itemId: 'does-not-exist', chosenOptionId: 'whatever' },
    ];

    const scoresValid = computeAptitudeScores(placeholderAptitudeItems, validOnly);
    const scoresMixed = computeAptitudeScores(placeholderAptitudeItems, withUnknown);

    expect(scoresMixed).toEqual(scoresValid);
    // 1 of 4 Technical correct → 25; Business 0 of 3 → 0
    expect(scoresMixed.Technical).toBe(25);
    expect(scoresMixed.Business).toBe(0);
  });

  it('computePersonalityScores: unknown itemId mixed with valid responses has no effect', () => {
    const validOnly = [
      { itemId: 'per-1', chosenOptionId: 'per-1-a' }, // Conscientiousness
    ];
    const withUnknown = [
      ...validOnly,
      { itemId: 'does-not-exist', chosenOptionId: 'whatever' },
    ];

    const scoresValid = computePersonalityScores(
      placeholderPersonalityItems,
      validOnly,
      [],
      [],
      [],
      []
    );
    const scoresMixed = computePersonalityScores(
      placeholderPersonalityItems,
      withUnknown,
      [],
      [],
      [],
      []
    );

    expect(scoresMixed).toEqual(scoresValid);
    expect(scoresMixed.Conscientiousness).toBe(100);
    expect(scoresMixed.Extraversion).toBe(0);
  });
});

describe('edge cases — duplicate responses: first match wins', () => {
  it('computeInterestScores: first duplicate wins (Technical first, Social second → Technical)', () => {
    const responses = [
      { itemId: 'int-1', chosenOptionId: 'int-1-a' }, // first → Technical
      { itemId: 'int-1', chosenOptionId: 'int-1-b' }, // second → Social (ignored)
    ];

    const scores = computeInterestScores(placeholderInterestItems, responses);

    // Technical: 1/2 = 50; Social: 0/3 = 0
    expect(scores.Technical).toBe(50);
    expect(scores.Social).toBe(0);

    const firstOnly = computeInterestScores(placeholderInterestItems, [
      { itemId: 'int-1', chosenOptionId: 'int-1-a' },
    ]);
    const secondOnly = computeInterestScores(placeholderInterestItems, [
      { itemId: 'int-1', chosenOptionId: 'int-1-b' },
    ]);
    expect(scores).toEqual(firstOnly);
    expect(scores).not.toEqual(secondOnly);
  });

  it('computeAptitudeScores: first duplicate wins (correct first, incorrect second → correct)', () => {
    const responses = [
      { itemId: 'apt-technical-1', chosenOptionId: 'apt-technical-1-a' }, // first → correct
      { itemId: 'apt-technical-1', chosenOptionId: 'apt-technical-1-b' }, // second → incorrect (ignored)
    ];

    const scores = computeAptitudeScores(placeholderAptitudeItems, responses);

    expect(scores.Technical).toBe(25);

    const firstOnly = computeAptitudeScores(placeholderAptitudeItems, [
      { itemId: 'apt-technical-1', chosenOptionId: 'apt-technical-1-a' },
    ]);
    const secondOnly = computeAptitudeScores(placeholderAptitudeItems, [
      { itemId: 'apt-technical-1', chosenOptionId: 'apt-technical-1-b' },
    ]);
    expect(scores).toEqual(firstOnly);
    expect(scores.Technical).not.toBe(secondOnly.Technical);
  });

  it('computePersonalityScores: first duplicate wins (Conscientiousness first, Extraversion second)', () => {
    const responses = [
      { itemId: 'per-1', chosenOptionId: 'per-1-a' }, // first → Conscientiousness
      { itemId: 'per-1', chosenOptionId: 'per-1-b' }, // second → Extraversion (ignored)
    ];

    const scores = computePersonalityScores(
      placeholderPersonalityItems,
      responses,
      [],
      [],
      [],
      []
    );

    expect(scores.Conscientiousness).toBe(100);
    expect(scores.Extraversion).toBe(0);

    const firstOnly = computePersonalityScores(
      placeholderPersonalityItems,
      [{ itemId: 'per-1', chosenOptionId: 'per-1-a' }],
      [],
      [],
      [],
      []
    );
    const secondOnly = computePersonalityScores(
      placeholderPersonalityItems,
      [{ itemId: 'per-1', chosenOptionId: 'per-1-b' }],
      [],
      [],
      [],
      []
    );
    expect(scores).toEqual(firstOnly);
    expect(scores).not.toEqual(secondOnly);
  });
});

describe('edge cases — unknown chosenOptionId for a valid itemId is skipped', () => {
  it('computeInterestScores: unknown chosenOptionId is skipped (no win credited)', () => {
    const responses = [
      { itemId: 'int-1', chosenOptionId: 'not-a-real-option' },
    ];

    const scores = computeInterestScores(placeholderInterestItems, responses);

    expect(scores).toEqual({
      Technical: 0,
      Business: 0,
      Social: 0,
      Droit: 0,
    });
  });

  it('computeAptitudeScores: unknown chosenOptionId is skipped (not counted as correct)', () => {
    const responses = [
      { itemId: 'apt-technical-1', chosenOptionId: 'not-a-real-option' },
    ];

    const scores = computeAptitudeScores(placeholderAptitudeItems, responses);

    expect(scores.Technical).toBe(0);
  });

  it('computePersonalityScores: unknown chosenOptionId is skipped (no pick credited)', () => {
    const responses = [
      { itemId: 'per-1', chosenOptionId: 'not-a-real-option' },
    ];

    const scores = computePersonalityScores(
      placeholderPersonalityItems,
      responses,
      [],
      [],
      [],
      []
    );

    expect(scores.Conscientiousness).toBe(0);
    expect(scores.Extraversion).toBe(0);
  });
});
