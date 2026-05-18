# Final Repository Cleanup Plan

**Date:** 2026-05-18
**Goal:** Get repository completely clean with only valuable, conflict-free PRs

---

## 🎯 EXECUTIVE SUMMARY

**Current State:** 13 open PRs (down from 21)
**Target State:** 0-2 open PRs (only truly valuable work in progress)
**Strategy:** Close redundant/superseded PRs, merge valuable ones, consolidate features

---

## 📋 PHASE 1: CLOSE SUPERSEDED/UNWANTED PRS (Do via GitHub UI)

### PRs to Close Immediately:

#### ❌ PR #11: CI: add policy-driven dependency auto-merge
**Reason:** Completely superseded by merged PR #28
- PR #28 provides superior implementation already merged
- This is a draft with incomplete work
- **Action:** Close via GitHub UI
- **Comment:** "Closing as superseded by merged PR #28 which provides a production-ready auto-merge workflow."

#### ❌ PR #16: Bump openai from 4.104.0 to 6.38.0
**Reason:** Major version upgrade with breaking changes, no compelling need
- OpenAI 4→6 has significant API changes
- Current version works fine
- Agent harness doesn't need v6 features
- **Action:** Close via GitHub UI
- **Comment:** "Declining major version upgrade at this time. Current version (4.x) is stable and meets all requirements. We can revisit if a specific v6 feature is needed."

#### ❌ PR #19: Bump typescript from 5.9.3 to 6.0.3
**Reason:** Major version upgrade with breaking changes
- TypeScript 6 is a major release with breaking changes
- Would require code updates across the codebase
- No pressing need for TS6 features
- **Action:** Close via GitHub UI
- **Comment:** "Declining TypeScript 6 upgrade at this time. TS 5.9.3 is stable and LTS. Major version upgrades require careful migration and we have no immediate need for TS6 features."

#### ❌ PR #20: Bump @types/node from 22.19.15 to 25.9.0
**Reason:** Follows TypeScript decision
- @types/node versions should align with Node.js and TypeScript versions
- Since we're staying on TS5, @types/node 22 is appropriate
- **Action:** Close via GitHub UI
- **Comment:** "Declining in alignment with TypeScript version decision. Current @types/node version is appropriate for our TypeScript 5.9.x version."

---

## 📋 PHASE 2: EVALUATE AND CLOSE REDUNDANT DRAFT PRS

### Draft PRs to Review:

#### ❌ PR #13: chore: integrate pending cleanup, platform, and CI branches
**Reason:** Likely superseded by merged work
- We've already merged multiple CI improvements (PRs #22-28)
- Title suggests this was consolidating multiple branches
- **Action:** Review commits, then close via GitHub UI
- **Comment:** "Closing as redundant. The CI improvements and cleanup work have been integrated through PRs #22-28."

