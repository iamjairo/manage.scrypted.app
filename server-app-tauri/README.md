# Scrypted Server App (Tauri)

A lightweight native launcher for the **Scrypted** Docker container. Built with [Tauri 2](https://v2.tauri.app/) + Vue 3 + Vuetify, it delivers the same feature set as the Electron version in a **~10 MB binary** instead of ~120 MB.

## Features

- 🟢 **Container start / stop** — manage the `scrypted` Docker container with one click.
- 🌐 **LAN IP display** — shows your machine's local network address.
- 📜 **Live `docker logs` stream** — tail the container log in real time.
- 💻 **Integrated mini terminal** — a full PTY shell inside the window (powered by xterm.js + portable-pty).

## Why Tauri vs Electron?

| | Tauri | Electron |
|---|---|---|
| Binary size | ~10 MB | ~120 MB |
| Memory footprint | ~30–50 MB | ~100–200 MB |
| Renderer | System WebView | Bundled Chromium |
| Native feel | ✅ (uses OS WebView) | ❌ |
| npm ecosystem access | Limited (via IPC) | Full |
| Docker / PTY | Rust crates | Node `dockerode` / `node-pty` |

Tauri is ideal for this launcher because the UI surface is small, the heavy lifting is done in Rust, and shipping a single compact binary without a bundled browser is a significant advantage.

## Prerequisites

### Rust toolchain

```sh
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source "$HOME/.cargo/env"
```

### Linux system libraries

Tauri on Linux requires WebKit2GTK and a few other packages. Install them with:

```sh
sudo apt update && sudo apt install -y \
  build-essential \
  libwebkit2gtk-4.1-dev \
  libssl-dev \
  libayatana-appindicator3-dev \
  librsvg2-dev \
  libgtk-3-dev \
  libglib2.0-dev
```

Full, up-to-date list: <https://v2.tauri.app/start/prerequisites/>

### Node.js (for the Vue frontend)

Node 18+ and npm 9+ are required.

### Docker

The app communicates with Docker via the Unix socket. Your user must be in the `docker` group:

```sh
sudo usermod -aG docker $USER
# log out and back in (or newgrp docker)
```

## Development

```sh
cd server-app-tauri
npm install
npm run tauri dev
```

This starts the Vite dev server on port 1420 and opens the Tauri window with hot-reload.

## Production build

```sh
npm run tauri build
```

Output bundles are placed under:

```
src-tauri/target/release/bundle/
├── deb/   ← Debian / Ubuntu package
└── appimage/ ← AppImage (runs on any Linux distro)
```

## Docker socket caveat

The app opens `/var/run/docker.sock` directly through the `bollard` Rust crate. If Docker is not installed, or your user is not in the `docker` group, the status commands will return an error. Add your user to the `docker` group as shown above, or run the app with `sudo` as a workaround.

## Status

**Experimental** — this is v2 of the launcher, a Tauri port of the Electron `server-app`. It targets feature parity with the Electron version:

- [x] Container status / start / stop
- [x] LAN IP display
- [x] Live log streaming
- [x] Integrated PTY terminal
- [ ] System tray icon (planned)
- [ ] Auto-update (planned)
