# manage.scrypted.app — iamjairo fork

> Personal fork of [`koush/manage.scrypted.app`](https://github.com/koush/manage.scrypted.app)
> used to customize the Scrypted management UI for my homelab dashboard at
> `selfhosted.iamjairo.com`, plus companion deployment infra and a desktop
> launcher for the Scrypted Docker container.

## What's in this repo

| Path | Purpose |
|------|---------|
| `src/` | The customized Vue 3 + TypeScript management UI (fork of upstream). |
| `infra/` | Docker Compose + Caddy reverse-proxy stack for serving the UI alongside Scrypted on Linux. Let's Encrypt + LAN self-signed variants. |
| `server-app/` | Electron desktop launcher for the Scrypted container — start/stop, LAN IP, live logs, mini terminal. |
| `server-app-tauri/` | Tauri 2 port of the launcher (~10 MB binary). |
| `agent-harness/` | LLM agent harness that evaluates whether a model can author valid Scrypted scripts from the `PROMPT.md` docs. |
| `.github/` | Dependabot, labels, CodeQL, Scorecard, and the upstream-sync workflow. |

## Quick start — UI development against a live Scrypted server

```sh
git clone https://github.com/iamjairo/manage.scrypted.app
git clone https://github.com/koush/scrypted
cd scrypted && ./npm-install.sh
cd ../manage.scrypted.app && npm install
# Edit vite.config.mts: point the proxy at your Scrypted host (http port 10080)
npm run dev
# Open http://localhost:4000
```

Vite reverse-proxies API + WebSocket calls to your Scrypted server, so changes
to the UI are live against real devices.

## Production build

```sh
npm run build       # outputs dist/
```

Serve `dist/` from any static host. For a turnkey deployment see [`infra/`](infra/README.md).

## Deployment (Docker + Caddy)

[`infra/`](infra/README.md) contains a Compose stack that runs Scrypted plus a
Caddy reverse proxy serving the customized UI built from this repo. Three
Caddyfile variants:

- `infra/Caddyfile` — public domain with automatic Let's Encrypt.
- `infra/Caddyfile.lan` — LAN-only with Caddy's local CA.
- `infra/Caddyfile.subpath` — mount under `/dashboard/*` on an existing domain.

## Server App (desktop launcher)

[`server-app/`](server-app/README.md) is an Electron app for operators who want
a friendly GUI to start/stop the Scrypted container, see live logs, and access
an integrated shell. [`server-app-tauri/`](server-app-tauri/README.md) is the
smaller Tauri build of the same idea.

## Agent harness

[`agent-harness/`](agent-harness/README.md) tests whether an LLM agent can
generate valid Scrypted scripts given `PROMPT.md` + SDK types. Useful for
evaluating new models against the Scrypted scripting surface.

## Staying in sync with upstream

This fork is fast-forwarded daily from [`koush/manage.scrypted.app`](https://github.com/koush/manage.scrypted.app)
by [`.github/workflows/upstream-sync.yml`](.github/workflows/upstream-sync.yml).
When histories diverge (because of fork-only customizations), the workflow
opens a PR labeled `upstream-sync` instead of force-pushing.

## Security

See [SECURITY.md](SECURITY.md). Report vulnerabilities privately via the
[Security tab](https://github.com/iamjairo/manage.scrypted.app/security)
("Report a vulnerability"). Issues in upstream code should be reported to
[`koush/manage.scrypted.app`](https://github.com/koush/manage.scrypted.app/security)
or [`koush/scrypted`](https://github.com/koush/scrypted/security).

Automated tooling running on this repo:

- **Dependabot** — weekly dependency updates for npm, Cargo, GitHub Actions, and Docker.
- **CodeQL** — `security-and-quality` query suite, on push/PR/weekly.
- **OpenSSF Scorecard** — supply-chain posture, weekly.

## License

This fork inherits the upstream license. See [`LICENSE`](LICENSE) if present, or
defer to [`koush/manage.scrypted.app`](https://github.com/koush/manage.scrypted.app)
for licensing terms.

## Acknowledgements

Built on top of [Scrypted](https://github.com/koush/scrypted) by
[@koush](https://github.com/koush). This fork exists purely to tailor the UI
and operations tooling for one homelab — nothing here is intended to compete
with or replace the upstream project.
