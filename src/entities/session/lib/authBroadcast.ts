import type { LoginResponse } from '@/features/auth/index.initial';

export const AUTH_BROADCAST_CHANNEL = 'auth-sync';

export type AuthSyncMessage =
  | { type: 'refreshed'; data: LoginResponse; originId: string }
  | { type: 'logout'; originId: string };

const TAB_ID: string =
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

const authSyncChannel =
  typeof BroadcastChannel !== 'undefined'
    ? new BroadcastChannel(AUTH_BROADCAST_CHANNEL)
    : null;

export function broadcastRefreshed(data: LoginResponse): void {
  authSyncChannel?.postMessage({
    type: 'refreshed',
    data,
    originId: TAB_ID,
  } satisfies AuthSyncMessage);
}

export function broadcastLogout(): void {
  authSyncChannel?.postMessage({
    type: 'logout',
    originId: TAB_ID,
  } satisfies AuthSyncMessage);
}

export function isOwnBroadcast(message: AuthSyncMessage): boolean {
  return message.originId === TAB_ID;
}
