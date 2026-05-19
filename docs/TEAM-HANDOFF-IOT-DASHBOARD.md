# Team Handoff — IoT Dashboard Integration

## Audience

Platform engineers, integration engineers, and technical leads onboarding this repository into the IoT Dashboard program.

## Required release gate

Before declaring handoff readiness, complete:

- [`HANDOFF-GO-NO-GO-CHECKLIST.md`](HANDOFF-GO-NO-GO-CHECKLIST.md)

## What this repo now provides

- Stable fork baseline with repaired dependency auto-merge automation.
- Deployment assets for Scrypted-adjacent hosting through Docker + Caddy.
- Governance workflows for dependency/security and auditability.
- Structured contributor/team documentation and templates.

## What is already stabilized

- Dependabot auto-merge workflow parse failure fixed and merged.
- Dependabot config scope cleaned to active repo paths.
- Audit workflow track prepared for merged-dependency change logging.
- Integration-oriented technical docs prepared under `docs/`.

## What remains in-flight (as of handoff)

- End-of-cycle integration test execution evidence (Track C final close).
- Formal handoff acceptance review execution (Track D final close).

Phase 2A status (2026-05-19):

- Track A contract/spec package completed:
  - [`PHASE2A-UI-REMASTER-2026-05-19.md`](PHASE2A-UI-REMASTER-2026-05-19.md)

Phase 2B status (2026-05-19):

- Track B runtime decision/policy freeze completed:
  - [`PHASE2B-RUNTIME-DECISION-2026-05-19.md`](PHASE2B-RUNTIME-DECISION-2026-05-19.md)

Phase 2C status (2026-05-19):

- Hardening policy/gates and integration validation package prepared:
  - [`PHASE2C-HARDENING-2026-05-19.md`](PHASE2C-HARDENING-2026-05-19.md)
  - [`../infra/OPS-RUNBOOK.md`](../infra/OPS-RUNBOOK.md)
- Live-host integration testing is intentionally deferred to end-of-cycle execution.

Phase 2D status (2026-05-19):

- Developer onboarding/release enablement package prepared:
  - [`PHASE2D-RELEASE-ENABLEMENT-2026-05-19.md`](PHASE2D-RELEASE-ENABLEMENT-2026-05-19.md)
- Final acceptance review execution is deferred until end-of-cycle validation evidence is complete.

## Integration contract recommendations

Define and freeze the following before broader rollout:

1. **Routing contract**
   - subdomain vs subpath strategy
   - canonical ingress pattern
2. **Session/auth contract**
   - token/session ownership and boundary
3. **Proxy/API contract**
   - required headers, websocket expectations, timeouts
4. **Ops ownership contract**
   - who owns cert lifecycle, rollout, rollback, monitoring

Status (2026-05-19):

- Contract freeze completed and recorded in:
  - [`PHASE1-CONTRACT-FREEZE-2026-05-19.md`](PHASE1-CONTRACT-FREEZE-2026-05-19.md)

## Delivery phases

### Phase A — Baseline stabilization
- Merge hygiene/audit/docs tracks.
- Close superseded PRs.

### Phase B — Integration contract lock
- Freeze ingress/auth/API contracts.
- Validate operator runbook completeness.

### Phase C — Feature lane integration
- Evaluate server-app tracks separately from baseline.
- Keep major upgrades isolated.

### Phase D — Hardening and release prep
- Validate security posture (CodeQL/Scorecard).
- Confirm rollback and incident procedures.
- Promote release checklist to required gate.

## Key risks

- Docs drift (references to non-main paths).
- PR overlap/legacy ambiguity.
- Major dependency upgrades bleeding into baseline integration stream.

## Recommended operating mode

- One-purpose PRs only.
- Explicit merge order.
- Immediate superseded PR closure.
- No “meta cleanup” PR bundles during integration window.
