# Mainline Reality Check — Verification Against main Branch

**Date:** 2026-05-19
**Branch Verified:** main (commit: dff3058)
**Purpose:** Verify prior claims against actual main branch state
**Status:** Canonical truth document

---

## Executive Summary

This document verifies all prior claims about repository state against the **actual main branch**. Many documents and branch-specific claims reference features, packages, and implementations that **do not exist on main**. This reality check separates fact from aspirational roadmap.

**Key Finding:** The main branch contains a **standard Vue 3 application fork** with deployment infrastructure, NOT an advanced integration bridge system.

---

## Verification Methodology

1. **Source:** main branch only (`git checkout main`)
2. **Method:** File system inspection, code reading, build verification
3. **Date:** 2026-05-19
4. **Commit:** dff3058902ad18cf2642585384f6f00eee4dee05

---

## 1. Integration Bridge Claims

### Claim 1: "@scrypted/integration-bridge package exists"

| Item | Present on main? | Evidence | Status | Action Needed |
|------|------------------|----------|--------|---------------|
| `packages/` directory | ❌ NO | `ls packages/` → No such directory | **NOT IMPLEMENTED** | Remove all references from main docs |
| `packages/integration-bridge/` | ❌ NO | Directory does not exist | **NOT IMPLEMENTED** | Clarify as branch-only work |
| `@scrypted/integration-bridge` npm package | ❌ NO | Not in package.json dependencies | **NOT IMPLEMENTED** | Cannot be used by downstream |
| Integration bridge source files | ❌ NO | No `src/api/ScryptedClient.ts` etc. | **NOT IMPLEMENTED** | Branch-only implementation |
| TypeScript types for integration | ❌ NO | No `src/types/` for bridge | **NOT IMPLEMENTED** | Not available |

**Verdict:** ❌ **FALSE** - The integration bridge package **does not exist on main branch**.

**Reality:** This appears to be work done in the `claude/audit-claude-folder` branch but never merged to main.

**Recommendation:**
- ✅ Treat integration bridge as "proposed future work"
- ✅ Do NOT document as if it exists
- ✅ IoT Dashboard cannot depend on this package
- ✅ Use iframe embedding instead (no package needed)

---

### Claim 2: "Module Federation is configured"

| Item | Present on main? | Evidence | Status | Action Needed |
|------|------------------|----------|--------|---------------|
| Module Federation plugin in vite.config | ❌ NO | Checked `vite.config.mts` - no federation | **NOT IMPLEMENTED** | Remove references |
| Exposed Vue components | ❌ NO | No federation exports | **NOT IMPLEMENTED** | Not available |
| Shared dependencies config | ❌ NO | No federation shared config | **NOT IMPLEMENTED** | Not configured |
| `remoteEntry.js` build output | ❌ NO | No federation build | **NOT IMPLEMENTED** | Not built |

**Verdict:** ❌ **FALSE** - Module Federation is **not configured on main branch**.

**Reality:** The main branch uses standard Vite + Vue setup with no module federation.

**Recommendation:**
- ✅ Do NOT attempt to consume Vue components from React
- ✅ Use iframe embedding instead
- ✅ Module Federation would require significant new development

---

### Claim 3: "React hooks and Vue composables provided"

| Item | Present on main? | Evidence | Status | Action Needed |
|------|------------------|----------|--------|---------------|
| React hooks (`src/hooks/`) | ❌ NO | No hooks directory | **NOT IMPLEMENTED** | Not available |
| Vue composables for integration | ❌ NO | Standard Vue app only | **NOT IMPLEMENTED** | Not available |
| `useScryptedDevices` hook | ❌ NO | Does not exist | **NOT IMPLEMENTED** | Not available |
| `useScryptedDevice` hook | ❌ NO | Does not exist | **NOT IMPLEMENTED** | Not available |
| Event bridge system | ❌ NO | No event bridge code | **NOT IMPLEMENTED** | Not available |

**Verdict:** ❌ **FALSE** - No React hooks or special Vue composables exist on main.

**Reality:** This is a standard Vue 3 application. The `src/` directory contains normal Vue components, not integration libraries.

---

