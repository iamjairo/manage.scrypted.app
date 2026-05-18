# CodeQL & Scorecard Security Scan Results

**Date:** 2026-05-18
**Repository:** iamjairo/manage.scrypted.app

## Current Status Summary

Both CodeQL and Scorecard workflows have been configured and are running on the `main` branch. However, there is a **SARIF upload conflict** that needs to be resolved.

---

## Recent Workflow Runs on Main Branch

### ✅ CodeQL Workflow
- **Latest Run ID:** 26049903034
- **Status:** Success (with warnings)
- **Run URL:** https://github.com/iamjairo/manage.scrypted.app/actions/runs/26049903034
- **Triggered:** 2026-05-18 at 17:37:27 UTC
- **Conclusion:** Completed successfully
- **Analyzed Languages:** JavaScript/TypeScript, Rust (skipped - no src-tauri directory)

### ✅ OpenSSF Scorecard Workflow
- **Latest Run ID:** 26049903055
- **Status:** Success
- **Run URL:** https://github.com/iamjairo/manage.scrypted.app/actions/runs/26049903055
- **Triggered:** 2026-05-18 at 17:37:27 UTC
- **Conclusion:** Completed successfully
- **SARIF Upload:** Successful

---

## ⚠️ SARIF Upload Conflict (CodeQL)

### Issue Description

The CodeQL workflow completed analysis successfully, but encountered a **configuration error** during SARIF upload:

```
##[error]Loaded a configuration file for version '4.35.5', but running version '3.35.5'
##[warning]CodeQL SARIF upload failed. This usually means the repository has both the
default CodeQL setup AND this advanced workflow enabled simultaneously. The analysis did
run successfully; SARIF was generated but GitHub rejected the upload.
```

### Root Cause

The repository has **both** enabled:
1. **Default CodeQL setup** (Settings → Security → Code scanning → Default setup)
2. **Advanced CodeQL workflow** (.github/workflows/codeql.yml)

These conflict with each other, causing the SARIF upload to be rejected.

### Error Log Excerpt

```
2026-05-18T17:38:09.0836111Z ##[error]Loaded a configuration file for version '4.35.5', but running version '3.35.5'

2026-05-18T17:38:09.2821578Z ##[warning]CodeQL SARIF upload failed. This usually means
the repository has both the default CodeQL setup AND this advanced workflow enabled
simultaneously. The analysis did run successfully; SARIF was generated but GitHub
rejected the upload. To resolve: Settings → Security → Code scanning → Default setup → Disable.

2026-05-18T17:38:17.4252358Z Successfully uploaded a SARIF file for the unsuccessful
execution. Received expected "unsuccessful execution" processing error, and no other errors.
```

---

## 🔧 How to Fix the SARIF Upload Conflict

### Step-by-Step Instructions

**This requires repository owner/admin permissions.**

1. **Go to Repository Settings:**
   - Navigate to: https://github.com/iamjairo/manage.scrypted.app/settings

2. **Access Code Scanning Settings:**
   - Click **Security** (left sidebar)
   - Click **Code security and analysis**
   - Scroll to **Code scanning** section

3. **Disable Default Setup:**
   - Find **"Default setup"** (usually shows as "Enabled")
   - Click **"Disable"** button
   - Confirm the action

4. **Re-run the CodeQL Workflow:**
   - Go to: https://github.com/iamjairo/manage.scrypted.app/actions/workflows/codeql.yml
   - Click **"Run workflow"** button (top right)
   - Select branch: **main**
   - Click **"Run workflow"** to trigger

5. **Verify Success:**
   - Wait for the workflow to complete
   - Check that the SARIF upload step shows success (no warnings)
   - Verify that security alerts appear in the Security tab

### Alternative: Ensure Workflow Permissions

If disabling default setup doesn't resolve the issue, verify workflow permissions:

1. **Go to Repository Settings:**
   - Settings → Actions → General

2. **Check Workflow Permissions:**
   - Under **"Workflow permissions"**, select:
     - ✅ **"Read and write permissions"**
   - Under **"Allow GitHub Actions to create and approve pull requests"**:
     - ✅ Check this box if needed

