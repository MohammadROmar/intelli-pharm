import { useCallback, useEffect, useRef, useState } from 'react';

import { setCredentials, logout, setLoading } from '@/entities/session';
import type { LoginResponse } from '@/features/login/index.initial';
import { useAppDispatch, useAppSelector } from '@/shared/config';
import { getBackoffDelay } from '@/shared/lib';

import {
  AUTH_BROADCAST_CHANNEL,
  coordinatedRefresh,
  isInvalidRefreshToken,
  isOwnBroadcast,
  isRetryableError,
  wasRefreshInterrupted,
  type AuthSyncMessage,
} from '../lib/authRefreshCoordinator';
import {
  InterruptedScreen,
  LoadingScreen,
  NetworkErrorScreen,
} from './ui/AuthBootstrapScreens';
import { store } from '../store/store';

// ─── Constants ────────────────────────────────────────────────────────────────

const MAX_RETRIES = 3;

// ─── Types ────────────────────────────────────────────────────────────────────

/**
 * The bootstrap state machine drives the entire pre-auth render.
 *
 * loading       First attempt is running — show Logo spinner (silent, no text).
 * retrying      A network error occurred; we're waiting to retry — show "Reconnecting…".
 * network_error All retries exhausted — user must act (Try Again or Sign In).
 * interrupted   Token was rotated on the server but the response was lost —
 *               user must sign in again; we explain why instead of silent logout.
 * done          Terminal. Redux state drives routing (authenticated → app,
 *               logged-out → login page).
 */
type BootstrapStatus =
  | 'loading'
  | 'retrying'
  | 'network_error'
  | 'interrupted'
  | 'done';

const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Maps the refresh response onto the session slice's credentials shape.
// Centralized so the direct-dispatch path (this tab's own refresh) and the
// cross-tab broadcast path (adopting another tab's refresh) can never drift
// apart.
function toCredentials(data: LoginResponse) {
  return {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    roles: data.roles,
    user: { name: data.name, email: data.email },
    unread_notifications_count: data.unread_notifications_count,
  };
}

// ─── Init Guard ───────────────────────────────────────────────────────────────
//
// Auth bootstrap must run exactly once per page load (rule: advanced-init-once).
// React StrictMode double-invokes effects in development: the component mounts,
// unmounts, and remounts. coordinatedRefresh() deduplicates the HTTP call, but
// without this guard the state dispatches (setCredentials / logout / setStatus)
// would still execute twice. A module-level flag resets only on full page reload,
// which is the correct lifetime for one-time app initialization.

let didBootstrapInit = false;

// ─── Component ────────────────────────────────────────────────────────────────

type Props = { children: React.ReactNode };

