import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('scrypted', {
  status: () => ipcRenderer.invoke('svc:status'),
  start:  () => ipcRenderer.invoke('svc:start'),
  stop:   () => ipcRenderer.invoke('svc:stop'),
  ip:     () => ipcRenderer.invoke('svc:ip'),

  startLogs: () => ipcRenderer.invoke('logs:start'),
  stopLogs:  () => ipcRenderer.invoke('logs:stop'),
  onLog:     (cb: (s: string) => void) =>
    ipcRenderer.on('logs:data', (_e, d) => cb(d)),

  term: {
    open:   (id: string, cols: number, rows: number) => ipcRenderer.invoke('term:open', id, cols, rows),
    write:  (id: string, data: string) => ipcRenderer.invoke('term:write', id, data),
    resize: (id: string, cols: number, rows: number) => ipcRenderer.invoke('term:resize', id, cols, rows),
    close:  (id: string) => ipcRenderer.invoke('term:close', id),
    onData: (id: string, cb: (s: string) => void) =>
      ipcRenderer.on(`term:data:${id}`, (_e, d) => cb(d)),
    onExit: (id: string, cb: () => void) =>
      ipcRenderer.on(`term:exit:${id}`, () => cb()),
  },
});