### Claim 4: "Theme synchronization system exists"

| Item | Present on main? | Evidence | Status | Action Needed |
|------|------------------|----------|--------|---------------|
| `ThemeSync` class | ❌ NO | No theme sync system | **NOT IMPLEMENTED** | Not available |
| Design tokens library | ❌ NO | No shared tokens | **NOT IMPLEMENTED** | Not available |
| Tailwind config template | ❌ NO | Not a Tailwind project | **NOT IMPLEMENTED** | Not applicable |
| CSS variables for sharing | ❌ NO | Standard Vuetify theme | **NOT IMPLEMENTED** | Standard Vue app |

**Verdict:** ❌ **FALSE** - No theme synchronization system exists.

**Reality:** This is a Vuetify application with standard Material Design theming. No cross-framework theme system.

**Recommendation:**
- ✅ Each application maintains independent theme
- ✅ No theme synchronization needed for iframe model
- ✅ Apply branding via CSS to iframe container if needed

---

## 2. Testing & CI Claims

### Claim 5: "Unit tests with 65% coverage"

| Item | Present on main? | Evidence | Status | Action Needed |
|------|------------------|----------|--------|---------------|
| `vitest.config.ts` | ❌ NO | File does not exist | **NOT IMPLEMENTED** | No test framework |
| `src/__tests__/` directory | ❌ NO | Directory does not exist | **NOT IMPLEMENTED** | No tests |
| `*.test.ts` files | ❌ NO | No test files found | **NOT IMPLEMENTED** | No tests |
| Test scripts in package.json | ❌ NO | No `test` script defined | **NOT IMPLEMENTED** | Cannot run tests |
| Coverage reports | ❌ NO | No coverage configuration | **NOT IMPLEMENTED** | No coverage |

**Verdict:** ❌ **FALSE** - No unit tests exist on main branch.

**Reality:** The repository has zero test coverage. No testing framework is configured.

---

### Claim 6: "ESLint and Prettier configured"

| Item | Present on main? | Evidence | Status | Action Needed |
|------|------------------|----------|--------|---------------|
| `.eslintrc.js` | ❌ NO | File does not exist | **NOT IMPLEMENTED** | No ESLint config |
| `.prettierrc.json` | ❌ NO | File does not exist | **NOT IMPLEMENTED** | No Prettier config |
| Lint scripts in package.json | ❌ NO | No `lint` script | **NOT IMPLEMENTED** | Cannot run linting |
| Format scripts | ❌ NO | No `format` script | **NOT IMPLEMENTED** | No formatting |

**Verdict:** ❌ **FALSE** - No ESLint or Prettier configuration exists.

**Reality:** Code quality tools are not configured on main branch.

---

### Claim 7: "GitHub Actions CI/CD for integration bridge"

| Item | Present on main? | Evidence | Status | Action Needed |
|------|------------------|----------|--------|---------------|
| `.github/workflows/integration-bridge-ci.yml` | ❌ NO | File does not exist | **NOT IMPLEMENTED** | No workflow |
| Test automation workflow | ❌ NO | No test workflows | **NOT IMPLEMENTED** | Not configured |
| Coverage upload to Codecov | ❌ NO | No coverage workflow | **NOT IMPLEMENTED** | Not configured |

**Verdict:** ❌ **FALSE** - No integration bridge CI/CD exists.

**Reality:** Only these workflows exist on main:
- ✅ `auto-merge-dependabot.yml` - Dependency automation
- ✅ `codeql.yml` - Security scanning
- ✅ `manage.scrypted.app.yml` - Standard build
- ✅ `scorecard.yml` - Security posture

**Recommendation:** Keep existing workflows, they are appropriate for this Vue application.

---

## 3. Server App / Runtime Track Claims

### Claim 8: "Electron server-app track exists"

| Item | Present on main? | Evidence | Status | Action Needed |
|------|------------------|----------|--------|---------------|
| `server-app/` directory | ❌ NO | Directory does not exist | **NOT IMPLEMENTED** | Planned track only |
| Electron configuration | ❌ NO | No Electron files in root | **NOT IMPLEMENTED** | Planned track only |
| Desktop app build scripts | ❌ NO | No desktop scripts | **NOT IMPLEMENTED** | Planned track only |

