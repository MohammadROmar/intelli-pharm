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
      toast.success(t('medicinesPage.delete.success.title'), {
        description: t('medicinesPage.delete.success.description'),
      });
      queryClient.invalidateQueries({ queryKey: ['medicines'] });
    },

    onError: (error) => {
      toast.error(t('medicinesPage.delete.error'), {
        description: t(error.i18nKey),
      });
    },
  });
}
