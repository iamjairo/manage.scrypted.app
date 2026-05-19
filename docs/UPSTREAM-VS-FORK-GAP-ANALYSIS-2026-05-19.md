# Upstream vs Fork Gap Analysis — 2026-05-19

## Scope

This document analyzes the relationship between:

- **Upstream:** `koush/manage.scrypted.app`
- **Fork:** `iamjairo/manage.scrypted.app`

It is intended to answer the specific question that the previous audit reports only partially covered:

> Has the fork shifted away from the upstream project’s intended build, and is it still aligned with the upstream app?

This document also identifies where the fork has intentionally diverged, where that divergence is reasonable, and where it creates additional maintenance or integration risk.

---

## Executive conclusion

### Short answer

**Yes, the fork has diverged from upstream — but mostly in an intentional and explainable way.**  
At the current stage, the fork still appears **conceptually aligned** with the upstream app’s purpose as a Scrypted management UI, but it has expanded into a broader **operator/integration repository** rather than remaining only a frontend UI repo.

That means:

- **core alignment:** still present
- **repository purpose:** expanded
- **maintenance complexity:** increased
- **upstream sync difficulty:** higher than a minimal fork

### Practical interpretation

The fork is no longer just “upstream plus a few UI tweaks.”  
It is becoming:

1. a UI remaster/customization fork,
2. an integration staging area for the IoT Dashboard,
3. a deployment/ops repo with Docker + Caddy concerns,
4. and a documentation/governance workspace for downstream handoff.

That is valid for your goals — but it must now be treated as a **strategic fork**, not a lightweight cosmetic fork.

---

## 1) What upstream appears to be optimized for

