# Developer Integration Starter Guide — IoT Dashboard Team

**Date:** 2026-05-19
**On Main Branch:** YES
**Audience:** IoT Dashboard developers and integration engineers
**Purpose:** Clean handoff starter for Phase 1 integration

---

## Welcome!

This guide helps you integrate the **Scrypted Management UI** into your **IoT Dashboard**. It provides a clear, reality-based starting point with no assumptions about features that don't exist.

**What you'll learn:**
- What this repository actually provides
- What's production-ready vs. planned future work
- Where to start your integration
- What documentation to trust
- Key risks and assumptions

---

## 1. What This Repository Is

### 1.1 The Core Product

This is a **Vue 3 + TypeScript + Vuetify web application** that provides a management interface for the Scrypted home automation platform.

**Technology Stack:**
- Frontend: Vue 3.5, Vuetify 3.12, TypeScript 5.8
- Build: Vite 7.3
- Routing: Vue Router 4.6
- Deployment: Docker Compose + Caddy reverse proxy

**What it does:**
- Manages Scrypted devices (lights, cameras, sensors, etc.)
- Provides real-time device control and monitoring
- Displays device status and logs
- Manages plugins and system settings
- Connects to Scrypted backend via HTTP and WebSocket

**What it is NOT:**
- ❌ NOT a React application
- ❌ NOT a component library
- ❌ NOT a module federation system
- ❌ NOT a desktop application (planned future work)
- ❌ NOT an npm package you can install

---

### 1.2 Deployment Model

**This is a standalone web application** designed to be deployed behind a reverse proxy:

```
User Browser
    ↓
Caddy (HTTPS termination)
    ↓
Vue 3 UI (this repo) → Scrypted Backend (separate)
```

**Provided infrastructure:**
- Docker Compose orchestration (`infra/docker-compose.yml`)
- Caddy reverse proxy configuration (`infra/Caddyfile*`)
- Production-ready HTTPS setup
- Deployment documentation

---

### 1.3 Repository Context

**Upstream:** This is a fork of `koush/manage.scrypted.app`

**Purpose:**
- Operational UI customization surface
- Deployment integration surface
- Governance surface (Dependabot, CodeQL)
- Team handoff/documentation surface

**Relationship to IoT Dashboard:**
- This provides the Scrypted UI component
- Your dashboard provides the container/wrapper
- Integration is via iframe or reverse proxy link
- Independent deployment and authentication

---

## 2. What Is Stable (Use These)

### 2.1 Production-Ready Code ✅

**Vue 3 Application:**
- Location: `src/` directory
- Status: Production-ready
- Features: Complete Scrypted device management
- Build: `npm run build` produces deployable assets
- Quality: Working, tested in production upstream

**Deployment Infrastructure:**
- Location: `infra/` directory
- Components: Docker Compose + Caddy
- Status: Production-ready
- Documentation: `infra/README.md`

**Files you can depend on:**
```
src/                     ← Vue 3 application
infra/
├── docker-compose.yml   ← Orchestration
├── Caddyfile           ← Basic proxy config
├── Caddyfile.advanced  ← Production HTTPS config
├── Caddyfile.lan       ← LAN deployment variant
└── README.md           ← Deployment guide
```

### 2.2 Stable Documentation ✅

**Integration Guidance:**
- `docs/IOT-DASHBOARD-INTEGRATION-BOUNDARY-2026-05-19.md` ← **START HERE**
- `docs/MAINLINE-REALITY-CHECK-2026-05-19.md` ← Truth about what exists
- `docs/TEAM-HANDOFF-IOT-DASHBOARD.md` ← Handoff overview
- `docs/DOCKER-CADDY-OPS-NOTES.md` ← Deployment notes

**Repository Context:**
- `README.md` ← Repository overview
- `docs/INDEX.md` ← Documentation index
- `docs/FORK-OPERATING-MODEL-2026-05-19.md` ← Fork governance

