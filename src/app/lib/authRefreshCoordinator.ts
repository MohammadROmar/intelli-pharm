import type { LoginResponse } from '@/features/login/index.initial';
import { broadcastRefreshed } from '@/entities/session';
import { apiClient, ApiError } from '@/shared/api';

const LOCK_NAME = 'auth-refresh-lock';

// ─── Interrupted-session detection ──────────────────────────────────────────
//
// Stamped immediately before the network call, cleared the instant we get
// ANY definitive outcome (success or failure). See the file-level comment
// above for why this still matters, unchanged, post-migration.
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
    // different way since (e.g. the user logged in again manually). Sweep
    // it so it doesn't sit in localStorage indefinitely.
    if (!isRecent) clearRefreshPending();

    return isRecent;
  } catch {
    return false;
  }
}

// ─── Error classification ───────────────────────────────────────────────────
//
// Confirmed directly with backend: every case their own code handles —
// deleted user, expired token, missing token, malformed token — returns
// 401. Nothing outside their control (the server itself being unreachable
// or erroring) is guaranteed a specific code, which is exactly why that
// bucket is isRetryableError's job, not enumerated here.

export function isInvalidRefreshToken(error: unknown): boolean {
  if (!(error instanceof ApiError)) return false;
  return error.status === 401;
}

/**
 * No status = the request never reached the server (retry). 429 = the auth
 * server is rate-limiting us — transient, not a rejection, so back off and
 * retry rather than fall through to the "no recovery path" logout. 5xx =
 * transient server failure — and, per backend, also the fallback for
 * anything outside their own handled cases, so it's deliberately treated as
 * "try again" rather than "give up": misclassifying a genuine server hiccup
 * as an invalid session would log someone out for no reason.
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
// retries with a now-dead cookie on next load and gets a 401.
//
// Fix would require backend tolerance for a retried refresh (grace period
// on rotation, or an idempotency key) — raised with backend, declined.
// Frontend mitigates as best it can: shows an "interrupted session" screen
// instead of a silent logout, so it's a one-click recovery, not a mystery.
//
// Acceptable trade-off: narrow window (~hundreds of ms), rare to hit,
// no security impact — just an occasional extra sign-in tap.
async function performRefresh(): Promise<LoginResponse> {
  markRefreshPending();

  try {
    // No body and no presence check: the refresh token is an httpOnly
    // cookie now, attached automatically by the browser — there's nothing
    // for JS to read or send, and no way to peek at whether it's even
    // there before asking. A missing or dead cookie just comes back as the
    // server's own 401, same as any other invalid token.
    //
    // skipAuthRefresh: true — this call's own 401 means "no valid session
    // to restore," never "the access token expired," so it must never
    // trigger store.ts's response interceptor into attempting ANOTHER
    // refresh off of this one's failure.
    const { data } = await apiClient.post<LoginResponse>(
      '/auth/v2/refresh',
      undefined,
      { skipAuthRefresh: true },
    );

    if (!data) {
      throw new ApiError('unauthorized', 401);
    }

    broadcastRefreshed(data);

    return data;
  } finally {
    clearRefreshPending();
  }
}
