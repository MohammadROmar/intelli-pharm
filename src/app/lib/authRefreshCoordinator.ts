import type { LoginResponse } from '@/features/login/index.initial';
import { getRefreshToken, setRefreshToken } from '@/entities/session';
import { apiClient, ApiError } from '@/shared/api';

// ─── Why this file exists ───────────────────────────────────────────────────
//
// Refresh tokens are single-use and rotate on every call. That one fact
// creates two races:
//
//   Same-tab  — several requests in ONE tab hit 401 around the same moment.
//   Cross-tab — the same problem, one level up: every tab is a separate JS
//               context with its own module state and its own Redux store.
//               Nothing in one tab's code can see what another tab is doing.
//
// coordinatedRefresh() is the single entry point both AuthProvider (bootstrap)
// and store.ts (runtime 401s) call into. It solves both races with two
// complementary mechanisms:
//
//   - An in-flight promise shared by every caller in THIS tab.
//   - navigator.locks, which provides real mutual exclusion across EVERY tab
//     of the origin — not just this one.
//
// The lock alone is NOT enough. If the new refresh token were persisted only
// after the lock releases (e.g. by the caller's later Redux dispatch), a tab
// queued behind the lock could acquire it and still read the just-consumed
// token — same race, one level up. So the token write happens INSIDE
// performRefresh(), before the lock is released. Whoever runs next inside
// the lock is guaranteed to see the fresh value.
//
// The "pending" flag (used to detect an interrupted refresh) lives here too,
// for the same reason: it must bracket the actual network call, which now
// happens in exactly one place regardless of which caller — bootstrap or
// runtime — triggered it. It's stored in localStorage rather than
// sessionStorage deliberately: sessionStorage is wiped the moment a tab
// closes, which is exactly the scenario this flag exists to catch. It also
// happens to line up with the lock — since only one refresh can ever be
// in-flight across the whole origin at a time, a single shared flag
// correctly represents that.

const LOCK_NAME = 'auth-refresh-lock';
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

// Guarded the same way navigator.locks is guarded below — BroadcastChannel
// isn't available in every browser, and an unguarded `new BroadcastChannel()`
// at module scope would throw at import time and take down the whole app.
const authSyncChannel =
  typeof BroadcastChannel !== 'undefined'
    ? new BroadcastChannel(AUTH_BROADCAST_CHANNEL)
    : null;

