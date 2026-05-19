# Documentation Index

This index identifies the canonical documentation set for `iamjairo/manage.scrypted.app` as of 2026-05-19.

The repository is being prepared as the canonical fork for IoT Dashboard integration handoff. Documentation in this directory should reflect current `main` branch reality, distinguish implemented work from documented or deferred work, and avoid preserving duplicate branch-era narratives as active sources of truth.

---

## Recommended reading order for new developers

1. `docs/DEVELOPER-INTEGRATION-STARTER-2026-05-19.md`  
   Start here for the cleanest handoff overview of what this repo is, what is stable, what is deferred, and where to begin.

2. `docs/DEVELOPER-REALITY-CLARIFICATION-2026-05-19.md`  
   Direct, implementation-focused summary of what is actually present on `main` (real Vue 3 PWA, build pipeline, infra) vs what is not (integration bridge, Module Federation, React hooks). Executive-summary companion to the deep audit in `MAINLINE-REALITY-CHECK`.

3. `docs/IOT-DASHBOARD-INTEGRATION-BOUNDARY-2026-05-19.md`  
   Defines the intended boundary between this repository and the downstream IoT Dashboard repository, including ownership, routing, auth/session, proxying, and first milestone guidance.

4. `docs/MAINLINE-REALITY-CHECK-2026-05-19.md`  
   Compares prior claims against what actually exists on `main`, helping the team avoid relying on branch-only narratives or speculative implementation status.

5. `docs/SECURITY-AND-QUALITY-TRIAGE-2026-05-19.md`  
   Summarizes current security and quality posture, including dependency, workflow, and code-scanning considerations.

6. `docs/REPO-CLEANUP-PLAN-2026-05-19.md`  
   Explains what was kept, archived, removed, deferred, and what cleanup actions remain or were completed.

---

## Core handoff documentation

- `docs/DEVELOPER-INTEGRATION-STARTER-2026-05-19.md`  
  Primary onboarding and handoff guide for the IoT Dashboard development team.

- `docs/DEVELOPER-REALITY-CLARIFICATION-2026-05-19.md`  
  Implementation-focused summary of what exists on `main` (Vue 3 PWA, build, infra) vs what does not (integration bridge, Module Federation, React hooks). Companion executive summary to the deep audit in `MAINLINE-REALITY-CHECK`.

- `docs/IOT-DASHBOARD-INTEGRATION-BOUNDARY-2026-05-19.md`  
  Canonical integration boundary and ownership definition.

- `docs/MAINLINE-REALITY-CHECK-2026-05-19.md`  
  Main-branch verification of implementation, documentation, and deferred work.

- `docs/REPO-CLEANUP-PLAN-2026-05-19.md`  
  Canonical cleanup plan and cleanup status tracker.

- `docs/FOLDER-DISPOSITION-2026-05-19.md`  
  Disposition decisions for major folders and optional/deferred paths.

- `docs/SECURITY-AND-QUALITY-TRIAGE-2026-05-19.md`  
  Security and quality triage baseline for current `main`.

---

## Checklists — 2026-05-19

### Dev team kickoff
- `docs/KICKOFF-CHECKLIST-2026-05-19.md`  
  Final repository readiness checklist before the IoT Dashboard development team begins work from the canonical `main` baseline.

### Security follow-up
- `docs/SECURITY-FOLLOW-UP-CHECKLIST-2026-05-19.md`  
  Operational checklist for reviewing and closing remaining security and quality follow-up items from the current triage baseline.

### Recommended use
Use these checklists after reading:
1. `docs/DEVELOPER-INTEGRATION-STARTER-2026-05-19.md`
2. `docs/IOT-DASHBOARD-INTEGRATION-BOUNDARY-2026-05-19.md`
3. `docs/MAINLINE-REALITY-CHECK-2026-05-19.md`
4. `docs/SECURITY-AND-QUALITY-TRIAGE-2026-05-19.md`

These checklist documents support execution and verification. They are not replacement audit documents.

---

## Governance and status documentation

- `docs/STATUS-2026-05-18.md`  
  Point-in-time repository status snapshot.

- `docs/FORK-OPERATING-MODEL-2026-05-19.md`  
  Defines how this fork should be treated operationally and strategically.

- `docs/UPSTREAM-VS-FORK-GAP-ANALYSIS-2026-05-19.md`  
  Summarizes the difference between upstream intent and this fork’s direction.

- `docs/AUDIT-REVIEW-OF-AGENTS-2026-05-19.md`  
  Consolidated evaluation of agent-generated work, useful as historical governance context.

- `docs/TEAM-HANDOFF-IOT-DASHBOARD.md`  
  Team-facing handoff context and operating assumptions.

- `docs/MERGE-RUNBOOK-2026-05-18.md`  
  Guidance for merge handling, cleanup, and mainline consolidation.

- `docs/DOCKER-CADDY-OPS-NOTES.md`  
  Operational notes for Docker/Caddy-related deployment or experimentation.

- `docs/SERVER-APP-TRACK-SUMMARY.md`  
  Summary of server-app/runtime-track status and whether that work is canonical, optional, or deferred.

---

## How to interpret this documentation set

Use the documentation in this directory with the following rules:

- `main` is the only canonical source of truth for current developer kickoff.
- Historical materials may exist in archive locations for traceability, but they are not active guidance unless explicitly promoted into `docs/`.
- A documented idea is not the same as an implemented feature.
- Optional or deferred runtime tracks should not be treated as blockers for the immediate IoT Dashboard integration path unless explicitly stated.

---

## Archived historical materials

Historical audit artifacts, competing agent outputs, and removed root-level meta folders have been preserved for traceability under archive locations such as:

- `.github/docs/archive-2026-05-18/`
- `.github/docs/archive-2026-05-19/`

These archived materials are not part of the active developer handoff path and should not be treated as canonical implementation guidance unless explicitly referenced by a current document in `docs/`.

---

## Current repo interpretation notes

As of the current cleanup baseline:

- `Caddy/` remains in the repository as an optional or experimental runtime/operator path and is not assumed to be the critical path for IoT Dashboard integration unless explicitly adopted.
- Historical root-level audit/meta folders have been removed from active repo structure and archived for traceability.
- Open work should be evaluated against current `main`, current security posture, and the canonical handoff documents listed above.

---

## Maintenance note

If new canonical documents are added, update this index and place them in the most appropriate section above. Avoid adding duplicate summary documents when an existing canonical document can be updated instead.
