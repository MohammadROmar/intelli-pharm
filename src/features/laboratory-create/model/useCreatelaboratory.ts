import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { createLaboratory, type Laboratory } from '@/entities/laboratory';
import type { ApiError, ApiResponse } from '@/shared/api';

export function useCreateLaboratory() {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation<ApiResponse<unknown>, ApiError, Laboratory>({
    mutationFn: createLaboratory,

    onSuccess: () => {
      toast.success(t('laboratoriesPage.create.success.title'), {
        description: t('laboratoriesPage.create.success.description'),
      });
      queryClient.invalidateQueries({ queryKey: ['laboratories'] });
    },

    onError: (error) => {
      toast.error(t('laboratoriesPage.create.error'), {
        description: t(error.i18nKey),
      });
    },
  });
}
