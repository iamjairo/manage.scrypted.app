# Repository Cleanup Plan

**Date:** 2026-05-19
**Target Branch:** main
**Purpose:** Consolidate, archive, and remove artifacts for clean IoT Dashboard handoff
**Status:** Execution plan pending approval

---

## Executive Summary

This plan addresses duplicate artifacts, stale references, and ambiguous documentation to prepare a clean baseline for IoT Dashboard integration. The goal is to eliminate confusion about what exists on main vs. what exists only in feature branches.

**Guiding Principles:**
1. **Keep**: Production-ready, main-branch-verified assets
2. **Archive**: Historical artifacts with value for reference
3. **Remove**: Stale, duplicate, or misleading content
4. **Move**: Branch-specific work to appropriate branch context

---

## 1. Duplicate Audit Artifacts

### 1.1 Branch-Only Audit Documents

**Issue:** The `claude/audit-claude-folder` branch contains extensive audit and phase documentation that does NOT reflect main branch reality.

**Files on branch (NOT on main):**
- `AUDIT-SUMMARY-2026-05-19.md` (1,100+ lines)
- All Phase 2A-2E completion docs (branch-only)
- Integration bridge implementation claims (not on main)
- Test coverage reports (not on main)

**Action:** ✅ **KEEP on branch, DO NOT MERGE to main**

**Rationale:**
- These documents describe branch-specific work
- Would confuse downstream teams about what exists
- Main branch has accurate operational docs already

**Execution:**
1. Add README to `claude/audit-claude-folder` branch explaining scope
2. Tag branch as "exploratory-integration-work-not-merged"
3. Do NOT merge to main
4. Reference branch in docs as "proposed future work" if desired

---

### 1.2 Duplicate Status/Handoff Documents

**Current state on main:**
```
docs/
├── STATUS-2026-05-18.md                    ← Current, keep
├── TEAM-HANDOFF-IOT-DASHBOARD.md          ← Current, keep
├── AUDIT-REVIEW-OF-AGENTS-2026-05-19.md   ← Recent, keep
└── ... (other docs)
```

**Action:** ✅ **KEEP - No duplicates on main**

**Rationale:** Main branch documentation is clean and current.

---

## 2. Stale Branch-Specific References

### 2.1 README.md References

**Current state:**
```markdown
<!-- README.md line 28-29 -->
## Important operational note
Some docs/PR streams reference `server-app/` and `server-app-tauri/`.
If those directories are not yet on `main`, treat them as planned tracks until merged.
```

**Issue:** This acknowledges missing directories but doesn't clarify they're planned future work.

**Action:** ✅ **UPDATE** to clarify status

**Proposed change:**
```markdown
## Important operational note
Some docs reference `server-app/` and `server-app-tauri/` directories.
These are **planned future tracks** and do NOT exist on main branch.
For IoT Dashboard integration, use the Vue UI with iframe embedding (no desktop runtime needed).
```

**Execution:**
1. Update README.md with clearer language
2. Add note about iframe being recommended integration model
3. Remove ambiguity about "when merged" (may never merge)

---

### 2.2 docs/SERVER-APP-TRACK-SUMMARY.md

**Current state:** Document describes Electron and Tauri tracks as "tracks exist in PR/workstream context"

**Issue:** Could be interpreted as "exists somewhere" vs. "planned future work"

**Action:** ✅ **UPDATE** to clarify these are proposals, not implementations

**Proposed addition to file:**
```markdown
## STATUS CLARIFICATION (2026-05-19)

These server app tracks are **proposed future work** and do NOT exist on main branch:
- No `server-app/` directory on main
- No `server-app-tauri/` directory on main
- No desktop runtime implementation on main

For Phase 1 IoT Dashboard integration, these tracks are **out of scope**.
Use web UI only with iframe embedding.
```

**Execution:**
1. Prepend status clarification to existing document
2. Keep existing content as "if we build this..." guidance
3. Make it clear this is NOT blocking integration

---

### 2.3 docs/INDEX.md References

**Current state:** INDEX lists `SERVER-APP-TRACK-SUMMARY.md` in operations docs

**Action:** ✅ **UPDATE** with clarification note

**Proposed change:**
```markdown
## Operations docs

- **Docker + Caddy operator notes**
  - [`DOCKER-CADDY-OPS-NOTES.md`](DOCKER-CADDY-OPS-NOTES.md)

- **Server app track summary (Electron/Tauri)** *[Planned future work]*
  - [`SERVER-APP-TRACK-SUMMARY.md`](SERVER-APP-TRACK-SUMMARY.md)
```