**Read in this order:**
1. This document (you are here)
2. `IOT-DASHBOARD-INTEGRATION-BOUNDARY-2026-05-19.md`
3. `MAINLINE-REALITY-CHECK-2026-05-19.md`
4. `infra/README.md`

### 2.3 Working GitHub Workflows ✅

```
.github/workflows/
├── auto-merge-dependabot.yml  ← Dependency automation (working)
├── codeql.yml                 ← Security scanning (active)
├── manage.scrypted.app.yml    ← Standard build (working)
└── scorecard.yml              ← Supply chain security (active)
```

**Status:** All workflows are functional and actively maintained.

---

## 3. What Is NOT Implemented (Don't Depend On)

### 3.1 Features That Don't Exist ❌

**Integration Bridge Package:**
- ❌ NO `packages/integration-bridge/` directory
- ❌ NO `@scrypted/integration-bridge` npm package
- ❌ NO React hooks or Vue composables for integration
- ❌ NO cross-framework state management
- ❌ NO event bridge system
- ❌ NO theme synchronization library

**Module Federation:**
- ❌ NO Vite Module Federation plugin configured
- ❌ NO exposed Vue components for consumption
- ❌ NO shared dependency configuration
- ❌ NO remoteEntry.js build output

**Testing Infrastructure:**
- ❌ NO unit tests
- ❌ NO test framework (Vitest, Jest, etc.)
- ❌ NO test coverage reports
- ❌ NO CI/CD for testing

**Code Quality Tools:**
- ❌ NO ESLint configuration
- ❌ NO Prettier configuration
- ❌ NO linting/formatting scripts

**Desktop Runtime:**
- ❌ NO Electron application
- ❌ NO Tauri application
- ❌ NO server-app directories

**Why this matters:** Some documentation and branch work references these features as if they exist. They don't. See `MAINLINE-REALITY-CHECK-2026-05-19.md` for detailed verification.

---

### 3.2 Documentation That Doesn't Reflect Reality ⚠️

**Branch-only documentation:**
- Phase 2A-2E completion documents (not on main)
- Integration bridge implementation claims (not on main)
- Test coverage reports (not on main)
- Module Federation guides (not implemented)

**If you see references to:**
- `packages/integration-bridge/` → Does NOT exist
- "65% test coverage" → Zero tests on main
- "Module Federation configured" → NOT configured
- "React hooks available" → Do NOT exist
- "Server-app desktop runtime" → NOT on main (planned future)

**Trust this document and `MAINLINE-REALITY-CHECK-2026-05-19.md`** over other claims.

---

## 4. What Is Deferred (Phase 2+)

### 4.1 Planned Future Work 🔮

**Server App Desktop Runtime:**
- Electron and/or Tauri desktop application
- Status: Concept documented, not implemented
- Timeline: TBD, not blocking IoT Dashboard integration
- Document: `docs/SERVER-APP-TRACK-SUMMARY.md`

**Advanced Integration:**
- Module Federation for component sharing
- Cross-framework state management
- Unified theme system
- Status: Proposed, not implemented
- Timeline: TBD, evaluate after Phase 1

**Enhanced Testing:**
- Unit test suite
- E2E testing
- CI/CD for testing
- Status: Not implemented
- Timeline: TBD, not blocking integration

**SSO/Unified Auth:**
- Shared authentication across applications
- Status: Not implemented, independent auth works fine
- Timeline: Evaluate after Phase 1 user feedback

**Why deferred:**
- These features are not needed for Phase 1 integration
- iframe embedding works without them
- Can be added later if truly needed
- Reduces complexity and time-to-deployment

---

## 5. Where to Start

### 5.1 Your First 5 Tasks

**Task 1: Read Integration Boundary Document (30 min)**
- File: `docs/IOT-DASHBOARD-INTEGRATION-BOUNDARY-2026-05-19.md`
- Purpose: Understand recommended integration model
- Key sections: Integration Pattern (iframe), Routing Strategy, Auth Model
- Output: Decision on subdomain vs subpath routing

