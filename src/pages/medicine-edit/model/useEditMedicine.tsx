import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import type { ApiError, ApiResponse } from '@/shared/api';
import {
  postMedicine,
  type ImageFile,
  type MedicineFormData,
} from '@/entities/medicine';

export function useEditMedicine(id: number) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { t } = useTranslation();

  return useMutation<
    ApiResponse<unknown>,
    ApiError,
    { values: MedicineFormData; images: ImageFile[] }
  >({
    mutationFn: (payload) => postMedicine({ ...payload, id }),
    onSuccess: () => {
      toast.success(t('medicinesPage.edit.success.title'), {
        description: t('medicinesPage.edit.success.description'),
      });
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      navigate(`/dashboard/medicines/${id}`);
    },
    onError: (error) => {
      toast.error(t('medicinesPage.edit.error'), {
        description: t(error.i18nKey),
      });
    },
  });
}
