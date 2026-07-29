import { useTranslation } from 'react-i18next';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { apiClient, ApiError } from '@/shared/api';
import { createDomainQueryKeys, useEditEntity } from '@/shared/model';

async function markNotificationAsRead(id: string): Promise<void> {
  await apiClient.patch(`/auth/v1/notifications/${id}/mark-as-read`, {
    ids: [id],
  });
}

export function useMarkNotificationAsRead() {
  const { t } = useTranslation('notifications', {
    keyPrefix: 'toast.markAsRead',
  });
  const { t: tErrors } = useTranslation('errors');

  const queryClient = useQueryClient();
  const queryKeys = createDomainQueryKeys('notifications');

  return useEditEntity({
    queryKey: 'notifications',
    mutationFn: markNotificationAsRead,
    translationKey: 'notification',

    onSuccess: () => {
      toast.success(t('success.title'), {
        description: t('success.description'),
      });

      queryClient.invalidateQueries({ queryKey: queryKeys.all });
    },

    onError: (error: ApiError) => {
      toast.error(t('error.title'), {
        description: tErrors(error.i18nKey),
      });
    },
  });
}
