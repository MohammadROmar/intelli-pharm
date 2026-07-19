import { useSyncExternalStore } from 'react';

import {
  getConnectionState,
  subscribeConnectionState,
  type ConnectionState,
} from '@/shared/socket';

import {
  getIsPermissionDenied,
  getIsSubscriptionFailed,
  getRetryAttempt,
  retryTrackingConnection,
  subscribeError,
} from './trackingStore';
import { useTrackingLifecycle } from './useTrackingLifecycle';

export type TrackingConnectionStatus = {
  connectionState: ConnectionState;
  permissionDenied: boolean;
  isRetrying: boolean;
  subscriptionFailed: boolean;
  retry: () => void;
};

export function useTrackingConnection(): TrackingConnectionStatus {
  useTrackingLifecycle();

  const connectionState = useSyncExternalStore(
    subscribeConnectionState,
    getConnectionState,
  );
  const permissionDenied = useSyncExternalStore(
    subscribeError,
    getIsPermissionDenied,
  );
  const subscriptionFailed = useSyncExternalStore(
    subscribeError,
    getIsSubscriptionFailed,
  );
  const retryAttempt = useSyncExternalStore(subscribeError, getRetryAttempt);

  return {
    connectionState,
    permissionDenied,
    subscriptionFailed,
    isRetrying: retryAttempt > 0 && !subscriptionFailed,
    retry: retryTrackingConnection,
  };
}
