import { useEffect } from 'react';

import { acquireTracking } from './trackingStore';

export function useTrackingLifecycle(): void {
  useEffect(() => {
    const release = acquireTracking();
    return release;
  }, []);
}