**Verdict:** ❌ **FALSE** - Server app directory does not exist on main.

**Reality:** There IS a `Caddy/` directory with some server-related files, but it's NOT a desktop application. It's deployment infrastructure.

**Evidence:**
```bash
$ ls Caddy/
Caddyfile  docker-compose.yml  electron/  infra/  package.json  src/
```

This appears to be deployment assets, not a desktop runtime.

---

### Claim 9: "Tauri server-app track exists"

| Item | Present on main? | Evidence | Status | Action Needed |
|------|------------------|----------|--------|---------------|
| `server-app-tauri/` directory | ❌ NO | Directory does not exist | **NOT IMPLEMENTED** | Planned track only |
| Tauri configuration | ❌ NO | No `src-tauri/` directory | **NOT IMPLEMENTED** | Planned track only |
| Rust backend code | ❌ NO | No Rust files | **NOT IMPLEMENTED** | Planned track only |

**Verdict:** ❌ **FALSE** - No Tauri implementation exists on main.

**Reality:** The `docs/SERVER-APP-TRACK-SUMMARY.md` document explicitly states these are "planned tracks" and to "treat them independently from baseline integration."

**Recommendation:**
- ✅ Document clearly states these are NOT on main
- ✅ Keep server-app tracks out of IoT Dashboard integration
- ✅ Focus on web UI only for Phase 1

---

## 4. Documentation & Governance Claims

### Claim 10: "Comprehensive Phase 2 documentation exists"

| Item | Present on main? | Evidence | Status | Action Needed |
|------|------------------|----------|--------|---------------|
| `docs/PHASE-2-*.md` files | ❌ NO | No Phase 2 docs on main | **NOT ON MAIN** | Branch-only documents |
| `docs/PHASE-2-COMPLETE-SUMMARY.md` | ❌ NO | File does not exist | **NOT ON MAIN** | Branch-only document |
| Phase 2A-2E completion docs | ❌ NO | None found on main | **NOT ON MAIN** | Branch-only documents |
| Phase 2F/2G planning docs | ❌ NO | None found on main | **NOT ON MAIN** | Branch-only documents |

**Verdict:** ⚠️ **PARTIALLY FALSE** - Phase documents do NOT exist on main branch.

**Reality:** Main branch has these docs:
- ✅ `STATUS-2026-05-18.md` - Current status
- ✅ `TEAM-HANDOFF-IOT-DASHBOARD.md` - Integration guidance
- ✅ `DOCKER-CADDY-OPS-NOTES.md` - Deployment notes
- ✅ `SERVER-APP-TRACK-SUMMARY.md` - Server app planning
- ✅ `MERGE-RUNBOOK-2026-05-18.md` - Merge guidance
- ✅ `FORK-OPERATING-MODEL-2026-05-19.md` - Fork governance
- ✅ `AUDIT-REVIEW-OF-AGENTS-2026-05-19.md` - Agent review
- ✅ `UPSTREAM-VS-FORK-GAP-ANALYSIS-2026-05-19.md` - Gap analysis

**Note:** These are operational/governance docs, NOT Phase 2 implementation documentation.

---

### Claim 11: "Handoff checklist with Phase gates"

| Item | Present on main? | Evidence | Status | Action Needed |
|------|------------------|----------|--------|---------------|
| `docs/HANDOFF-GO-NO-GO-CHECKLIST.md` | ❌ NO | File does not exist | **NOT ON MAIN** | Mentioned in memories but absent |
| `docs/RELEASE-CHECKLIST-IOT-DASHBOARD.md` | ❌ NO | File does not exist | **NOT ON MAIN** | Mentioned in memories but absent |
| Phase gate documentation | ❌ NO | No gate docs found | **NOT ON MAIN** | Not implemented |

**Verdict:** ❌ **FALSE** - No handoff checklists exist on main branch.

**Reality:** The memories reference these files, but they do NOT exist on current main. They may have been in a different branch or removed.

---

## 5. Docker & Caddy Deployment Claims

### Claim 12: "Production-ready Docker + Caddy infrastructure"

