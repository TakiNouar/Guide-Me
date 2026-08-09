## 6. Bac Exam Grades — Third Signal (Light-Touch Only)

Proposal: use bac subject grades as a **third, minor signal**, not a core scoring input — explicitly "slightly use it, don't depend on it."

**Why it's useful:** It's an independent, already-verified performance record (unlike interest/aptitude, both self-report even if disguised). Adds a genuine third data point to the mismatch logic:
- High interest + high aptitude + strong relevant bac grade → confident recommendation.
- High interest + high aptitude + weak relevant bac grade → flag for an advisor conversation ("might be a teaching/context issue, not a sign you can't do this"), not a disqualifier.
- Low interest + strong relevant bac grade → reinforces the "you might be underrating yourself" signal from the aptitude layer.

**Why it must stay light:**
1. Grading isn't standardized across schools/teachers — same score, different meaning depending on teacher/school.
2. Grades conflate ability with effort, memorization, and teaching quality, not pure aptitude.
3. Algerian bac has different filières (Sciences, Maths, Gestion-Économie, Lettres, etc.) with different subject coefficients — a raw grade isn't comparable across filières without normalization.
4. Low grade could reflect disengagement/checking-out rather than lack of aptitude — grades can't distinguish those.

**Update after verified data pull (Section 4.2):** the subject-based grade modifier only cleanly applies to the technical cluster (Informatique-SI, Sécurité-SI, Électronique), where HIS itself requires a Sciences/Maths bac filière — a real, institution-endorsed prerequisite signal. The other 5 specialties are officially open to "toutes filières confondues," so applying a specific subject-grade gate there would contradict HIS's own admission stance. For those, **Arabic or French language proficiency (matching each specialty's actual language of instruction — see 4.1 table) is a more defensible modifier** than a content-subject grade, since language of instruction is the one real success factor HIS didn't choose to leave ungated.

**Implementation approach:**
- Technical cluster: Math + Physics grades, matching HIS's own admission prerequisite.
- Business, Legal, and Social/Helping clusters: language proficiency grade (Arabic and/or French, per the specialty's instruction language) rather than a content-subject grade.
- Use it to adjust the **confidence label** on a recommendation, never the recommendation itself (e.g., "Strong match" vs. "Strong match — worth a conversation").
- Never let it override or block a recommendation the interest+aptitude layers support — route mismatches to a human advisor conversation (fits HIS's existing "Academic Advising" section on Pathfinder).
- If used beyond a simple flag, normalize within-filière (compare a student's grade to their own filière's typical range) rather than using absolute numbers.

**Caution flagged:** Adding an academic-performance layer nudges the tool slightly toward admissions/gatekeeping territory rather than pure orientation — worth being explicit with the team that this should stay a light, advisor-facing flag, not a silent filter shaping what a student sees.

---
