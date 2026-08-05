// Standalone demo script — per Manager's answer (Response v2, item #2):
// "a standalone script/module with a sample input -> output demo," not an
// API/CLI shape yet. Run with: npm start

import { computeAptitudeScores, computeInterestScores, computePersonalityScores } from './scoring';
import { getPersonalityQualifier, rankClusters } from './decisionMatrix';
import {
  placeholderAptitudeItems,
  placeholderInterestItems,
  placeholderPersonalityItems,
  specialtyDisambiguationInterestItems,
} from './placeholderItems';
import { StudentProfile } from './types';

// Sample student: leans Technical/Investigative on interest, answers all
// Technical aptitude items correctly, has a strong Math+Physics grade
// modifier, and reads as Conscientious/Open on the personality items.
const sampleStudent: StudentProfile = {
  id: 'demo-001',
  name: 'Sample Student',
  bacFiliere: 'Sciences expérimentales',

  // Technical: avg(Math, Physics)/20*100 computed upstream, e.g. avg(17,16)/20*100 = 82.5
  // Others: left unset here since the language-grade source is still TODO
  // (Section 9 item #4) — demonstrates the engine running fine without them.
  gradeModifierInputs: {
    Technical: 82.5,
  },

  interestResponses: [
    { itemId: 'int-1', chosenOptionId: 'int-1-a' }, // Technical (bike-chain diagnostic)
    { itemId: 'int-2', chosenOptionId: 'int-2-a' }, // Technical
    { itemId: 'int-3', chosenOptionId: 'int-3-b' }, // Droit
    { itemId: 'int-4', chosenOptionId: 'int-4-b' }, // Droit
  ],

  aptitudeResponses: [
    { itemId: 'apt-technical-1', chosenOptionId: 'apt-technical-1-a' }, // correct (+ Conscientiousness trait)
    { itemId: 'apt-technical-2', chosenOptionId: 'apt-technical-2-a' }, // correct
    { itemId: 'apt-technical-3', chosenOptionId: 'apt-technical-3-a' }, // correct (+ Conscientiousness trait)
    { itemId: 'apt-technical-4', chosenOptionId: 'apt-technical-4-a' }, // correct
    { itemId: 'apt-business-1', chosenOptionId: 'apt-business-1-b' },  // not correct
    { itemId: 'apt-social-1', chosenOptionId: 'apt-social-1-a' },       // correct
    { itemId: 'apt-droit-1', chosenOptionId: 'apt-droit-1-a' },         // correct
  ],

  personalityResponses: [
    { itemId: 'per-1', chosenOptionId: 'per-1-a' }, // Conscientiousness
    { itemId: 'per-2', chosenOptionId: 'per-2-a' }, // Openness
  ],
};

function main() {
  const interestScores = computeInterestScores(placeholderInterestItems, sampleStudent.interestResponses);
  const aptitudeScores = computeAptitudeScores(placeholderAptitudeItems, sampleStudent.aptitudeResponses);

  // Dual-tagging path: personality items + interest/aptitude options that carry trait tags.
  // Sample student's correct answers on apt-technical-1 and apt-technical-3 now also
  // contribute to Conscientiousness (those options are trait-tagged).
  const personalityScores = computePersonalityScores(
    placeholderPersonalityItems,
    sampleStudent.personalityResponses,
    placeholderInterestItems,
    sampleStudent.interestResponses,
    placeholderAptitudeItems,
    sampleStudent.aptitudeResponses
  );

  const ranked = rankClusters(interestScores, aptitudeScores, sampleStudent);
  const personalityQualifier = getPersonalityQualifier(personalityScores);

  console.log(`--- HIS Orientation Test — Scoring Engine Scaffold Demo ---\n`);
  console.log(`Student: ${sampleStudent.name} (${sampleStudent.bacFiliere})\n`);

  console.log('Interest scores (Step 1):', interestScores);
  console.log('Aptitude scores (Step 2):', aptitudeScores);
  console.log('Personality scores (Step 4):', personalityScores);
  console.log('');

  console.log('Ranked cluster recommendations (Step 5):');
  ranked.forEach((rec, i) => {
    const gradeText = rec.gradeModifier !== undefined ? rec.gradeModifier.toFixed(1) : 'n/a';
    console.log(
      `${i + 1}. ${rec.cluster} — ${rec.label}  ` +
        `(interest ${rec.interestScore.toFixed(0)}%, aptitude ${rec.aptitudeScore.toFixed(0)}%, grade modifier ${gradeText})`
    );
  });

  console.log(`\nPersonality qualifier: ${personalityQualifier}`);

  // --- Dual-tagging demonstration (InterestOption-sourced trait) ---
  // Sample student also answers t-int-4-a from specialtyDisambiguationInterestItems.
  // That option carries trait: 'Extraversion', so Extraversion's contribution here
  // comes from an interest item, not a dedicated personality item.
  const dualTagInterestResponses = [
    { itemId: 't-int-4', chosenOptionId: 't-int-4-a' }, // Extraversion via interest option
  ];
  const dualTagPersonalityScores = computePersonalityScores(
    placeholderPersonalityItems,
    sampleStudent.personalityResponses,
    specialtyDisambiguationInterestItems,
    dualTagInterestResponses,
    placeholderAptitudeItems,
    sampleStudent.aptitudeResponses
  );
  console.log('\n--- Dual-tagging demo (t-int-4-a contributes Extraversion) ---');
  console.log('Personality scores with interest-sourced Extraversion:', dualTagPersonalityScores);
}

main();
