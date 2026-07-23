import { useSyncExternalStore } from 'react';

import { getIsHydrated, subscribeAll } from './trackingStore';
import { useTrackingLifecycle } from './useTrackingLifecycle';

export function useTrackingHydrated(): boolean {
  useTrackingLifecycle();
  return useSyncExternalStore(subscribeAll, getIsHydrated);
}
