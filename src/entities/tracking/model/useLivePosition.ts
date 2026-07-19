import { useCallback, useSyncExternalStore } from 'react';

import { getPosition, subscribeUser } from './trackingStore';
import { useTrackingLifecycle } from './useTrackingLifecycle';
import type { LocationEvent } from './types';

const NOOP_UNSUBSCRIBE = () => {};

export function useLivePosition(
  userId: number | null | undefined,
): LocationEvent | undefined {
  useTrackingLifecycle();

  const subscribe = useCallback(
    (listener: () => void) =>
      userId != null ? subscribeUser(userId, listener) : NOOP_UNSUBSCRIBE,
    [userId],
  );

  const getSnapshot = useCallback(
    () => (userId != null ? getPosition(userId) : undefined),
    [userId],
  );

  return useSyncExternalStore(subscribe, getSnapshot);
}
