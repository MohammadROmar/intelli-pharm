import { useTranslation } from 'react-i18next';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { createRegion, type Region } from '@/entities/region';
import type { ApiError, ApiResponse } from '@/shared/api';

export function useCreateRegion() {
  const queryClient = useQueryClient();

  const { t } = useTranslation();

  return useMutation<ApiResponse<unknown>, ApiError, Region>({
    mutationFn: createRegion,
    onSuccess: () => {
      toast.success(t('common.toasts.create.title'), {
        description: t('common.toasts.create.description', {
          item: t('regionsPage.region'),
        }),
      });
      queryClient.invalidateQueries({ queryKey: ['regions'] });
    },
    onError: (error) => {
      toast.error(t('common.toasts.create.error'), {
        description: t(error.i18nKey),
      });
    },
  });
}
