import { useEffect, useRef } from 'react';
import type { MessagePayload } from 'firebase/messaging';
import { BellRing } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

import { incrementUnreadNotifications } from '@/entities/session';
import { useAppDispatch } from '@/shared/config';
import { createDomainQueryKeys } from '@/shared/model';
import {
  FCM_SERVICE_WORKER_MESSAGE_TYPE,
  isMessagingUnsupportedError,
  onForegroundMessage,
} from '@/shared/notifications';

import { getNotificationQueryKeys } from '../lib/notificationQueryMap';
import { getSafeNotificationPath } from '../lib/notificationPath';
import {
  parseNotificationData,
  type NotificationsRuntimeErrorHandler,
  type ServiceWorkerNotificationMessage,
} from './types';
import {
  useNotificationBroadcast,
  type NotificationBroadcastPayload,
} from './useNotificationBroadcast';

type Options = {
  enabled: boolean;
  onError?: NotificationsRuntimeErrorHandler;
};

type IncomingNotification = NotificationBroadcastPayload & {
  showToast: boolean;
};

const RETRY_BASE_DELAY_MS = 2_000;
const RETRY_MAX_DELAY_MS = 60_000;
const MAX_AUTOMATIC_RETRIES = 3;
const RECENT_MESSAGE_TTL_MS = 5 * 60 * 1000;
const MAX_RECENT_MESSAGES = 100;
const NOTIFICATIONS_QUERY_KEY = createDomainQueryKeys('notifications').all;

type RecentMessageState = {
  receivedAt: number;
  toastShown: boolean;
};

type MessageHandlingDecision = {
  shouldShowToast: boolean;
  shouldUpdateState: boolean;
};

const recentMessages = new Map<string, RecentMessageState>();

function resolveMessageHandling(
  messageId: string | undefined,
  showToast: boolean,
): MessageHandlingDecision {
  if (!messageId) {
    return {
      shouldShowToast: showToast,
      shouldUpdateState: true,
    };
  }

  const now = Date.now();
  const previous = recentMessages.get(messageId);
  const isRecent =
    previous !== undefined && now - previous.receivedAt < RECENT_MESSAGE_TTL_MS;

  const shouldUpdateState = !isRecent;
  const shouldShowToast = showToast && (!isRecent || !previous.toastShown);

  recentMessages.set(messageId, {
    receivedAt: now,
    toastShown: (isRecent && previous?.toastShown === true) || shouldShowToast,
  });

  if (recentMessages.size > MAX_RECENT_MESSAGES) {
    for (const [id, state] of recentMessages) {
      if (now - state.receivedAt >= RECENT_MESSAGE_TTL_MS) {
        recentMessages.delete(id);
      }
    }

    while (recentMessages.size > MAX_RECENT_MESSAGES) {
      const oldestId = recentMessages.keys().next().value as string | undefined;
      if (!oldestId) break;
      recentMessages.delete(oldestId);
    }
  }

  return {
    shouldShowToast,
    shouldUpdateState,
  };
}

function isServiceWorkerNotificationMessage(
  value: unknown,
): value is ServiceWorkerNotificationMessage {
  if (!value || typeof value !== 'object') return false;

  const message = value as Partial<ServiceWorkerNotificationMessage>;
  return (
    message.type === FCM_SERVICE_WORKER_MESSAGE_TYPE &&
    !!message.payload &&
    typeof message.payload === 'object'
  );
}

