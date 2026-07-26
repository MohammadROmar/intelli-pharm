import { useEffect, useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { BellRing } from 'lucide-react';
import type { MessagePayload } from 'firebase/messaging';

import { incrementUnreadNotifications } from '@/entities/session';
import {
  onForegroundMessage,
  FCM_BROADCAST_CHANNEL,
} from '@/shared/notifications';
import { useAppDispatch } from '@/shared/config';

import type { FCMNotificationData } from './types';
import { notificationsKeys } from './notificationsKeys';

const RETRY_DELAY_MS = 10_000;

export function useNotificationListener() {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { t } = useTranslation('notifications', { keyPrefix: 'toast' });

  const handlerRef = useRef<(payload: MessagePayload) => void>(() => {});

  useEffect(() => {
    handlerRef.current = (payload) => {
      const data = payload.data as FCMNotificationData | undefined;

      const title =
        data?.title ?? payload.notification?.title ?? t('newNotification');
      const description = data?.body ?? payload.notification?.body;

      toast(title, {
        description,
        icon: <BellRing className="text-primary size-4" />,
        action: {
          label: t('view'),
          onClick: () => navigate('/dashboard/notifications'),
        },
      });

      dispatch(incrementUnreadNotifications());
      void queryClient.invalidateQueries({ queryKey: notificationsKeys.all });
    };
  }, [dispatch, queryClient, navigate, t]);

  useEffect(() => {
    let cancelled = false;
    let unsubscribeForeground: (() => void) | undefined;
    let retryTimeoutId: ReturnType<typeof setTimeout> | undefined;

    async function subscribe() {
      try {
        const unsub = await onForegroundMessage((payload) =>
          handlerRef.current(payload),
        );

        if (cancelled) {
          return;
        }

        unsubscribeForeground = unsub;
      } catch (err) {
        console.error('[FCM] foreground listener failed, retrying:', err);

        if (cancelled) return;

        if (
          typeof Notification !== 'undefined' &&
          Notification.permission === 'denied'
        ) {
          return;
        }

        retryTimeoutId = setTimeout(subscribe, RETRY_DELAY_MS);
      }
    }

    void subscribe();

    function handleVisibility() {
      if (
        document.visibilityState === 'visible' &&
        !unsubscribeForeground &&
        !cancelled
      ) {
        void subscribe();
      }
    }
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      cancelled = true;
      if (retryTimeoutId) clearTimeout(retryTimeoutId);
      document.removeEventListener('visibilitychange', handleVisibility);
      unsubscribeForeground?.();
    };
  }, []);

  useEffect(() => {
    const channel = new BroadcastChannel(FCM_BROADCAST_CHANNEL);

    channel.onmessage = () => {
      dispatch(incrementUnreadNotifications());
      void queryClient.invalidateQueries({ queryKey: notificationsKeys.all });
    };

    return () => channel.close();
  }, [dispatch, queryClient]);
}