**Execution:** Add *[Planned future work]* marker inline

---

## 3. Runtime Track References

### 3.1 Caddy/ Directory Confusion

**Current state:**
```
Caddy/
├── Caddyfile
├── docker-compose.yml
├── electron/          ← What is this?
├── infra/
├── package.json
└── src/
```

**Issue:** The `Caddy/electron/` directory suggests desktop runtime, but this is actually deployment infrastructure.

**Action:** ✅ **INVESTIGATE and CLARIFY**

**Execution:**
1. Read contents of `Caddy/electron/` directory
2. If it's deployment-related, rename or document clearly
3. If it's abandoned experiment, consider removing
4. If it's actual feature, document in README

**Investigation needed:**
```bash
ls -la Caddy/electron/
cat Caddy/README.md 2>/dev/null || echo "No README"
```

---

### 3.2 "Development IoT-Dashboard" Directory

**Current state:**
```
Development IoT-Dashboard/
└── (unknown contents)
```

**Issue:** Root-level directory with unclear purpose

**Action:** ⚠️ **INVESTIGATE** - could be work-in-progress or old artifact

**Execution:**
1. Examine directory contents
2. If it's draft integration work, move to separate feature branch
3. If it's old artifact, remove or archive
4. If it's current, document in README and INDEX

**Investigation needed:**
```bash
ls -la "Development IoT-Dashboard/"
find "Development IoT-Dashboard/" -type f | head -20
```

---

### 3.3 CLAUDE_AUDIT_FIX Directory

**Current state:**
```
CLAUDE_AUDIT_FIX/
└── (unknown contents)
```

**Issue:** Root-level directory with unclear purpose, likely temporary

**Action:** ⚠️ **INVESTIGATE and likely REMOVE**

**Execution:**
1. Examine directory contents
2. If it contains fixes, apply them properly
3. Remove temporary directory from main
4. Should not be in root of production repository

**Investigation needed:**
```bash
ls -la CLAUDE_AUDIT_FIX/
```

---

## 4. GitHub Pages Noise

### 4.1 CNAME File

**Current state:**
```
CNAME  ← File exists in root
```

**Action:** ✅ **VERIFY** purpose

**Execution:**
1. Read CNAME file contents
2. If used for GitHub Pages, keep and document
3. If not used, remove
4. Clarify in README if GitHub Pages is active

**Investigation:**
```bash
cat CNAME
```

---

### 4.2 GitHub Pages Configuration

**Action:** ✅ **AUDIT** GitHub repository settings

**Check:**
- Is GitHub Pages enabled for this repository?
- What branch/folder is configured?
- Is it serving useful content or just noise?

**If enabled but not useful:**
1. Disable GitHub Pages in repository settings
2. Remove CNAME file
3. Document deployment model (Docker only)

**If enabled and useful:**
1. Document in README
2. Add section to INDEX.md
3. Clarify relationship to main deployment

---

## 5. Canonical vs. Superseded Docs

### 5.1 Documentation Audit Matrix

| Document | Status | Keep/Archive/Remove | Notes |
|----------|--------|---------------------|-------|
| **Operational (Keep)** |
| `STATUS-2026-05-18.md` | Current | ✅ KEEP | Latest status |
| `TEAM-HANDOFF-IOT-DASHBOARD.md` | Current | ✅ KEEP | Integration guidance |
| `DOCKER-CADDY-OPS-NOTES.md` | Current | ✅ KEEP | Deployment notes |
| `INDEX.md` | Current | ✅ KEEP + UPDATE | Needs clarifications |
| **Governance (Keep)** |
| `FORK-OPERATING-MODEL-2026-05-19.md` | Current | ✅ KEEP | Fork governance |
| `AUDIT-REVIEW-OF-AGENTS-2026-05-19.md` | Current | ✅ KEEP | Agent review |
| `UPSTREAM-VS-FORK-GAP-ANALYSIS-2026-05-19.md` | Current | ✅ KEEP | Gap analysis |
| **Planning (Clarify)** |
| `SERVER-APP-TRACK-SUMMARY.md` | Planning | ✅ KEEP + UPDATE | Add status clarification |
| `MERGE-RUNBOOK-2026-05-18.md` | Operational | ✅ KEEP | PR merge guidance |
| **NEW (Add)** |
| `IOT-DASHBOARD-INTEGRATION-BOUNDARY-2026-05-19.md` | New | ✅ ADD | Integration contract |
| `MAINLINE-REALITY-CHECK-2026-05-19.md` | New | ✅ ADD | Truth document |
| `REPO-CLEANUP-PLAN-2026-05-19.md` | New | ✅ ADD | This document |
| `DEVELOPER-INTEGRATION-STARTER-2026-05-19.md` | New | ✅ ADD | Developer handoff |