**Task 2: Deploy Scrypted UI Locally (1-2 hours)**
```bash
# Clone this repository
git clone https://github.com/iamjairo/manage.scrypted.app.git
cd manage.scrypted.app

# Deploy with Docker Compose
cd infra/
docker compose up -d

# Access at http://localhost:10080
```
- Document: `infra/README.md`
- Purpose: See the actual UI you'll be integrating
- Output: Running Scrypted UI in local environment

**Task 3: Create iframe Integration Prototype (2-3 hours)**
```jsx
// In your IoT Dashboard (React)
import React from 'react';

function ScryptedIntegration() {
  return (
    <div className="scrypted-container">
      <h2>Scrypted Device Management</h2>
      <iframe
        src="http://localhost:10080"
        title="Scrypted Management"
        width="100%"
        height="800px"
        style={{ border: '1px solid #ccc', borderRadius: '8px' }}
      />
    </div>
  );
}

export default ScryptedIntegration;
```
- Purpose: Prove iframe integration works
- Output: Scrypted UI embedded in your dashboard
- Verify: Device list visible, controls work, WebSocket connects

**Task 4: Configure Staging Environment (1 day)**
- Set up subdomain: `scrypted.staging.yourdomain.com`
- Deploy Scrypted infrastructure using `infra/docker-compose.yml`
- Configure Caddy with `infra/Caddyfile.advanced`
- Set up SSL certificates (Caddy auto-HTTPS)
- Document: `docs/IOT-DASHBOARD-INTEGRATION-BOUNDARY-2026-05-19.md` Section 7

**Task 5: Test Integration End-to-End (1 day)**
- Update iframe src to staging subdomain
- Test all Scrypted functionality through iframe
- Verify WebSocket connection stability
- Test browser refresh and state recovery
- Test on mobile and different browsers
- Checklist: Section 9.4 in Integration Boundary doc

**Total time: 3-4 days** for proof of concept with staging deployment.

---

### 5.2 Quick Start Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev
# → http://localhost:10080

# Build for production
npm run build
# → Output in dist/

# Deploy with Docker
cd infra/
docker compose up -d

# Check Docker logs
docker compose logs -f

