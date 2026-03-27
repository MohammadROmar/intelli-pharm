import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { createCity, type City } from '@/entities/city';
import type { ApiError, ApiResponse } from '@/shared/api';

export function useCreateCity() {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation<ApiResponse<unknown>, ApiError, City>({
    mutationFn: createCity,

    onSuccess: () => {
      toast.success(t('citiesPage.create.success.title'), {
        description: t('citiesPage.create.success.description'),
      });
      queryClient.invalidateQueries({ queryKey: ['cities'] });
    },

    onError: (error) => {
      toast.error(t('citiesPage.create.error'), {
        description: t(error.i18nKey),
      });
    },
  });
}