#### ❌ PR #10: Stabilize fork CI by aligning CodeQL Rust mode
**Reason:** Likely addressed by merged updates
- We merged CodeQL action updates (PR #24)
- All GitHub Actions are now at latest versions
- **Action:** Review if still needed, likely close
- **Comment:** "Closing as addressed by merged PR #24 (CodeQL action update) and other CI improvements."

#### ⚠️ PR #12: chore(ci): integrate repo-hygiene baseline
**Reason:** May overlap with PR #7
- **Action:** Compare with PR #7 carefully
- If duplicate → Close this, keep PR #7
- If complementary → Evaluate which to merge
- **Decision needed:** Check actual content

#### ⚠️ PR #14: Fix CodeQL CI: surface SARIF upload conflict
**Reason:** May still be needed (CodeQL double-config issue)
- Repository memory indicates both default and advanced CodeQL setups active
- This causes SARIF upload conflicts
- **Action:** Test if still an issue after our merges
- If yes → Merge this fix
- If no → Close as resolved
- **Decision needed:** Test CodeQL status

---

## 📋 PHASE 3: MERGE HIGH-VALUE PRS

### ✅ PR #9: docs(github): overhaul fork README + templates
**Priority:** HIGH - Essential documentation
**Status:** Has README.md conflicts (needs rebase)
**Value:**
- Comprehensive README explaining fork purpose
- CODEOWNERS for review routing
- PR template for better contributions
- Issue templates aligned with labels

**Actions:**
1. Fetch branch: `copilot/polish-repo-presentation`
2. Rebase against current main
3. Resolve README.md conflict (accept PR #9's complete version)
4. Test that templates are valid
5. Merge with proper attribution

**Merge Message:**
```
docs(github): overhaul fork README and add contribution templates

Merges PR #9 - Comprehensive documentation overhaul:
- Reframes repo as homelab-focused fork with complete README
- Adds CODEOWNERS for review routing
- Adds PR template with area checklist
- Adds issue form templates (bug, feature, question)
- Clarifies upstream sync strategy

Co-authored-by: Copilot <copilot@github.com>
```

### ✅ PR #7: Add repo hygiene baseline
**Priority:** HIGH - Automation foundation
**Status:** May have conflicts, needs check
**Value:**
- Dependabot configuration
- Label sync automation
- Upstream fork sync workflow

**Actions:**
1. Fetch branch: Need to identify correct branch name
2. Check for conflicts with existing Dependabot config
3. Rebase if needed
4. Merge

**Note:** Check overlap with PR #12 first!

### ✅ PR #4: Add server-app Linux release workflow
**Priority:** MEDIUM - CI improvement
**Status:** Should merge cleanly
**Value:**
- Automated releases for tagged versions
- Pure CI addition, low risk

**Actions:**
1. Fetch branch: `copilot/add-server-app-release-workflow`
2. Test for conflicts
3. Merge

### ✅ PR #3: Add infra Caddy sub-path deployment
**Priority:** MEDIUM - Infrastructure option
**Status:** Should merge cleanly
**Value:**
- Enables serving UI under `/dashboard/*` path
- Pure addition to infra/
- Useful deployment variant

**Actions:**
1. Fetch branch: `copilot/add-scrypted-subpath-variant`
2. Test for conflicts
3. Merge

---

## 📋 PHASE 4: HANDLE FEATURE PRS (User Decision Required)

### ⚠️ PR #2: Add standalone server-app Electron launcher
**Size:** Large (6,787 additions, 20 files)
**Status:** Has merge conflicts, build issues
**Issues:**
- Merge conflicts (mergeable_state: unstable)
- Build blocked by firewall (electronjs.org)
- Dependabot config check failed

**Decision Point:** Choose Electron OR Tauri (not both initially)

**Option A: Merge PR #2 (Electron)**
- Pros: Mature ecosystem, more features
- Cons: Large binary (~100MB+), slower, has conflicts
- Action: Rebase, fix conflicts, resolve build issues, merge

**Option B: Merge PR #5 (Tauri) - RECOMMENDED**
- Pros: Smaller binary (~10MB), modern, better security
- Cons: Newer ecosystem
- Action: Rebase, test, merge

**Recommendation:** Choose PR #5 (Tauri), close PR #2
- Tauri is the future of desktop apps
- Much smaller binary size
- Better security model
- Cleaner starting point

### ⚠️ PR #5: Add server-app-tauri Tauri 2 launcher
**Size:** Large feature addition
**Status:** Needs check for conflicts
**Value:** Modern desktop launcher alternative

**If choosing Tauri:**
1. Fetch branch
2. Check for conflicts
3. Rebase if needed
4. Test build process
5. Merge

---

## 📋 PHASE 5: HANDLE REMAINING DRAFTS

### 🚧 PR #29: ci: stabilize Pages workflow in fork
**Status:** DRAFT (created 2026-05-18)
**Value:** Recent work on security vulnerabilities and CI
**Action:** KEEP for now, let it mature
- Review when marked as ready
- May contain valuable security fixes

---

## 🎯 EXECUTION SCRIPT

### Step 1: Close Unwanted PRs (via GitHub UI)
```bash
# You'll need to do this via GitHub web interface
# Close: #11, #16, #19, #20, #13, #10
# Possibly close: #12, #14 (after evaluation)
```

### Step 2: Merge Documentation (PR #9)
```bash
git checkout main
git fetch origin copilot/polish-repo-presentation:pr9
git merge --no-ff pr9 -m "docs(github): overhaul fork README and add contribution templates

Merges PR #9 - Complete documentation overhaul

Co-authored-by: Copilot <copilot@github.com>"

# If conflicts, resolve README.md (accept PR #9's version)
# Then: git add . && git commit && git push origin main
```

### Step 3: Merge Infrastructure PRs (#7, #4, #3)
```bash
# PR #7 - Get actual branch name first
git fetch origin [branch-name]:pr7
git merge --no-ff pr7 -m "chore: add repo hygiene baseline"

# PR #4
git fetch origin copilot/add-server-app-release-workflow:pr4
git merge --no-ff pr4 -m "ci: add server-app Linux release workflow"

# PR #3
git fetch origin copilot/add-scrypted-subpath-variant:pr3
git merge --no-ff pr3 -m "feat(infra): add Caddy sub-path deployment variant"

git push origin main
```

### Step 4: Choose and Merge Launcher
```bash
# Recommended: Tauri (PR #5)
git fetch origin [pr5-branch]:pr5
git merge --no-ff pr5 -m "feat: add server-app-tauri Tauri 2 launcher"
git push origin main

# Then close PR #2 via GitHub UI
```

### Step 5: Clean Up Branches
```bash
# Delete merged PR branches (do after PRs auto-close from merges)
git push origin --delete [list of merged branches]
```

---

## 📊 EXPECTED FINAL STATE

After executing this plan:

**Closed PRs:** 6-8
- #11 (superseded)
- #16, #19, #20 (unwanted major upgrades)
- #13, #10 (redundant drafts)
- #2 (if choosing Tauri) or #5 (if choosing Electron)
- Possibly #12, #14 (after evaluation)

**Merged PRs:** 4-5
- #9 (README overhaul)
- #7 (repo hygiene)
- #4 (release workflow)
- #3 (Caddy sub-path)
- #5 (Tauri launcher) - if chosen

**Remaining Open:** 1-2
- #29 (recent draft, let mature)
- Any draft that proves valuable after evaluation

**Total Reduction:** From 21 → 1-2 open PRs (90-95% reduction!)

---

## ✅ SUCCESS CRITERIA

Repository is "totally clean" when:
- ✅ No superseded/redundant PRs remain open
- ✅ No conflicting major version PRs open
- ✅ All valuable documentation merged
- ✅ All infrastructure improvements merged
- ✅ Clear architectural choice made (Electron vs Tauri)
- ✅ Only active, valuable WIP remains open
- ✅ All merged PR branches deleted
- ✅ Main branch is stable and builds successfully

---

## 🚀 READY TO EXECUTE?

This plan provides a clear path to a clean repository. The only user decisions needed:
1. **Launcher choice:** Electron (PR #2) or Tauri (PR #5)? → Recommend Tauri
2. **Draft PRs:** Keep #29 for now, evaluate #14 after testing

Everything else is clearly close or merge.

---

**Generated:** 2026-05-18
**Status:** Ready for execution
