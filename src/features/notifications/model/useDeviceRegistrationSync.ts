import { useEffect, useRef } from 'react';

import {
  resetDeviceRegistrationState,
  syncDeviceRegistration,
} from '@/entities/device';
import { getBackoffDelay } from '@/shared/lib';
import { isMessagingUnsupportedError } from '@/shared/notifications';

import type { NotificationsRuntimeErrorHandler } from './types';

type Options = {
  enabled: boolean;
  email: string | null;
  onError?: NotificationsRuntimeErrorHandler;
};

const MAX_AUTOMATIC_RETRIES = 3;
const TOKEN_CHECK_INTERVAL_MS = 7 * 24 * 60 * 60 * 1000;

type ErrorShape = {
  code?: unknown;
  i18nKey?: unknown;
  message?: unknown;
  name?: unknown;
  status?: unknown;
};

function getErrorShape(error: unknown): ErrorShape | null {
  return typeof error === 'object' && error !== null
    ? (error as ErrorShape)
    : null;
}

function isRetryableRegistrationError(error: unknown): boolean {
  if (isMessagingUnsupportedError(error)) return false;

  const errorShape = getErrorShape(error);
  const isApiError =
    errorShape?.name === 'ApiError' || typeof errorShape?.i18nKey === 'string';

  if (isApiError) {
    const status =
      typeof errorShape.status === 'number' ? errorShape.status : undefined;

    return (
      status !== undefined &&
      (status === 408 || status === 429 || status >= 500)
    );
  }

  if (
    error instanceof TypeError &&
    /fetch|network|load failed/i.test(error.message)
  ) {
    return true;
  }

  return (
    errorShape?.code === 'ERR_NETWORK' ||
    errorShape?.code === 'ECONNABORTED' ||
    errorShape?.code === 'ETIMEDOUT'
  );
}

export function useDeviceRegistrationSync({
  email,
  enabled,
  onError,
}: Options): void {
  const onErrorRef = useRef(onError);

  useEffect(() => {
    onErrorRef.current = onError;
  }, [onError]);

  useEffect(() => {
    if (!enabled || !email) {
      resetDeviceRegistrationState();
      return;
    }

    const userEmail = email;
    let cancelled = false;
    let retryAttempt = 0;
    let retryTimeoutId: ReturnType<typeof setTimeout> | undefined;
    let inFlight: Promise<string | null> | undefined;
    let automaticSyncBlocked = false;
    let lastFailureWasRetryable = false;
    let failureReported = false;
    let lastTokenCheckAt = 0;

    function isTokenCheckDue(): boolean {
      return Date.now() - lastTokenCheckAt >= TOKEN_CHECK_INTERVAL_MS;
    }

    function scheduleRetry(): void {
      if (
        cancelled ||
        automaticSyncBlocked ||
        retryTimeoutId ||
        !navigator.onLine ||
        document.visibilityState !== 'visible'
      ) {
        return;
      }

      if (retryAttempt >= MAX_AUTOMATIC_RETRIES) {
        automaticSyncBlocked = true;
        return;
      }

      const retryDelay = getBackoffDelay(retryAttempt);
      retryAttempt += 1;

      retryTimeoutId = setTimeout(() => {
        retryTimeoutId = undefined;

        if (
          cancelled ||
          !navigator.onLine ||
          document.visibilityState !== 'visible'
        ) {
          return;
        }

        sync();
      }, retryDelay);
    }

    function sync(startNewCycle = false): void {
      if (startNewCycle) {
        retryAttempt = 0;
        automaticSyncBlocked = false;
        lastFailureWasRetryable = false;
        failureReported = false;
      }

      if (cancelled || inFlight || automaticSyncBlocked) return;

      lastTokenCheckAt = Date.now();

      const request = syncDeviceRegistration(userEmail);
      inFlight = request;

      void request
        .then(() => {
          retryAttempt = 0;
          automaticSyncBlocked = false;
          lastFailureWasRetryable = false;
          failureReported = false;
        })
        .catch((error: unknown) => {
          if (cancelled) return;

          lastFailureWasRetryable = isRetryableRegistrationError(error);
          if (!failureReported) {
            failureReported = true;
            onErrorRef.current?.(error, 'device-registration');
          }

          if (lastFailureWasRetryable) {
            scheduleRetry();
          } else {
            automaticSyncBlocked = true;
          }
        })
        .finally(() => {
          if (inFlight === request) {
            inFlight = undefined;
          }
        });
    }

    function handleOnline(): void {
      if (document.visibilityState === 'visible' && lastFailureWasRetryable) {
        sync(true);
      }
    }

    function handleVisibilityChange(): void {
      if (
        document.visibilityState !== 'visible' ||
        !navigator.onLine ||
        retryTimeoutId
      ) {
        return;
      }

      if (lastFailureWasRetryable) {
        sync(true);
      } else if (!automaticSyncBlocked && isTokenCheckDue()) {
        sync(true);
      }
    }

    sync(true);

    const refreshIntervalId = setInterval(() => {
      if (
        navigator.onLine &&
        document.visibilityState === 'visible' &&
        isTokenCheckDue()
      ) {
        sync(true);
      }
    }, TOKEN_CHECK_INTERVAL_MS);

    window.addEventListener('online', handleOnline);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      cancelled = true;

      if (retryTimeoutId) {
        clearTimeout(retryTimeoutId);
      }

      clearInterval(refreshIntervalId);
      window.removeEventListener('online', handleOnline);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [email, enabled]);
}
