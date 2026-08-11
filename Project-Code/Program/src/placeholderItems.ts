// Mixed status:
// - Technical: aptitude (apt-technical-1..4), int-1, and specialty-disambiguation
//   (t-int-2/3/4) are real content from Technical_Cluster_FINAL.md.
// - Business: aptitude (apt-business-1..3), int-2 (B-INT-1), and specialty-
//   disambiguation (b-int-2/3) are real content from Business_Cluster_Items.md.
// - Social: aptitude (apt-social-1..3), int-5 (S-INT-1), and specialty-
//   disambiguation (s-int-2/3) are real content from Social_Cluster_Items.md.
// - int-3 (Business–Droit) and int-4 (Social–Droit) remain placeholders — held
//   pending Legal clearance (Legal-authored gate items L-INT-1/2/3).
// - Droit aptitude (apt-droit-1) remains a placeholder.
// - Legal cluster content is intentionally NOT present anywhere in this file.
// - specialtyDisambiguationInterestItems is kept SEPARATE from
//   placeholderInterestItems on purpose (same-cluster options would corrupt
//   Step 1 scores if fed into computeInterestScores).

import { AptitudeItem, InterestItem, PersonalityItem } from './types';

// Interest items — cluster-gate set.
// Current real count: 3 of 6 (int-1 Technical–Social, int-2 Technical–Business,
// int-5 Business–Social). int-3/int-4 stay as placeholders until Legal clears.
// Transitional appearance imbalance: Technical 2, Business 3, Social 3, Droit 2.
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
    // B-INT-1 — option order kept a=Technical / b=Business to match original
    // placeholder convention (source letter order is the reverse).
    id: 'int-2',
    scenario: 'A local bakery near your neighborhood is struggling to attract customers.',
    options: [
      { id: 'int-2-a', text: "You ask the owner what's actually going wrong day-to-day and try to help fix that specific problem directly.", cluster: 'Technical' },
      { id: 'int-2-b', text: 'You start thinking of ways to promote it and grow its customer base — social media, deals, events.', cluster: 'Business' },
    ],
  },
  {
    // Placeholder — Business–Droit gate; held pending Legal (L-INT-2).
    id: 'int-3',
    scenario: 'A new local regulation threatens to shut down a neighborhood market your family relies on.',
    options: [
      { id: 'int-3-a', text: 'You look into relaunching it under a better business plan elsewhere.', cluster: 'Business' },
      { id: 'int-3-b', text: 'You dig into whether the regulation itself is even legally valid.', cluster: 'Droit' },
    ],
  },
  {
    // Placeholder — Social–Droit gate; held pending Legal (L-INT-1).
    id: 'int-4',
    scenario: 'A classmate feels they were treated unfairly by a teacher over a grade dispute.',
    options: [
      { id: 'int-4-a', text: 'You help them process how they feel and figure out what they actually want.', cluster: 'Social' },
      { id: 'int-4-b', text: 'You help them find the official appeal procedure and build their case.', cluster: 'Droit' },
    ],
  },
  {
    // S-INT-1 — option order set a=Business / b=Social per wiring instruction
    // (source letter order is the reverse).
    id: 'int-5',
    scenario: 'A friend has been quiet and withdrawn for the past few weeks.',
    options: [
      { id: 'int-5-a', text: 'You suggest a plan to get them out and busy — signing up for a club or activity together.', cluster: 'Business' },
      { id: 'int-5-b', text: "You make time to sit with them one-on-one and gently ask what's going on beneath the surface.", cluster: 'Social' },
    ],
  },
];

