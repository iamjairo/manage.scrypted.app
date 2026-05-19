# manage.scrypted.app

This repository is the canonical working fork of `manage.scrypted.app` for current IoT Dashboard integration and developer handoff work.

## Current purpose

This repo is being used as the active baseline for:
- mainline cleanup and consolidation
- integration planning for the IoT Dashboard
- security and quality triage
- developer handoff on a clean canonical branch

## Canonical branch

Use `main` as the only canonical source of truth.

Historical branch-era work, competing agent outputs, and archived audit materials should not be treated as active implementation guidance unless they have been promoted into the current documentation set under `docs/`.

## What changed

The repository has been cleaned up to reduce ambiguity for new developers:

- historical root-level audit/meta folders were removed from active repo structure
- historical materials needed for traceability were preserved under `.github/docs/archive-*`
- canonical handoff, cleanup, and integration documents were added to `docs/`
- closed/superseded branch-era work was separated from the current mainline baseline

## Start here

If you are joining this repo for implementation or integration work, read these documents first:

1. `docs/DEVELOPER-INTEGRATION-STARTER-2026-05-19.md`
2. `docs/IOT-DASHBOARD-INTEGRATION-BOUNDARY-2026-05-19.md`
3. `docs/MAINLINE-REALITY-CHECK-2026-05-19.md`
4. `docs/SECURITY-AND-QUALITY-TRIAGE-2026-05-19.md`
5. `docs/KICKOFF-CHECKLIST-2026-05-19.md`

For the broader documentation map, see:

- `docs/INDEX.md`

## Working assumptions

When working in this repository:

- `main` is the only canonical branch for current development kickoff
- current code on `main` takes precedence over older branch-era narratives
- a documented idea is not the same as an implemented feature
- archived materials exist for traceability, not as default implementation guidance
- optional or deferred tracks should not be treated as blockers unless explicitly stated

## Optional / deferred areas

Some areas in the repository may represent optional, experimental, or deferred work rather than the immediate critical path.

In particular:
- `Caddy/` should be treated as optional/experimental unless explicitly adopted as part of the canonical runtime path

## Security and quality

Current security and quality follow-up is tracked through:

- `docs/SECURITY-AND-QUALITY-TRIAGE-2026-05-19.md`
- `docs/SECURITY-FOLLOW-UP-CHECKLIST-2026-05-19.md`

These documents should be used to distinguish:
- core-path issues
- optional-path issues
- blockers vs non-blocking follow-up items

## Archived materials

Historical audits, competing agent outputs, and removed root-level meta content have been archived for traceability under locations such as:

- `.github/docs/archive-2026-05-18/`
- `.github/docs/archive-2026-05-19/`

Use archived materials only when you need historical context or traceability. Do not treat them as canonical implementation instructions unless a current document in `docs/` explicitly references them.

## Developer kickoff summary

For senior developers joining the project:

- validate actual implementation state from current `main`
- align work to the documented integration boundary
- flag documentation/code mismatches early
- avoid reviving abandoned branch-specific tracks without an explicit decision

## Repository status

As of 2026-05-19, this repository has been prepared for dev-team kickoff with:
- a cleaned canonical `main`
- archived historical materials
- consolidated handoff documentation
- kickoff and security follow-up checklists
- reduced branch/PR ambiguity

## Maintenance note

If the repo direction changes, update this README and `docs/INDEX.md` together so the repository front door stays aligned with the actual current operating model.