### 5.2 Superseded Documents

**Check for old status docs:**
```bash
find docs/ -name "STATUS-*.md" -o -name "HANDOFF-*.md" | sort
```

**Action:** If older versions exist:
1. Archive to `docs/archive/` subdirectory
2. Update INDEX.md to reference current versions only
3. Add README in archive explaining historical context

---

## 6. Execution Order

### Phase 1: Investigation (Day 1)

1. ✅ **Investigate unclear directories**
   ```bash
   ls -la "Development IoT-Dashboard/"
   ls -la "CLAUDE_AUDIT_FIX/"
   ls -la "Caddy/electron/"
   cat CNAME
   ```

2. ✅ **Check for duplicate/old docs**
   ```bash
   find docs/ -name "*.md" | sort
   ```

3. ✅ **Review GitHub Pages settings**
   - Check repository settings → Pages
   - Document findings

**Deliverable:** Investigation report with recommendations

---

### Phase 2: Safe Cleanup (Day 2)

1. ✅ **Update existing docs** (low risk)
   - Update README.md with clarifications
   - Update SERVER-APP-TRACK-SUMMARY.md with status
   - Update INDEX.md with markers
   - Update docs with reality check references

2. ✅ **Add new docs** (no risk)
   - Add IOT-DASHBOARD-INTEGRATION-BOUNDARY-2026-05-19.md ✓
   - Add MAINLINE-REALITY-CHECK-2026-05-19.md ✓
   - Add REPO-CLEANUP-PLAN-2026-05-19.md (this doc) ✓
   - Add DEVELOPER-INTEGRATION-STARTER-2026-05-19.md (pending)

3. ✅ **Create archive structure** (safe)
   ```bash
   mkdir -p docs/archive
   echo "# Documentation Archive" > docs/archive/README.md
   ```

**Deliverable:** Updated documentation, no deletions yet

---

### Phase 3: Structural Cleanup (Day 3)

**⚠️ CAUTION: This phase modifies repository structure**

1. **Remove temporary directories** (if investigation confirms)
   ```bash
   # Only if confirmed as temporary
   git rm -rf CLAUDE_AUDIT_FIX/
   git rm -rf "Development IoT-Dashboard/"  # If obsolete
   ```

2. **Archive old docs** (if any found)
   ```bash
   git mv docs/OLD-DOC.md docs/archive/
   ```

3. **Clean up Caddy/ structure** (if needed)
   ```bash
   # Based on investigation findings
   ```

4. **Update .gitignore** (if needed)
   ```bash
   echo "" >> .gitignore
   echo "# Temporary audit/development directories" >> .gitignore
   echo "CLAUDE_AUDIT_FIX/" >> .gitignore
   ```

**Deliverable:** Clean repository structure

---

### Phase 4: Verification (Day 4)

1. **Test build and deployment**
   ```bash
   npm install
   npm run build
   cd infra && docker compose config
   ```

2. **Verify documentation links**
   - Check all internal links in markdown files
   - Verify INDEX.md references correct files
   - Test that all referenced files exist

3. **Review with stakeholders**
   - Present cleanup changes
   - Get approval for structural changes
   - Address feedback

**Deliverable:** Verified clean repository

---

### Phase 5: Finalization (Day 5)

1. **Commit cleanup changes**
   ```bash
   git add -A
   git commit -m "docs: Pre-handoff repository cleanup

   - Clarified server-app tracks as planned future work
   - Updated INDEX.md with status markers
   - Archived old documentation
   - Removed temporary directories
   - Added integration boundary and reality check docs

   See docs/REPO-CLEANUP-PLAN-2026-05-19.md for details"
   ```

2. **Update INDEX.md final version**
   - Reference all new docs
   - Add "Pre-Handoff Cleanup" section
   - Mark this cleanup as complete

