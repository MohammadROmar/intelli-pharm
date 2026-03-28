import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import {
  editMedicine,
  type ImageFile,
  type MedicineFormData,
} from '@/entities/medicine';
import type { ApiError, ApiResponse } from '@/shared/api';

export function useEditMedicine(id: number) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { t } = useTranslation();

  return useMutation<
    ApiResponse<unknown>,
    ApiError,
    { values: MedicineFormData; images: ImageFile[] }
  >({
    mutationFn: (payload) => editMedicine(id, payload),
    onSuccess: () => {
      toast.success(t('common.toasts.edit.title'), {
        description: t('common.toasts.edit.description', {
          item: t('medicinesPage.medicine'),
        }),
      });

      queryClient.invalidateQueries({ queryKey: ['medicines'] });
      navigate(`/dashboard/medicines/${id}`);
    },
    onError: (error) => {
      toast.error(t('common.toasts.edit.error'), {
        description: t(error.i18nKey),
      });
    },
  });
}
