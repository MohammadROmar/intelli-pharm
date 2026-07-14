import { useCallback, useEffect, useRef, useState } from 'react';

import { useLogout } from '@/features/auth/index.initial';
import {
  logout,
  setLoading,
  setCredentials,
  isOwnBroadcast,
  toSessionCredentials,
  AUTH_BROADCAST_CHANNEL,
  type AuthSyncMessage,
} from '@/entities/session';
import { useAppDispatch } from '@/shared/config';
import { getBackoffDelay } from '@/shared/lib';

import {
  coordinatedRefresh,
  isInvalidRefreshToken,
  isRetryableError,
  wasRefreshInterrupted,
} from '../lib/authRefreshCoordinator';
import {
  InterruptedScreen,
  LoadingScreen,
  LoggingOutScreen,
  NetworkErrorScreen,
  SignOutIssueScreen,
} from './ui/AuthBootstrapScreens';
import { store } from '../store/store';

const MAX_RETRIES = 3;

type BootstrapStatus =
  | 'loading'
  | 'retrying'
  | 'network_error'
  | 'interrupted'
  | 'signing_out'
  | 'sign_out_issue'
  | 'done';

const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Auth bootstrap must run exactly once per page load (rule: advanced-init-once).
// React StrictMode double-invokes effects in development: the component mounts,
// unmounts, and remounts. coordinatedRefresh() deduplicates the HTTP call, but
// without this guard the state dispatches (setCredentials / logout / setStatus)
// would still execute twice. A module-level flag resets only on full page reload,
// which is the correct lifetime for one-time app initialization.
let didBootstrapInit = false;

type Props = { children: React.ReactNode };

