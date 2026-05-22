import { useEffect, useRef } from 'react';

import {
  readToken,
  writeToken,
  getFreshTokenSilently,
} from '@/shared/notifications';

type Options = { onTokenRotated: (newToken: string) => void };

export const useTokenRotationSync = ({ onTokenRotated }: Options) => {
  const callbackRef = useRef(onTokenRotated);

  useEffect(() => {
    callbackRef.current = onTokenRotated;
  }, [onTokenRotated]);

  useEffect(() => {
    const syncToken = async () => {
      const freshToken = await getFreshTokenSilently();
      if (!freshToken) return;

      const storedToken = readToken();
      if (freshToken !== storedToken) {
        writeToken(freshToken);
        callbackRef.current(freshToken);
      }
    };

    syncToken();

    const handleVisibility = () => {
      if (document.visibilityState === 'visible') syncToken();
    };

    document.addEventListener('visibilitychange', handleVisibility);
    return () =>
      document.removeEventListener('visibilitychange', handleVisibility);
  }, []);
};
