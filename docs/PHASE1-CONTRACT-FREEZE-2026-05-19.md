# Phase 1 Contract Freeze — 2026-05-19

This document freezes the integration contracts required by `HANDOFF-GO-NO-GO-CHECKLIST.md` Gate 3.

## 1) Routing contract (frozen)

- **Canonical ingress**: single HTTPS host via Caddy (`infra/Caddyfile`), with management UI at `/`.
- **Scrypted namespace**: all Scrypted API and WebSocket traffic are proxied under `/scrypted/*`.
- **Preferred topology**: subdomain model for production/public installs (for example `scrypted.example.com` in config, replaced by real domain).
- **LAN-only mode**: `infra/Caddyfile.lan` is approved fallback; still preserves `/scrypted/*` namespace.
- **Non-goal for Phase 1**: subpath embedding into a separate dashboard host is not part of baseline completion.

## 2) Auth/session ownership boundary (frozen)

- **Scrypted auth/session ownership** remains with Scrypted upstream endpoints behind `/scrypted/*`.
- **Management UI ownership** is client-side app state/navigation only; it does not mint or own Scrypted server auth contracts.
- **Boundary rule**: no custom auth broker is introduced in Phase 1.

## 3) Proxy/API contract (frozen)

- **Proxy**: Caddy reverse proxy from `/scrypted/*` to `https://127.0.0.1:10443` with `tls_insecure_skip_verify` (loopback/self-signed upstream cert context).
- **WebSocket behavior**: default Caddy `reverse_proxy` upgrade handling; no custom websocket header rewrites added.
- **Timeout/retry posture**: keep Caddy defaults in Phase 1; no custom retry strategy introduced.
- **Path ownership**:
  - `/scrypted/*` => proxied to Scrypted
  - everything else => static SPA served from `/srv/ui` with SPA fallback (`index.html`)

## 4) Operations ownership contract (frozen)

- **Runtime ops owner**: repository maintainers/operators for this fork.
- **Cert lifecycle owner**: operators managing Caddy mode:
  - public ACME via `infra/Caddyfile`, or
  - LAN trust flow via `infra/Caddyfile.lan` and client trust import.
- **Deploy/rollback owner**: operators using `infra/` compose and documented runbooks.
- **Incident response owner**: operators for ingress/proxy/runtime incidents; upstream Scrypted issues escalated to upstream project channels.

## 5) Effective date and change control

- Effective date: **2026-05-19**
- Any change to these contracts requires:
  1. PR updating this freeze doc,
  2. corresponding update to `HANDOFF-GO-NO-GO-CHECKLIST.md`,
  3. reviewer acknowledgment in handoff review.
