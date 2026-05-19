# IoT Dashboard Integration Boundary Definition

**Date:** 2026-05-19
**Status:** Canonical pre-handoff boundary specification
**Repository:** iamjairo/manage.scrypted.app (fork of koush/manage.scrypted.app)

---

## Purpose

This document defines the integration boundary between the **Scrypted Management UI** (this repository) and the **IoT Dashboard** (downstream React application). It establishes clear ownership, technical contracts, and integration patterns for production deployment.

---

## 1. Repository Roles & Responsibilities

### 1.1 This Repository (manage.scrypted.app fork)

**What it is:**
- Vue 3 + TypeScript + Vuetify application
- Management UI for Scrypted home automation platform
- Operational fork with deployment infrastructure

**What it provides:**
- Standalone web UI for Scrypted device management
- Docker + Caddy deployment assets (`infra/`)
- Reverse proxy configuration templates
- Governance/security automation workflows

**What it does NOT provide:**
- ❌ Module federation setup (not present on main branch)
- ❌ Integration bridge package (not present on main branch)
- ❌ React components or hooks (not present on main branch)
- ❌ Design token libraries (not present on main branch)
- ❌ Server app desktop runtime (not present on main branch)

### 1.2 IoT Dashboard (Downstream)

**What it is:**
- React + Vite + Tailwind CSS application
- Aggregated dashboard for multiple home automation services

**What it provides:**
- Primary user-facing UI
- Unified authentication/session management
- Multi-service orchestration
- Main routing and navigation

---

## 2. Recommended Integration Model

### 2.1 Integration Pattern: **iframe Embedding**

**Rationale:**
- Clean boundary isolation
- No Vue ↔ React interop complexity
- No module federation setup required
- Leverages existing Scrypted UI as-is
- Simple deployment model

**Implementation:**
```html
<!-- IoT Dashboard embeds Scrypted UI -->
<iframe
  src="https://scrypted.yourdomain.com"
  sandbox="allow-same-origin allow-scripts allow-forms"
  title="Scrypted Management"
/>
```

**Benefits:**
✅ Zero code changes to this repository
✅ Complete UI isolation
✅ Independent deployment cycles
✅ Clear security boundary
✅ Simple rollback strategy

**Trade-offs:**
⚠️ No deep state sharing
⚠️ Separate authentication contexts
⚠️ iframe styling constraints

### 2.2 Alternative Pattern: **Reverse Proxy Link**

**Rationale:**
- Even simpler deployment
- No iframe restrictions
- Full navigation experience

**Implementation:**
```
IoT Dashboard: https://dashboard.yourdomain.com
Scrypted Link:  https://dashboard.yourdomain.com/scrypted
  → Proxy to: https://scrypted-backend.internal:10443
```

**Benefits:**
✅ Full browser navigation
✅ No iframe restrictions
✅ Simple proxy configuration
✅ Can share authentication cookie domain

**Trade-offs:**
⚠️ Requires careful proxy configuration
⚠️ CORS considerations
⚠️ WebSocket proxy complexity

### 2.3 Recommended Choice

**Start with iframe embedding** for Phase 1 integration:
- Fastest time to integration
- Lowest risk
- Clear boundaries
- Easy to enhance later

---

## 3. Routing Strategy

### 3.1 Subdomain Strategy (Recommended)

```
Main Dashboard:     https://dashboard.yourdomain.com
Scrypted UI:        https://scrypted.yourdomain.com
Scrypted Backend:   https://scrypted-api.yourdomain.com:10443
```