export function useNotificationListener({ enabled, onError }: Options): void {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { t } = useTranslation('notifications', { keyPrefix: 'toast' });

  const onErrorRef = useRef(onError);
  const handlerRef = useRef<(message: IncomingNotification) => void>(() => {});

  useEffect(() => {
    onErrorRef.current = onError;
  }, [onError]);

  useEffect(() => {
    handlerRef.current = ({
      messageId,
      data,
      fallbackBody,
      fallbackTitle,
      showToast,
    }) => {
      const dedupeId = messageId ?? data.id;
      const { shouldShowToast, shouldUpdateState } = resolveMessageHandling(
        dedupeId,
        showToast,
      );

      if (shouldShowToast) {
        const title = data.title ?? fallbackTitle ?? t('newNotification');
        const description = data.body ?? fallbackBody;
        const targetPath = getSafeNotificationPath(data.link);

        toast(title, {
          description,
          icon: <BellRing className="text-primary size-4" />,
          action: {
            label: t('view'),
            onClick: () => navigate(targetPath),
          },
        });
      }

      if (!shouldUpdateState) return;

      dispatch(incrementUnreadNotifications());

      const queryKeys = [
        NOTIFICATIONS_QUERY_KEY,
        ...getNotificationQueryKeys(data.type),
      ];

      queryKeys.forEach((queryKey) => {
        void queryClient.invalidateQueries({ queryKey });
      });
    };
  }, [dispatch, navigate, queryClient, t]);

  const broadcastNotification = useNotificationBroadcast({
    onNotification: (notification) => {
      handlerRef.current({
        ...notification,
        showToast: false,
      });
    },
  });

  useEffect(() => {
    if (!enabled) return;

    let cancelled = false;
    let retryAttempt = 0;
    let retryTimeoutId: ReturnType<typeof setTimeout> | undefined;
    let unsubscribeForeground: (() => void) | undefined;
    let subscriptionPromise: Promise<void> | undefined;
    let automaticRetriesExhausted = false;
    let failureReported = false;

    function scheduleRetry(): void {
      if (
        cancelled ||
        automaticRetriesExhausted ||
        retryTimeoutId ||
        !navigator.onLine ||
        document.visibilityState !== 'visible'
      ) {
        return;
      }

      if (retryAttempt >= MAX_AUTOMATIC_RETRIES) {
        automaticRetriesExhausted = true;
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
        subscribe();
      }, exponentialDelay + jitter);
    }

    function subscribe(startNewCycle = false): void {
      if (startNewCycle) {
        retryAttempt = 0;
        automaticRetriesExhausted = false;
        failureReported = false;
      }

      if (
        cancelled ||
        automaticRetriesExhausted ||
        unsubscribeForeground ||
        subscriptionPromise
      ) {
        return;
      }

      subscriptionPromise = onForegroundMessage((payload: MessagePayload) => {
        const notification: NotificationBroadcastPayload = {
          messageId: payload.messageId,
          data: parseNotificationData(payload.data),
          fallbackTitle: payload.notification?.title,
          fallbackBody: payload.notification?.body,
        };

        handlerRef.current({
          ...notification,
          showToast: true,
        });

        broadcastNotification(notification);
      })
        .then((unsubscribe) => {
          retryAttempt = 0;
          automaticRetriesExhausted = false;
          failureReported = false;

          if (cancelled) {
            unsubscribe();
            return;
          }

          unsubscribeForeground = unsubscribe;
        })
        .catch((error: unknown) => {
          if (!failureReported) {
            failureReported = true;
            onErrorRef.current?.(error, 'foreground-listener');
          }

          if (
            !cancelled &&
            !isMessagingUnsupportedError(error) &&
            typeof Notification !== 'undefined' &&
            Notification.permission === 'granted'
          ) {
            scheduleRetry();
          }
        })
        .finally(() => {
          subscriptionPromise = undefined;
        });
    }

    function handleVisibilityChange(): void {
      if (
        document.visibilityState !== 'visible' ||
        !navigator.onLine ||
        retryTimeoutId ||
        automaticRetriesExhausted
      ) {
        return;
      }

      subscribe();
    }

    function handleOnline(): void {
      if (document.visibilityState !== 'visible') return;

      if (retryTimeoutId) {
        clearTimeout(retryTimeoutId);
        retryTimeoutId = undefined;
      }

      subscribe(true);
    }

    subscribe(true);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('online', handleOnline);

    return () => {
      cancelled = true;
      if (retryTimeoutId) clearTimeout(retryTimeoutId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('online', handleOnline);
      unsubscribeForeground?.();
    };
  }, [broadcastNotification, enabled]);

  useEffect(() => {
    if (!enabled || !('serviceWorker' in navigator)) return;

    function handleServiceWorkerMessage(event: MessageEvent<unknown>): void {
      if (!isServiceWorkerNotificationMessage(event.data)) return;

      handlerRef.current({
        messageId: event.data.payload.messageId,
        data: parseNotificationData(event.data.payload.data),
        fallbackTitle: event.data.payload.fallbackTitle,
        fallbackBody: event.data.payload.fallbackBody,
        showToast:
          document.visibilityState === 'visible' && document.hasFocus(),
      });
    }

    navigator.serviceWorker.addEventListener(
      'message',
      handleServiceWorkerMessage,
    );

    return () => {
      navigator.serviceWorker.removeEventListener(
        'message',
        handleServiceWorkerMessage,
      );
    };
  }, [enabled]);
}
