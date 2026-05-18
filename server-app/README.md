# Scrypted Server App

Desktop launcher for Scrypted on Linux built with Electron + Vue 3 + Vuetify. It provides a simple operations UI for container power control, status/IP visibility, log streaming, and an integrated shell terminal for advanced commands.

## Prerequisites

- Linux host
- Docker installed
- Your user is in the `docker` group

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Build artifacts are generated in `release/` as `*.AppImage` and `*.deb`.

## First run behavior

If the `scrypted` container does not exist, turning the server on pulls `ghcr.io/koush/scrypted:latest`, creates the container, and starts it. Persistent data is stored in `~/.scrypted/volume`.

## Troubleshooting

- Docker socket permissions: ensure your user has Docker access (usually via `docker` group membership).
- `node-pty` rebuild issues: run `npm rebuild node-pty`.
- AppImage launch issues: install FUSE support required by your distro.

## Roadmap

A Tauri port is on the table; this Electron implementation is v1.