3. **Tag repository state**
   ```bash
   git tag -a pre-iot-dashboard-handoff-2026-05-19 -m "Clean baseline before IoT Dashboard integration"
   git push origin pre-iot-dashboard-handoff-2026-05-19
   ```

**Deliverable:** Tagged, clean baseline for handoff

---

## 7. Directory-Specific Recommendations

### 7.1 Root-Level Directories (Keep)

```
✅ src/                 - Vue application source (production)
✅ infra/               - Deployment infrastructure (production)
✅ docs/                - Documentation (production)
✅ .github/             - Workflows and templates (production)
✅ Caddy/               - Alternate deployment config (verify contents)
✅ agent-harness/       - LLM harness (production feature)
✅ public/              - Static assets (production)
✅ scripts/             - Utility scripts (production)
```

### 7.2 Root-Level Directories (Investigate)

```
⚠️ CLAUDE_AUDIT_FIX/          - Likely temporary, investigate and remove
⚠️ Development IoT-Dashboard/ - Unclear purpose, investigate
```

### 7.3 Root-Level Files (Keep)

```
✅ README.md                  - Main readme (update)
✅ package.json               - Dependencies (production)
✅ package-lock.json          - Lock file (production)
✅ vite.config.mts            - Build config (production)
✅ tsconfig.json              - TypeScript config (production)
✅ index.html                 - Entry point (production)
✅ SECURITY.md                - Security policy (production)
✅ .gitignore                 - Git config (production)
✅ cleanup-prs.sh             - Utility script (production)
```

### 7.4 Root-Level Files (Verify)

```
⚠️ CNAME                      - Verify if GitHub Pages is used
```

---

## 8. Branch Management Recommendations

### 8.1 Feature Branches to Archive

**Branches that should NOT be merged to main:**

```
claude/audit-claude-folder          - Contains branch-specific audit work
                                      Keep as reference, do not merge

copilot/audit-claude-folder-changes - Similar scope, evaluate for archival

copilot/claude-audit-fix            - Evaluate if fixes are needed on main
```

**Action:**
1. Tag these branches for historical reference
2. Document what they contain in branch README
3. Do NOT merge to main unless properly scoped
4. Consider creating `archive/` remote branch namespace

### 8.2 Pull Request Hygiene

