import { useEffect } from 'react';

import {
  cleanupLegacyNotificationStorage,
  useNotificationPermission,
} from '@/shared/notifications';

import { useDeviceRegistrationSync } from '../model/useDeviceRegistrationSync';
import { useNotificationListener } from '../model/useNotificationListener';
import type { NotificationsRuntimeErrorHandler } from '../model/types';

type Props = { onError?: NotificationsRuntimeErrorHandler };

const noopRuntimeError: NotificationsRuntimeErrorHandler = () => undefined;

export function NotificationsRuntime({ onError }: Props) {
  const { permission } = useNotificationPermission();
  const enabled = permission === 'granted';
  const reportError = onError ?? noopRuntimeError;

  useEffect(() => {
    void cleanupLegacyNotificationStorage().catch((error: unknown) => {
      reportError(error, 'legacy-storage-cleanup');
    });
  }, [reportError]);

  useNotificationListener({ enabled, onError: reportError });
  useDeviceRegistrationSync({ enabled, onError: reportError });

  return null;
}
