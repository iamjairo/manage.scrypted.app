import { invoke } from '@tauri-apps/api/core';
import { listen } from '@tauri-apps/api/event';

export const scrypted = {
  status: () => invoke<'running' | 'stopped' | 'missing'>('svc_status'),
  start:  () => invoke<void>('svc_start'),
  stop:   () => invoke<void>('svc_stop'),
  ip:     () => invoke<string>('svc_ip'),
  startLogs: () => invoke<void>('logs_start'),
  stopLogs:  () => invoke<void>('logs_stop'),
  onLog:  (cb: (s: string) => void) => listen<string>('logs:data', (e) => cb(e.payload)),
  term: {
    open:   (id: string, cols: number, rows: number) => invoke<void>('term_open',   { id, cols, rows }),
    write:  (id: string, data: string)               => invoke<void>('term_write',  { id, data }),
    resize: (id: string, cols: number, rows: number) => invoke<void>('term_resize', { id, cols, rows }),
    close:  (id: string)                             => invoke<void>('term_close',  { id }),
    onData: (id: string, cb: (s: string) => void)    => listen<string>(`term:data:${id}`, (e) => cb(e.payload)),
    onExit: (id: string, cb: () => void)             => listen<null>(`term:exit:${id}`, () => cb()),
  },
};