**Per existing MERGE-RUNBOOK guidance:**
1. Merge Dependabot audit workflow PR
2. Merge repo hygiene combined PR
3. Merge docs rebase PR (after link verification)
4. Close superseded legacy PRs (#7, #9, #12, etc.)
5. Keep #34 draft/do-not-merge

**Additional:**
- Close any PRs referencing integration bridge (not on main)
- Close any PRs referencing server-app tracks (not on main)
- Document PR closure reasoning for future reference

---

## 9. Documentation Standards Going Forward

### 9.1 New Documentation Guidelines

**Required elements for new docs:**
- Date stamp in filename (YYYY-MM-DD)
- "Present on main branch: YES/NO" declaration at top
- Clear audience statement
- Links to related canonical docs
- Status (Draft/Review/Approved/Superseded)

**Example header:**
```markdown
# Document Title

**Date:** 2026-05-19
**On Main Branch:** YES
**Audience:** Operations team
**Status:** Approved
**Related:** [Link to related doc]
```

### 9.2 Documentation Lifecycle

```
Draft → Review → Approved → Superseded → Archived
```

**Process:**
1. New docs start as Draft
2. Stakeholder review moves to Review
3. Approval moves to Approved
4. When replaced, mark as Superseded
5. Move to docs/archive/ after 90 days
6. Update INDEX.md throughout

### 9.3 Branch-Specific Documentation

**Rule:** If documentation describes work NOT on main branch:
- Must be kept ON that branch
- Must NOT be in main branch docs/
- Can be referenced as "proposed work" from main
- Must clearly state "NOT ON MAIN" in header

---

## 10. Success Criteria

### 10.1 Clean Repository Checklist

- [ ] No ambiguous directories in root
- [ ] No temporary/debug directories
- [ ] All docs clearly marked as on-main or planning
- [ ] INDEX.md references current docs only
- [ ] No broken links in documentation
- [ ] GitHub Pages status clarified
- [ ] Branch strategy documented
- [ ] Archive structure created

### 10.2 Documentation Quality Checklist

- [ ] All docs have date stamps
- [ ] All docs declare if on main branch
- [ ] All technical claims verified against main
- [ ] Integration guidance reflects reality
- [ ] No references to non-existent features
- [ ] Server-app tracks clearly marked as planned
- [ ] Integration bridge marked as not-on-main

### 10.3 Handoff Readiness Checklist

- [ ] Clear integration boundary document
- [ ] Reality check document complete
- [ ] Developer starter guide created
- [ ] Cleanup plan documented (this doc)
- [ ] INDEX.md updated with all new docs
- [ ] Repository tagged for handoff baseline

---

## 11. Rollback Plan

If cleanup causes issues:

1. **Immediate rollback:**
   ```bash
   git revert <cleanup-commit>
   git push origin main
   ```

2. **Restore from tag:**
   ```bash
   git checkout <tag-before-cleanup>
   git checkout -b restore-pre-cleanup
   git push origin restore-pre-cleanup
   ```

3. **Selective restoration:**
   ```bash
   git checkout <commit> -- path/to/file
   ```

**No destructive actions** are planned without backup:
- All moves to archive preserve history
- All removals will be reviewed first
- Tag created before cleanup for safety

---

## 12. Review and Approval

**Stakeholders:**
- [ ] Repository maintainer (approval)
- [ ] IoT Dashboard team lead (review)
- [ ] Operations team lead (review)
- [ ] Technical lead (approval)

**Review criteria:**
- Does this cleanup support IoT Dashboard integration?
- Are we removing anything production-critical?
- Is the execution order safe?
- Are rollback procedures adequate?

**Approval required before:**
- Removing any directories
- Archiving any documentation
- Disabling GitHub Pages
- Structural changes to repository

---

## 13. Post-Cleanup Verification

### 13.1 Smoke Tests

```bash
# 1. Build succeeds
npm install && npm run build

# 2. Docker config valid
cd infra && docker compose config

# 3. All doc links work
# (Use link checker tool)

# 4. README references correct structure
grep -r "server-app/" README.md  # Should have clarification

# 5. No broken references
grep -r "packages/integration-bridge" docs/  # Should be none on main
```

### 13.2 Documentation Review

- [ ] Read through INDEX.md from fresh perspective
- [ ] Verify all linked docs exist
- [ ] Check that reality check is referenced
- [ ] Confirm integration boundary is clear
- [ ] Test that developer starter guide is useful

---

## 14. Timeline

| Phase | Duration | Start | Deliverable |
|-------|----------|-------|-------------|
| Investigation | 1 day | Day 1 | Investigation report |
| Safe Cleanup | 1 day | Day 2 | Updated docs, no deletions |
| Structural Cleanup | 1 day | Day 3 | Clean structure |
| Verification | 1 day | Day 4 | Tested clean repository |
| Finalization | 1 day | Day 5 | Tagged baseline |
| **Total** | **5 days** | | **Clean handoff** |

**Can be compressed to 2-3 days if investigation is quick and structural changes are minimal.**

---

## 15. Next Steps

### Immediate (Today)

1. ✅ Complete this cleanup plan document
2. ✅ Create developer integration starter guide
3. ✅ Update INDEX.md with all new docs
4. ⏳ Review with stakeholders

### Short-term (This Week)

1. ⏳ Conduct Phase 1 investigation
2. ⏳ Execute Phase 2 safe cleanup
3. ⏳ Get approval for structural changes
4. ⏳ Execute Phase 3 structural cleanup

### Medium-term (Next Week)

1. ⏳ Complete verification
2. ⏳ Tag repository baseline
3. ⏳ Announce clean handoff to teams
4. ⏳ Begin Phase 1 integration work

---

## 16. Questions and Decisions

### Open Questions

1. **Q:** Should we disable GitHub Pages?
   **A:** TBD after investigation

2. **Q:** What to do with `Development IoT-Dashboard/` directory?
   **A:** TBD after investigation

3. **Q:** Should we create `docs/archive/` structure?
   **A:** Yes, proceed

4. **Q:** Archive branches or just document them?
   **A:** Document in branch README, consider tagging

### Decisions Required

1. **Approval to remove temporary directories** (if confirmed as temp)
2. **Approval to archive old documentation** (if any found)
3. **Approval to update README with clarifications**
4. **Approval to tag repository for handoff baseline**

---

## Document Maintenance

**Owner:** Repository Maintainer
**Review:** Before each execution phase
**Updates:** As cleanup progresses
**Status:** Living document until cleanup complete

---

**END OF CLEANUP PLAN**
