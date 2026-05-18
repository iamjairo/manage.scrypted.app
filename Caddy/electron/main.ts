import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'node:path';
import os from 'node:os';
import * as pty from 'node-pty';
import * as svc from './docker';

let win: BrowserWindow;

function getLanIp(): string {
  const ifaces = os.networkInterfaces();
  for (const name of Object.keys(ifaces)) {
    for (const i of ifaces[name] ?? []) {
      if (i.family === 'IPv4' && !i.internal) return i.address;
    }
  }
  return '127.0.0.1';
}

function createWindow() {
  win = new BrowserWindow({
    width: 1100,
    height: 720,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
    },
  });
  win.loadURL(process.env.VITE_DEV_SERVER_URL || `file://${path.join(__dirname, '../dist/index.html')}`);
}

app.whenReady().then(createWindow);

// ── Status / control ────────────────────────────────────────────
ipcMain.handle('svc:status', () => svc.getStatus());
ipcMain.handle('svc:start',  () => svc.start());
ipcMain.handle('svc:stop',   () => svc.stop());
ipcMain.handle('svc:ip',     () => getLanIp());

// ── Logs (push stream) ──────────────────────────────────────────
let stopLogs: undefined | (() => void);
ipcMain.handle('logs:start', async () => {
  stopLogs?.();
  stopLogs = await svc.streamLogs((chunk) => win.webContents.send('logs:data', chunk));
});
ipcMain.handle('logs:stop', () => { stopLogs?.(); stopLogs = undefined; });

// ── Mini terminal (node-pty) ────────────────────────────────────
const ptys = new Map<string, pty.IPty>();
ipcMain.handle('term:open', (_e, id: string, cols: number, rows: number) => {
  const shell = process.platform === 'win32' ? 'powershell.exe' : (process.env.SHELL || 'bash');
  const p = pty.spawn(shell, [], { name: 'xterm-color', cols, rows, cwd: os.homedir(), env: process.env });
  p.onData((data) => win.webContents.send(`term:data:${id}`, data));
  p.onExit(() => win.webContents.send(`term:exit:${id}`));
  ptys.set(id, p);
});
ipcMain.handle('term:write',  (_e, id: string, data: string) => ptys.get(id)?.write(data));
ipcMain.handle('term:resize', (_e, id: string, cols: number, rows: number) => ptys.get(id)?.resize(cols, rows));
ipcMain.handle('term:close',  (_e, id: string) => { ptys.get(id)?.kill(); ptys.delete(id); });