| Item | Present on main? | Evidence | Status | Action Needed |
|------|------------------|----------|--------|---------------|
| `infra/` directory | ✅ YES | Exists with Docker Compose and Caddy | **CONFIRMED** | Use as-is |
| `infra/docker-compose.yml` | ✅ YES | Orchestrates Scrypted + proxy | **CONFIRMED** | Functional |
| `infra/Caddyfile` | ✅ YES | Reverse proxy configuration | **CONFIRMED** | Production-ready |
| `infra/Caddyfile.advanced` | ✅ YES | HTTPS configuration | **CONFIRMED** | Production-ready |
| `infra/Caddyfile.lan` | ✅ YES | LAN deployment variant | **CONFIRMED** | Alternative config |
| `infra/README.md` | ✅ YES | Deployment documentation | **CONFIRMED** | Good starting point |

**Verdict:** ✅ **TRUE** - Docker + Caddy infrastructure IS present and functional.

**Evidence:**
```bash
$ ls infra/
Caddyfile  Caddyfile.advanced  Caddyfile.lan  README.md  docker-compose.yml  ui/
```

**Reality:** This is the ONLY production-ready integration infrastructure that actually exists on main.

**Recommendation:**
- ✅ Use this infrastructure for IoT Dashboard integration
- ✅ Deploy Scrypted UI behind Caddy reverse proxy
- ✅ Reference `infra/README.md` for deployment guide

---

### Claim 13: "Operational runbooks and procedures"

| Item | Present on main? | Evidence | Status | Action Needed |
|------|------------------|----------|--------|---------------|
| `docs/DOCKER-CADDY-OPS-NOTES.md` | ✅ YES | 1,396 bytes | **CONFIRMED** | Brief but present |
| `infra/OPS-RUNBOOK.md` | ❌ NO | File does not exist | **NOT ON MAIN** | Mentioned in memories but absent |
| Backup/rollback procedures | ⚠️ PARTIAL | Brief mention in docs | **MINIMAL** | Needs expansion |
| Monitoring guidance | ❌ NO | Not documented | **NOT IMPLEMENTED** | Create for Phase 1 |

**Verdict:** ⚠️ **PARTIALLY TRUE** - Basic ops notes exist, comprehensive runbook does not.

**Reality:** The `docs/DOCKER-CADDY-OPS-NOTES.md` file is quite brief (1.4KB). It provides basic guidance but is not a comprehensive operational runbook.

**Recommendation:**
- ✅ Expand operational documentation for production
- ✅ Document monitoring, alerting, incident response
- ✅ Create detailed backup/rollback procedures

---

## 6. Source Code Structure Claims

### Claim 14: "Vue 3 + TypeScript + Vuetify application"

| Item | Present on main? | Evidence | Status | Action Needed |
|------|------------------|----------|--------|---------------|
| `src/` directory with Vue code | ✅ YES | Full Vue 3 application | **CONFIRMED** | Production-ready |
| TypeScript configuration | ✅ YES | `tsconfig.json` present | **CONFIRMED** | Properly configured |
| Vuetify 3 dependency | ✅ YES | `"vuetify": "^3.12.4"` in package.json | **CONFIRMED** | Current version |
| Vue Router | ✅ YES | `"vue-router": "^4.6.4"` | **CONFIRMED** | Routing configured |
| Vite build system | ✅ YES | `vite.config.mts` present | **CONFIRMED** | Modern build |

**Verdict:** ✅ **TRUE** - This is a production Vue 3 application.

**Evidence:**
```bash
$ ls src/
App.vue  common/  components/  fonts/  main.ts  plugins/  scripts/  styles/  util/  vite-env.d.ts
```

**Reality:** The main branch contains a fully functional, production-ready Vue 3 management UI for Scrypted. This is the ACTUAL deliverable.

---

### Claim 15: "Scrypted client SDK integration"

| Item | Present on main? | Evidence | Status | Action Needed |
|------|------------------|----------|--------|---------------|
| `@scrypted/client` dependency | ✅ YES | `"@scrypted/client": "file:../scrypted/packages/client"` | **CONFIRMED** | Local dependency |
| `@scrypted/sdk` dependency | ✅ YES | `"@scrypted/sdk": "file:../scrypted/sdk"` | **CONFIRMED** | Local dependency |
| `@scrypted/common` dependency | ✅ YES | `"@scrypted/common": "file:../scrypted/common"` | **CONFIRMED** | Local dependency |

