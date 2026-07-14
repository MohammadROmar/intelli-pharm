import type { LoginResponse } from '@/features/login/index.initial';

// ─── Cross-tab session sync ─────────────────────────────────────────────────
//
// Lives here, in entities/session, rather than alongside refresh-specific
// coordination in app/lib: both the refresh flow (app/lib/
// authRefreshCoordinator.ts) and the logout flow (features/auth's
// useLogout, via logoutRequest() below) need to broadcast, and features
// can't reach into app under this project's FSD layering — entities is the
// lowest layer both of them can already import from.

export const AUTH_BROADCAST_CHANNEL = 'auth-sync';

export type AuthSyncMessage =
  | { type: 'refreshed'; data: LoginResponse; originId: string }
  | { type: 'logout'; originId: string };

// One id per tab, stamped on every message this tab posts. BroadcastChannel
// delivers a message to every OTHER *instance* subscribed to the channel
// name — including a second instance opened by this same tab (AuthProvider
// listens on its own BroadcastChannel object, separate from the one below).
// Without tagging, a tab would "hear" and reprocess the broadcast it just
// sent to everyone else. isOwnBroadcast() lets a listener filter that out.
const TAB_ID: string =
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

// Guarded: BroadcastChannel isn't available in every browser, and an
// unguarded `new BroadcastChannel()` at module scope would throw at import
// time and take down the whole app.
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