function broadcastRefreshed(data: LoginResponse): void {
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

// ─── Interrupted-session detection ──────────────────────────────────────────
//
// Stamped immediately before the network call, cleared the instant we get
// ANY definitive outcome (success or failure). If the app dies mid-flight —
// tab closed, OS killed it, network dropped after the server already
// rotated the token — this flag is left behind. wasRefreshInterrupted() lets
// the NEXT boot recognize that window and show "session interrupted"
// instead of a silent, confusing logout.
//
// Key is versioned (":v1") so a future change to what this flag stores
// (e.g. adding a reason code) can't be misread by clients still holding an
// old, differently-shaped value.
//
// All localStorage calls below are wrapped in try/catch: getItem/setItem/
// removeItem throw in Safari/Firefox private browsing, when storage is
// disabled, or when quota is exceeded. This flag is a best-effort UX nicety
// (shows a friendlier "session interrupted" screen instead of a silent
// logout) — not load-bearing for auth correctness — so failing silently and
// falling back to normal behavior is the right response to a storage error.
//
const PENDING_FLAG_KEY = 'intellipharm_auth_refresh_pending:v1';
const PENDING_FLAG_TTL_MS = 30_000;

function markRefreshPending(): void {
  try {
    localStorage.setItem(PENDING_FLAG_KEY, Date.now().toString());
  } catch {
    // Storage unavailable — nothing to do; see comment above.
  }
}

function clearRefreshPending(): void {
  try {
    localStorage.removeItem(PENDING_FLAG_KEY);
  } catch {
    // Storage unavailable — nothing to do; see comment above.
  }
}

export function wasRefreshInterrupted(): boolean {
  try {
    const raw = localStorage.getItem(PENDING_FLAG_KEY);
    if (raw === null) return false;

    const isRecent = Date.now() - parseInt(raw, 10) < PENDING_FLAG_TTL_MS;

    // A flag outside the TTL isn't a recent interruption — it's debris left
    // behind by one, possibly from a session that ended in an entirely
    // different way since (e.g. the user logged in again manually). Sweep it
    // so it doesn't sit in localStorage indefinitely.
    if (!isRecent) clearRefreshPending();

    return isRecent;
  } catch {
    // Storage unavailable — treat as "no interruption to report" rather
    // than surfacing a storage error as an auth error.
    return false;
  }
}

// ─── Error classification ───────────────────────────────────────────────────
// Shared so bootstrap and runtime judge failures the same way — previously
// each kept its own copy of this logic.
//
// isInvalidRefreshToken() is intentionally scoped to responses from
// /auth/v1/refresh specifically — it is NOT a general "was this a 401"
// check, and shouldn't be reused to classify errors from other endpoints.
// A proper 401 means the same thing here that it means anywhere, but this
// backend also returns 404 for an already-used or unknown refresh token
// (confirmed by testing), which is non-standard — 401 is the correct code
// for an invalid credential — but the frontend has to work with what the
// backend actually sends. If the backend returns other codes for related
// cases (expired vs. already-rotated vs. malformed), those need adding here
// too; worth confirming with whoever owns that endpoint rather than
// discovering each one by trial.

export function isInvalidRefreshToken(error: unknown): boolean {
  if (!(error instanceof ApiError)) return false;
  return error.status === 401 || error.status === 404;
}

/**
 * No status = the request never reached the server (retry). 429 = the auth
 * server is rate-limiting us — transient, not a rejection, so back off and
 * retry rather than fall through to the "no recovery path" logout. 5xx =
 * transient server failure.
 */
export function isRetryableError(error: unknown): boolean {
  if (!(error instanceof ApiError)) return true;
  return (
    error.status === undefined || error.status === 429 || error.status >= 500
  );
}

// ─── Same-tab dedup ──────────────────────────────────────────────────────────

let inFlightRefresh: Promise<LoginResponse> | null = null;

export async function coordinatedRefresh(): Promise<LoginResponse> {
  if (inFlightRefresh) return inFlightRefresh;

  inFlightRefresh = runLockedRefresh().finally(() => {
    inFlightRefresh = null;
  });

  return inFlightRefresh;
}

// ─── Cross-tab lock ──────────────────────────────────────────────────────────

function runLockedRefresh(): Promise<LoginResponse> {
  const hasLockSupport =
    typeof navigator !== 'undefined' && 'locks' in navigator;

  if (!hasLockSupport) {
    // Older browsers without Web Locks fall back to same-tab-only protection —
    // still strictly better than no coordination at all.
    if (import.meta.env.DEV) {
      console.warn(
        '[auth] navigator.locks unavailable — cross-tab refresh coordination disabled.',
      );
    }
    return performRefresh();
  }

  // Wrapped in an explicit Promise instead of `return navigator.locks.request(...)`
  // directly: this project's DOM lib typings resolve LockGrantedCallback's
  // return type as T rather than T | PromiseLike<T>, so TS infers the wrong
  // generic when the callback is async. Resolving/rejecting our own
  // Promise<LoginResponse> sidesteps that typing gap entirely. The lock is
  // still held for the full duration of performRefresh(): the callback is
  // async, so it implicitly returns a Promise<void> that only settles after
  // resolve/reject is called below — matching the Locks API spec, which
  // doesn't release the lock until the callback's returned promise settles.
  //
  // The trailing .catch(reject) is deliberate and separate from the
  // callback's own try/catch: it exists for the rare case where
  // navigator.locks.request() itself rejects before ever invoking the
  // callback (aborted signal, browser-level lock failure). Without it, that
  // failure has nowhere to go and this promise would hang forever.
  return new Promise<LoginResponse>((resolve, reject) => {
    navigator.locks
      .request(LOCK_NAME, async () => {
        try {
          resolve(await performRefresh());
        } catch (err) {
          reject(err);
        }
      })
      .catch(reject);
  });
}

// NOTE: There's a narrow race where a refresh request is interrupted
// (tab/browser closed mid-flight) after the server has already rotated
// the token but before the client received the response. The client then
// retries with a now-dead token on next load and gets logged out.
//
// Fix would require backend tolerance for a retried refresh (grace period
// on rotation, or an idempotency key) — raised with backend, declined.
// Frontend mitigates as best it can: shows an "interrupted session" screen
// instead of a silent logout, so it's a one-click recovery, not a mystery.
//
// Acceptable trade-off: narrow window (~hundreds of ms), rare to hit,
// no security impact — just an occasional extra sign-in tap.
async function performRefresh(): Promise<LoginResponse> {
  // Re-read at the moment we actually run, not when we started waiting —
  // another tab may have rotated the token while we were queued for the lock.
  const refreshToken = getRefreshToken();

  if (!refreshToken) {
    throw new ApiError('unauthorized', 401);
  }

  markRefreshPending();

  try {
    const { data } = await apiClient.post<LoginResponse>('/auth/v1/refresh', {
      refresh_token: refreshToken,
    });

    if (!data) {
      throw new ApiError('unauthorized', 401);
    }

    // Persist now, still holding the lock. Anything queued behind us reads
    // this value, not the one we just consumed.
    setRefreshToken(data.refresh_token);
    broadcastRefreshed(data);

    return data;
  } finally {
    clearRefreshPending();
  }
}
