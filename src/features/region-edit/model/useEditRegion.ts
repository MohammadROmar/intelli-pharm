import { useTranslation } from 'react-i18next';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { editRegion, type Region } from '@/entities/region';
import type { ApiError, ApiResponse } from '@/shared/api';
import { useNavigate } from 'react-router-dom';

export function useEditRegion(id: number) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { t } = useTranslation();

  return useMutation<ApiResponse<unknown>, ApiError, Region>({
    mutationFn: (payload) => editRegion({ id, ...payload }),
    onSuccess: () => {
      toast.success(t('common.toasts.edit.title'), {
        description: t('common.toasts.edit.description', {
          item: t('regionsPage.region'),
        }),
      });

      queryClient.invalidateQueries({ queryKey: ['regions'] });
      navigate(`/dashboard/regions/${id}`);
    },
    onError: (error) => {
      toast.error(t('common.toasts.edit.error'), {
        description: t(error.i18nKey),
      });
    },
  });
}
