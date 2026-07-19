import type { ConnectionState } from './types';

let state: ConnectionState = 'disconnected';
const listeners = new Set<() => void>();

export function setConnectionState(next: ConnectionState): void {
  if (next === state) return;
  state = next;
  listeners.forEach((listener) => listener());
}

export function getConnectionState(): ConnectionState {
  return state;
}

export function subscribeConnectionState(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