# Stop deployment
docker compose down
```

---

### 5.3 Integration Checklist

Phase 1 integration checklist (use this to track progress):

**Planning:**
- [ ] Read integration boundary document
- [ ] Read reality check document
- [ ] Read this starter guide
- [ ] Decide on subdomain vs subpath routing
- [ ] Review with team leads

**Local Development:**
- [ ] Clone repository
- [ ] Deploy Scrypted locally with Docker
- [ ] Verify UI works in browser
- [ ] Create iframe integration in dashboard
- [ ] Test functionality through iframe

**Staging Deployment:**
- [ ] Provision staging subdomain
- [ ] Deploy Scrypted infrastructure
- [ ] Configure Caddy reverse proxy
- [ ] Set up SSL certificates
- [ ] Update DNS records

**Integration Testing:**
- [ ] iframe loads without errors
- [ ] Device list displays correctly
- [ ] Device controls work
- [ ] WebSocket connection stable
- [ ] Real-time updates work
- [ ] Browser refresh recovers state
- [ ] Mobile responsive
- [ ] No console errors

**Production Readiness:**
- [ ] Monitoring and alerting configured
- [ ] Backup/rollback procedures documented
- [ ] Incident response plan defined
- [ ] Performance baseline established
- [ ] Security review completed

**Documentation:**
- [ ] Integration runbook created
- [ ] Troubleshooting guide written
- [ ] Team onboarding materials prepared

---

## 6. Canonical Docs to Read

### 6.1 Must Read (Before Starting)

**Priority 1:**
1. `docs/DEVELOPER-INTEGRATION-STARTER-2026-05-19.md` ← This document
2. `docs/IOT-DASHBOARD-INTEGRATION-BOUNDARY-2026-05-19.md` ← Integration contract
3. `docs/MAINLINE-REALITY-CHECK-2026-05-19.md` ← What actually exists

**Priority 2:**
4. `infra/README.md` ← Deployment guide
5. `docs/TEAM-HANDOFF-IOT-DASHBOARD.md` ← Handoff overview
6. `README.md` ← Repository overview

### 6.2 Reference Documentation

**Deployment:**
- `docs/DOCKER-CADDY-OPS-NOTES.md` ← Operational procedures
- `infra/Caddyfile*` ← Reverse proxy configurations

**Governance:**
- `docs/FORK-OPERATING-MODEL-2026-05-19.md` ← Fork relationship
- `docs/UPSTREAM-VS-FORK-GAP-ANALYSIS-2026-05-19.md` ← Upstream differences

**Planning:**
- `docs/SERVER-APP-TRACK-SUMMARY.md` ← Future desktop runtime (FYI only)
- `docs/REPO-CLEANUP-PLAN-2026-05-19.md` ← Cleanup plan (FYI only)

### 6.3 External Resources

**Scrypted Platform:**
- Official site: https://scrypted.app/
- Upstream repo: https://github.com/koush/manage.scrypted.app
- Documentation: https://docs.scrypted.app/

**Technologies:**
- Vue 3: https://vuejs.org/
- Vuetify: https://vuetifyjs.com/
- Vite: https://vitejs.dev/
- Caddy: https://caddyserver.com/docs/

---

## 7. Top Risks & Assumptions

### 7.1 Technical Risks

**Risk 1: WebSocket Connection Stability**
- **Impact:** Medium-High (affects real-time updates)
- **Probability:** Medium
- **Mitigation:**
  - Scrypted has built-in reconnection logic
  - Test WebSocket proxy configuration carefully
  - Monitor connection drops in production
  - Consider WebSocket health checks

**Risk 2: iframe Limitations**
- **Impact:** Medium (UX constraints)
- **Probability:** Low
- **Mitigation:**
  - Test responsive sizing thoroughly
  - Use sandbox attributes for security
  - Consider fullscreen/popout options if needed
  - Document known limitations

**Risk 3: Independent Authentication UX**
- **Impact:** Medium (user confusion)
- **Probability:** Medium
- **Mitigation:**
  - Clear UX guidance (tooltips, help text)
  - Document authentication flow
  - Consider SSO for Phase 2 if feedback negative
  - Provide seamless iframe loading

**Risk 4: Caddy Misconfiguration**
- **Impact:** High (service unavailable)
- **Probability:** Low
- **Mitigation:**
  - Use provided Caddyfile templates (tested)
  - Test thoroughly in staging
  - Document configuration carefully
  - Implement health checks

**Risk 5: Scrypted Backend Dependency**
- **Impact:** High (no UI without backend)
- **Probability:** Low
- **Mitigation:**
  - Ensure Scrypted backend is production-ready
  - Implement health checks
  - Show error state in iframe if backend down
  - Document troubleshooting steps

### 7.2 Operational Risks

**Risk 1: Unclear Ownership**
- **Impact:** High (incident response delays)
- **Probability:** Medium
- **Mitigation:**
  - Ownership matrix in Integration Boundary doc (Section 8)
  - Define on-call rotation
  - Document escalation paths
  - Regular review of responsibilities

**Risk 2: Monitoring Gaps**
- **Impact:** Medium (delayed issue detection)
- **Probability:** Medium
- **Mitigation:**
  - Set up health checks for both apps
  - Monitor WebSocket connections
  - Alert on high error rates
  - Dashboard uptime monitoring

**Risk 3: Deployment Coordination**
- **Impact:** Medium (update conflicts)
- **Probability:** Low
- **Mitigation:**
  - Independent deployment model (no coordination needed)
  - Test updates in staging first
  - Document rollback procedures
  - Communicate major changes

### 7.3 Key Assumptions

**Assumption 1: iframe Embedding is Acceptable**
- **Assumption:** User experience is acceptable with iframe
- **Validation:** Test with real users in Phase 1
- **Fallback:** Consider reverse proxy links if iframe problematic
- **Risk:** Low (iframe is proven pattern)

**Assumption 2: Independent Auth is OK**
- **Assumption:** Users will accept logging in twice (dashboard + Scrypted)
- **Validation:** Gather feedback in Phase 1
- **Fallback:** Implement SSO in Phase 2 if needed
- **Risk:** Medium (UX friction)

**Assumption 3: Subdomain Routing Works**
- **Assumption:** DNS and network allow subdomain routing
- **Validation:** Test in staging environment
- **Fallback:** Use subpath routing if needed
- **Risk:** Low (standard pattern)

**Assumption 4: Vue UI Meets Requirements**
- **Assumption:** Existing Scrypted UI has all needed features
- **Validation:** Review UI with product team
- **Fallback:** Request specific features from upstream
- **Risk:** Low (UI is feature-complete)

**Assumption 5: Docker Deployment is Production-Ready**
- **Assumption:** Docker Compose + Caddy can scale for production
- **Validation:** Load testing in staging
- **Fallback:** Kubernetes if needed for scale
- **Risk:** Low (sufficient for most deployments)

---

## 8. Common Pitfalls to Avoid

### 8.1 ❌ DON'T: Depend on Non-Existent Features

**Pitfall:** Planning integration around features that don't exist on main branch.

**Examples:**
- "We'll use the @scrypted/integration-bridge package" → Doesn't exist
- "We'll consume Vue components with Module Federation" → Not configured
- "We'll share state via the event bridge" → Doesn't exist
- "We'll use the React hooks" → Don't exist

**Solution:** Read `MAINLINE-REALITY-CHECK-2026-05-19.md` and only depend on verified features.

---

### 8.2 ❌ DON'T: Wait for Advanced Integration

**Pitfall:** Delaying integration until Module Federation or advanced features are available.

**Why it's a problem:**
- Those features may never be implemented
- They're not needed for successful integration
- Delays value delivery
- Increases complexity unnecessarily

**Solution:** Start with simple iframe embedding. It works, it's fast, it's maintainable.

---

### 8.3 ❌ DON'T: Modify Scrypted UI Source

**Pitfall:** Making changes to the Vue application to "improve integration."

**Why it's a problem:**
- Creates merge conflicts with upstream
- Breaks update path
- Increases maintenance burden
- You become responsible for Vue codebase

**Solution:** Use Scrypted UI as-is. Apply customizations in your dashboard (iframe container styling, etc.).

---

### 8.4 ❌ DON'T: Try to Unify Authentication (Phase 1)

**Pitfall:** Building SSO/token sharing between applications in Phase 1.

**Why it's a problem:**
- Complex to implement correctly
- Security risks if done wrong
- Not needed for MVP
- Delays deployment

**Solution:** Use independent authentication. Evaluate SSO for Phase 2 based on user feedback.

---

### 8.5 ❌ DON'T: Skip Staging Deployment

**Pitfall:** Going straight to production without staging testing.

**Why it's a problem:**
- No safe environment to test
- High risk of production incidents
- Difficult to debug issues
- No rollback practice

**Solution:** Always deploy to staging first. Test thoroughly. Practice rollback.

---

### 8.6 ❌ DON'T: Ignore Operational Documentation

**Pitfall:** Deploying without reading deployment guides.

**Why it's a problem:**
- Miss important configuration steps
- Security vulnerabilities
- Performance issues
- Difficult troubleshooting

**Solution:** Follow `infra/README.md` and operational docs carefully. Document your own deployment.

---

## 9. Success Criteria

### 9.1 Phase 1 Definition of Done

**Integration Complete When:**
- ✅ Scrypted UI embedded in dashboard (iframe or proxy link)
- ✅ Users can navigate to Scrypted section
- ✅ All device management features work through integration
- ✅ WebSocket connection stable (real-time updates)
- ✅ Both applications can be updated independently
- ✅ Rollback procedures tested and documented
- ✅ Monitoring and alerting configured
- ✅ Team runbook created

### 9.2 Quality Gates

**Before Production:**
1. **Functionality:** All Scrypted features work through iframe
2. **Performance:** Load time < 3s, WebSocket latency < 100ms
3. **Reliability:** 99.9% uptime in staging for 1 week
4. **Security:** Security review completed, no critical issues
5. **Operations:** Runbook complete, rollback tested
6. **Documentation:** User guide and troubleshooting docs ready

### 9.3 User Acceptance Criteria

**Users Can:**
- Access Scrypted management from dashboard
- View all their devices
- Control devices (on/off, settings, etc.)
- See real-time status updates
- View device logs and history
- Manage plugins and settings
- Use on mobile and desktop
- Recover from browser refresh

**Users Don't Experience:**
- Broken iframe loading
- WebSocket connection failures
- Slow performance
- Authentication confusion (with good UX guidance)
- Console errors or warnings
- Mobile usability issues

---

## 10. Getting Help

### 10.1 Documentation First

**Before asking questions:**
1. Read this starter guide completely
2. Check `IOT-DASHBOARD-INTEGRATION-BOUNDARY-2026-05-19.md`
3. Review `MAINLINE-REALITY-CHECK-2026-05-19.md`
4. Search `infra/README.md` for deployment issues
5. Check `docs/TEAM-HANDOFF-IOT-DASHBOARD.md`

### 10.2 Common Questions

**Q: Can I use the @scrypted/integration-bridge package?**
A: No, it doesn't exist on main branch. Use iframe embedding instead.

**Q: How do I share state between Vue and React?**
A: You don't. iframe provides isolation. Reload iframe if needed.

**Q: Should I use subdomain or subpath routing?**
A: Subdomain is recommended (cleaner, simpler). See Integration Boundary doc Section 3.

**Q: Do I need unified authentication?**
A: Not for Phase 1. Independent auth works fine. Evaluate SSO for Phase 2.

**Q: What about the server-app desktop runtime?**
A: It's planned future work, not on main branch. Not needed for dashboard integration.

**Q: Why are tests/linting not configured?**
A: This is a Vue app fork focused on functionality. You can add testing if desired.

**Q: How do I update Scrypted version?**
A: Operations team manages this. Pull latest from this repo, rebuild Docker image.

### 10.3 Troubleshooting Resources

**Integration Issues:**
- Check `IOT-DASHBOARD-INTEGRATION-BOUNDARY-2026-05-19.md` Section 11 (Risks)
- Review browser console for errors
- Verify WebSocket connection in Network tab
- Check Caddy logs: `docker compose logs caddy`

**Deployment Issues:**
- Review `infra/README.md`
- Check Docker logs: `docker compose logs`
- Verify DNS configuration
- Test Caddy config: `docker compose config`

**Upstream Issues:**
- Scrypted docs: https://docs.scrypted.app/
- Scrypted GitHub: https://github.com/koush/scrypted
- Scrypted Discord: https://discord.gg/scrypted

### 10.4 Contact Points

**Repository Issues:**
- GitHub Issues: https://github.com/iamjairo/manage.scrypted.app/issues
- Label: `integration` for dashboard-related questions

**Operational Issues:**
- Contact: Operations team (define specific contact)
- Escalation: Infrastructure lead

**Upstream Scrypted Issues:**
- Contact: Scrypted community support
- GitHub: https://github.com/koush/scrypted/issues

---

## 11. Next Steps

### 11.1 Your Action Plan

**This Week:**
1. Read all Priority 1 documentation (this guide + 2 others)
2. Deploy Scrypted locally and explore UI
3. Create proof-of-concept iframe integration
4. Review with team leads and get approval

**Next Week:**
1. Set up staging environment
2. Deploy Scrypted infrastructure
3. Test integration end-to-end
4. Document findings and issues

**Week 3:**
1. Address any issues found in testing
2. Refine integration based on feedback
3. Prepare production deployment plan
4. Create operational runbook

**Week 4:**
1. Production deployment (with approval)
2. Monitor closely
3. Gather user feedback
4. Plan Phase 2 enhancements

### 11.2 Milestone Checklist

- [ ] Documentation reviewed
- [ ] Local deployment successful
- [ ] iframe integration prototype working
- [ ] Team leads approve approach
- [ ] Staging environment deployed
- [ ] End-to-end testing complete
- [ ] Production runbook created
- [ ] Security review passed
- [ ] Production deployment approved
- [ ] Monitoring configured
- [ ] User feedback collected

---

## 12. Conclusion

### 12.1 What You've Learned

You now know:
- ✅ This is a Vue 3 web application (not a component library)
- ✅ iframe embedding is the recommended integration pattern
- ✅ Docker + Caddy infrastructure is production-ready
- ✅ Integration bridge package does NOT exist on main
- ✅ Module Federation is NOT configured
- ✅ Server-app desktop runtime is planned future work
- ✅ Independent authentication is the Phase 1 model
- ✅ Where to start and what to avoid

### 12.2 The Path Forward

**Phase 1: iframe Integration (4-6 weeks)**
- Use existing Vue UI as-is
- iframe embedding with subdomain routing
- Independent authentication
- Docker + Caddy deployment
- Basic monitoring and operations

**Phase 2: Optimization (2-3 months)**
- Evaluate user feedback
- Consider SSO if needed
- Enhance monitoring
- Improve documentation
- Performance optimization

**Phase 3: Advanced Features (TBD)**
- Evaluate Module Federation if desired
- Consider desktop runtime if needed
- Enhanced analytics
- Additional integrations

### 12.3 Remember

**The main branch provides:**
✅ Production-ready Vue UI
✅ Working Docker + Caddy infrastructure
✅ Good documentation
✅ Clear integration guidance

**The main branch does NOT provide:**
❌ Integration bridge package
❌ Module Federation
❌ React hooks
❌ Theme synchronization
❌ Desktop runtime

**Use what exists. It's good enough. Ship Phase 1.**

---

## Quick Reference Card

### Essential Commands
```bash
# Local development
npm install && npm run dev

