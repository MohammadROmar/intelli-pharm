import { useEffect, useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { BellRing } from 'lucide-react';

import type { FCMNotificationData } from './types';
import { onForegroundMessage } from '@/shared/notifications';

let isRegistered = false;

export function useNotificationListener() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { t } = useTranslation('notifications', { keyPrefix: 'toast' });

  const queryClientRef = useRef(queryClient);
  const navigateRef = useRef(navigate);
  const tRef = useRef(t);

  useEffect(() => {
    queryClientRef.current = queryClient;
    navigateRef.current = navigate;
    tRef.current = t;
  }, [queryClient, navigate, t]);

  useEffect(() => {
    if (isRegistered) return;
    isRegistered = true;

    onForegroundMessage((payload) => {
      const data = payload.data as FCMNotificationData | undefined;

      const title =
        data?.title ??
        payload.notification?.title ??
        tRef.current('newNotification');
      const description = data?.body ?? payload.notification?.body;

      toast(title, {
        description,
        icon: <BellRing className="text-primary size-4" />,
        classNames: {
          actionButton:
            'bg-primary! text-primary-foreground! hover:bg-primary/90! font-medium! transition-colors!',
        },
        action: {
          actionButtonStyle: { backgroundColor: 'red !important' },
          label: tRef.current('view'),
          onClick: () => {
            navigateRef.current('/dashboard/notifications');
          },
        },
      });

      queryClientRef.current.invalidateQueries({ queryKey: ['notifications'] });
    }).catch((err) => {
      console.error('[FCM] foreground listener failed:', err);
      isRegistered = false;
    });
  }, []);
}