// Specialty-disambiguation items — real content, kept OUT of
// placeholderInterestItems on purpose. Both options on each item share the
// same cluster, so feeding them into computeInterestScores would corrupt
// Step 1. Metadata-only until the Section 5 specialty-ranking step is built.
export const specialtyDisambiguationInterestItems: InterestItem[] = [
  // --- Technical (from Technical_Cluster_FINAL.md) ---
  {
    id: 't-int-2',
    scenario: "You're helping run sign-ups for a small event.",
    options: [
      { id: 't-int-2-a', text: "You spend your time improving the sign-up form so it's smoother and can handle more people at once.", cluster: 'Technical', specialty: 'Informatique-SI' },
      { id: 't-int-2-b', text: 'You spend your time watching for suspicious duplicate entries or people trying to grab extra spots.', cluster: 'Technical', specialty: 'Sécurité-SI' },
    ],
  },
  {
    id: 't-int-3',
    scenario: "A remote-control car stops responding properly — sometimes it turns when you're not touching the controller.",
    options: [
      { id: 't-int-3-a', text: 'You open it up and check the wiring and connections, testing each part with your hands.', cluster: 'Technical', specialty: 'Électronique' },
      { id: 't-int-3-b', text: "You look up whether it's a known issue with the control signal and try reconfiguring it.", cluster: 'Technical', specialty: 'Informatique-SI ou Sécurité-SI' },
    ],
  },
  {
    id: 't-int-4',
    scenario: 'Your group project has several moving parts due at the same time (design, writing, presentation).',
    options: [
      { id: 't-int-4-a', text: "You take charge of tracking what's done, what's late, and reassigning tasks so nothing falls through.", cluster: 'Technical', specialty: 'Informatique-SI', trait: 'Extraversion' },
      { id: 't-int-4-b', text: "You'd rather stay focused on your one piece and get it as good as possible, letting someone else handle the overall plan.", cluster: 'Technical' },
    ],
  },
  // --- Business (from Business_Cluster_Items.md) ---
  {
    id: 'b-int-2',
    scenario: "You're put in charge of your class's fundraiser.",
    options: [
      { id: 'b-int-2-a', text: 'You focus on designing eye-catching posts and a fun online campaign to get people excited.', cluster: 'Business', specialty: 'E-commerce', trait: 'Openness' },
      { id: 'b-int-2-b', text: "You focus on setting a budget, tracking who's paid, and making sure the numbers add up at the end.", cluster: 'Business', specialty: 'Économie-Gestion', trait: 'Conscientiousness' },
    ],
  },
  {
    id: 'b-int-3',
    scenario: 'Your fundraiser idea grows bigger than expected and now needs a small team to run it.',
    options: [
      { id: 'b-int-3-a', text: 'You enjoy dividing up roles, keeping people motivated, and adjusting the plan as things change day to day.', cluster: 'Business', specialty: 'E-commerce', trait: 'Openness' },
      { id: 'b-int-3-b', text: "You'd rather map out a clear plan beforehand that the team just follows, minimizing surprises.", cluster: 'Business', specialty: 'Économie-Gestion', trait: 'Conscientiousness' },
    ],
  },
  // --- Social (from Social_Cluster_Items.md) ---
  {
    id: 's-int-2',
    scenario: "You're asked to help a younger student who's been struggling this year.",
    options: [
      { id: 's-int-2-a', text: "You want to understand what's really going on for them personally — spend real time getting to the root of it, one-on-one.", cluster: 'Social', specialty: 'Psychologie Clinique', trait: 'Openness' },
      { id: 's-int-2-b', text: 'You look at their overall situation — classes, teachers, workload — and think about what changes to their environment or schedule would help.', cluster: 'Social', specialty: 'Orientation et conseil', trait: 'Extraversion' },
    ],
  },
  {
    id: 's-int-3',
    scenario: 'Over a semester, you keep being the person classmates come to for advice.',
    options: [
      { id: 's-int-3-a', text: 'You find yourself drawn to the deep, complicated cases — the ones with a lot going on underneath.', cluster: 'Social', specialty: 'Psychologie Clinique', trait: 'Openness' },
      { id: 's-int-3-b', text: 'You find yourself naturally spotting patterns — noticing several people running into the same kind of problem and thinking about a general fix.', cluster: 'Social', specialty: 'Orientation et conseil', trait: 'Extraversion' },
    ],
  },
];

