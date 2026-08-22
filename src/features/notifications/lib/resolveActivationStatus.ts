import type { useDeviceRegistration } from '@/entities/device';
import type { NotificationPermissionState } from '@/shared/notifications';

import type { ActivationStatus } from '../model/types';

export function resolveActivationStatus(
  permission: NotificationPermissionState,
  registrationState: ReturnType<typeof useDeviceRegistration>['state'],
): ActivationStatus | null {
  if (permission === 'default') return 'permission-default';
  if (permission === 'denied') return 'permission-denied';
  if (permission === 'unsupported') return 'unsupported';
  if (registrationState === 'registered') return null;

  return registrationState === 'error' ? 'device-error' : 'device-unregistered';
}

export function isRetryableStatus(status: ActivationStatus): boolean {
  return status === 'permission-denied' || status === 'device-error';
}
