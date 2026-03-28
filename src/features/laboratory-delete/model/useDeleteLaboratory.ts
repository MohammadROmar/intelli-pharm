import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { deleteLaboratory } from '@/entities/laboratory';
import type { ApiError, ApiResponse } from '@/shared/api';

export function useDeleteLaboratory() {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation<ApiResponse<unknown>, ApiError, number>({
    mutationFn: deleteLaboratory,

    onSuccess: () => {
      toast.success(t('common.toasts.delete.title'), {
        description: t('common.toasts.delete.description', {
          item: t('laboratoriesPage.laboratory'),
        }),
      });

      queryClient.invalidateQueries({ queryKey: ['laboratories'] });
    },

    onError: (error) => {
      toast.error(t('common.toasts.delete.error'), {
        description: t(error.i18nKey),
      });
    },
  });
}
