import { contextBridge, ipcRenderer } from 'electron';

const api = {
  status: () => ipcRenderer.invoke('svc:status') as Promise<'running' | 'stopped' | 'missing'>,
  start: () => ipcRenderer.invoke('svc:start') as Promise<'running' | 'stopped' | 'missing'>,
  stop: () => ipcRenderer.invoke('svc:stop') as Promise<'running' | 'stopped' | 'missing'>,
  ip: () => ipcRenderer.invoke('svc:ip') as Promise<string>,
  startLogs: () => ipcRenderer.invoke('logs:start') as Promise<void>,
  stopLogs: () => ipcRenderer.invoke('logs:stop') as Promise<void>,
  onLog: (handler: (chunk: string) => void) => {
    const listener = (_event: Electron.IpcRendererEvent, chunk: string) => handler(chunk);
    ipcRenderer.on('logs:data', listener);
    return () => ipcRenderer.off('logs:data', listener);
  },
  term: {
    open: (id: string) => ipcRenderer.invoke('term:open', id) as Promise<string>,
    write: (id: string, data: string) => ipcRenderer.invoke('term:write', id, data) as Promise<void>,
    resize: (id: string, cols: number, rows: number) =>
      ipcRenderer.invoke('term:resize', id, cols, rows) as Promise<void>,
    close: (id: string) => ipcRenderer.invoke('term:close', id) as Promise<void>,
    onData: (handler: (id: string, data: string) => void) => {
      const listener = (
        _event: Electron.IpcRendererEvent,
        payload: { id: string; data: string },
      ) => handler(payload.id, payload.data);
      ipcRenderer.on('term:data', listener);
      return () => ipcRenderer.off('term:data', listener);
    },
    onExit: (handler: (id: string, exitCode: number, signal?: number) => void) => {
      const listener = (
        _event: Electron.IpcRendererEvent,
        payload: { id: string; exitCode: number; signal?: number },
      ) => handler(payload.id, payload.exitCode, payload.signal);
      ipcRenderer.on('term:exit', listener);
      return () => ipcRenderer.off('term:exit', listener);
    },
  },
};

contextBridge.exposeInMainWorld('scrypted', api);
