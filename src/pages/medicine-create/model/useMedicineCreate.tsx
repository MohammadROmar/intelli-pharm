import { useTranslation } from 'react-i18next';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import type { ApiError, ApiResponse } from '@/shared/api';
import {
  createMedicine,
  type ImageFile,
  type MedicineFormData,
} from '@/entities/medicine';

export function useCreateMedicine() {
  const queryClient = useQueryClient();

  const { t } = useTranslation();

  return useMutation<
    ApiResponse<unknown>,
    ApiError,
    { values: MedicineFormData; images: ImageFile[] }
  >({
    mutationFn: createMedicine,
    onSuccess: () => {
      toast.success(t('common.toasts.created.title'), {
        description: t('common.toasts.created.description', {
          item: t('medicinesPage.medicine'),
        }),
      });
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
    onError: (error) => {
      toast.error(t('common.toasts.create.error'), {
        description: t(error.i18nKey),
      });
    },
  });
}
