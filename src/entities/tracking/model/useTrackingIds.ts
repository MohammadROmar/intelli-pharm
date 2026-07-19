import { useCallback, useSyncExternalStore } from 'react';

import { getFilteredIds, subscribeAll } from './trackingStore';
import { useTrackingLifecycle } from './useTrackingLifecycle';
import type { TrackingFilter } from './types';

export function useTrackingIds(filter: TrackingFilter): number[] {
  useTrackingLifecycle();

  const { regionId, role } = filter;

  const getSnapshot = useCallback(
    () => getFilteredIds({ regionId, role }),
    [regionId, role],
  );

  return useSyncExternalStore(subscribeAll, getSnapshot);
}
