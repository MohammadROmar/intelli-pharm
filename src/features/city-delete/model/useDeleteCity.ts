import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { deleteCity } from '@/entities/city';
import type { ApiError, ApiResponse } from '@/shared/api';

export function useDeleteCity() {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation<ApiResponse<unknown>, ApiError, number>({
    mutationFn: deleteCity,

    onSuccess: () => {
      toast.success(t('common.toasts.delete.title'), {
        description: t('common.toasts.delete.description', {
          item: t('citiesPage.city'),
        }),
      });

      queryClient.invalidateQueries({ queryKey: ['cities'] });
    },

    onError: (error) => {
      toast.error(t('common.toasts.delete.error'), {
        description: t(error.i18nKey),
      });
    },
  });
}