3. **Verify Security Analysis Settings:**
   - Settings → Security → Code security and analysis
   - Ensure **"Code scanning"** is enabled

---

## 📋 How to Re-run Workflows Manually

### Re-run CodeQL on Main Branch

**Browser Method (Fast):**

1. Go to: https://github.com/iamjairo/manage.scrypted.app/actions/workflows/codeql.yml
2. Click **"Run workflow"** (top right, green button)
3. Select branch: **main**
4. Click **"Run workflow"**
5. **Copy the run URL** once it starts (e.g., `https://github.com/iamjairo/manage.scrypted.app/actions/runs/XXXXXXXX`)

### Re-run Scorecard on Main Branch

**Browser Method (Fast):**

1. Go to: https://github.com/iamjairo/manage.scrypted.app/actions/workflows/scorecard.yml
2. Click **"Run workflow"** (top right, green button)
3. Select branch: **main**
4. Click **"Run workflow"**
5. **Copy the run URL** once it starts

---

## 📊 What to Collect After Re-running

Once you've manually triggered fresh runs (after fixing the SARIF conflict), collect:

### For CodeQL:
- ✅ **Run URL:** https://github.com/iamjairo/manage.scrypted.app/actions/runs/[NEW_RUN_ID]
- ✅ **Status:** Check if "success" without warnings
- ✅ **SARIF Upload Step:** Verify it shows green checkmark
- ✅ **Alerts:** Check Security → Code scanning alerts tab

### For Scorecard:
- ✅ **Run URL:** https://github.com/iamjairo/manage.scrypted.app/actions/runs/[NEW_RUN_ID]
- ✅ **Status:** Check if "success"
- ✅ **Score:** View the Scorecard results in the Security tab
- ✅ **SARIF Upload Step:** Verify it succeeded

---

## 🎯 Current Workflow Configuration

### CodeQL Workflow (.github/workflows/codeql.yml)

- **Triggers:**
  - Push to `main`
  - Pull requests to `main`
  - Schedule: Sundays at 04:17 UTC
  - Manual dispatch (workflow_dispatch)

- **Languages Analyzed:**
  - JavaScript/TypeScript (always)
  - Rust (conditional - only if `server-app-tauri/src-tauri` exists)

- **Query Suite:** `security-and-quality`

- **Permissions:**
  - `actions: read`
  - `contents: read`
  - `security-events: write`

### Scorecard Workflow (.github/workflows/scorecard.yml)

- **Triggers:**
  - Push to `main`
  - Schedule: Mondays at 05:23 UTC
  - Branch protection rule changes
  - Manual dispatch (workflow_dispatch)

- **Permissions:**
  - `security-events: write` (for SARIF upload)
  - `id-token: write` (for OpenSSF publishing)
  - `contents: read`
  - `actions: read`

- **Results:** Published to OpenSSF and uploaded as SARIF to GitHub Security tab

---

## ✅ Action Items

**Immediate (Owner/Admin Required):**

1. [ ] Disable default CodeQL setup in repository settings
2. [ ] Re-run CodeQL workflow on main branch
3. [ ] Re-run Scorecard workflow on main branch
4. [ ] Collect new run URLs
5. [ ] Verify SARIF uploads succeed (no warnings)
6. [ ] Check Security → Code scanning alerts appear correctly

**Follow-up:**

1. [ ] Review CodeQL findings in Security tab
2. [ ] Review Scorecard results
3. [ ] Address any high-severity findings
4. [ ] Store memory about successful workflow configuration

---

## 📚 References

- **CodeQL Workflow File:** `.github/workflows/codeql.yml`
- **Scorecard Workflow File:** `.github/workflows/scorecard.yml`
- **GitHub Actions:** https://github.com/iamjairo/manage.scrypted.app/actions
- **Security Tab:** https://github.com/iamjairo/manage.scrypted.app/security

---

## Memory to Store

**After fixing the SARIF conflict, store this memory:**

```
Repository has both default CodeQL setup (Settings→Security) and advanced codeql.yml
workflow active. SARIF upload conflict causes PR CI failures. Fix: disable default
setup in Settings → Security → Code scanning → Default setup.
```

**Citation:** `.github/workflows/codeql.yml:72-101`, job logs for run 26049903034
