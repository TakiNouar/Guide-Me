// Mixed status:
// - Technical aptitude items (apt-technical-1..4) and the int-1 interest item are real
//   content sourced from Technical_Cluster_FINAL.md (Researcher Claude approved batch).
// - int-2, int-3, int-4 and the Business / Social / Droit aptitude + personality items
//   remain placeholders only — generated to exercise the scoring functions, not final
//   wording or validated "correct instinct" answers.
// Researcher Claude's actual item banks will progressively replace the remaining
// placeholders; nothing still marked placeholder should be treated as final.

import { AptitudeItem, InterestItem, PersonalityItem } from './types';

// Interest items — balanced so each of the 4 clusters appears exactly
// twice across the set, per Section 5's "Structural note for v1"
// (equal appearances per cluster needed for v1's normalization to be a
// real fix rather than compensating for a design flaw).
export const placeholderInterestItems: InterestItem[] = [
  {
    id: 'int-1',
    scenario: "A friend's bike chain keeps slipping off halfway through your ride together.",
    options: [
      { id: 'int-1-a', text: "You get off, turn the bike over, and work through the gears one at a time until you find exactly where it's slipping.", cluster: 'Technical' },
      { id: 'int-1-b', text: 'You suggest walking it to the nearest shop and asking someone there to take a look.', cluster: 'Social' },
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

// Aptitude items.
// Technical: 4 real items (sourced from Technical_Cluster_FINAL.md).
// Business / Social / Droit: still one placeholder each.
export const placeholderAptitudeItems: AptitudeItem[] = [
  {
    id: 'apt-technical-1',
    targetCluster: 'Technical',
    scenario: 'The wifi at home suddenly stops working for everyone.',
    options: [
      { id: 'apt-technical-1-a', text: "You check the router lights, then test one device at a time to see if it's a single-device problem or a whole-network problem.", isCorrectInstinct: true },
      { id: 'apt-technical-1-b', text: 'You restart everything at once and hope it works.', isCorrectInstinct: false },
      { id: 'apt-technical-1-c', text: 'You wait for it to fix itself, or ask someone else to deal with it.', isCorrectInstinct: false },
    ],
  },
  {
    id: 'apt-technical-2',
    targetCluster: 'Technical',
    scenario: "You're added to a group chat you don't recognize, and it starts asking members to click a link to \"confirm their spot\" in an event.",
    options: [
      { id: 'apt-technical-2-a', text: 'You look closely at the link and how the message is phrased before doing anything — something about the pattern feels off.', isCorrectInstinct: true },
      { id: 'apt-technical-2-b', text: "You click the link, since it's probably fine — most messages like this are.", isCorrectInstinct: false },
      { id: 'apt-technical-2-c', text: 'You mention it to whoever runs the group and let them decide what to do about it.', isCorrectInstinct: false },
    ],
  },
  {
    id: 'apt-technical-3',
    targetCluster: 'Technical',
    scenario: 'A ceiling lamp at home starts flickering.',
    options: [
      { id: 'apt-technical-3-a', text: 'You check the bulb, then the socket, then the switch, one at a time, in that order.', isCorrectInstinct: true },
      { id: 'apt-technical-3-b', text: "You start poking at whatever's easiest to reach first, to see if that fixes it.", isCorrectInstinct: false },
      { id: 'apt-technical-3-c', text: "You ask someone who deals with electrical stuff a lot to take a look, since it's their thing.", isCorrectInstinct: false },
    ],
  },
  {
    id: 'apt-technical-4',
    targetCluster: 'Technical',
    scenario: "You're building something (a form, a schedule, a small app) for a group of 30+ people to use.",
    options: [
      { id: 'apt-technical-4-a', text: 'Before finishing, you think through what happens if two people try to do the same thing at once, or what happens with unusual inputs.', isCorrectInstinct: true },
      { id: 'apt-technical-4-b', text: 'You build the straightforward version first and only deal with edge cases if someone actually runs into one.', isCorrectInstinct: false },
      { id: 'apt-technical-4-c', text: "You focus mainly on making it look good, since most people won't hit an edge case anyway.", isCorrectInstinct: false },
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
