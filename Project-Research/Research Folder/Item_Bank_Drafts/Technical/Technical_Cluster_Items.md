# Technical Cluster Item Bank — HIS Orientation Test

Project: HIS Orientation Test | Cluster: Technical (Informatique-SI, Sécurité-SI, Électronique)  
Drafted for: Researcher Claude (via Taki)

Verified competencies used (Section 04 only):
- Informatique-SI: analyse de problèmes complexes, développement/déploiement d'applications, systèmes distribués, bases de données, aide à la décision
- Sécurité-SI: fondamentaux sécurité, analyse/évaluation des risques, pentest, aspects légaux/éthiques, approche proactive
- Électronique: systèmes analogiques/numériques, conception/simulation de circuits, cartes Arduino, traitement du signal, microprocesseurs

---

## T-INT-1 (cluster gate)

Your phone keeps freezing for a few seconds at random times during the day.

**A)** You start testing which apps or settings might be causing it — closing things one by one, checking storage, looking for patterns in when it happens. *(Technical/Investigative lean)*

**B)** You ask around if anyone else has the same model and what they did, or just look for a quick tip online to stop the freezing. *(Business/Enterprising lean — practical fix / social shortcut)*

---

## T-INT-2 (cluster gate)

A community centre near you wants to set up a simple system so people can book the sports hall without constantly messaging the caretaker.

**A)** You start sketching how the booking information would be stored, how conflicts would be checked, and what the simplest working version would look like. *(Technical/Investigative lean)* **[Conscientiousness]**

**B)** You focus on how to get the word out so people actually use whatever system is chosen, and how to keep the caretaker from being overloaded during the transition. *(Business/Enterprising lean)*

---

## T-INT-3 (internal flavour — build vs defend)

A shared class laptop keeps getting slower and occasionally shows strange pop-ups after different students use it.

**A)** You want to figure out exactly what is running in the background, clean it up, and set the machine up so it stays reliable for the next person. *(Informatique-SI lean — systems reliability / build-and-maintain)*

**B)** You first want to check whether something unwanted has been installed, what permissions it has, and how to stop the same thing happening again. *(Sécurité-SI lean — risk / defensive)*

---

## T-INT-4 (internal flavour — software vs hardware)

Your younger sibling’s cheap wireless earbuds keep cutting out when they move their head.

**A)** You start thinking about how the signal is being handled, whether the software on the phone is dropping the connection, and what settings might stabilise it. *(Informatique-SI / software-systems lean)*

**B)** You open them up (or look up the tear-down) to see how the antenna and battery are arranged and whether something physical is loose or poorly shielded. *(Électronique lean)*

---

## T-APT-1 (complex-problem analysis / systems thinking — Informatique-SI core)

Three different classmates say the shared class Wi-Fi works fine on their phones but keeps dropping on their laptops at the same time of day.

**A)** You start looking for a common pattern — same time window, same type of device, same background activity — rather than treating each complaint as a separate laptop problem. ***(correct instinct)*** **[Conscientiousness]**

**B)** You help each of the three reinstall their network drivers one by one so they can get back online quickly. *(different-priority lean — immediate individual fix)*

**C)** You wait to see if more people report the same drop before deciding it is worth investigating further. *(wait-and-see lean)*

**Rationale:** Option A reflects the Informatique-SI competency of analyse de problèmes complexes and aide à la décision — treating multiple symptoms as possible signals of a shared systems issue rather than isolated device faults. B is a legitimate practical priority that privileges getting individuals working again. C is a legitimate alternative that waits for clearer evidence before investing effort.

---

## T-APT-2 (risk / proactive defensive instinct — Sécurité-SI core)

A classmate offers to share a “free” study-guide PDF they found on a random messaging channel. The file name looks slightly off and the download link is not from a known school site.

**A)** You pause and check where the file actually comes from, what permissions it might request, and whether the same link has appeared in other places before opening or sharing it further. ***(correct instinct)*** **[Conscientiousness]**