# Build for production
npm run build

# Deploy with Docker
cd infra/ && docker compose up -d

# Check logs
docker compose logs -f

# Stop deployment
docker compose down
```

### Essential Files
```
docs/IOT-DASHBOARD-INTEGRATION-BOUNDARY-2026-05-19.md  ← Integration contract
docs/MAINLINE-REALITY-CHECK-2026-05-19.md              ← What exists
docs/DEVELOPER-INTEGRATION-STARTER-2026-05-19.md       ← This guide
infra/README.md                                         ← Deployment guide
infra/docker-compose.yml                                ← Docker orchestration
infra/Caddyfile.advanced                                ← Production proxy config
```

### Essential URLs
```
Local dev:     http://localhost:5173
Docker local:  http://localhost:10080
Staging:       https://scrypted.staging.yourdomain.com
Production:    https://scrypted.yourdomain.com
```

### Essential Contacts
```
Repository:    https://github.com/iamjairo/manage.scrypted.app
Issues:        (GitHub Issues with 'integration' label)
Operations:    (Define specific contact)
Upstream:      https://github.com/koush/scrypted
```

---

**Document Version:** 1.0
**Last Updated:** 2026-05-19
**Next Review:** After Phase 1 deployment
**Owner:** Platform Engineering

**Happy integrating! 🚀**
