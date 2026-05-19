# Fork Operating Model — 2026-05-19

## Purpose

This document defines how `iamjairo/manage.scrypted.app` should be operated going forward so the repository remains:

- maintainable,
- aligned with its intended purpose,
- usable as the dashboard’s underlying source of truth,
- and still realistically syncable against upstream when needed.

This document exists because the fork is no longer a lightweight cosmetic fork.  
It now functions as a **strategic program fork** with code, operations, governance, and integration responsibilities.

---

## Repo identity

### Canonical description

`iamjairo/manage.scrypted.app` is:

1. a fork of the upstream Scrypted management UI,
2. a customization surface for homelab/dashboard integration,
3. a deployment surface for Docker + Caddy operations,
4. and a handoff/governance surface for downstream developer work.

### Non-goals

This repo should **not** silently become:

- a general dumping ground for all IoT Dashboard project notes,
- a permanent archive of every experiment branch result,
- a replacement for the separate IoT Dashboard app repo,
- or a catch-all location for unrelated third-party integration work.

---

## Source-of-truth rule

### Canonical branch

- `main` is the **only canonical branch**
- no long-lived feature branches should remain open after work is complete
- no “parking branches” should be kept remotely unless actively used the same week

### PR rule

- all meaningful changes should land through intentional review flow where possible
- once merged or rejected:
  - close the PR
  - delete the remote branch
  - remove ambiguity immediately

### Desired repo state

At steady state, this repo should have:

- one protected branch: `main`
- zero stale PRs
- zero stale remote branches
- only active operational docs and code artifacts

---

## What belongs in this repo

The following content belongs here.

### 1) Core app code
Anything directly related to the Scrypted management UI and its forked app behavior:

- Vue app source
- TypeScript source
- styling changes
- build config
- app-level UX changes
- upstream-compatible fixes

### 2) App-adjacent deployment support
Operational assets that are necessary to deploy or operate this forked app:

- Docker Compose definitions
- Caddy configuration
- deployment notes
- operator runbooks
- backup/restore procedures
- rollback procedures

### 3) Repo governance required to maintain this fork
Only the governance artifacts that materially help maintain this repo:

- CI workflows
- CodeQL / Scorecard / dependency automation
- issue templates
- PR templates
- CODEOWNERS
- release checklist
- merge runbooks
- dated status docs when useful

### 4) Fork-specific integration boundary docs
Only documents that clarify how this repo interacts with the IoT Dashboard:

- integration contract
- architecture notes
- release handoff docs
- responsibility boundaries
- bridge expectations between this repo and the dashboard repo

---

## What does NOT belong in this repo

The following should generally live elsewhere.

### 1) General dashboard planning
Do not store broad project management content here unless it directly affects this repo.

Examples:
- dashboard roadmap
- unrelated module ideas
- general business planning
- non-repo-wide architecture brainstorming

These belong in:
- the IoT Dashboard repo,
- a separate planning repo,
- or project documentation elsewhere.

### 2) Long-term branch archives
Do not preserve old branch outputs as a substitute for proper documentation.

If something matters:
- merge it,
- rewrite it into docs,
- or archive it outside the active repo workflow.

### 3) Experimental runtime tracks without active ownership
Desktop/server-app/Tauri/Electron experiments should not sit half-canonical in the repo unless:

- actively approved,
- actively maintained,
- and explicitly tied to roadmap ownership.

Otherwise mark them as:
- deferred,
- external,
- or removed.

### 4) Duplicated evidence artifacts
If three different agents produce three similar reports, keep:
- one canonical review,
- one gap analysis,
- one operating model.

Do not let the repo fill with near-duplicate audit files that no longer drive decisions.

---

## Change classification model

Every proposed change should be classified into one of these buckets.

### Bucket A — Upstream-trackable
These are changes that could reasonably exist upstream too.

Examples:
- bug fixes
- generic CI improvements
- code quality improvements
- security hardening
- neutral UI fixes
- dependency maintenance

