import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { useCreateEntity } from '@/shared/model';

import { sendNotification } from '../api/notificationApi';
import type { SendNotificationPayload } from './notificationTypes';

const NOTIFICATIONS_QUERY_KEY = 'notifications';

export function useSendNotification() {
  const { t } = useTranslation('send-notification', { keyPrefix: 'toast' });
  const { t: tErrors } = useTranslation('errors');

  return useCreateEntity<SendNotificationPayload>({
    queryKey: NOTIFICATIONS_QUERY_KEY,
    translationKey: 'notification',
    mutationFn: sendNotification,
    onSuccess: () => {
      toast.success(t('success.title'), {
        description: t('success.subtitle'),
      });
    },
    onError: ({ i18nKey }) => {
      toast.error(t('error.title'), {
        description: tErrors(i18nKey),
      });
    },
  });
}
