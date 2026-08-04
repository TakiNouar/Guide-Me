// Placeholder items only — per Manager's answer (Response v2, item #5),
// generated to exercise the scoring functions, not real content.
// Researcher Claude's actual item bank will replace this file entirely;
// nothing here should be treated as final wording or final "correct
// instinct" answers (those are informed guesses pending a pilot, per
// report Section 9 item #6).
//
// Style loosely follows Section 10.5's worked examples. The laptop-breaks
// (interest) and projector (aptitude) items are reused directly from the
// report itself rather than invented, since they're already the project's
// own reference examples.

import { AptitudeItem, InterestItem, PersonalityItem } from './types';

// Interest items — balanced so each of the 4 clusters appears exactly
// twice across the set, per Section 5's "Structural note for v1"
// (equal appearances per cluster needed for v1's normalization to be a
// real fix rather than compensating for a design flaw).
export const placeholderInterestItems: InterestItem[] = [
  {
    id: 'int-1',
    scenario: "A friend's laptop breaks the night before a big deadline.",
    options: [
      { id: 'int-1-a', text: 'You try to find out why — you check one thing at a time until you find the problem.', cluster: 'Technical' },
      { id: 'int-1-b', text: 'You stay with your friend, help them feel calm, and find a solution together.', cluster: 'Social' },
    ],
  },
  {
    id: 'int-2',
    scenario: "Your school club needs to launch a small online store to sell fundraiser items.",
    options: [
      { id: 'int-2-a', text: 'You want to build and test the store platform yourself, page by page.', cluster: 'Technical' },
      { id: 'int-2-b', text: 'You want to plan the pricing, budget, and rollout strategy.', cluster: 'Business' },
    ],
  },
  {
    id: 'int-3',
    scenario: 'A new local regulation threatens to shut down a neighborhood market your family relies on.',
    options: [
      { id: 'int-3-a', text: 'You look into relaunching it under a better business plan elsewhere.', cluster: 'Business' },
      { id: 'int-3-b', text: 'You dig into whether the regulation itself is even legally valid.', cluster: 'Droit' },
    ],
  },
  {
    id: 'int-4',
    scenario: 'A classmate feels they were treated unfairly by a teacher over a grade dispute.',
    options: [
      { id: 'int-4-a', text: 'You help them process how they feel and figure out what they actually want.', cluster: 'Social' },
      { id: 'int-4-b', text: 'You help them find the official appeal procedure and build their case.', cluster: 'Droit' },
    ],
  },
];

// Aptitude items — one per cluster, disguised as everyday scenarios,
// never as an obvious school-subject test (Section 2.3's critical design
// rule). "Correct instinct" flags below are placeholders, not validated.
export const placeholderAptitudeItems: AptitudeItem[] = [
  {
    id: 'apt-technical-1',
    targetCluster: 'Technical',
    scenario: "Movie night. The projector won't connect. You already tried a new cable.",
    options: [
      { id: 'apt-technical-1-a', text: 'You check the settings, one by one, until you find the problem.', isCorrectInstinct: true },
      { id: 'apt-technical-1-b', text: 'You ask someone who "knows computers" to fix it.', isCorrectInstinct: false },
      { id: 'apt-technical-1-c', text: 'You give up and just watch on a laptop.', isCorrectInstinct: false },
    ],
  },
  {
    id: 'apt-business-1',
    targetCluster: 'Business',
    scenario: "You're running a table at a school fair and sales are way below budget by midday.",
    options: [
      { id: 'apt-business-1-a', text: "You recheck your price point and stock against similar tables, and adjust before the day's over.", isCorrectInstinct: true },
      { id: 'apt-business-1-b', text: 'You keep the same setup and hope afternoon traffic picks up.', isCorrectInstinct: false },
      { id: 'apt-business-1-c', text: 'You slash every price to whatever clears stock fastest, without checking why sales are slow.', isCorrectInstinct: false },
    ],
  },
  {
    id: 'apt-social-1',
    targetCluster: 'Social',
    scenario: "A friend tells you they're overwhelmed but insists everything is fine.",
    options: [
      { id: 'apt-social-1-a', text: "You gently point out the specific pattern you've noticed and ask what's really going on.", isCorrectInstinct: true },
      { id: 'apt-social-1-b', text: 'You take their word for it and change the subject.', isCorrectInstinct: false },
      { id: 'apt-social-1-c', text: 'You tell them exactly what they should do to fix it.', isCorrectInstinct: false },
    ],
  },
  {
    id: 'apt-droit-1',
    targetCluster: 'Droit',
    scenario: 'You read two conflicting accounts of the same school rule online.',
    options: [
      { id: 'apt-droit-1-a', text: 'You find the actual official rule/document and check which account matches it.', isCorrectInstinct: true },
      { id: 'apt-droit-1-b', text: 'You go with whichever account more people seem to agree with.', isCorrectInstinct: false },
      { id: 'apt-droit-1-c', text: 'You assume both are probably a little right and move on.', isCorrectInstinct: false },
    ],
  },
];

// Personality items — Big Five, no right/wrong. Neuroticism intentionally
// excluded (Section 2.4: it's earmarked for the colleague's complementary
// readiness scale, not this specialty-matching tool).
export const placeholderPersonalityItems: PersonalityItem[] = [
  {
    id: 'per-1',
    scenario: 'You have a free afternoon to work on a school project.',
    options: [
      { id: 'per-1-a', text: "You'd rather sit alone and focus deeply until it's done.", trait: 'Conscientiousness' },
      { id: 'per-1-b', text: "You'd rather work with others, bouncing ideas around as you go.", trait: 'Extraversion' },
    ],
  },
  {
    id: 'per-2',
    scenario: "You're assigned a group project with an unusual, open-ended topic.",
    options: [
      { id: 'per-2-a', text: "You get excited about exploring unconventional angles no one's tried.", trait: 'Openness' },
      { id: 'per-2-b', text: 'You focus on making sure everyone in the group feels heard and included.', trait: 'Agreeableness' },
    ],
  },
];
