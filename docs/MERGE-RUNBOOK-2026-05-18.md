# Merge Runbook — 2026-05-18

Repository: `https://github.com/iamjairo/manage.scrypted.app`  
Branch policy: merge to `main`, then delete merged branches to reduce operator confusion.

---

## Purpose

This runbook provides a deterministic merge/closure sequence to finalize today’s cleanup work, minimize PR ambiguity, and hand off a stable baseline to the IoT Dashboard team.

---

## Current known state (verified in session)

- ✅ PR **#37** merged: Dependabot auto-merge workflow repair.
- ✅ PR **#35** merged (meta cleanup).
- ✅ PR **#36** merged (meta cleanup).
- ⚠️ PR **#34** open draft: major-upgrades diagnostics (**do not merge**).
- ⚠️ Legacy/open PR backlog still includes superseded/overlapping tracks (`#7`, `#9`, `#12`, `#31`, `#32` and others).

---

## Operator goals

1. Merge only low-risk, single-purpose governance/docs cleanups.
2. Avoid merging stale/meta/overlapping PRs.
3. Close superseded PRs quickly once replacement merges are complete.
4. Keep major upgrade track isolated.

---

## Phase 1 — Finalize “safe baseline” PRs

### 1.1 Merge Dependabot audit workflow PR (if open)
Expected head branch: `chore/dependabot-audit`  
Expected file scope: `.github/workflows/dependabot-audit.yml`

Pre-merge checks:
- Workflow includes explicit permissions:
  - `contents: read`
  - `issues: write`
- Uses `actions/github-script@v7`.
- Logic: triggers on `pull_request` `closed`, and runs only when merged + Dependabot author condition is true.

Action:
- Merge to `main` (squash or merge commit per repo preference).
- Delete branch after merge.

---

### 1.2 Merge repo hygiene config PR (if open)
Expected head branch: `chore/repo-hygiene-combined`  
Expected file scope: `.github/dependabot.yml` (and only related hygiene deltas)

Pre-merge checks:
- Dependabot targets active paths only:
  - `npm` `/`
  - `npm` `/agent-harness`
  - `github-actions` `/`
  - Docker ecosystem `/infra`
- No stale paths:
  - `/server-app`
  - `/server-app-tauri`
  - `/server-app-tauri/src-tauri`

Action:
- Merge to `main`.
- Delete branch after merge.

---

### 1.3 Merge docs rebase PR (replacement for #9)
Expected head branch: `fix/pr-9-rebase`  
Expected scope: docs/templates/CODEOWNERS only.

Pre-merge checks:
- File scope limited to:
  - `README.md`
  - `.github/CODEOWNERS`
  - `.github/pull_request_template.md`
  - `.github/ISSUE_TEMPLATE/*`
- README does **not** contain broken links to paths absent on `main` (`server-app/`, `server-app-tauri/`) unless those directories have already landed.

Action:
- Merge to `main`.
- Delete branch after merge.

---

## Phase 2 — Close superseded PRs

After replacement PRs are merged, close legacy/superseded PRs with clear comments.

### Recommended closures (superseded/meta)
- `#9` — superseded by docs rebase replacement
- `#7` — superseded by combined hygiene work
- `#12` — superseded by combined hygiene work
- `#31` — stale/meta overlap
- `#32` — stale/meta overlap

Suggested closure comment template:

```text
Superseded by newer consolidated cleanup PR(s) merged to main on 2026-05-18.
Closing to reduce overlap and keep the active merge path unambiguous.
```

---

## Phase 3 — Controlled handling of remaining open PRs

### 3.1 Keep major-upgrades draft isolated
- PR `#34` remains **draft / do-not-merge** until explicit migration sprint approval.
- No accidental merge.

### 3.2 Handle dependency PRs normally
- Patch/minor Dependabot PRs can continue through policy checks.
- Major/native-impact changes remain manual review.

---

## Validation checklist after merges

Run this post-merge sanity checklist:

- [ ] `main` contains repaired auto-merge workflow (from #37).
- [ ] Dependabot audit workflow present and valid.
- [ ] `.github/dependabot.yml` path set is clean/current.
- [ ] README + templates are present and coherent for current `main` tree.
- [ ] Superseded PRs closed.
- [ ] No accidental merge of `#34`.

---

## Optional CLI workflow (GitHub CLI)

> Use from local clone with `gh` authenticated and default repo set.

```bash
gh repo set-default iamjairo/manage.scrypted.app

# Example: close superseded PRs after replacement merges
gh pr close 9  -c "Superseded by rebased docs/templates PR merged on 2026-05-18."
gh pr close 7  -c "Superseded by consolidated repo hygiene PR merged on 2026-05-18."
gh pr close 12 -c "Superseded by consolidated repo hygiene PR merged on 2026-05-18."
gh pr close 31 -c "Stale meta/overlap PR. Superseded by consolidated cleanup merges."
gh pr close 32 -c "Stale meta/overlap PR. Superseded by consolidated cleanup merges."
```

---

## Handoff note for integration team

Once this runbook is complete, the repo baseline is fit for IoT Dashboard integration planning with reduced CI/governance ambiguity and cleaner PR topology.

Related docs:

- `docs/STATUS-2026-05-18.md`
- `docs/TEAM-HANDOFF-IOT-DASHBOARD.md`
- `docs/DOCKER-CADDY-OPS-NOTES.md`
- `docs/SERVER-APP-TRACK-SUMMARY.md`