// Aptitude items.
// Technical: 4 real. Business: 3 real. Social: 3 real. Droit: 1 placeholder.
export const placeholderAptitudeItems: AptitudeItem[] = [
  // --- Technical ---
  {
    id: 'apt-technical-1',
    targetCluster: 'Technical',
    scenario: 'The wifi at home suddenly stops working for everyone.',
    options: [
      { id: 'apt-technical-1-a', text: "You check the router lights, then test one device at a time to see if it's a single-device problem or a whole-network problem.", isCorrectInstinct: true, trait: 'Conscientiousness' },
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
      { id: 'apt-technical-3-a', text: 'You check the bulb, then the socket, then the switch, one at a time, in that order.', isCorrectInstinct: true, trait: 'Conscientiousness' },
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
  // --- Business (B-APT-1/2/3 from Business_Cluster_Items.md) ---
  {
    id: 'apt-business-1',
    targetCluster: 'Business',
    scenario: 'You notice a lot of people at school complaining about the same small inconvenience (e.g., a long printer line).',
    options: [
      { id: 'apt-business-1-a', text: 'You start thinking about how you could actually fix or improve this for people.', isCorrectInstinct: true },
      { id: 'apt-business-1-b', text: "You agree it's annoying but don't think further about it.", isCorrectInstinct: false },
      { id: 'apt-business-1-c', text: "You mention it to a teacher and let them decide if it's worth fixing.", isCorrectInstinct: false },
    ],
  },
  {
    id: 'apt-business-2',
    targetCluster: 'Business',
    scenario: "You're designing a flyer for a school event.",
    options: [
      { id: 'apt-business-2-a', text: 'You imagine how someone scrolling past would react in the first two seconds, and design around grabbing their attention.', isCorrectInstinct: true, trait: 'Openness' },
      { id: 'apt-business-2-b', text: 'You focus on making sure all the necessary information (date, time, location) is clearly and correctly included.', isCorrectInstinct: false },
      { id: 'apt-business-2-c', text: 'You leave the design to someone else and focus on other tasks.', isCorrectInstinct: false },
    ],
  },
  {
    id: 'apt-business-3',
    targetCluster: 'Business',
    scenario: "You're deciding whether to keep paying for a club activity.",
    options: [
      { id: 'apt-business-3-a', text: "You work out roughly what it's costing you each month vs. what you're getting out of it before deciding.", isCorrectInstinct: true, trait: 'Conscientiousness' },
      { id: 'apt-business-3-b', text: "You go with how you've been feeling about it lately — enjoying it or not.", isCorrectInstinct: false },
      { id: 'apt-business-3-c', text: 'You ask a friend already in the club what they think you should do.', isCorrectInstinct: false },
    ],
  },
  // --- Social (S-APT-1/2/3 from Social_Cluster_Items.md; S-APT-2 option C is the fixed version) ---
  {
    id: 'apt-social-1',
    targetCluster: 'Social',
    scenario: "A friend is telling you about a problem, but their words and their tone don't quite match.",
    options: [
      { id: 'apt-social-1-a', text: "You notice the mismatch and gently ask what's really going on, rather than just responding to their words.", isCorrectInstinct: true, trait: 'Agreeableness' },
      { id: 'apt-social-1-b', text: 'You take what they say at face value and respond to that directly.', isCorrectInstinct: false },
      { id: 'apt-social-1-c', text: 'You wait to see if they bring it up again on their own before saying anything.', isCorrectInstinct: false },
    ],
  },
  {
    id: 'apt-social-2',
    targetCluster: 'Social',
    scenario: "Someone tells you they've been having trouble sleeping lately.",
    options: [
      { id: 'apt-social-2-a', text: "You find yourself wondering what's underneath it — stress, something unsaid, a bigger pattern.", isCorrectInstinct: true, trait: 'Openness' },
      { id: 'apt-social-2-b', text: 'You think of practical tips they could try tonight to sleep better.', isCorrectInstinct: false },
      { id: 'apt-social-2-c', text: "You assume it's probably temporary and don't read much into it yet.", isCorrectInstinct: false },
    ],
  },
  {
    id: 'apt-social-3',
    targetCluster: 'Social',
    scenario: 'Three different students mention feeling overwhelmed by the same class this term.',
    options: [
      { id: 'apt-social-3-a', text: "You start wondering if it's something structural — pacing, workload, timing — rather than about each student individually.", isCorrectInstinct: true, trait: 'Extraversion' },
      { id: 'apt-social-3-b', text: 'You focus on helping each of the three work through it individually, one at a time.', isCorrectInstinct: false },
      { id: 'apt-social-3-c', text: "You wait to see if more students mention it before deciding it's worth looking into.", isCorrectInstinct: false },
    ],
  },
  // --- Droit (placeholder — held pending Legal clearance) ---
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
