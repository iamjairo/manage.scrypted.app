# Quick Manual Cleanup Guide

If the script doesn't work, here's the fastest manual cleanup:

## Step 1: Close These 7 PRs (10 minutes)

Go to each URL and click "Close pull request":

### ❌ Unwanted/Superseded (Close These):

1. **PR #11** - https://github.com/iamjairo/manage.scrypted.app/pull/11
   - Close comment: "Superseded by merged PR #28"

2. **PR #16** - https://github.com/iamjairo/manage.scrypted.app/pull/16
   - Close comment: "Declining OpenAI major upgrade - current version stable"

3. **PR #19** - https://github.com/iamjairo/manage.scrypted.app/pull/19
   - Close comment: "Declining TypeScript 6 upgrade - no immediate need"

4. **PR #20** - https://github.com/iamjairo/manage.scrypted.app/pull/20
   - Close comment: "Declining @types/node upgrade per TypeScript decision"

5. **PR #13** - https://github.com/iamjairo/manage.scrypted.app/pull/13
   - Close comment: "Redundant - work already integrated via PRs #22-28"

6. **PR #10** - https://github.com/iamjairo/manage.scrypted.app/pull/10
   - Close comment: "Addressed by merged PR #24 and CI improvements"

7. **PR #2** - https://github.com/iamjairo/manage.scrypted.app/pull/2
   - Close comment: "Choosing Tauri (PR #5) over Electron"

## Step 2: Check These PRs (5 minutes)

### Evaluate:

- **PR #12** - Compare with PR #7. If duplicate → close #12
- **PR #14** - Check if CodeQL still has SARIF issues. If no → close

## Result

After Step 1: **13 → 6 open PRs** (46% reduction!)
After Step 2: **6 → 4-5 open PRs** (60-70% reduction!)

## Remaining PRs (All Valuable):

- ✅ PR #9 - Documentation (waiting for rebase)
- ✅ PR #7 - Repo hygiene (ready to merge)
- ✅ PR #5 - Tauri launcher
- ✅ PR #4 - Release workflow (optional)
- ✅ PR #3 - Caddy variant (optional)
- 🚧 PR #29 - Recent draft

Total cleanup: **21 initial → 4-6 final PRs (71-81% reduction!)**
