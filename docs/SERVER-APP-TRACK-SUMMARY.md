# Server App Track Summary (Electron + Tauri)

## Objective

Provide an operator-facing desktop control layer for Scrypted runtime lifecycle and diagnostics.

## Track inventory

- Electron track (`server-app`)
- Tauri track (`server-app-tauri`)

## Expected capabilities

- runtime status and lifecycle controls (start/stop/state)
- log visibility
- terminal/shell access where applicable
- operator-first UX around local service control

## Current status

- Tracks exist in PR/workstream context and should be treated independently from baseline integration.
- If referenced in docs before landing on `main`, mark clearly as planned/in-progress to avoid broken expectations.

## Decision gate required

Choose one model before production integration:

1. Electron as canonical
2. Tauri as canonical
3. Dual support (higher maintenance and test surface)

## Recommendation

Keep server-app tracks out of baseline IoT dashboard integration critical path until:

- routing/auth/API contracts are frozen
- ownership and release process are defined
- packaging and support policy are approved