**Goal:** keep these clean and easy to rebase/sync.

---

### Bucket B — Fork-specific but app-adjacent
These are customizations for your fork that still directly support this app.

Examples:
- Docker/Caddy deployment additions
- branding adjustments
- operator-focused docs
- app behavior adapted for your environment
- integration boundary docs

**Goal:** keep them clearly separated and documented.

---

### Bucket C — Program-specific / dashboard-specific
These are project-level changes driven by the broader IoT Dashboard initiative.

Examples:
- release handoff process
- integration checklists
- dashboard-specific contracts
- downstream developer enablement docs
- audit reviews of multi-agent work

**Goal:** include only if they directly help operate or hand off this repo.  
Otherwise move them elsewhere.

---

## Decision rule for new files

Before adding a new file, ask:

1. Does this directly help build, run, test, deploy, secure, or hand off this repo?
2. Would a maintainer of this repo need it to operate the fork safely?
3. Is this specific enough to this repo, rather than the wider IoT Dashboard program?

If the answer is mostly “no,” it likely belongs elsewhere.

---

## Upstream sync strategy

Because this fork has expanded beyond upstream, upstream syncing must now be intentional.

### Sync principles

1. **Preserve upstream core where practical**
   - avoid unnecessary rewrites of core app flows
   - keep app structure recognizable

2. **Minimize invasive divergence**
   - prefer additive files over destructive rewrites
   - isolate fork-only concerns where possible

3. **Document intentional divergence**
   - if a fork-specific pattern is introduced, explain why

4. **Review upstream periodically**
   - compare important upstream changes against fork constraints
   - selectively pull in improvements

### Recommended sync cadence

- lightweight upstream review: monthly
- full sync assessment: per milestone / before major release cycle

---

## Documentation operating model

### Keep
- current status docs
- release checklist
- integration contract
- ops runbook
- index page
- gap analysis
- operating model

### Retire or archive
- stale duplicate audits
- branch-specific reports no longer tied to live decisions
- superseded status files that are no longer useful operationally

### Rule
Docs should either:
- guide work,
- prove readiness,
- or explain architecture.

If they do none of those, remove or archive them.

---

## Branch and PR hygiene policy

### Rules
- no open PRs without active purpose
- no remote branches except `main`, unless work is currently active
- close superseded PRs immediately
- delete merged branches immediately

### Why
This repo is now used as an underlying operational source for another system.  
Ambiguity in branches or stale PRs creates avoidable risk.

---

## Release and protection policy

### Branch protection
`main` should remain protected with:
- PR requirement
- at least 1 approval where practical
- required status checks
- conversation resolution
- no force pushes
- no branch deletion

### Actions policy
- disable workflows not actively used
- remove or fix GitHub Pages if not needed
- keep CI signal clean and low-noise

### Dependency policy
- allow low-risk patch/minor automation only when clearly safe
- isolate majors for manual review

---

## Integration boundary policy

This repo should define, and not blur, the integration boundary with the IoT Dashboard.

That means documenting:

- how the dashboard consumes this repo’s output
- whether integration is via iframe, API, embedding, or federation
- ownership of auth/session behavior
- ownership of routing/proxy behavior
- ownership of deployment/runtime concerns

If this boundary stays vague, the repo will accumulate mismatched assumptions.

---

## Recommended near-term actions

1. Keep `main` clean and protected.
2. Remove GitHub Pages noise if Pages is not in use.
3. Keep only canonical docs:
   - `INDEX.md`
   - status
   - runbook
   - team handoff
   - audit review
   - upstream-vs-fork gap analysis
   - this operating model
4. Periodically review whether dashboard-program docs should move to a separate location.
5. Define the technical integration boundary with the dashboard in one canonical file.

---

## Final operating principle

This repository should be treated as a **controlled strategic fork**:

- close enough to upstream to remain maintainable,
- customized enough to serve your homelab/dashboard goals,
- and disciplined enough not to collapse into repo sprawl.

If a new change does not clearly support that model, it should not be added here.