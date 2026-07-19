import { useSyncExternalStore } from 'react';

import { getTick, subscribeTick } from './trackingStore';

export function useTrackingTick(): number {
  return useSyncExternalStore(subscribeTick, getTick);
}