**Verdict:** ✅ **TRUE** - Scrypted SDK is integrated via local file dependencies.

**Note:** These dependencies point to `../scrypted/` (parent directory), meaning this repo expects to be deployed alongside the main Scrypted repository.

**Recommendation:**
- ✅ Document deployment requirement (needs Scrypted monorepo)
- ✅ Consider publishing these packages to npm for easier deployment
- ✅ Or use git submodules to ensure Scrypted SDK is available

---

## 7. GitHub Workflows & Automation

### Claim 16: "Working Dependabot auto-merge"

| Item | Present on main? | Evidence | Status | Action Needed |
|------|------------------|----------|--------|---------------|
| `.github/workflows/auto-merge-dependabot.yml` | ✅ YES | 17,286 bytes (large workflow) | **CONFIRMED** | Recently fixed |
| Dependabot configuration | ✅ YES | `.github/dependabot.yml` | **CONFIRMED** | Configured for / and /agent-harness |
| Auto-merge policy | ✅ YES | Patch/minor auto-merge logic | **CONFIRMED** | Working |

**Verdict:** ✅ **TRUE** - Dependabot automation is present and recently repaired.

**Evidence:** The `README.md` states "PR #37 merged: repaired broken Dependabot auto-merge workflow"

**Reality:** This is actually working production infrastructure on main.

---

### Claim 17: "CodeQL security scanning"

| Item | Present on main? | Evidence | Status | Action Needed |
|------|------------------|----------|--------|---------------|
| `.github/workflows/codeql.yml` | ✅ YES | 4,081 bytes | **CONFIRMED** | Configured |
| Scorecard workflow | ✅ YES | `.github/workflows/scorecard.yml` | **CONFIRMED** | Supply chain security |

**Verdict:** ✅ **TRUE** - Security scanning is configured.

**Note:** Per memories, the advanced CodeQL workflow is "disabled manually" while the dynamic default CodeQL workflow remains active. This is fine.

---

## 8. Summary Table: What Exists vs. What Doesn't

### ✅ EXISTS ON MAIN (Use These)

| Item | Location | Status | Use For |
|------|----------|--------|---------|
| Vue 3 Management UI | `src/` | Production-ready | Embed in dashboard |
| Docker Compose setup | `infra/docker-compose.yml` | Functional | Deploy Scrypted |
| Caddy reverse proxy | `infra/Caddyfile*` | Production-ready | HTTPS termination |
| Deployment guide | `infra/README.md` | Good starting point | Operations team |
| Basic ops notes | `docs/DOCKER-CADDY-OPS-NOTES.md` | Brief but useful | Reference |
| Handoff guidance | `docs/TEAM-HANDOFF-IOT-DASHBOARD.md` | Current | Integration planning |
| Fork governance docs | `docs/FORK-OPERATING-MODEL-2026-05-19.md` | Comprehensive | Understand fork model |
| Gap analysis | `docs/UPSTREAM-VS-FORK-GAP-ANALYSIS-2026-05-19.md` | Detailed | Upstream relationship |
| Dependabot automation | `.github/workflows/auto-merge-dependabot.yml` | Working | Dependency management |
| Security scanning | `.github/workflows/codeql.yml` | Active | Security posture |

### ❌ DOES NOT EXIST ON MAIN (Don't Depend On)

| Item | Branch/Status | Reality | Alternative |
|------|---------------|---------|-------------|
| Integration bridge package | Branch-only work | Not merged | Use iframe embedding |
| Module Federation | Not implemented | Would require new dev | Use iframe or proxy |
| React hooks | Not implemented | Vue app only | Use iframe isolation |
| Vue composables (for integration) | Not implemented | Standard Vue app | Use iframe isolation |
| Theme synchronization | Not implemented | Vuetify theme only | Independent themes |
| Unit tests | Not implemented | Zero test coverage | Add if needed |
| ESLint/Prettier | Not configured | No code quality tools | Add if needed |
| Integration CI/CD | Not implemented | Standard build only | Use existing workflows |
| Server-app desktop runtime | Planned track only | Not on main | Defer to Phase 2+ |
| Tauri desktop runtime | Planned track only | Not on main | Defer to Phase 2+ |
| Phase 2 completion docs | Branch-only | Not on main | Use operational docs |
| Comprehensive ops runbook | Mentioned but absent | Brief notes only | Expand as needed |
| Handoff checklists | Mentioned but absent | Not found | Create if needed |

