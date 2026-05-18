export {};

type ServiceStatus = 'running' | 'stopped' | 'missing';

type RemoveListener = () => void;

interface ScryptedBridge {
  status: () => Promise<ServiceStatus>;
  start: () => Promise<ServiceStatus>;
  stop: () => Promise<ServiceStatus>;
  ip: () => Promise<string>;
  startLogs: () => Promise<void>;
  stopLogs: () => Promise<void>;
  onLog: (handler: (chunk: string) => void) => RemoveListener;
  term: {
    open: (id: string) => Promise<string>;
    write: (id: string, data: string) => Promise<void>;
    resize: (id: string, cols: number, rows: number) => Promise<void>;
    close: (id: string) => Promise<void>;
    onData: (handler: (id: string, data: string) => void) => RemoveListener;
    onExit: (handler: (id: string, exitCode: number, signal?: number) => void) => RemoveListener;
  };
}

declare global {
  interface Window {
    scrypted: ScryptedBridge;
  }
}
