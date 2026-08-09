## 5. Engine Logic — Scoring & Grading

The grading architecture, specced before any real question content or code, so the mapping from raw answers to a final recommendation is fixed and auditable.

**Inputs per student:** profile (name/ID, high school filière), bac subject grades (only the subjects relevant per Section 6), and test responses (a list of item_id + chosen option).

**Item metadata:**
- *Interest items*: forced-choice, each option tagged to a different cluster (no right/wrong).
- *Aptitude items*: situational, one target cluster, one option flagged as the "correct instinct" (never shown as a failure to the student).
- *Personality items*: forced-choice, each option tagged to a Big Five trait (no right/wrong — see Section 2.4).

**Step 1 — Interest score per cluster**
`Interest_Score(cluster) = (times cluster won) / (times cluster appeared) × 100`
Normalizing by appearances (not raw wins) prevents a cluster that simply shows up more often from looking artificially stronger.

**Step 2 — Aptitude score per cluster**
`Aptitude_Score(cluster) = (correct answers for that cluster) / (total aptitude items for that cluster) × 100`

**Step 3 — Grade modifier per cluster**
`Grade_Modifier(cluster) = average(relevant grades) / 20 × 100`
Technical cluster: Math + Physics. All other clusters: language-proficiency grade (Arabic or French, per Section 6).

**Step 4 — Personality profile (descriptive, not scored right/wrong)**
`Trait_Score(trait) = (times trait-linked option chosen) / (times trait appeared) × 100`
Attached to the final result as a working-style descriptor, never as a pass/fail branch — this is why it sits outside the decision matrix below rather than adding a fourth High/Low branch that would multiply outcome combinations.

**Step 5 — Combine interest, aptitude & grades into a label (never a single blended number); attach personality as a qualifier**

| Interest | Aptitude | Grade Modifier | Output Label |
|---|---|---|---|
| High (≥70) | High (≥70) | High/N/A | **Strong match** |
| High | High | Low | **Strong match — worth a conversation** |
| High | Low | any | **Interested, instincts still developing** — recommend shadowing/prep, never "don't do this" |
| Low (<40) | High | any | **Possible hidden strength** — worth exploring |
| Low | Low | any | Deprioritize |
| Mid-range (40-70) on either | — | — | **Ambiguous** — flag for advisor conversation |

*(70/40 thresholds are placeholders — real cutoffs should come from piloting, not asserted in advance.)*

**Why not one blended score?** Averaging all signals into a single number would hide exactly the mismatch information that makes this tool useful — a student who is interested but under-prepared would look identical to one who is neither.

**Ranking to a final specialty list:**
1. Rank clusters by Interest_Score; take the top cluster (or top 2 if within ~10 points — a genuine tie, don't force false precision).
2. Within the winning cluster, use cluster-specific aptitude/disambiguation items to rank the 2-3 specialties inside it.
3. Apply the grade modifier only as a confidence-label adjustment at the end — never re-ranks clusters.
4. Attach the personality descriptor to each recommended specialty as a qualifier line, not a score.

**Output:** always a ranked list with labels, e.g.:
```
1. Sécurité des Systèmes Informatiques — Strong match
   (Working-style note: independent, detail-focused — fits this program's lab structure)
2. Informatique – Systèmes Informatiques — Strong match
3. Droit Public — Possible hidden strength, worth exploring
```

**Structural note for v1 (non-adaptive):** each cluster needs an equal number of interest-item appearances, or Step 1's normalization is compensating for a design flaw rather than a real fix. This constraint is dropped in v2, where the adaptive engine balances exposure dynamically instead.

### 5.1 Advisor Session Scripts by Output Label (integrated from research findings)

Every output label from the decision matrix above should hand the advisor a matching session structure, rather than leaving them to improvise. Mapped from six Bac student case types (grounded in Cognitive Information Processing / CIP theory), matched to the label they're most likely to accompany:

| Output label | Closest matching case type | Guidance approach | Session structure |
|---|---|---|---|
| Ambiguous (mid-range scores) | **Fully undecided, no clear interest** | Normalize indecision, avoid rushing into more testing, build self-efficacy | Validate feelings → values-sort exercise → assign exploratory homework on 2-3 surfaced fields |
| Ambiguous — top 2 clusters tied | **Torn between 2-3 specific specialties** | Shift from "one true passion" to structured comparison | Have student explain each option's appeal → map day-to-day reality/job market for each → arrange shadowing or alumni informational interview |
| Strong match, but conflicts with stated goals *(edge case — student mentions family pressure)* | **Pressured by family toward a specialty** | Empathy + active listening, don't dismiss parents' concerns outright, empower autonomy | Separate student's desires from parental demands → map compromise/intersection options → roleplay how to present a researched case to parents |
| Interested, instincts still developing *(and grade modifier also low)* | **Overconfident about a poor-fit choice** | Gentle reality-testing, let the student reach the conclusion themselves | Objective review of requirements vs. actual results → ask "what's your next-best option?" → identify parallel pathways into the same industry |
| Any label, if student shows high test-anxiety signals (very inconsistent answers, low confidence everywhere) | **High anxiety / low confidence** | Emotional regulation takes priority over career exploration | Reassure (most people change paths multiple times) → identify the specific fear → set one small, achievable weekly goal |
| Interested, instincts still developing *(specifically when Grade Modifier is the low input, not Aptitude)* | **Strong interest, weak grades in the relevant area** | Diagnose whether the barrier is temporary (habits) or systemic | Discuss why grades are low (effort/teacher/misunderstanding) → propose tutoring/remediation → offer adjacent careers using the interest without the same academic bar |

**Why this matters:** without this mapping, the test's output is just a label on a screen — the advisor still has to invent a session from scratch every time. With it, each result comes with a ready starting point for the actual human conversation, which is the whole point of the tool (Section 8: "starts a better conversation, doesn't replace one").

**Source:** Sampson, Peterson, Reardon & Lenz — Cognitive Information Processing (CIP) theory, Florida State University Career Center. Full case-type detail (situation descriptions in full) retained in the standalone Wider Research Findings report, Section 3.

---
