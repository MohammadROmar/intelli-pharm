import { useEffect } from 'react';

import {
  cleanupLegacyNotificationStorage,
  useNotificationPermission,
} from '@/shared/notifications';
import { useAppSelector } from '@/shared/config';

import { useDeviceRegistrationSync } from '../model/useDeviceRegistrationSync';
import { useNotificationListener } from '../model/useNotificationListener';
import type { NotificationsRuntimeErrorHandler } from '../model/types';

type Props = {
  onError?: NotificationsRuntimeErrorHandler;
};

const defaultRuntimeErrorHandler: NotificationsRuntimeErrorHandler = (
  error,
  context,
) => {
  if (import.meta.env.DEV) {
    console.warn(`[Notifications] ${context} failed`, error);
  }
};

export function NotificationsRuntime({ onError }: Props) {
  const { permission } = useNotificationPermission();
  const sessionEmail = useAppSelector(
    (state) => state.session.user?.email ?? null,
  );
  const email = sessionEmail?.trim() || null;
  const enabled = permission === 'granted' && email !== null;
  const reportError = onError ?? defaultRuntimeErrorHandler;

  useEffect(() => {
    void cleanupLegacyNotificationStorage().catch((error: unknown) => {
      reportError(error, 'legacy-storage-cleanup');
    });
  }, [reportError]);

  useNotificationListener({ enabled, onError: reportError });
  useDeviceRegistrationSync({ email, enabled, onError: reportError });

  return null;
}
