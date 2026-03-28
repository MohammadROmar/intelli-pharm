import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { deleteMedicine } from '@/entities/medicine';
import type { ApiError, ApiResponse } from '@/shared/api';

export function useDeleteMedicine() {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation<ApiResponse<unknown>, ApiError, number>({
    mutationFn: deleteMedicine,

    onSuccess: () => {
      toast.success(t('common.toasts.delete.title'), {
        description: t('common.toasts.delete.description', {
          item: t('medicinesPage.medicine'),
        }),
      });

      queryClient.invalidateQueries({ queryKey: ['medicines'] });
    },

    onError: (error) => {
      toast.error(t('common.toasts.delete.error'), {
        description: t(error.i18nKey),
      });
    },
  });
}