Based on the upstream project structure and its public positioning, the original project is centered around the **Scrypted management web app** and its normal app lifecycle. ([github.com](https://github.com/koush/scrypted?utm_source=openai))

### Upstream characteristics

The upstream Scrypted ecosystem is primarily focused on:

- the core Scrypted platform,
- plugin/server runtime concerns,
- and the web-based management surface for Scrypted users. ([github.com](https://github.com/koush/scrypted?utm_source=openai))

The upstream pattern is generally:

- app-specific frontend repo responsibilities,
- minimal assumptions about your custom homelab dashboard,
- and no built-in commitment to your custom React/Vite/Tailwind integration goals. ([github.com](https://github.com/koush/scrypted?utm_source=openai))

### Upstream intent summary

The upstream intent appears to be:

- provide the Scrypted management UI,
- align with the Scrypted platform lifecycle,
- and avoid being repurposed into a larger custom operator/integration monorepo unless needed. ([github.com](https://github.com/koush/scrypted?utm_source=openai))

---

## 2) What the fork is optimized for

Your fork has been shaped around a broader objective:

- prepare Scrypted for use inside a **self-built IoT dashboard**,
- support **homelab deployment**,
- add **Docker + Caddy operational paths**,
- improve **repo governance and handoff maturity**,
- and prepare for a downstream environment that is more React/Vite/Tailwind oriented than the original Scrypted UI stack.

### Fork intent summary

The fork is optimized for:

1. **custom integration**
2. **deployment flexibility**
3. **operator-focused documentation**
4. **team handoff readiness**
5. **future React-oriented interoperability**

This is a materially broader goal than the original upstream app.

---

## 3) Where the fork is still aligned with upstream

Despite the divergence, the fork still appears aligned in several important ways.

### 3.1 The fork still centers on the Scrypted management experience

The fork has not abandoned the core domain.  
It is still about the Scrypted management UI and related operational access patterns, rather than becoming an unrelated product.

### 3.2 The frontend technology base still maps to the original app model

The language composition you provided shows the repo is still primarily:

- **Vue** (~68%)
- **TypeScript** (~25%)
- with small CSS/HTML/Shell/JS support layers

That strongly suggests the fork still retains the upstream frontend foundation rather than replacing it wholesale.

### 3.3 The fork’s added work is mostly additive, not destructive

Most of the divergence described in your docs and agent reports appears to be:

- additional docs,
- deployment infrastructure,
- governance workflows,
- integration planning artifacts,
- and optional runtime-track exploration.

That means the fork has mostly **expanded around** the upstream app rather than replacing the core app.

---

## 4) Where the fork has diverged from upstream

This is the most important section.

### 4.1 The repo has expanded from “app repo” to “integration + ops repo”

This is the biggest divergence.

Instead of containing only the app and its essential build/test/deploy concerns, the fork now also carries:

- deployment runbooks,
- Docker/Caddy operator materials,
- release/handoff checklists,
- branch/audit artifacts,
- and broader system-integration planning.

That makes the fork more useful for your project — but less minimal and less upstream-like.

### 4.2 The fork now includes project-governance concerns that upstream may not want in the same place

Your repo now appears to act as a control center for:

- release governance,
- dependency governance,
- team handoff,
- integration gating,
- and operational validation.

That is useful internally, but it means some repo content is now **organizational process infrastructure**, not just product source.

### 4.3 The fork is being shaped around a future React/Tailwind integration target that upstream does not directly optimize for

Your stated scope specifically mentions downstream alignment with:

- React
- Vite
- Tailwind

The current fork still appears mostly Vue-based, which means the repo is in a transitional state:

- upstream-aligned at the codebase level,
- but downstream-aligned at the planning level.

That gap is one of the most important unresolved architectural realities.

### 4.4 The fork may accumulate “strategy documents” faster than code convergence

Several reports and artifacts emphasize phases, handoff, contracts, release checklists, and governance.  
That is valuable, but it can create a mismatch if the codebase itself has not yet fully implemented the React/Vite/Tailwind interoperability story.

In other words:

- docs and governance maturity may currently be ahead of technical convergence.

---

## 5) Main gaps between upstream alignment and fork direction

### Gap 1 — UI stack alignment vs downstream dashboard stack

**Current state:**  
Fork remains predominantly Vue-based.

**Desired state:**  
Fork integrates smoothly with a React/Vite/Tailwind dashboard.

**Risk:**  
You may be documenting a target architecture that the codebase has only partially prepared for.

**Recommendation:**  
Make the integration boundary explicit:
- iframe embedding?
- module federation?
- API-only integration?
- shared auth/session?
- shared design tokens?

Do not let this remain implicit.

---

### Gap 2 — Repo responsibility boundaries

**Current state:**  
App code, infra, release docs, handoff docs, and integration governance all live together.

**Risk:**  
The repo becomes harder to keep clean and harder to sync from upstream.

**Recommendation:**  
Keep this repo if you want one “brain” repo, but define the rule clearly:

- what belongs here,
- what belongs in the separate IoT Dashboard repo,
- what belongs in infra-only repos,
- and what should remain upstream-trackable.

---

### Gap 3 — Upstream sync cost

**Current state:**  
The more fork-specific docs, workflows, deployment logic, and integration tracks you add, the harder clean upstream syncing becomes.

**Risk:**  
Over time, upstream changes may become expensive to adopt.

**Recommendation:**  
Separate changes into three categories:

1. **upstream-trackable**
   - bug fixes
   - neutral code quality improvements
   - generic UX fixes

2. **fork-specific but app-adjacent**
   - branding
   - deployment tweaks
   - operator-focused docs

3. **dashboard-program-specific**
   - handoff artifacts
   - release runbooks
   - custom integration contracts

This classification will help keep future merges sane.

---

### Gap 4 — Runtime track ambiguity

Some previous work referenced desktop/runtime/server-app tracks.  
Even if these are now closed or deferred, they represent an area where fork scope may drift beyond the original repo’s center of gravity.

**Recommendation:**  
Keep runtime-track work explicitly marked as:
- deferred,
- external,
- or non-canonical.

Do not let it silently redefine the repo’s primary purpose.

---

## 6) Good divergence vs bad divergence

### Good divergence
These are healthy and aligned with your goals:

- Docker + Caddy deployment support
- homelab/operator docs
- dependency governance improvements
- release runbooks
- backup/rollback guidance
- integration planning docs
- repo cleanup and branch simplification

### Risky divergence
These need active discipline:

- too much non-code project management inside the source repo
- architecture promises ahead of real implementation
- experimental runtime tracks muddying the repo’s mission
- drifting so far from upstream that upstream fixes become hard to consume

---

## 7) Is the core project still aligned with upstream?

### My judgment

**Yes — but conditionally.**

The fork still appears aligned with upstream in **core mission**, because it is still centered around the Scrypted management UI and ecosystem.

However, it is no longer aligned in **repository shape** or **operational scope**.

That distinction matters:

- **mission alignment:** yes
- **repo minimalism alignment:** no
- **upstream sync simplicity:** reduced
- **fork-specific operational identity:** strong

So the honest answer is:

> The fork has not broken away from upstream’s core purpose, but it has evolved into a broader operator/integration fork with higher long-term maintenance overhead.

---

## 8) Recommended operating model going forward

### Option A — Keep current model, but manage it as a strategic fork
Use this repo as the single operational brain.

Do this if you want:
- one canonical repo,
- one branch,
- one source of truth for operators and dashboard integration planning.

If so, you must enforce:
- strict documentation discipline,
- strong branch protection,
- clear separation of fork-only vs upstream-trackable changes,
- periodic upstream review.

### Option B — Reduce this repo back toward app focus
Move some materials out:
- dashboard handoff docs,
- release governance docs,
- integration contracts,
- maybe deployment runbooks.

Do this if you want easier upstream syncing.

### My recommendation
For your stated goals, **Option A is reasonable**, but only if you explicitly accept that this repo is now a **program fork**, not merely a code fork.

---

## 9) Final recommendations

### Immediate
- Keep `main` as single source of truth.
- Keep branch protection active.
- Remove or archive stale process artifacts that no longer add value.
- Disable GitHub Pages if not used, to reduce noise.

### Near-term
- Write one canonical document defining:
  - integration boundary,
  - repo responsibility boundary,
  - what stays fork-specific,
  - and what should remain upstream-compatible.

### Mid-term
- Perform a deliberate upstream sync review:
  - what upstream changes are worth bringing in,
  - what local customizations would conflict,
  - and which fork additions should stay isolated.

### Technical
- If React/Vite/Tailwind integration remains the target, define the actual bridge architecture now.
- Avoid letting “future compatibility” remain just a documentation promise.

---

## Final verdict

The fork is **not off-mission**, but it is **no longer a lightweight fork**.

It remains aligned with upstream at the product-core level, while diverging substantially at the repository-operational level.

That divergence is acceptable for your homelab/dashboard objective — as long as it is treated intentionally and not as accidental repo sprawl.