**B)** You open it in a viewer that doesn’t run extra code and just use the content if it looks useful. *(different-priority lean — practical use with light caution)*

**C)** You forward the link to the group chat so everyone can decide for themselves. *(reframe lean — distribute the decision)*

**Rationale:** Option A reflects the Sécurité-SI competencies of analyse/évaluation des risques and approche proactive — treating an unexpected file as something that needs source and permission scrutiny before trust. B is a legitimate lighter-caution instinct that still tries to reduce risk while prioritising utility. C is a legitimate alternative that shifts the decision outward rather than analysing the risk itself.

---

## T-APT-3 (hardware / physical-systems instinct — Électronique core)

A cheap desk lamp with a flexible neck keeps flickering when the neck is bent past a certain point.

**A)** You carefully open the joint area (or look up how the wiring runs) to see whether a connection is being pulled or stressed when the neck moves. ***(correct instinct)***

**B)** You try different bulbs and power outlets first to rule out the simplest external causes. *(different-priority lean — eliminate easy external factors)*

**C)** You stop using the flexible range and just leave the lamp in a fixed position so it stops flickering. *(reframe / work-around lean)*

**Rationale:** Option A reflects the Électronique competency of conception/simulation de circuits and understanding physical systems (wiring, mechanical stress on connections) — going to the point where the symptom appears rather than only swapping external parts. B is a legitimate first-pass instinct that checks the easiest variables. C is a legitimate practical work-around that accepts the limitation instead of diagnosing it.

---

## T-APT-4 (cross-cutting technical — distributed systems / reliability)

Your group’s shared online notes document sometimes shows older text for one person while others see the latest version, and no one is sure whose screen is correct.

**A)** You try to reconstruct the sequence of edits and how the document is being synced, so you can tell which version is actually the current one and why the others are lagging. ***(correct instinct)*** **[Conscientiousness]**

**B)** You suggest everyone copy their current text into a new document and continue from a clean single copy. *(different-priority lean — practical reset)*

**C)** You wait until the mismatch happens again with more people watching so the pattern is clearer. *(wait-and-see lean)*

**Rationale:** Option A reflects the Informatique-SI competencies around systèmes distribués and analyse de problèmes complexes — treating inconsistent views as a synchronisation/state problem that needs sequencing rather than simply discarding the history. B is a legitimate practical priority that restores a single working copy quickly. C is a legitimate alternative that seeks more observational data before acting.

---

## Self-review

- **T-INT-1 & T-INT-2:** Clean Technical vs. Business/Enterprising gates. No failure options. Everyday phone and booking scenarios; no telegraph of “coding” or “engineering.”
- **T-INT-3:** Internal build/maintain (Informatique-SI) vs. defensive/risk (Sécurité-SI) contrast using a shared laptop. Both legitimate.
- **T-INT-4:** Software-systems vs. physical/hardware (Électronique) contrast on earbuds. Mild residual uncertainty: opening the earbuds may feel slightly more “maker” than pure Électronique program language, but the physical-signal/antenna instinct is the intended lean.
- **T-APT-1:** Correct instinct tied to analyse de problèmes complexes / systems pattern recognition. Alternatives are legitimate individual-fix and wait-and-see.
- **T-APT-2:** Correct instinct tied to risk analysis + proactive security posture. Alternatives are lighter-caution use and distribute-the-decision; neither is apathetic or pure deferral to authority.
- **T-APT-3:** Correct instinct tied to physical/circuit-level diagnosis. Alternatives are external-factor elimination and work-around. No authority-deferral.
- **T-APT-4:** Correct instinct tied to distributed-state / sync reasoning. Alternatives are practical reset and wait-and-see.
- **Overall:** All scenarios stay in ordinary student/everyday life. No item mentions programming languages, circuit boards, penetration testing, or formal security tools. Competency claims stay strictly inside the verified Section 04 list. If any internal lean (especially T-INT-4) is judged too weak or too strong for the specialty, it can be adjusted.
