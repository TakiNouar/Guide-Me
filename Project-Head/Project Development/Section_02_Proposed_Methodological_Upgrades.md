## 2. Proposed Methodological Upgrades (in order of impact)

### 2.1 Forced-choice / situational-choice format (replaces Likert)
Instead of rating one statement 1–5, present **one real-life scenario with 2+ equally valid, non-judgmental responses**, each mapped to a different RIASEC dimension. This removes response-style bias (can't rate everything "5") and avoids making any option feel like "the wrong personality."

Example:
> *A friend needs help because their laptop broke before a big deadline.*
> A) You spend time figuring out exactly why it's broken, piece by piece.
> B) You stay with them to keep them calm and help them find a workaround together, even without fully understanding the tech.

Both are competent, positive responses — no option reads as a "failure" answer. This was a deliberate design choice after noting that trait-vs-trait phrasing ("I like analyzing problems" vs "I like helping people") can feel like it's punishing whichever option isn't picked.

### 2.2 Adaptive testing (CAT — Computerized Adaptive Testing)
Build a larger item bank (~90-150 questions) but show each student only ~30, chosen dynamically based on prior answers — same logic as the GRE/GMAT.

**How it works:**
- **Phase 1 (~10 Q):** Broad scan across all 6 RIASEC types to get a rough initial profile.
- **Phase 2 (~10-15 Q):** Focus remaining questions on whichever 2-3 dimensions are closest/most ambiguous for *this specific student*, instead of evenly spreading questions regardless of what's already known.
- **Phase 3 (~5-8 Q):** Re-ask similar scenarios in different wording to check answer consistency; flag low-confidence profiles instead of presenting false precision.

**Requirements to build this properly:**
- A calibrated item bank (need IRT — Item Response Theory — parameters: difficulty & discrimination per item, from pilot data with real students).
- A running per-dimension ability estimate, updated after each answer.
- A stopping rule (ideally based on confidence/standard error, not just a fixed count — though a hard cap at 30 is fine for UX predictability, with the tradeoff understood).
- Item exposure control (randomize among near-equally-informative items so the "best" questions don't get overused and leak/spoil via word of mouth).

**Honest tradeoff:** This is a multi-month build (calibration + scoring engine + validation), not a quick swap — but it's the single highest-leverage change for the same question budget.

### 2.3 Interest vs. Aptitude — dual scoring (the newest and most important addition)
This is the most significant upgrade beyond anything Jobmi does, and it's specific to HIS's context (we know exactly which 8 specialties a result maps to, so we can build targeted checks).

**The problem it solves:** A pure preference test (RIASEC-style) tells you what a student *wants* to do, not whether their natural instincts match what the work actually *requires*. Two separate constructs:
- **Interest score** — RIASEC-style, preference-based → tells you which specialty *cluster* the student is drawn to.
- **Aptitude score** — situational, right/wrong, disguised as real-life scenarios (not obvious school-subject questions) → tells you, within that cluster, whether their instincts match what the field actually demands.

**Critical design rule:** Aptitude items must be framed as everyday life situations, never as disguised math/coding tests — otherwise you get test anxiety contaminating the tool, or students "performing" instead of answering instinctively.

Example (targeting CS/technical aptitude, disguised):
> *Movie night — the projector won't connect. Cable swap didn't fix it. Next move?*
> A) Check settings systematically, one variable at a time *(correct instinct for technical fields)*
> B) Ask someone "good with computers" to fix it
> C) Give up, watch on a laptop instead

**Output logic — the four combinations, and why the mismatches matter most:**
- High interest + high aptitude → clean, strong recommendation.
- **High interest + low aptitude → the most valuable output.** Never say "don't do this." Instead: "You're drawn to this field — that matters. A few answers suggest the day-to-day troubleshooting side isn't a natural instinct yet, which is very learnable, but worth knowing. Consider shadowing a student in this specialty first."
- **Low interest + high aptitude →** "You might be underrating yourself here" — useful for undecided students who wrote off a field without realizing they have real natural aptitude for it.
- Low interest + low aptitude → deprioritize, look elsewhere.

**Risks to manage:**
1. "Correct" aptitude answers are currently just informed guesses — need to pilot against real HIS students per specialty and check if high-performing 2nd/3rd-years actually answer as predicted, or the "rigor" is fake.
2. Aptitude items can carry hidden bias if the "correct" instinct assumes exposure/privilege a student may not have had (e.g., assuming familiarity with tech environments). Scenarios should stay universal.
3. Output framing must always stay growth-oriented, never verdict-like — this connects to general wellbeing concerns around telling an 18-year-old they're "bad" at something.
4. Writing scenario-aptitude items that actually discriminate (rather than just testing general reading comprehension/intelligence) is harder than it looks and needs real piloting.

### 2.4 Personality — fourth signal (added after initial design, no right/wrong answer)

**The problem it solves:** Interest tells you what a student *wants*; aptitude tells you if their *instincts* match a field. Neither captures **how someone tends to work day-to-day** — two students can both want and be capable of the same specialty, but thrive under very different working conditions (independent deep-focus work vs. constant collaboration, for example). This is a real, distinct axis that interest and aptitude don't cover.

**Framework:** Big Five (OCEAN), sourced from **IPIP** (International Personality Item Pool — public domain, see Section 7.4). No new source needed; IPIP already covers this ground.

**Trait relevance by cluster (loose mapping):**
- **Conscientiousness** — relevant everywhere, especially Business (Économie-Gestion) and Legal (Droit Public), where structure/rigor matters.
- **Openness** — relevant to E-commerce (creative/digital) and Psychologie Clinique (navigating ambiguous human situations).
- **Extraversion** — differentiates Orientation et conseil (active, people-facing guidance) from Psychologie Clinique (contained, one-on-one work).
- **Agreeableness** — relevant to the Social/Helping cluster generally.
- Neuroticism/emotional stability is more about general readiness than specialty fit — better suited to a colleague's complementary post-decision readiness scale (see Section 7.3) than to this specialty-matching tool.

**Critical structural difference from Aptitude:** personality traits have **no right or wrong answer** — high or low Conscientiousness isn't good or bad, it just predicts a different working style. This means personality must be scored and *labeled* differently from aptitude: not "match/mismatch," but a descriptive qualifier attached to the final result (e.g., "this specialty tends to suit independent, detail-focused work — here's how your profile compares"), never framed as pass/fail.

**Implementation approach:**
- Same forced-choice, scenario-based format as interest and aptitude items — a single scenario can be tagged to reveal an interest lean **and** a personality trait simultaneously, so this doesn't require a fully separate question block.
- Sits **outside** the interest/aptitude/grade decision matrix (Section 3, Step 4) as an attached qualifier on the final label, rather than a new branch that would multiply the number of outcome combinations.
- Lower piloting risk than aptitude, since there's no "correct answer" to validate — the main risk is just picking traits/scenarios that actually discriminate meaningfully between working styles, not whether the scoring itself is "right."

---
