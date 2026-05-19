# Handoff Readiness — Go/No-Go Checklist

Last updated: 2026-05-19

Use this as the release gate for IoT dashboard handoff decisions.

## Phase 1 — Exit Criteria (Baseline + Handoff Readiness)

### Gate 1: Repo & CI hygiene
- [x] `.github/dependabot.yml` has intentional npm scopes (`/` and `/agent-harness`) with no duplicate `/` entry.
- [x] Code scanning mode is singular (advanced `codeql.yml` workflow is disabled; default CodeQL remains active).
- [x] Main workflows are green in recent runs (`manage.scrypted.app`, `OpenSSF Scorecard`, Dependabot automations).
- [x] Required secrets preflight behavior is documented and enforced (`FONTAWESOME_NPM_TOKEN` preflight gate in Pages workflow).

### Gate 2: Deployment baseline (Docker + Caddy)
- [x] `infra/` deployment is documented as reproducible from clean host.
- [x] UI, API proxy, and WebSocket verification checks are documented in operator notes.
- [x] TLS modes are explicitly documented (public ACME and LAN trust model).
- [x] Backup/restore and rollback are fully tested and recorded with dated evidence.
  - Evidence: [`PHASE1-BACKUP-ROLLBACK-DRILL-2026-05-19.md`](PHASE1-BACKUP-ROLLBACK-DRILL-2026-05-19.md)

### Gate 3: Integration contract freeze (IoT dashboard)
- [x] Routing contract frozen (subdomain vs subpath + canonical ingress).
- [x] Auth/session ownership boundary frozen.
- [x] Proxy/API contract frozen (headers, timeouts/retries, websocket assumptions).
- [x] Ops ownership frozen (cert lifecycle, deploy, incident response).
  - Evidence: [`PHASE1-CONTRACT-FREEZE-2026-05-19.md`](PHASE1-CONTRACT-FREEZE-2026-05-19.md)

### Gate 4: Handoff package completeness
- [x] Handoff docs identify `server-app`/`server-app-tauri` as planned tracks, not baseline-on-main.
- [x] Open PR queue fully deconflicted (superseded PRs closed; merge order completed).
  - Evidence: open queue currently reduced to active dependency PR flow only (as of 2026-05-19).
- [x] This release checklist now exists as a required gate artifact for integration changes.
- [x] Named owner(s) assigned for Phase 2 execution and acceptance sign-off.
  - Evidence: [`PHASE2-OWNERS-SIGNOFF-2026-05-19.md`](PHASE2-OWNERS-SIGNOFF-2026-05-19.md)

### Phase 1 decision rule
If any item above is unchecked, declare **No-Go** for Phase 1 completion.

## Current Phase 1 Decision (2026-05-19)

**Go** — all Phase 1 gate items are now checked with dated artifacts.

## Phase 2 — Implementation Tracks (Post-Exit Execution)

### Track A: UI remaster for dashboard alignment (highest priority)
- [x] Define target integration model (embedded surface vs linked app vs shared shell).
- [x] Define adaptation path from current stack to React+Vite+Tailwind compatibility strategy.
- [x] Deliver component/theming/navigation parity requirements.
- [x] Validate UX flows in dashboard context (not standalone only).
  - Evidence: [`PHASE2A-UI-REMASTER-2026-05-19.md`](PHASE2A-UI-REMASTER-2026-05-19.md)

### Track B: Service/app runtime model (server app decision)
- [x] Select canonical runtime path (Electron, Tauri, or no desktop runtime in first release).
- [x] Define lifecycle expectations (background run, reconnect behavior, health model).
- [x] Freeze packaging/distribution/support policy for chosen runtime.
- [x] Keep non-canonical runtime tracks out of critical path.
  - Evidence: [`PHASE2B-RUNTIME-DECISION-2026-05-19.md`](PHASE2B-RUNTIME-DECISION-2026-05-19.md)

### Track C: Integration QA and security hardening
- [x] Add integration-level validation for routing/auth/API/WS contracts.
- [ ] Validate failure and rollback scenarios in realistic homelab conditions.
- [x] Enforce security posture gates (CodeQL/Scorecard/review) on integration-critical PRs.
- [x] Confirm supply-chain governance policy and review flow.
  - Evidence: [`PHASE2C-HARDENING-2026-05-19.md`](PHASE2C-HARDENING-2026-05-19.md), [`../infra/OPS-RUNBOOK.md`](../infra/OPS-RUNBOOK.md)
  - Deferred execution note: end-of-cycle live integration testing remains required before Track C final close.

### Track D: Release and developer enablement
- [x] Publish developer-ready onboarding for dashboard team (contracts + runbooks).
- [x] Provide environment matrix (LAN/public, reverse-proxy modes, supported topologies).
- [x] Establish versioning/release cadence aligned to upstream sync strategy.
- [ ] Run formal handoff acceptance review with sign-off criteria.
  - Evidence: [`PHASE2D-RELEASE-ENABLEMENT-2026-05-19.md`](PHASE2D-RELEASE-ENABLEMENT-2026-05-19.md)
  - Deferred execution note: formal acceptance review runs after end-of-cycle integration testing evidence is complete.

## Guardrails
- Treat **contract freeze** as the real milestone, not just successful Docker+Caddy startup.
- Prevent docs drift that implies not-yet-merged tracks are production-ready.
- Avoid parallel strategic choices (especially Electron vs Tauri) without canonical decision.
- Keep upstream-sync strategy explicit to reduce long-term fork maintenance risk.
