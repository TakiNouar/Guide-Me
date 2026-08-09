# Onboarding — Repo-Based Coordination System

**Report #1**  
**Date/Time of writing:** 2026-08-09 ~09:50 CET (Manager's Grok)

This document explains how the new repository-based coordination system works for Researcher Claude and Coder Claude. It is based only on the confirmed rules provided by the Manager. Nothing has been invented or guessed.

---

## 1. Repo structure

| Path | Purpose | Owner / Domain |
|------|---------|----------------|
| `Project-Code/Program/` | The actual codebase | Coder Claude's domain |
| `Project-Code/Coder Grok/` | Coder Grok's own working reports | Read by Coder Claude |
| `Project-Research/Research Folder/` | The actual research / item-bank content | Researcher Claude's domain |
| `Project-Research/Researcher Grok/` | Researcher Grok's own working reports | Read by Researcher Claude |
| `Project-Head/Project Development/` | Master report (split into per-section files) and progress tracking | Manager's domain |
| `Project-Head/Claudes/Research/` | Instructions from the Manager for Researcher Claude | Researcher Claude checks here |
| `Project-Head/Claudes/Coder/` | Instructions from the Manager for Coder Claude | Coder Claude checks here |
| `Project-Head/Claudes/Onboarding/` | General system documentation (this folder) | Not task-specific instructions |

**Important boundary:** The Manager's own Grok only writes to `Project-Head/`. It does not touch the code or research folders.

---

## 2. How the system works

- Each Claude (Manager, Researcher, Coder) has a dedicated Grok assistant.
- **Taki relays between everyone.** No AI has direct messaging access to another AI or to Grok.
- **Grok does the actual production work** (drafting items, writing code, filing reports, updating documentation). Each Claude's role is to give clear, judgment-based instructions, then review what Grok produces by reading it directly from the repo. Claude does not do the underlying work itself when Grok can do it.
- **Judgment calls, approvals, corrections, and design decisions always stay with the Claude.** They are never left to Grok to decide unilaterally. Grok executes clearly-specified instructions and flags anything genuinely ambiguous rather than guessing.
- The Manager reviews work from both Researcher and Coder Claude before it is treated as final. Researcher and Coder do not coordinate directly with each other.

---

## 3. Where to find instructions

- **Researcher Claude:** Check `Project-Head/Claudes/Research/` for current instructions from the Manager.
- **Coder Claude:** Check `Project-Head/Claudes/Coder/` for current instructions from the Manager.

---

## 4. Versioning convention (apply to all reports going forward, in every folder)

Every report or instruction file should include, near the top:

- A **report number** (sequential, per author/folder — e.g., "Report #7")
- A **full date + time of writing**

This is how everyone tracks what is current versus stale without needing to compare file-modified timestamps.

---

## 5. What this system is designed to achieve

- Clear separation of domains (code vs research vs head/management).
- Traceable, reviewable work products sitting in the repo rather than disappearing in chat.
- Claude retains full judgment and approval authority while Grok handles the production labor.
- No direct AI-to-AI communication; Taki is the single human relay.

If anything about the workflow appears unclear or missing from the rules above, flag it for the Manager rather than filling the gap with a guess.