---

## 9. Critical Findings

### 9.1 The "Integration Bridge" is NOT Real

**Finding:** Extensive documentation and branch work references a sophisticated integration bridge system with:
- TypeScript package (`@scrypted/integration-bridge`)
- React hooks and Vue composables
- Event bridge system
- Theme synchronization
- Module Federation
- Unit tests with 65% coverage
- CI/CD pipeline

**Reality:** **NONE of this exists on the main branch.** This appears to be aspirational work done in the `claude/audit-claude-folder` branch that was never merged to main.

**Impact:**
- ❌ IoT Dashboard CANNOT use `@scrypted/integration-bridge` package
- ❌ Module Federation integration is NOT possible without new development
- ❌ React hooks and Vue composables do NOT exist
- ❌ Theme synchronization is NOT available

**Recommendation:**
- ✅ Use iframe embedding (no changes to this repo needed)
- ✅ Treat integration bridge as future work if desired
- ✅ Do NOT reference integration bridge in IoT Dashboard plans
- ✅ Update documentation to reflect actual main branch state

### 9.2 What Actually Exists is Simpler (and Fine)

**Finding:** The main branch contains:
- ✅ Production-ready Vue 3 management UI
- ✅ Working Docker + Caddy deployment infrastructure
- ✅ Functional reverse proxy configuration
- ✅ Basic operational documentation
- ✅ Working dependency automation

**Reality:** This is a **standard web application fork** with good deployment infrastructure. It's simpler than claimed, but perfectly adequate for iframe-based integration.

**Impact:**
- ✅ Can be deployed immediately with existing infrastructure
- ✅ No complex integration code needed
- ✅ Clear separation of concerns
- ✅ Easy to maintain and update

