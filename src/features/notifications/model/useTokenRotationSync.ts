import { useEffect, useRef } from 'react';

import {
  readToken,
  writeToken,
  getFreshTokenSilently,
  forceRefreshToken,
  hasWebLocks,
} from '@/shared/notifications';

type Options = { onTokenRotated: (newToken: string) => void };

const FORCE_REFRESH_INTERVAL_MS = 24 * 60 * 60 * 1000;
const LAST_FORCE_REFRESH_KEY = 'fcm_token_last_forced_refresh';

function shouldForceRefresh(): boolean {
  try {
    const last = localStorage.getItem(LAST_FORCE_REFRESH_KEY);
    if (!last) return true;
    return Date.now() - Number(last) > FORCE_REFRESH_INTERVAL_MS;
  } catch {
    return false;
  }
}

function markForceRefreshed(): void {
  try {
    localStorage.setItem(LAST_FORCE_REFRESH_KEY, String(Date.now()));
  } catch {
    // ignore — worst case we force-refresh again next check
  }
}

export function useTokenRotationSync({ onTokenRotated }: Options) {
  const callbackRef = useRef(onTokenRotated);

  useEffect(() => {
    callbackRef.current = onTokenRotated;
  }, [onTokenRotated]);

  useEffect(() => {
    let cancelled = false;

    async function syncToken() {
      const forcing = hasWebLocks && shouldForceRefresh();

      const freshToken = forcing
        ? await forceRefreshToken()
        : await getFreshTokenSilently();

      if (cancelled) return;
      if (!freshToken) return;
      if (forcing) markForceRefreshed();

      const storedToken = readToken();

      if (freshToken === storedToken) return;

      writeToken(freshToken);
      callbackRef.current(freshToken);
    }

    function requestSync() {
      syncToken().catch((error) => {
        console.error('[FCM] token rotation sync failed unexpectedly:', error);
      });
    }

    requestSync();

    function handleVisibility() {
      if (document.visibilityState === 'visible') requestSync();
    }

    document.addEventListener('visibilitychange', handleVisibility);
    window.addEventListener('online', requestSync);

    return () => {
      cancelled = true;
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('online', requestSync);
    };
  }, []);
}
