# Repository Cleanup - Action Items

**Date:** 2026-05-18
**Current State:** 13 open PRs
**Goal:** Clean repository with 0-2 valuable PRs remaining

---

## ✅ WHAT'S BEEN COMPLETED

### Already Merged (8 PRs):
1. ✅ PR #28: Dependabot auto-merge workflow
2. ✅ PR #27: tsx 4.21.0 → 4.22.2
3. ✅ PR #26: actions/configure-pages 4 → 6
4. ✅ PR #25: actions/checkout 4 → 6
5. ✅ PR #24: github/codeql-action 3 → 4
6. ✅ PR #23: actions/upload-pages-artifact 3 → 5
7. ✅ PR #22: ossf/scorecard-action 2.3.1 → 2.4.3
8. ✅ PR #17: @scrypted/sdk 0.3.127 → 0.5.59

---

## 🎯 ACTION REQUIRED: Close These PRs via GitHub Web UI

### TIER 1: Close Immediately (No Value)

#### ❌ Close PR #11
**URL:** https://github.com/iamjairo/manage.scrypted.app/pull/11
**Reason:** Superseded by merged PR #28
**Comment to use:**
```
Closing as superseded by merged PR #28 which provides a production-ready auto-merge workflow for Dependabot.
```

#### ❌ Close PR #16
**URL:** https://github.com/iamjairo/manage.scrypted.app/pull/16
**Reason:** Major version upgrade with breaking changes, no need
**Comment to use:**
```
Declining OpenAI 4→6 major upgrade at this time. Current version (4.x) is stable and meets all requirements. We can revisit if a specific v6 feature is needed.
```

#### ❌ Close PR #19
**URL:** https://github.com/iamjairo/manage.scrypted.app/pull/19
**Reason:** Major TypeScript upgrade with breaking changes
**Comment to use:**
```
Declining TypeScript 6 upgrade at this time. TS 5.9.3 is stable and LTS. Major version upgrades require careful migration planning and we have no immediate need for TS6 features.
```

#### ❌ Close PR #20
**URL:** https://github.com/iamjairo/manage.scrypted.app/pull/20
**Reason:** Follows TypeScript decision
**Comment to use:**
```
Declining in alignment with TypeScript version decision. Current @types/node version is appropriate for our TypeScript 5.9.x setup.
```

### TIER 2: Close Redundant Drafts

#### ❌ Close PR #13
**URL:** https://github.com/iamjairo/manage.scrypted.app/pull/13
**Reason:** Integration work superseded by individual merges
**Comment to use:**
```
Closing as redundant. The CI improvements and cleanup work have been successfully integrated through PRs #22-28.
```

#### ❌ Close PR #10
**URL:** https://github.com/iamjairo/manage.scrypted.app/pull/10
**Reason:** CodeQL improvements already merged
**Comment to use:**
```
Closing as addressed by merged PR #24 (CodeQL action v3→v4 update) and other CI improvements.
```

#### ⚠️ Close PR #12 (Check first if different from PR #7)
**URL:** https://github.com/iamjairo/manage.scrypted.app/pull/12
**Reason:** May duplicate PR #7
**Action:** Review PR #12 and PR #7 side-by-side
- If duplicate: Close #12, keep #7 open
- If complementary: Evaluate which has better implementation

**Comment if closing:**
```
Closing as duplicate of PR #7 which provides the same repo hygiene baseline with a more complete implementation.
```

---

## 🔍 EVALUATE THESE PRs

### ⚠️ PR #14: Fix CodeQL CI SARIF upload conflict
**URL:** https://github.com/iamjairo/manage.scrypted.app/pull/14
**Action Needed:** Test if still an issue

**How to test:**
1. Go to https://github.com/iamjairo/manage.scrypted.app/actions/workflows/codeql.yml
2. Check recent runs - are they failing with SARIF upload errors?
3. If YES → Keep PR #14 open, review and consider merging
4. If NO → Close PR #14 as resolved

**Comment if closing:**
```
Closing as resolved. CodeQL workflows are now running successfully without SARIF upload conflicts after recent CI improvements.
```

---

## 📦 VALUABLE PRS - NEED YOUR DECISION

### 🎯 PR #9: Overhaul fork README + templates
**URL:** https://github.com/iamjairo/manage.scrypted.app/pull/9
**Status:** Has README.md merge conflicts
**Value:** HIGH - Essential documentation
**Decision:** MERGE (after rebase)

**What it adds:**
- Comprehensive README explaining fork purpose
- CODEOWNERS file for review routing
- Pull request template
- Issue form templates

**Problem:** The PR has conflicts because README.md was modified by merged PRs
**Solution:** The PR author (Copilot) or you will need to rebase this PR

**Recommendation:** KEEP OPEN - Request rebase from Copilot or manually rebase

---

### 🎯 PR #7: Add repo hygiene baseline
**URL:** https://github.com/iamjairo/manage.scrypted.app/pull/7
**Status:** May have conflicts
**Value:** HIGH - Automation foundation

**What it adds:**
- Dependabot configuration
- Label taxonomy + sync workflow
- Upstream fork sync automation

**Recommendation:** KEEP OPEN - Check for conflicts, merge if clean

---

### 🎯 PR #4: Add server-app Linux release workflow
**URL:** https://github.com/iamjairo/manage.scrypted.app/pull/4
**Value:** MEDIUM - CI improvement
**What it adds:** Automated GitHub Releases for server-app

