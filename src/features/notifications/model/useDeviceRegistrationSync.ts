import { useEffect, useRef } from 'react';

import {
  resetDeviceRegistrationState,
  syncDeviceRegistration,
} from '@/entities/device';
import { ApiError } from '@/shared/api';
import { isMessagingUnsupportedError } from '@/shared/notifications';

import type { NotificationsRuntimeErrorHandler } from './types';

type Options = {
  enabled: boolean;
  onError?: NotificationsRuntimeErrorHandler;
};

const RETRY_BASE_DELAY_MS = 2_000;
const RETRY_MAX_DELAY_MS = 60_000;
const MAX_AUTOMATIC_RETRIES = 5;
const REGISTRATION_REFRESH_INTERVAL_MS = 7 * 24 * 60 * 60 * 1000;

function isRetryableRegistrationError(error: unknown): boolean {
  if (isMessagingUnsupportedError(error)) return false;
  if (!(error instanceof ApiError) || error.status === undefined) return true;

  return error.status === 408 || error.status === 429 || error.status >= 500;
}

export function useDeviceRegistrationSync({ enabled, onError }: Options): void {
  const onErrorRef = useRef(onError);

  useEffect(() => {
    onErrorRef.current = onError;
  }, [onError]);

  useEffect(() => {
    if (!enabled) {
      resetDeviceRegistrationState();
      return;
    }

    let cancelled = false;
    let retryAttempt = 0;
    let retryTimeoutId: ReturnType<typeof setTimeout> | undefined;
    let inFlight: Promise<string | null> | undefined;

    function scheduleRetry(): void {
      if (
        cancelled ||
        retryTimeoutId ||
        retryAttempt >= MAX_AUTOMATIC_RETRIES ||
        !navigator.onLine ||
        document.visibilityState !== 'visible'
      ) {
        return;
      }

      const exponentialDelay = Math.min(
        RETRY_BASE_DELAY_MS * 2 ** retryAttempt,
        RETRY_MAX_DELAY_MS,
      );
      const jitter = Math.floor(Math.random() * 500);
      retryAttempt += 1;

      retryTimeoutId = setTimeout(() => {
        retryTimeoutId = undefined;
        sync(false);
      }, exponentialDelay + jitter);
    }

    function sync(forceBackendSync: boolean): void {
      if (cancelled || inFlight) return;

      const request = syncDeviceRegistration({ forceBackendSync });
      inFlight = request;

      void request
        .then(() => {
          retryAttempt = 0;
        })
        .catch((error: unknown) => {
          if (cancelled) return;

          onErrorRef.current?.(error, 'device-registration');
          if (isRetryableRegistrationError(error)) scheduleRetry();
        })
        .finally(() => {
          if (inFlight === request) inFlight = undefined;
        });
    }

    function handleOnline(): void {
      retryAttempt = 0;
      sync(false);
    }

    function handleVisibilityChange(): void {
      if (document.visibilityState !== 'visible') return;

      retryAttempt = 0;
      sync(false);
    }

    sync(true);

    const refreshIntervalId = setInterval(
      () => sync(true),
      REGISTRATION_REFRESH_INTERVAL_MS,
    );
    window.addEventListener('online', handleOnline);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      cancelled = true;
      if (retryTimeoutId) clearTimeout(retryTimeoutId);
      clearInterval(refreshIntervalId);
      window.removeEventListener('online', handleOnline);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [enabled]);
}
