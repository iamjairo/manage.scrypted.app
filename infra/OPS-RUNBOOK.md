# Operations Runbook — Docker + Caddy + IoT Dashboard Integration

Last updated: 2026-05-19

This runbook is the operator execution reference for runtime validation, failure drills, and release-readiness checks for Phase 2.

## 1) Scope

- Deployment model: Docker-hosted Scrypted with Caddy ingress.
- Integration surface: UI delivery + API proxy + WebSocket upgrade paths.
- Audience: platform/integration operators and release owners.

## 2) Preconditions

- Contract freeze remains valid (`docs/PHASE1-CONTRACT-FREEZE-2026-05-19.md`).
- Runtime policy remains valid (`docs/PHASE2B-RUNTIME-DECISION-2026-05-19.md`).
- Track-level owner available for incident and rollback decisions.

## 3) Baseline health checks

Run before integration changes and before release candidate sign-off:

1. `cd infra && docker compose config`
2. `docker compose ps` shows expected service state.
3. UI route resolves from canonical ingress.
4. API proxy calls complete under expected latency budget.
5. WebSocket upgrade succeeds and reconnect behavior is acceptable.

## 4) Change window controls

- One-purpose change sets only.
- No contract changes without explicit change-control approval.
- Keep desktop runtime tracks (Electron/Tauri) out of critical path.

## 5) Failure handling

- Classify incident: ingress, API proxy, websocket, or upstream service runtime.
- Capture logs and timestamps for operator audit trail.
- Restore known-good config if production path is degraded.

## 6) Rollback drill requirements

- Re-apply prior known-good Caddy and compose configuration.
- Verify UI/API/WS restoration.
- Record rollback trigger, steps, and recovery confirmation.

## 7) Security posture gates (integration-critical PRs)

Required before merge:

- Code review approval from assigned owner/reviewer.
- Code scanning posture checks (CodeQL mode as configured in repository).
- OpenSSF Scorecard workflow status reviewed.
- No unresolved critical/high security blockers.

## 8) Supply-chain governance flow

- Dependency updates remain scoped and auditable.
- Major/native-impact updates require manual review and explicit acknowledgment.
- Auto-merge is limited to policy-approved low-risk dependency classes.

## 9) Integration validation procedure (execute at end-of-cycle)

When final integration testing window starts, execute all scenarios against live-host conditions:

1. **Iframe embedding checks**
   - Dashboard host can render embedded app surface.
   - Route transitions and session continuity remain stable.
2. **API contract checks**
   - Header, auth boundary, timeout, and retry expectations match contract freeze.
3. **WebSocket contract checks**
   - Upgrade path succeeds.
   - Reconnect under service restart and transient network interruption behaves as expected.
4. **Failure + rollback checks**
   - Simulate degraded upstream path and confirm rollback execution.
   - Validate operator observability and recovery signals.

Execution evidence must be logged in a dated Phase 2C validation artifact before final handoff acceptance.
