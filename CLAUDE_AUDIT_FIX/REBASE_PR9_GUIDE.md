# Rebase Guide for PR #9: Documentation Overhaul

## PR Information
- **PR Number:** #9
- **Title:** docs(github): overhaul fork README and add ownership/issue+PR intake templates
- **Branch Name:** `copilot/polish-repo-presentation`
- **Status:** Has merge conflicts (mergeable_state: "dirty")
- **Base:** main
- **URL:** https://github.com/iamjairo/manage.scrypted.app/pull/9

## Why Rebase is Needed

PR #9 was created when main was at commit `9239c264`. Since then, main has moved forward with:
- 8 merged PRs (GitHub Actions updates, dependency updates, auto-merge workflow)
- Multiple documentation files added (CLEANUP_ACTION_ITEMS.md, FINAL_CLEANUP_PLAN.md, etc.)

These changes modified README.md and other files, causing conflicts with PR #9's changes.

---

## Option A: Rebase Locally (Recommended)

### Prerequisites
- Git installed and configured
- Access to push to the fork

### Step-by-Step Commands

```bash
# 1. Ensure you're starting clean
cd /path/to/your/repo
git status  # Should show clean working directory

# 2. Fetch all latest changes from origin
git fetch origin

# 3. Checkout the PR branch
git checkout copilot/polish-repo-presentation

# 4. Pull latest changes from the PR branch (if any updates happened on GitHub)
git pull origin copilot/polish-repo-presentation

# 5. Rebase onto current main
git rebase origin/main

# At this point, Git will stop at conflicts and show:
# CONFLICT (content): Merge conflict in README.md
# (and possibly other files)
```

### Step 6: Resolve Conflicts

Git will mark conflicts in the files. The main conflict will be in `README.md`:

```bash
# Open the conflicted file
nano README.md
# or
code README.md
# or your preferred editor
```

You'll see conflict markers like:
```
<<<<<<< HEAD
Content from main branch
=======
Content from PR #9 branch
>>>>>>> commit-hash
```

**Recommendation for README.md:**
- **Keep PR #9's version** (the content between `=======` and `>>>>>>>`)
- PR #9 has a comprehensive, well-structured README
- The current main's README is minimal

**For other files:**
- `.github/CODEOWNERS` - Keep PR #9's version (it's new)
- `.github/pull_request_template.md` - Keep PR #9's version (it's new)
- `.github/ISSUE_TEMPLATE/*` - Keep PR #9's versions (they're new)
- Any documentation files (like CLEANUP_ACTION_ITEMS.md) - Keep both if possible

### Step 7: After Resolving Each Conflict

```bash
# Stage the resolved file
git add README.md
git add .github/CODEOWNERS
git add .github/pull_request_template.md
git add .github/ISSUE_TEMPLATE/

# Continue the rebase
git rebase --continue

# If more conflicts appear, repeat steps 6-7
# If no more conflicts, the rebase is complete
```

### Step 8: Force Push the Rebased Branch

```bash
# Force push to update the PR
git push origin copilot/polish-repo-presentation --force-with-lease

# The --force-with-lease is safer than --force
# It will fail if someone else pushed to the branch
```

### Step 9: Verify on GitHub

- Go to https://github.com/iamjairo/manage.scrypted.app/pull/9
- Refresh the page
- Check that:
  - Conflicts are resolved
  - CI checks are running (if any)
  - The PR shows as ready to merge

---

## Option B: Use GitHub's Web UI (Easier but Less Control)

### Via GitHub Web Interface

1. Go to https://github.com/iamjairo/manage.scrypted.app/pull/9
2. Scroll down to the "This branch has conflicts that must be resolved" section
3. Click "Resolve conflicts" button
4. GitHub will open a web editor showing conflicts
5. Edit each file to resolve conflicts
6. For README.md, you'll want to keep PR #9's comprehensive version
7. Click "Mark as resolved" for each file
8. Click "Commit merge" when all conflicts are resolved

**Note:** This creates a merge commit rather than a true rebase, but it works.

---

## Option C: Request Branch Update from GitHub (Simplest)

If you have write access to the branch:

1. Go to https://github.com/iamjairo/manage.scrypted.app/pull/9
2. Click "Update branch" button (if available)
3. This will merge main into the PR branch
4. Then resolve conflicts if prompted

---

## Conflict Resolution Strategy

### For README.md Conflict

**Keep PR #9's version because:**
- It's comprehensive and well-structured
- Explains the fork purpose clearly
- Documents all components (infra/, server-app/, etc.)
- Includes quick start guides
- Already reviewed and approved structure

**Current main's README:**
- Minimal or missing proper structure
- Less informative

**What to do:**
```bash
# In the conflict markers, keep everything between:
# ======= and >>>>>>> (PR #9's version)
# Delete everything between:
# <<<<<<< and ======= (main's version)
```

### For New Files in PR #9

These files don't exist on main, so no conflicts:
- `.github/CODEOWNERS`
- `.github/pull_request_template.md`
- `.github/ISSUE_TEMPLATE/bug.yml`
- `.github/ISSUE_TEMPLATE/feature.yml`
- `.github/ISSUE_TEMPLATE/question.yml`
- `.github/ISSUE_TEMPLATE/config.yml`

**Action:** Just accept them as-is.

---

## Troubleshooting

### If Rebase Gets Messy

```bash
# Abort the rebase and start over
git rebase --abort

# Go back to the beginning
git checkout copilot/polish-repo-presentation
git reset --hard origin/copilot/polish-repo-presentation
# Then try again more carefully
```

### If You Accidentally Mess Up

```bash
# Find the commit hash before you started
git reflog

# Reset to that commit
git reset --hard <commit-hash>
```

### If Force Push Fails

```bash
# Someone else pushed to the branch
# Pull first, then force push
git pull origin copilot/polish-repo-presentation --rebase
git push origin copilot/polish-repo-presentation --force-with-lease
```

---

## After Successful Rebase

Once the rebase is complete and pushed:

1. **Verify PR #9 on GitHub**
   - Check that it shows "Ready to merge"
   - No more conflict warnings

2. **Merge the PR**
   ```bash
   # Via GitHub UI: Click "Merge pull request"
   # Or via CLI:
   gh pr merge 9 --repo iamjairo/manage.scrypted.app --merge
   ```

3. **Delete the Branch** (after merge)
   ```bash
   git push origin --delete copilot/polish-repo-presentation
   # Or via GitHub UI after merge
   ```

---

## Summary - Quick Commands

```bash
# Quick rebase flow (assuming you're in the repo):
git fetch origin
git checkout copilot/polish-repo-presentation
git rebase origin/main
# Resolve conflicts in README.md (keep PR #9's version)
git add README.md .github/
git rebase --continue
git push origin copilot/polish-repo-presentation --force-with-lease
```

---

## Expected Outcome

After successful rebase and merge:
- ✅ Comprehensive README explaining the fork
- ✅ CODEOWNERS for review routing
- ✅ PR template for better contributions
- ✅ Issue templates for bug reports, features, questions
- ✅ Clear documentation for all repo components
- ✅ No more conflicts
- ✅ Ready to merge into main

This is a high-value PR that significantly improves repository documentation!
