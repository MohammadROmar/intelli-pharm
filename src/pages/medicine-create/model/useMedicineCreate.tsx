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
      toast.success(t('medicinesPage.create.success.title'), {
        description: t('medicinesPage.create.success.description'),
      });
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
    onError: (error) => {
      toast.error(t('medicinesPage.create.error'), {
        description: t(error.i18nKey),
      });
    },
  });
}
