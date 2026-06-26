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

let isRegistered = false;

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
    if (isRegistered) return;
    isRegistered = true;

    let unsubscribe: (() => void) | undefined;

    onForegroundMessage((payload) => handlerRef.current(payload))
      .then((unsub) => {
        unsubscribe = unsub;
      })
      .catch((err) => {
        console.error('[FCM] foreground listener failed:', err);
        isRegistered = false;
      });

    return () => {
      unsubscribe?.();
      isRegistered = false;
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
