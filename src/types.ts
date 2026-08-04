// Core types for the HIS Orientation Test scoring engine.
// Structure follows the report's "Item metadata" description (Section 5) —
// per Manager's answer (Response v2, item #3), this schema is treated as
// final for the scaffold; Researcher Claude's job is item *content* within
// this structure, not a schema redesign.

export type Cluster = 'Technical' | 'Business' | 'Social' | 'Droit';

export const ALL_CLUSTERS: Cluster[] = ['Technical', 'Business', 'Social', 'Droit'];

// --- Interest items (Section 5: forced-choice, each option tagged to a
// different cluster, no right/wrong) ---

export interface InterestOption {
  id: string;
  text: string;
  cluster: Cluster;
}

export interface InterestItem {
  id: string;
  scenario: string;
  options: InterestOption[];
}

// --- Aptitude items (Section 5: situational, one target cluster, one
// option flagged as the "correct instinct" — never shown as a failure to
// the student) ---

export interface AptitudeOption {
  id: string;
  text: string;
  isCorrectInstinct: boolean;
}

export interface AptitudeItem {
  id: string;
  targetCluster: Cluster;
  scenario: string;
  options: AptitudeOption[];
}

// --- Personality items (Section 5 / 2.4: forced-choice, each option
// tagged to a Big Five trait, no right/wrong). Neuroticism deliberately
// excluded from cluster-fit items per Section 2.4 — it's earmarked for the
// colleague's complementary readiness scale, not this tool. ---

export type BigFiveTrait =
  | 'Openness'
  | 'Conscientiousness'
  | 'Extraversion'
  | 'Agreeableness';

export interface PersonalityOption {
  id: string;
  text: string;
  trait: BigFiveTrait;
}

export interface PersonalityItem {
  id: string;
  scenario: string;
  options: PersonalityOption[];
}

// --- Student input ---

export interface StudentResponse {
  itemId: string;
  chosenOptionId: string;
}

export interface StudentProfile {
  id: string;
  name: string;
  bacFiliere: string;

  // Step 3 (Grade Modifier) — deliberately generic per Manager's answer
  // (Response v2, item #4). Each cluster's 0-100 modifier is expected to
  // already be computed upstream:
  //   - Technical cluster convention (Section 5, Step 3): avg(Math, Physics) / 20 * 100
  //   - Non-technical clusters: language-proficiency grade, per specialty's
  //     instruction language (Section 6) — TODO, pending Section 9 item #4
  //     (Arabic / French / both, and specifically how to combine E-commerce's
  //     dual-language case, is not yet decided). This engine does not make
  //     that call; it just consumes whatever number lands here.
  // A cluster may be omitted if no grade signal is available yet for it.
  gradeModifierInputs: Partial<Record<Cluster, number>>;

  interestResponses: StudentResponse[];
  aptitudeResponses: StudentResponse[];
  personalityResponses: StudentResponse[];
}
