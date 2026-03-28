import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import type { RestockPayload } from './restockTypes';
import { restockMedicine } from '../api';
import type { ApiError, ApiResponse } from '@/shared/api';

export function useMedicineRestock(id: number) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { t } = useTranslation();

  return useMutation<ApiResponse<unknown>, ApiError, RestockPayload>({
    mutationFn: (payload) => restockMedicine(id, payload),

    onSuccess: () => {
      toast.success(t('medicinesPage.restock.success.title'), {
        description: t('medicinesPage.restock.success.description'),
      });
      queryClient.invalidateQueries({ queryKey: ['medicines'] });
      navigate(`/dashboard/medicines/${id}`);
    },

    onError: (error) => {
      toast.error(t('medicinesPage.restock.error'), {
        description: t(error.i18nKey),
      });
    },
  });
}
