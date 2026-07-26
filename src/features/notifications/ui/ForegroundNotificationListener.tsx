import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { useUpdateFcmTokenMutation } from '@/entities/device';

import { useTokenRotationSync } from '../model/useTokenRotationSync';
import { useNotificationListener } from '../model/useNotificationListener';

export function ForegroundNotificationListener() {
  const { t } = useTranslation('errors', { keyPrefix: 'notifications' });
  const { mutate: syncToken } = useUpdateFcmTokenMutation();

  useNotificationListener();

  useTokenRotationSync({
    onTokenRotated: (newToken) => {
      syncToken(newToken, {
        onError: () => {
          toast.error(t('sync_failed_title'), {
            description: t('sync_failed_desc'),
            duration: 8000,
            action: {
              label: t('retry_action'),
              onClick: () => {
                syncToken(newToken);
              },
            },
          });
        },
      });
    },
  });

  return null;
}
