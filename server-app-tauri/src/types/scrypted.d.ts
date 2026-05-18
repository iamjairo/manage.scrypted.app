export type ContainerStatus = 'running' | 'stopped' | 'missing';

export interface TermSession {
  id: string;
  cols: number;
  rows: number;
}
