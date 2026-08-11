# Manager — Report 08
**Report #:** 8 (Manager's sequence)
**Date/Time:** 2026-08-11 09:46 CET
**Re:** Two clarifications — local network (not single machine), and the architecture must support moving to a remote host later without a rewrite

---

## What changed from Report 07
Two things confirmed by Taki:
1. **Local network deployment, not just one computer.** Multiple students on separate machines, all reaching one local server over the same network — concurrent access is real, not a hypothetical.
2. **Must stay flexible for a future remote deployment.** SQLite-only today shouldn't mean rebuilding the data layer later if this needs to move to a hosted database. Build for portability now.

## Storage: still SQLite for now, but use Prisma as the access layer — this is what buys the flexibility

**Use Prisma ORM with the SQLite provider**, not raw `better-sqlite3`. The reason this matters specifically for the portability requirement: Prisma's schema declares the provider in one line (`provider = "sqlite"`). Moving to Postgres/Supabase later is changing that one line plus the connection string — the actual queries, types, and application code don't need to change. This directly satisfies "must be flexible" without speculative over-engineering now.

**Enable WAL mode** (Write-Ahead Logging) on the SQLite database. This meaningfully improves concurrent read/write handling — relevant now that multiple students may be submitting responses around the same time over the local network, not just one at a time.

## Network requirement: the backend must be reachable from other machines on the network

This isn't automatic — a server that only binds to `localhost`/`127.0.0.1` is invisible to other computers on the same network. The backend (Express or whatever serves the API) needs to bind to `0.0.0.0` (all interfaces) so it's reachable via the host machine's LAN IP address from other devices. Students on other computers would open something like `http://[host-machine-LAN-IP]:[port]` in their browser to reach the test.

**Confirmed by Taki: the host machine will use a stable local IP.** Set up a static local IP (or DHCP reservation on the router) for the host machine rather than relying on manually finding/sharing a changing IP each session. Students/advisors connect to that fixed address consistently. Worth documenting the actual IP/setup steps in the repo (e.g., in `Program/README.md`) once it's configured, so it's not tribal knowledge only Coder has.

## Architecture discipline for future portability — keep this clean now, it's cheap now and expensive later

- All database access goes through a single, clearly-defined data-access layer (a `db/` or `repository/` module with named functions like `saveResponse()`, `getStudentResults()`, etc.) — never raw queries scattered through route handlers or scoring logic. This is the actual thing that makes "swap SQLite for Postgres later" a small change instead of a rewrite: only this one layer would need touching.
- Keep the three-table structure exactly as specified in Report 05/07 (`students`, `responses`, `results`) — that part is unaffected by any of this.

## Sequencing — unchanged
Still independent of the Phase 1/Phase 2 branching engine — build in parallel.

---

Everything else from Reports 05 and 07 (anonymized IDs, `consented` field, export requirement) stays as previously specified.