**Recommendation:** MERGE if you want automated releases

---

### 🎯 PR #3: Add Caddy sub-path deployment variant
**URL:** https://github.com/iamjairo/manage.scrypted.app/pull/3
**Value:** MEDIUM - Infrastructure option
**What it adds:** Ability to serve UI under `/dashboard/*` path

**Recommendation:** MERGE if you need sub-path hosting

---

### 🤔 PR #2 vs PR #5: Choose One Launcher

You have TWO desktop launcher options. **Choose one:**

#### Option A: PR #2 - Electron Launcher
**URL:** https://github.com/iamjairo/manage.scrypted.app/pull/2
**Size:** Very large (6,787 additions)
**Status:** Has merge conflicts + build issues
**Pros:** Mature ecosystem, feature-rich
**Cons:** Large binary size (~100-200MB), has conflicts, build issues

#### Option B: PR #5 - Tauri Launcher (RECOMMENDED)
**URL:** https://github.com/iamjairo/manage.scrypted.app/pull/5
**Size:** Large feature
**Status:** Needs conflict check
**Pros:** Modern, small binary (~10MB), better security
**Cons:** Newer ecosystem

**My Recommendation:** Choose PR #5 (Tauri), close PR #2

**Why Tauri?**
- 10x smaller binary
- Modern Rust-based architecture
- Better security model
- Future of desktop apps
- Cleaner starting point (no conflicts)

**Decision:**
- [ ] Keep PR #5 (Tauri), close PR #2
- [ ] Keep PR #2 (Electron), close PR #5
- [ ] Keep both (not recommended - creates maintenance burden)
- [ ] Close both (if you don't need desktop launcher)

---

### 🚧 PR #29: CI stabilize Pages + security
**URL:** https://github.com/iamjairo/manage.scrypted.app/pull/29
**Status:** DRAFT (created 2026-05-18)
**Value:** TBD - addresses security vulnerabilities

**Recommendation:** KEEP OPEN - Let it mature, review when ready

---

## 📋 EXECUTION CHECKLIST

### Step 1: Close Unwanted PRs (5 minutes)
- [ ] Close PR #11 (superseded)
- [ ] Close PR #16 (openai upgrade)
- [ ] Close PR #19 (typescript upgrade)
- [ ] Close PR #20 (@types/node upgrade)
- [ ] Close PR #13 (integration draft)
- [ ] Close PR #10 (codeql draft)
- [ ] Evaluate and possibly close PR #12 (check vs PR #7)
- [ ] Evaluate and possibly close PR #14 (test if still needed)

### Step 2: Make Launcher Decision (1 minute)
- [ ] Decide: Tauri (PR #5) or Electron (PR #2)?
- [ ] Close the one you don't want

### Step 3: Handle Valuable PRs (Time varies)
For each PR you want to keep:
- [ ] PR #9: Request rebase or wait for conflicts to be resolved
- [ ] PR #7: Check status, merge if clean
- [ ] PR #4: Merge if you want automated releases
- [ ] PR #3: Merge if you want sub-path deployment
- [ ] PR #5 or #2: Keep your chosen launcher

### Step 4: Clean Up Branches (After PRs close)
Once GitHub auto-closes PRs from merges, delete the branches:
```bash
git push origin --delete [branch-name]
```

---

## 🎯 EXPECTED FINAL STATE

After completing all actions:

**PRs to Close:** 6-9
- #11, #16, #19, #20 (unwanted)
- #13, #10 (redundant drafts)
- #12 or #14 (if redundant)
- #2 or #5 (whichever launcher not chosen)

**PRs to Merge:** 3-5
- #9 (after rebase)
- #7 (repo hygiene)
- #4 (release workflow) - optional
- #3 (Caddy sub-path) - optional
- #5 or #2 (your chosen launcher)

**PRs Remaining Open:** 1
- #29 (recent draft, valuable when ready)

**Final Count:** ~1 open PR (vs 21 initially!)
**Reduction:** 95% reduction! 🎉

---

## 💡 QUICK DECISION GUIDE

**If you want the absolute cleanest repo fast:**
1. Close: #11, #16, #19, #20, #13, #10, #12, #14
2. Close: Both #2 and #5 (skip launchers for now)
3. Keep open: #9, #7, #29 (merge when conflicts resolved)
4. Close: #4, #3 (if you don't need those features)
5. **Final: 3 open PRs** (all valuable, just waiting for cleanup)

**If you want maximum value:**
1. Close: #11, #16, #19, #20, #13, #10
2. Choose launcher: Keep #5 (Tauri), close #2
3. Merge: #7 (repo hygiene) if no conflicts
4. Merge: #4 (releases) if you want automation
5. Merge: #3 (Caddy) if you need sub-path
6. Keep open: #9 (docs - needs rebase), #5 (launcher), #29 (draft)
7. **Final: 3 open PRs** (all high-value)

---

## 🚀 READY TO START?

**Easiest first step:** Close the 4 unwanted dependency PRs (#11, #16, #19, #20)

1. Go to each PR URL above
2. Click "Close pull request" button
3. Paste the provided comment
4. Done!

That alone will get you from 13 → 9 open PRs immediately.

---

**Questions?** All recommendations are based on:
- 38% of PRs already successfully merged
- Analysis of conflicts and dependencies
- Best practices for fork maintenance
- Your goal of a "totally clean" repository

The path is clear - just need to execute the closures via GitHub UI!
