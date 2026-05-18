import { randomUUID } from 'node:crypto';
import os from 'node:os';
import path from 'node:path';
import { app, BrowserWindow, ipcMain, shell } from 'electron';
import type { IPty } from 'node-pty';
import pty from 'node-pty';
import { getStatus, start, stop, streamLogs } from './docker';

const terminals = new Map<string, IPty>();
let logTeardown: (() => void) | undefined;
let logsActive = false;
let logsReconnectTimer: NodeJS.Timeout | undefined;

const isDev = !app.isPackaged;

function getLanIp() {
  const interfaces = os.networkInterfaces();

  for (const network of Object.values(interfaces)) {
    if (!network) {
      continue;
    }

    const candidate = network.find(
      (address) => address.family === 'IPv4' && !address.internal,
    );

    if (candidate) {
      return candidate.address;
    }
  }

  return '127.0.0.1';
}

function resolveRendererUrl() {
  if (isDev) {
    return process.env.VITE_DEV_SERVER_URL ?? 'http://localhost:5173';
  }

  return `file://${path.join(__dirname, '../dist/index.html')}`;
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1100,
    height: 720,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  win.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  void win.loadURL(resolveRendererUrl());
  return win;
}

function stopLogStream() {
  logsActive = false;
  if (logsReconnectTimer) {
    clearTimeout(logsReconnectTimer);
    logsReconnectTimer = undefined;
  }
  logTeardown?.();
  logTeardown = undefined;
}

async function startLogStream(win: BrowserWindow) {
  stopLogStream();
  logsActive = true;

  const connect = async () => {
    if (!logsActive || win.isDestroyed()) {
      return;
    }

    try {
      logTeardown = await streamLogs(
        (data) => {
          if (!win.isDestroyed()) {
            win.webContents.send('logs:data', data);
          }
        },
        () => {
          if (!logsActive || win.isDestroyed()) {
            return;
          }
          logsReconnectTimer = setTimeout(() => {
            void connect();
          }, 1500);
        },
      );
    } catch (error) {
      if (!logsActive || win.isDestroyed()) {
        return;
      }
      win.webContents.send('logs:data', `[logs] ${(error as Error).message}\r\n`);
      logsReconnectTimer = setTimeout(() => {
        void connect();
      }, 2000);
    }
  };

  await connect();
}

app.whenReady().then(() => {
  const win = createWindow();

  ipcMain.handle('svc:status', () => getStatus());
  ipcMain.handle('svc:start', async () => {
    await start();
    return getStatus();
  });
  ipcMain.handle('svc:stop', async () => {
    await stop();
    return getStatus();
  });
  ipcMain.handle('svc:ip', () => getLanIp());

  ipcMain.handle('logs:start', async () => {
    await startLogStream(win);
  });
  ipcMain.handle('logs:stop', () => {
    stopLogStream();
  });

  ipcMain.handle('term:open', (_event, id?: string) => {
    const sessionId = id || randomUUID();
    if (terminals.has(sessionId)) {
      return sessionId;
    }

    const term = pty.spawn(process.env.SHELL || '/bin/bash', [], {
      name: 'xterm-color',
      cols: 80,
      rows: 24,
      cwd: os.homedir(),
      env: process.env,
    });

    term.onData((data) => {
      if (!win.isDestroyed()) {
        win.webContents.send('term:data', { id: sessionId, data });
      }
    });

    term.onExit((event) => {
      terminals.delete(sessionId);
      if (!win.isDestroyed()) {
        win.webContents.send('term:exit', {
          id: sessionId,
          exitCode: event.exitCode,
          signal: event.signal,
        });
      }
    });

    terminals.set(sessionId, term);
    return sessionId;
  });

  ipcMain.handle('term:write', (_event, id: string, data: string) => {
    terminals.get(id)?.write(data);
  });

  ipcMain.handle('term:resize', (_event, id: string, cols: number, rows: number) => {
    if (cols > 0 && rows > 0) {
      terminals.get(id)?.resize(cols, rows);
    }
  });

  ipcMain.handle('term:close', (_event, id: string) => {
    terminals.get(id)?.kill();
    terminals.delete(id);
  });

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });

  app.on('before-quit', () => {
    stopLogStream();
    for (const [id, term] of terminals.entries()) {
      term.kill();
      terminals.delete(id);
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
