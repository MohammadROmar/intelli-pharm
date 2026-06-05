import { useEffect, useRef } from 'react';

import {
  readToken,
  writeToken,
  getFreshTokenSilently,
} from '@/shared/notifications';

type Options = { onTokenRotated: (newToken: string) => void };

export function useTokenRotationSync({ onTokenRotated }: Options) {
  const callbackRef = useRef(onTokenRotated);

  useEffect(() => {
    callbackRef.current = onTokenRotated;
  }, [onTokenRotated]);

  useEffect(() => {
    async function syncToken() {
      const freshToken = await getFreshTokenSilently();
      if (!freshToken) return;

      const storedToken = readToken();

      if (!storedToken) return;

      if (freshToken !== storedToken) {
        writeToken(freshToken);
        callbackRef.current(freshToken);
      }
    }

    syncToken();

    function handleVisibility() {
      if (document.visibilityState === 'visible') syncToken();
    }

    document.addEventListener('visibilitychange', handleVisibility);
    return () =>
      document.removeEventListener('visibilitychange', handleVisibility);
  }, []);
}