export function AuthLoader({ children }: Props) {
  const dispatch = useAppDispatch();
  const refreshToken = useAppSelector((state) => state.session.refreshToken);
  const [status, setStatus] = useState<BootstrapStatus>('loading');

  // Freeze the token from the moment the app mounts — used only as a fast-path
  // presence check, never forwarded into the refresh call itself. The actual
  // token used for the network request is always re-read fresh inside
  // coordinatedRefresh(), because another tab may rotate it while we wait.
  const initialRefreshTokenRef = useRef(refreshToken);

  // Read the interruption flag BEFORE the first refresh attempt runs, so we
  // see the PREVIOUS boot's state rather than one we're about to create.
  const wasPreviouslyInterruptedRef = useRef(wasRefreshInterrupted());

  // Prevents two bootstrap attempts from running concurrently. A flaky
  // connection can fire the browser's 'online' event more than once before
  // the effect below has re-rendered and unsubscribed the listener; without
  // this guard, a second attemptBootstrapRefresh() would start while the
  // first is still mid-retry, and whichever one resolves LAST wins — even
  // if it's the stale one, clobbering an already-'done' status back to
  // 'network_error'.
  const isAttemptingRef = useRef(false);

  // ── Core bootstrap loop ───────────────────────────────────────────────────

  const attemptBootstrapRefresh = useCallback(async () => {
    if (isAttemptingRef.current) return;
    isAttemptingRef.current = true;

    try {
      if (!initialRefreshTokenRef.current) {
        dispatch(logout());
        setStatus('done');
        return;
      }

      for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
        // Show "Reconnecting…" and apply backoff before every retry.
        if (attempt > 0) {
          setStatus('retrying');
          await delay(getBackoffDelay(attempt - 1));
        }

        try {
          const data = await coordinatedRefresh();

          dispatch(setCredentials(toCredentials(data)));
          setStatus('done');
          return;
        } catch (error) {
          if (isInvalidRefreshToken(error)) {
            // Server explicitly rejected the token. Retrying is futile.
            if (wasPreviouslyInterruptedRef.current) {
              // The previous boot had a refresh in-flight when the app closed.
              // The server likely rotated the token but we never received the
              // new one. Not the user's fault — explain why instead of a
              // silent logout.
              dispatch(setLoading(false));
              setStatus('interrupted');
            } else {
              // Token is genuinely expired — silent redirect to login.
              dispatch(logout());
              setStatus('done');
            }
            return;
          }

          if (!isRetryableError(error)) {
            // Unexpected status (e.g. 400, 403) — no recovery path.
            dispatch(logout());
            setStatus('done');
            return;
          }

          // Network, rate-limit, or server error. Retry unless exhausted.
          if (attempt === MAX_RETRIES) {
            dispatch(setLoading(false));
            setStatus('network_error');
            return;
          }
          // Loop continues: delay is applied at the top of the next iteration.
        }
      }
    } finally {
      isAttemptingRef.current = false;
    }
  }, [dispatch]);

  // ── Initial auth on mount ─────────────────────────────────────────────────

  useEffect(() => {
    if (didBootstrapInit) return;
    didBootstrapInit = true;

    attemptBootstrapRefresh();
  }, [attemptBootstrapRefresh]);

  // ── Auto-retry on network recovery ───────────────────────────────────────
  // When the browser reports it is back online, immediately retry without
  // forcing the user to find and click the "Try Again" button themselves.

  useEffect(() => {
    if (status !== 'network_error') return;

    const handleOnline = () => {
      setStatus('loading');
      attemptBootstrapRefresh();
    };

    window.addEventListener('online', handleOnline);
    return () => window.removeEventListener('online', handleOnline);
  }, [status, attemptBootstrapRefresh]);

  // ── Cross-tab session sync ───────────────────────────────────────────────
  // Once bootstrap finishes, stay in sync with what other tabs do: adopt a
  // fresh token pair the moment ANY tab rotates it, and mirror a logout
  // immediately instead of discovering it the hard way (a 401 on our own
  // next request, followed by our own refresh — which is now guaranteed to
  // fail, since the token behind it is already dead).

  useEffect(() => {
    if (status !== 'done') return;
    if (typeof BroadcastChannel === 'undefined') return;

    const channel = new BroadcastChannel(AUTH_BROADCAST_CHANNEL);

    channel.onmessage = (event: MessageEvent<AuthSyncMessage>) => {
      const message = event.data;

      // BroadcastChannel delivers a message to every OTHER instance on the
      // channel — including the listener above, opened by THIS same tab.
      // Skip anything we posted ourselves; we already applied it directly
      // (setCredentials from coordinatedRefresh()'s return value, or logout
      // from the user action that triggered the broadcast in the first place).
      if (isOwnBroadcast(message)) return;

      if (message.type === 'refreshed') {
        dispatch(setCredentials(toCredentials(message.data)));
        return;
      }

      // message.type === 'logout'.
      // Guard: only act if this tab isn't already logged out. Without this,
      // two tabs would echo the broadcast back and forth indefinitely — this
      // tab dispatches logout, which re-triggers the store's own broadcast
      // middleware, which the other tab picks up, dispatches, re-broadcasts,
      // and so on.
      if (store.getState().session.isAuthenticated) {
        dispatch(logout());
      }
    };

    return () => channel.close();
  }, [status, dispatch]);

  // ── Handlers ──────────────────────────────────────────────────────────────

  const handleRetry = useCallback(() => {
    setStatus('loading');
    attemptBootstrapRefresh();
  }, [attemptBootstrapRefresh]);

  const handleSignIn = useCallback(() => {
    dispatch(logout());
    setStatus('done');
  }, [dispatch]);

  // ── Render ────────────────────────────────────────────────────────────────

  switch (status) {
    case 'loading':
    case 'retrying':
      return <LoadingScreen retrying={status === 'retrying'} />;
    case 'network_error':
      return (
        <NetworkErrorScreen onRetry={handleRetry} onSignIn={handleSignIn} />
      );
    case 'interrupted':
      return <InterruptedScreen onSignIn={handleSignIn} />;
    case 'done':
      return <>{children}</>;
    default: {
      // Compile-time guard: if BootstrapStatus ever gains a new member
      // without a matching case above, this line fails to type-check
      // instead of silently rendering nothing at runtime.
      const _exhaustiveCheck: never = status;
      return _exhaustiveCheck;
    }
  }
}