export function AuthLoader({ children }: Props) {
  const dispatch = useAppDispatch();
  const [status, setStatus] = useState<BootstrapStatus>('loading');
  const logoutUser = useLogout();

  // Read the interruption flag BEFORE the first refresh attempt runs, so we
  // see the PREVIOUS boot's state rather than one we're about to create.
  //
  // Sentinel-null init rather than useRef(wasRefreshInterrupted()) directly:
  // unlike useState, useRef has no lazy function form — its argument is
  // evaluated fresh on every render regardless of whether the value is
  // actually used again. wasRefreshInterrupted() reads localStorage, so
  // that read would otherwise re-run on every one of AuthLoader's status
  // transitions even though only the very first result is ever meaningful.
  const wasPreviouslyInterruptedRef = useRef<boolean | null>(null);
  if (wasPreviouslyInterruptedRef.current === null) {
    wasPreviouslyInterruptedRef.current = wasRefreshInterrupted();
  }

  // Prevents two bootstrap attempts from running concurrently. A flaky
  // connection can fire the browser's 'online' event more than once before
  // the effect below has re-rendered and unsubscribed the listener; without
  // this guard, a second attemptBootstrapRefresh() would start while the
  // first is still mid-retry, and whichever one resolves LAST wins.
  const isAttemptingRef = useRef(false);

  const attemptBootstrapRefresh = useCallback(async () => {
    if (isAttemptingRef.current) return;
    isAttemptingRef.current = true;

    try {
      for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
        if (attempt > 0) {
          setStatus('retrying');
          await delay(getBackoffDelay(attempt - 1));
        }

        try {
          const data = await coordinatedRefresh();

          dispatch(setCredentials(toSessionCredentials(data)));
          setStatus('done');
          return;
        } catch (error) {
          if (isInvalidRefreshToken(error)) {
            // Server explicitly rejected the token — no cookie, a dead one,
            // or one it never recognized. Retrying is futile.
            if (wasPreviouslyInterruptedRef.current) {
              // The previous boot had a refresh in-flight when the app closed.
              // The server likely rotated the token but we never received the
              // new one. Not the user's fault — explain why instead of a
              // silent logout.
              dispatch(setLoading(false));
              setStatus('interrupted');
            } else {
              // No session to restore — silent redirect to login. This is
              // also the path a brand-new visitor takes: there's no cheap
              // way to check whether the refresh cookie even exists before
              // asking (httpOnly means JS can't peek), so bootstrap always
              // attempts the refresh and lets a fast 401 stand in for "not
              // logged in."
              dispatch(logout());
              setStatus('done');
            }
            return;
          }

          if (!isRetryableError(error)) {
            dispatch(logout());
            setStatus('done');
            return;
          }

          if (attempt === MAX_RETRIES) {
            dispatch(setLoading(false));
            setStatus('network_error');
            return;
          }
        }
      }
    } finally {
      isAttemptingRef.current = false;
    }
  }, [dispatch]);

  useEffect(() => {
    if (didBootstrapInit) return;
    didBootstrapInit = true;

    void attemptBootstrapRefresh();
  }, [attemptBootstrapRefresh]);

  // Auto-retry on network recovery without forcing the user to click "Try Again"
  useEffect(() => {
    if (status !== 'network_error') return;

    const handleOnline = () => {
      // A flaky connection can fire 'online' more than once in quick succession.
      // attemptBootstrapRefresh() already no-ops via isAttemptingRef, but without
      // this guard setStatus('loading') would still run and cause UI flashing.
      if (isAttemptingRef.current) return;
      setStatus('loading');
      void attemptBootstrapRefresh();
    };

    window.addEventListener('online', handleOnline);
    return () => window.removeEventListener('online', handleOnline);
  }, [status, attemptBootstrapRefresh]);

  // Cross-tab session sync: once bootstrap finishes, stay in sync with what other tabs do.
  useEffect(() => {
    if (status !== 'done') return;
    if (typeof BroadcastChannel === 'undefined') return;

    const channel = new BroadcastChannel(AUTH_BROADCAST_CHANNEL);

    channel.onmessage = (event: MessageEvent<AuthSyncMessage>) => {
      const message = event.data;

      // BroadcastChannel delivers a message to every OTHER instance on the
      // channel — including the listener above, opened by THIS same tab.
      // Skip anything we posted ourselves.
      if (isOwnBroadcast(message)) return;

      if (message.type === 'refreshed') {
        dispatch(setCredentials(toSessionCredentials(message.data)));
        return;
      }

      // message.type === 'logout'.
      // Guard: only act if this tab isn't already logged out. Without this,
      // two tabs would echo the broadcast back and forth indefinitely.
      if (store.getState().session.isAuthenticated) {
        dispatch(logout());
      }
    };

    return () => channel.close();
  }, [status, dispatch]);

  const handleRetry = useCallback(() => {
    if (isAttemptingRef.current) return;
    setStatus('loading');
    void attemptBootstrapRefresh();
  }, [attemptBootstrapRefresh]);

  const handleSignIn = useCallback(() => {
    // "Sign In" here means the same thing LogoutButton's confirm means elsewhere:
    // run the full logout sequence (FCM revoke, server-side revoke, cross-tab broadcast),
    // not just a bare local dispatch(logout()). Without this, the refresh cookie
    // stays live server-side — reconnect and reload, and the very next boot would
    // silently sign the user back in.
    setStatus('signing_out');

    void logoutUser()
      .then(({ isError }) => {
        setStatus(isError ? 'sign_out_issue' : 'done');
      })
      .catch(() => {
        // Fallback: landing on the same "couldn't confirm it with the server"
        // screen beats leaving this stuck on "Signing out…" forever.
        setStatus('sign_out_issue');
      });
  }, [logoutUser]);

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
    case 'signing_out':
      return <LoggingOutScreen />;
    case 'sign_out_issue':
      return <SignOutIssueScreen onContinue={() => setStatus('done')} />;
    case 'done':
      return <>{children}</>;
    default: {
      // Compile-time guard: if BootstrapStatus ever gains a new member
      // without a matching case above, this line fails to type-check.
      const _exhaustiveCheck: never = status;
      return _exhaustiveCheck;
    }
  }
}