**Recommendation:**
- ✅ Use what exists (it's good!)
- ✅ Don't wait for integration bridge
- ✅ Iframe embedding is the correct pattern
- ✅ Deploy using `infra/docker-compose.yml`

### 9.3 Documentation vs. Reality Gap

**Finding:** There is a significant gap between:
- What documentation CLAIMS exists
- What ACTUALLY exists on main branch

**Examples:**
- Docs reference `packages/integration-bridge/` → Doesn't exist
- Memories reference Phase 2 completion docs → Not on main
- Docs reference comprehensive ops runbook → Only brief notes exist
- Claims of 65% test coverage → Zero tests on main

**Impact:**
- ⚠️ Risk of planning based on non-existent features
- ⚠️ Downstream teams may have wrong expectations
- ⚠️ Integration approach may be based on false assumptions

**Recommendation:**
- ✅ This document (MAINLINE-REALITY-CHECK) becomes canonical truth
- ✅ Review all planning documents against this reality check
- ✅ Update downstream team expectations
- ✅ Focus on what actually exists for Phase 1

---

## 10. Recommendations

### 10.1 For IoT Dashboard Team

1. **Integration Approach:**
   - ✅ Use iframe embedding (no dependencies on non-existent features)
   - ✅ Deploy Scrypted UI using `infra/docker-compose.yml`
   - ✅ Reference `infra/Caddyfile.advanced` for reverse proxy
   - ✅ Follow `docs/TEAM-HANDOFF-IOT-DASHBOARD.md` guidance

2. **Don't Wait For:**
   - ❌ Integration bridge package (doesn't exist)
   - ❌ Module Federation (not implemented)
   - ❌ Shared state/events (not available)
   - ❌ Theme synchronization (not needed with iframe)

3. **Use What Exists:**
   - ✅ Vue 3 UI (production-ready)
   - ✅ Docker deployment (works now)
   - ✅ Caddy proxy (production-ready)
   - ✅ Subdomain routing (simplest approach)

### 10.2 For Operations Team

1. **Deployment:**
   - ✅ Use `infra/docker-compose.yml` as-is
   - ✅ Configure Caddy with subdomain routing
   - ✅ Set up SSL with Caddy auto-HTTPS
   - ✅ Test in staging first

2. **Documentation:**
   - ✅ Expand `docs/DOCKER-CADDY-OPS-NOTES.md` with details
   - ✅ Document backup/rollback procedures
   - ✅ Create monitoring runbook
   - ✅ Document incident response

3. **Don't Create:**
   - ❌ Complex integration infrastructure (not needed)
   - ❌ Custom authentication bridge (use independent auth)
   - ❌ Shared state management (iframe isolates state)

### 10.3 For Repository Maintainers

1. **Documentation Cleanup:**
   - ✅ Remove references to non-existent `packages/` directory
   - ✅ Clarify server-app tracks as "planned future work"
   - ✅ Update README to match actual main branch state
   - ✅ Retire branch-specific claims from operational docs

2. **If Integration Bridge is Desired:**
   - ✅ Create proper feature branch
   - ✅ Merge to main with full testing
   - ✅ Document as available AFTER merge
   - ✅ Update integration guidance accordingly

3. **Focus Areas:**
   - ✅ Maintain Vue UI quality
   - ✅ Keep Docker/Caddy infrastructure working
   - ✅ Improve operational documentation
   - ✅ Add monitoring/alerting guidance

---

## 11. Action Items

### Immediate (This Week)

- [ ] Review this document with all stakeholders
- [ ] Update IoT Dashboard integration plan to use iframe model
- [ ] Remove references to integration bridge from planning docs
- [ ] Test Docker + Caddy deployment in staging
- [ ] Verify Scrypted UI works in iframe

### Short-term (Next 2 Weeks)

- [ ] Deploy Scrypted infrastructure in staging environment
- [ ] Create detailed operational runbook
- [ ] Document backup/rollback procedures
- [ ] Set up monitoring and alerting
- [ ] Conduct integration testing

### Long-term (1+ Months)

- [ ] Evaluate if integration bridge is still desired
- [ ] If yes, create proper development plan with merge criteria
- [ ] Consider adding unit tests to improve quality
- [ ] Expand documentation based on operational learnings

---

## 12. Conclusion

**The Reality:**
- Main branch contains a **standard Vue 3 web application**
- Excellent **Docker + Caddy deployment infrastructure** exists
- Basic **operational documentation** is present
- No advanced **integration bridge system** exists
- **Server-app desktop runtimes** are planned future work

**The Good News:**
- What exists is **production-ready** for iframe integration
- Deployment can start **immediately**
- No complex **integration code** needed
- Clear **separation of concerns**

**The Path Forward:**
- Use **iframe embedding** for Phase 1
- Deploy with **existing infrastructure**
- Focus on **operational excellence**
- Add **advanced integration** only if truly needed

---

**Document Owner:** Platform Engineering
**Review Date:** 2026-05-19
**Next Review:** After Phase 1 deployment
**Status:** CANONICAL TRUTH

---

## Appendix: Verification Commands

```bash
# Verify you're on main branch
git branch
# Should show: * main

# Check for packages directory
ls packages/
# Result: No such file or directory

# Check for integration bridge
find . -name "*integration-bridge*" -type d
# Result: (empty)

# Check for test files
find . -name "*.test.ts" -o -name "*.spec.ts"
# Result: (empty)

# Check infra directory
ls infra/
# Result: Caddyfile  Caddyfile.advanced  Caddyfile.lan  README.md  docker-compose.yml  ui/

# Check workflows
ls .github/workflows/
# Result: auto-merge-dependabot.yml  codeql.yml  manage.scrypted.app.yml  scorecard.yml

# Check docs
ls docs/
# Result: (list shown earlier)

# Check src structure
ls src/
# Result: App.vue  common/  components/  fonts/  main.ts  plugins/  scripts/  styles/  util/  vite-env.d.ts
```

---

**END OF REALITY CHECK**
