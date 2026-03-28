import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { editCity } from '@/entities/city';
import type { ApiError, ApiResponse } from '@/shared/api';

export function useEditCity() {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const naviagte = useNavigate();

  return useMutation<
    ApiResponse<unknown>,
    ApiError,
    { id: number; name: string }
  >({
    mutationFn: editCity,

    onSuccess: () => {
      toast.success(t('common.toasts.edit.title'), {
        description: t('common.toasts.edit.description', {
          item: t('citiesPage.city'),
        }),
      });

      queryClient.invalidateQueries({ queryKey: ['cities'] });
      naviagte('/dashboard/cities');
    },

    onError: (error) => {
      toast.error(t('common.toasts.edit.error'), {
        description: t(error.i18nKey),
      });
    },
  });
}