**Ownership:**
- **IoT Dashboard team** owns `dashboard.yourdomain.com`
- **Operations/DevOps** owns `scrypted.yourdomain.com` (this repo's Caddy config)
- **Scrypted runtime** owns backend API/WebSocket endpoint

**Routing Flow:**
```
User → dashboard.yourdomain.com
  → Navigates to Scrypted section
  → iframe loads scrypted.yourdomain.com
  → Caddy proxies to Scrypted backend
```

### 3.2 Subpath Strategy (Alternative)

```
Main Dashboard:     https://yourdomain.com
Scrypted UI:        https://yourdomain.com/scrypted
Scrypted Backend:   https://yourdomain.com/scrypted-api
```

**Ownership:**
- **IoT Dashboard team** owns main ingress and routing rules
- **Operations** provides Scrypted UI and backend routing config
- Requires path rewriting configuration

**Considerations:**
- More complex proxy configuration
- Requires base URL configuration in Scrypted UI
- Single certificate management
- Tighter operational coupling

### 3.3 Recommended Choice

**Use subdomain strategy** for Phase 1:
- Cleaner separation
- Independent SSL certificates
- Simpler Caddy configuration (already provided in this repo)
- Easier to troubleshoot
- Better security isolation

---

## 4. Authentication & Session Ownership

### 4.1 Recommended Model: **Independent Auth**

**Scrypted UI maintains its own authentication:**
- Uses Scrypted's built-in auth system
- Separate login flow within iframe/subdomain
- No token sharing with IoT Dashboard

**Rationale:**
- Scrypted has existing auth built-in
- No modifications needed to this repository
- Clear security boundary
- Simple to implement

### 4.2 Alternative Model: **SSO Integration**

**If unified login is required:**
- IoT Dashboard implements SSO provider (OAuth2/OIDC)
- Scrypted would need custom auth plugin (NOT in this repo)
- Significant additional development effort

**Recommendation:**
- **Phase 1:** Independent auth (no changes needed)
- **Phase 2+:** Evaluate SSO if user experience demands it

### 4.3 Session Management Boundary

```
┌─────────────────────────────────────┐
│ IoT Dashboard (dashboard.domain.com)│
│ - Manages dashboard session         │
│ - Handles dashboard authentication  │
└─────────────────────────────────────┘
           │
           │ embeds iframe
           ↓
┌─────────────────────────────────────┐
│ Scrypted UI (scrypted.domain.com)  │
│ - Independent session               │
│ - Scrypted native authentication   │
└─────────────────────────────────────┘
```

**Ownership Matrix:**
| Component | Owner | Responsibility |
|-----------|-------|----------------|
| Dashboard session | IoT Dashboard | User login, JWT, session timeout |
| Scrypted session | Scrypted runtime | Device access, API auth |
| Cross-domain cookies | N/A | Not shared (different domains) |

---

## 5. API & WebSocket Proxy Requirements

### 5.1 Scrypted Backend Endpoints

**API Endpoints:**
```
GET  /api/devices          - List all devices
GET  /api/device/:id       - Get device details
POST /api/device/:id       - Control device
GET  /api/plugins          - List plugins
POST /api/plugin/:id       - Plugin operations
```

**WebSocket Endpoint:**
```
WS /api/websocket          - Real-time device events
```

### 5.2 Proxy Configuration (Caddy)

This repository provides production-ready Caddy configuration in `infra/Caddyfile`:

```caddy
# Scrypted UI (this repo)
scrypted.yourdomain.com {
    reverse_proxy localhost:10080
}

# Scrypted API/WebSocket backend
scrypted-api.yourdomain.com {
    reverse_proxy localhost:10443 {
        transport http {
            tls_insecure_skip_verify
        }
    }
}
```

**Ownership:**
- **This repository** provides Caddy config templates
- **Operations** deploys and maintains Caddy instance
- **IoT Dashboard** does NOT proxy Scrypted traffic (subdomain model)

### 5.3 WebSocket Considerations

**Requirements:**
- WebSocket upgrade support in proxy
- Long-lived connections (no aggressive timeouts)
- Proper `Connection: upgrade` header handling

**Caddy handles this automatically** - no special configuration needed.

### 5.4 CORS & Security Headers

**Not applicable for subdomain strategy** - iframe same-origin policy applies.

If using subpath strategy:
```caddy
header {
    Access-Control-Allow-Origin "https://dashboard.yourdomain.com"
    Access-Control-Allow-Credentials true
}
```

---

## 6. Theme & Design Token Ownership

### 6.1 Current State

**This repository (main branch):**
- ✅ Vue 3 + Vuetify application
- ✅ Vuetify Material Design theme
- ✅ Custom SCSS styles in `src/styles/`
- ❌ NO shared design token library
- ❌ NO Tailwind configuration
- ❌ NO theme synchronization system

**IoT Dashboard:**
- React + Tailwind CSS
- Independent design system
- Material/Tailwind tokens

### 6.2 Recommended Approach: **Independent Styling**

**Each application maintains its own theme:**
- Scrypted UI uses Vuetify theme (no changes)
- IoT Dashboard uses Tailwind theme (no changes)
- No theme synchronization needed for iframe model

**Why:**
- No code changes required
- Clean separation
- Each team controls their design system
- iframe isolates styling completely

### 6.3 Visual Consistency

**If visual harmony is needed:**
- Apply consistent color scheme via CSS variables
- IoT Dashboard can style iframe container
- Use consistent branding (logos, colors)

**Example:**
```css
/* IoT Dashboard applies container styling */
.scrypted-iframe-container {
  border: 1px solid var(--dashboard-border-color);
  border-radius: var(--dashboard-border-radius);
  background: var(--dashboard-background);
}
```

### 6.4 Ownership Matrix

| Element | Owner | Implementation |
|---------|-------|----------------|
| Scrypted UI theme | This repository | Vuetify configuration |
| Dashboard theme | IoT Dashboard | Tailwind configuration |
| iframe container styling | IoT Dashboard | CSS in dashboard |
| Brand consistency | Design team | Style guide (external) |

---

## 7. Deployment & Runtime Ownership

### 7.1 Deployment Model

```
┌──────────────────────────────────────────────┐
│ IoT Dashboard Infrastructure                 │
│ ├─ dashboard.yourdomain.com (React app)     │
│ └─ Infrastructure team manages              │
└──────────────────────────────────────────────┘

┌──────────────────────────────────────────────┐
│ Scrypted Infrastructure (this repo)          │
│ ├─ scrypted.yourdomain.com (Vue app)        │
│ ├─ scrypted-api.yourdomain.com (backend)    │
│ ├─ Docker Compose + Caddy                   │
│ └─ Operations team manages                  │
└──────────────────────────────────────────────┘
```

### 7.2 Ownership Matrix

| Component | Owner | Repository | Deployment Tool |
|-----------|-------|------------|-----------------|
| IoT Dashboard frontend | Dashboard Team | iot-dashboard repo | Vite build + hosting |
| IoT Dashboard backend | Dashboard Team | iot-dashboard repo | Node/API hosting |
| Scrypted UI frontend | Operations | **This repo** | Docker + Caddy |
| Scrypted backend | Operations | Scrypted upstream | Docker container |
| Reverse proxy (Caddy) | Operations | **This repo** (`infra/`) | Docker Compose |
| SSL certificates | Operations | Caddy auto-HTTPS | Automated |
| DNS configuration | Infrastructure | Cloud provider | Manual/Terraform |

### 7.3 Deployment Assets (This Repo)

**Available on main branch:**
```
infra/
├── docker-compose.yml      ← Orchestrates Scrypted + Caddy
├── Caddyfile              ← Basic reverse proxy config
├── Caddyfile.advanced     ← Production config with HTTPS
├── Caddyfile.lan          ← LAN/internal deployment
└── README.md              ← Deployment guide
```

**How to deploy:**
```bash
cd infra/
docker compose up -d
```

**Documentation:**
- See `infra/README.md` for complete deployment guide
- See `docs/DOCKER-CADDY-OPS-NOTES.md` for operational procedures

### 7.4 Update & Rollback Strategy

**Scrypted UI updates:**
- Owned by Operations team
- Use `git pull` on this repository
- Rebuild Docker images
- Rolling deployment with Caddy load balancing

**Rollback procedure:**
- Git revert to previous commit
- Rebuild and redeploy
- Caddy automatically routes to new containers
- See `docs/DOCKER-CADDY-OPS-NOTES.md` for detailed procedures

**IoT Dashboard updates:**
- Independent of Scrypted UI
- Managed by Dashboard team
- No coordination needed for deployments

---

## 8. Integration Ownership Matrix

| Responsibility | Owner | Backup | Escalation |
|----------------|-------|--------|------------|
| **IoT Dashboard** |
| Dashboard frontend | Dashboard Team | - | Product Owner |
| Dashboard backend | Dashboard Team | - | Product Owner |
| User authentication | Dashboard Team | - | Security Team |
| Main routing/navigation | Dashboard Team | - | Product Owner |
| iframe integration code | Dashboard Team | DevOps | Technical Lead |
| **Scrypted Management** |
| Scrypted UI deployment | Operations | DevOps | Infrastructure Lead |
| Scrypted backend deployment | Operations | DevOps | Infrastructure Lead |
| Caddy proxy configuration | Operations | DevOps | Infrastructure Lead |
| SSL certificate management | Operations (Caddy auto) | DevOps | Infrastructure Lead |
| Scrypted device management | End Users | Operations | Support Team |
| **Shared** |
| DNS configuration | Infrastructure | Operations | Infrastructure Lead |
| Network/firewall rules | Infrastructure | Security | Security Team |
| Monitoring & alerting | DevOps | Operations | SRE Team |
| Incident response | DevOps (on-call) | Operations | Incident Commander |

---

## 9. Recommended First Integration Milestone

### 9.1 Milestone: "Scrypted UI Embedded in Dashboard"

**Goal:** IoT Dashboard displays Scrypted management interface in dedicated section.

**Success Criteria:**
- ✅ User can navigate to Scrypted section in dashboard
- ✅ Scrypted UI loads in iframe with full functionality
- ✅ Devices are visible and controllable
- ✅ WebSocket connection works (real-time updates)
- ✅ Both applications can be updated independently
- ✅ Rollback procedures tested and documented

### 9.2 Phase 1 Tasks (IoT Dashboard Team)

1. **Add Scrypted section to dashboard navigation**
   - Duration: 1 day
   - Component: New route `/scrypted` in React Router

2. **Implement iframe container component**
   - Duration: 1 day
   - Features: Loading state, error handling, responsive sizing

3. **Configure subdomain routing (if needed)**
   - Duration: 1 day
   - Coordinate with Operations team

4. **Test integration in staging**
   - Duration: 2 days
   - Verify all functionality works through iframe

5. **Document integration for other teams**
   - Duration: 1 day
   - Usage guide, troubleshooting, known limitations

**Total Duration: ~5-7 days**

### 9.3 Phase 1 Tasks (Operations Team)

1. **Deploy Scrypted infrastructure**
   - Duration: 1 day
   - Use `infra/docker-compose.yml` from this repo

2. **Configure Caddy reverse proxy**
   - Duration: 1 day
   - Use `infra/Caddyfile.advanced` template

3. **Set up SSL certificates**
   - Duration: Automatic (Caddy)
   - Verify HTTPS working correctly

4. **Configure DNS records**
   - Duration: 1 day
   - Point subdomains to Caddy server

5. **Test and document rollback procedure**
   - Duration: 1 day
   - Verify quick rollback capability

**Total Duration: ~4-5 days**

### 9.4 Integration Testing Checklist

- [ ] Scrypted UI loads in iframe without errors
- [ ] Device list displays correctly
- [ ] Device controls work (on/off, brightness, etc.)
- [ ] WebSocket connection establishes and maintains
- [ ] Real-time device updates appear immediately
- [ ] Browser refresh recovers state correctly
- [ ] Multiple tabs work simultaneously
- [ ] Mobile responsive view works
- [ ] Console shows no CORS or iframe errors
- [ ] Authentication works independently
- [ ] Logout doesn't affect other application
- [ ] Both apps can be updated without coordination
- [ ] Rollback procedure works as documented

### 9.5 Success Metrics

**Performance:**
- Initial load time < 3 seconds
- WebSocket connection latency < 100ms
- Device control response < 500ms

**Reliability:**
- 99.9% uptime SLA
- < 1 minute recovery time for deployment issues
- Zero data loss during updates

**User Experience:**
- Seamless navigation between dashboard and Scrypted
- No visible loading/flickering
- Responsive on mobile and desktop
- Consistent visual experience (to the extent possible)

---

## 10. Integration Anti-Patterns (Avoid These)

### 10.1 ❌ DO NOT: Module Federation

**Why NOT:**
- Not implemented on main branch
- Would require significant development effort
- Adds complexity (Vue ↔ React interop)
- Creates tight coupling
- Difficult to debug

**Use instead:** iframe or reverse proxy linking

### 10.2 ❌ DO NOT: Shared State/Event Bus

**Why NOT:**
- Cross-domain restrictions
- Tight coupling between applications
- Complex error scenarios
- Difficult to maintain

**Use instead:** Independent state management, reload iframe if needed

### 10.3 ❌ DO NOT: Unified Authentication System

**Why NOT:**
- Requires modifications to Scrypted (upstream)
- Complex token sharing across domains
- Increased security surface
- Not needed for Phase 1

**Use instead:** Independent authentication, consider SSO for Phase 2+

### 10.4 ❌ DO NOT: Shared Design System

**Why NOT:**
- Vue + Vuetify vs React + Tailwind are fundamentally different
- No shared components on main branch
- Maintenance burden
- Not needed for iframe isolation

**Use instead:** Independent themes, consistent branding via style guide

### 10.5 ❌ DO NOT: Monorepo Consolidation

**Why NOT:**
- Different tech stacks
- Different deployment cycles
- Different teams
- Unnecessary complexity

**Use instead:** Separate repositories, clear integration contract

---

## 11. Risk Assessment & Mitigations

### 11.1 Technical Risks

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| iframe embedding issues | Medium | Low | Test in all browsers, use iframe sandbox |
| WebSocket connection drops | High | Medium | Implement reconnection logic (already in Scrypted) |
| CORS/security headers | Medium | Low | Use subdomain strategy (no CORS needed) |
| Caddy misconfiguration | High | Low | Use provided templates, test thoroughly |
| SSL certificate issues | Medium | Low | Use Caddy auto-HTTPS, monitor expiry |
| Scrypted backend unavailable | High | Low | Implement health checks, show error state |

### 11.2 Operational Risks

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Deployment coordination failure | Medium | Medium | Independent deployments, no coordination needed |
| Unclear ownership | High | Medium | **This document** defines clear boundaries |
| DNS configuration errors | High | Low | Document DNS records, use Infrastructure as Code |
| Monitoring gaps | Medium | Medium | Set up health checks for both applications |
| Incident response delays | High | Low | Define on-call rotation, escalation paths |

### 11.3 User Experience Risks

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Slow iframe loading | Medium | Medium | Optimize Scrypted UI build, use CDN if needed |
| Confusing double authentication | Medium | High | Clear UX guidance, consider SSO for Phase 2 |
| Mobile experience issues | Medium | Low | Test responsive iframe sizing |
| Browser compatibility | Medium | Low | Test in Chrome, Firefox, Safari, Edge |

---

## 12. Open Questions (To Be Resolved)

### 12.1 Technical Questions

- **Q:** Should we use subdomain or subpath routing?
  **Recommendation:** Subdomain (cleaner separation)

- **Q:** Do we need unified authentication for Phase 1?
  **Recommendation:** No (independent auth is simpler)

- **Q:** What monitoring/observability should we add?
  **Recommendation:** Basic health checks, uptime monitoring

### 12.2 Operational Questions

- **Q:** Who is on-call for Scrypted infrastructure issues?
  **Answer:** Operations team (define rotation)

- **Q:** What is the SLA for Scrypted UI availability?
  **Recommendation:** Same as IoT Dashboard (99.9%)

- **Q:** How do we handle Scrypted version updates?
  **Answer:** Operations team manages, test in staging first

### 12.3 Product Questions

- **Q:** Do users need unified login experience?
  **Answer:** TBD (gather user feedback in Phase 1)

- **Q:** Should Scrypted section be in main nav or dashboard widget?
  **Answer:** TBD (product team decision)

- **Q:** What analytics/telemetry should we collect?
  **Answer:** TBD (privacy/compliance review needed)

---

## 13. Next Steps

### 13.1 Immediate Actions (This Week)

1. **Review this document** with IoT Dashboard team
2. **Get sign-off** from technical leads on integration approach
3. **Assign ownership** for each component in matrix above
4. **Schedule kick-off meeting** for Phase 1 integration

### 13.2 Phase 1 Planning (Next 2 Weeks)

1. **Operations:** Deploy Scrypted infrastructure in staging
2. **Dashboard Team:** Implement iframe integration in staging
3. **Both Teams:** Test integration end-to-end
4. **DevOps:** Set up monitoring and alerting
5. **Documentation:** Update runbooks and troubleshooting guides

### 13.3 Phase 1 Execution (Weeks 3-4)

1. **Production deployment** following approved change process
2. **Smoke testing** in production
3. **User acceptance testing**
4. **Monitor for issues** during initial rollout
5. **Gather feedback** for Phase 2 improvements

---

## 14. Document Maintenance

**Owner:** Platform Engineering / Technical Lead
**Review Cadence:** Monthly during Phase 1, quarterly after stabilization
**Change Process:** Submit PR to update this document
**Notification:** Notify #iot-dashboard and #operations channels for changes

**Version History:**
- 2026-05-19: Initial version (pre-handoff boundary definition)

---

## 15. References

### 15.1 This Repository (main branch)

- `infra/README.md` - Deployment guide
- `infra/docker-compose.yml` - Docker orchestration
- `infra/Caddyfile*` - Reverse proxy templates
- `docs/DOCKER-CADDY-OPS-NOTES.md` - Operational procedures
- `docs/TEAM-HANDOFF-IOT-DASHBOARD.md` - Handoff overview
- `README.md` - Repository overview

### 15.2 External Resources

- Scrypted upstream: https://github.com/koush/manage.scrypted.app
- Scrypted documentation: https://scrypted.app/
- Caddy documentation: https://caddyserver.com/docs/
- Docker Compose: https://docs.docker.com/compose/

---

**END OF DOCUMENT**
