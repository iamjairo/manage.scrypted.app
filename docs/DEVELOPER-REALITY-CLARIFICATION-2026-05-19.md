# Developer Reality Clarification — What Exists on `main` vs What Does Not

**Repository:** `iamjairo/manage-scrypted-app`  
**Branch:** `main`  
**Date:** 2026-05-19  
**Purpose:** Give developers a direct, implementation-focused summary of what is actually present and usable in this repository.

---

## Short version

This repository **does contain a real, deployable web application**.

Specifically, `main` contains:
- a **Vue 3 + TypeScript + Vuetify** management UI
- a **Vite** build system
- **PWA support** enabled during production build
- local integration with the **Scrypted SDK/client/common** packages via sibling `../scrypted/` dependencies
- **Docker + Caddy deployment infrastructure** for serving the built UI and reverse-proxying Scrypted backend traffic

What `main` **does not contain** is a more advanced **integration/library layer** that some earlier documents or branch-era work may have implied.

In other words:

- **YES** — there is a working Scrypted management web app here.
- **NO** — there is not currently a reusable integration bridge/library for embedding this repo as React/Vue components in another app.
- **YES** — the existing app can be built and deployed as a standalone web UI.
- **MAYBE** — iframe embedding is likely the correct current integration model, but browser/auth/CSP behavior still has to be validated in the actual target environment.

---

## What definitely exists on `main`

### 1. Production web app
This repository contains a real Vue application under `src/` with:
- Vue 3
- TypeScript
- Vuetify
- Vue Router
- Vite build tooling

This is the primary deliverable currently present on `main`.

### 2. Real build pipeline
`package.json` defines:

- `npm run build`
- `npm run dev`
- `npm run preview`

The production build command is:

```bash
SCRYPTED_PWA=true vue-tsc --noEmit && SCRYPTED_PWA=true vite build
```

This produces a static build in `dist/`.

### 3. PWA support
`vite.config.mts` conditionally enables `vite-plugin-pwa` when `SCRYPTED_PWA=true`.

This means the build includes PWA-oriented behavior such as:
- web app manifest
- service worker generation
- installable app metadata
- app icons / maskable icon references

### 4. Scrypted SDK/client integration
The repo depends on local sibling packages:

- `@scrypted/client`
- `@scrypted/common`
- `@scrypted/sdk`

These are referenced as local file dependencies under `../scrypted/...`.

That means this repo expects a sibling checkout of the main Scrypted repository for local install/build workflows.

### 5. Deployment infrastructure
The `infra/` directory is real and usable. It includes:
- `docker-compose.yml`
- `Caddyfile`
- `Caddyfile.lan`
- `Caddyfile.advanced`
- deployment documentation in `infra/README.md`

The deployment model is:
- serve this repo’s built static UI
- reverse proxy Scrypted backend/API/WebSocket traffic via Caddy

### 6. GitHub workflows
The repo also contains working GitHub workflow definitions for:
- CodeQL
- Dependabot auto-merge
- GitHub Pages deployment workflow
- Scorecard

These workflows may still need triage/cleanup, but they are present.

---

## What does NOT exist on `main`

The following should **not** be treated as currently available implementation on `main` unless and until they are explicitly added/merged:

### 1. Integration bridge package
There is **no** `@scrypted/integration-bridge` package on `main`.

There is no published/merged package layer that turns this repo into a reusable embeddable integration SDK for other apps.

### 2. Module Federation setup
There is **no** Module Federation configuration in `vite.config.mts`.

This repo is **not** currently configured to expose Vue modules/components as a remote module system for another frontend.

### 3. React integration hooks
There are **no** React hooks such as:
- `useScryptedDevices`
- `useScryptedDevice`

There is no React-facing integration API on `main`.

### 4. Shared theme synchronization layer
There is **no** cross-framework theme sync/token system currently implemented on `main`.

The app uses its own normal Vuetify theming model.

### 5. Desktop runtime tracks on main
Claims about Electron/Tauri/server-app tracks should be treated carefully.

There is some adjacent or experimental material in the repo, but there is **not** a mature, merged, canonical desktop runtime on `main` that should be treated as part of the current mainline deliverable.

### 6. Mature testing/tooling baseline
The repository does **not** currently present a strong, conventional frontend quality toolchain on `main` such as:
- unit tests
- coverage setup
- full lint/format workflow
- broad test-driven CI

That does not mean the app is absent; it means the app exists without that broader quality/tooling layer being fully established.

---

## Correct interpretation for current development

Developers should think about this repo in the following way:

### This repo IS:
- a real Scrypted management web app
- buildable and deployable
- operationally oriented toward standalone hosting
- suitable for reverse-proxy/subdomain deployment
- likely suitable for iframe-based integration, pending runtime validation

### This repo is NOT:
- a reusable frontend component library
- a React integration SDK
- a federated microfrontend remote
- a finished shared integration platform for downstream consumers

---

## Recommended integration assumption

For current work, the safest assumption is:

1. treat this repo as a **standalone web app**
2. deploy it independently
3. integrate it with other systems using **URL/subdomain/iframe/reverse-proxy patterns**
4. do **not** plan around nonexistent package/library abstractions on `main`

If richer integration is desired later, that should be treated as **new implementation work**, not as something already present.

---

## Why the confusion happened

Some older branch-era narratives, planning material, and integration discussions described a more advanced architecture than what is actually merged to `main`.

That created an interpretation gap:

- some readers concluded “the advanced architecture exists”
- others concluded “nothing real exists”

Both interpretations are wrong.

The correct reading is:

- the **advanced integration architecture does not exist on `main`**
- the **actual deployable Vue management app does exist on `main`**

---

## Practical direction for developers

If you are implementing against this repository now:

### Use these as real/current:
- `src/`
- `package.json`
- `vite.config.mts`
- `infra/`
- `.github/workflows/`
- `docs/MAINLINE-REALITY-CHECK-2026-05-19.md` for evidence-based verification

### Do NOT assume these exist unless you can point to actual files on `main`:
- integration bridge packages
- React hooks
- Module Federation exports
- theme synchronization frameworks
-
