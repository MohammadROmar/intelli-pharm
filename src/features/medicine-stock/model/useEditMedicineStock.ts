import { useNavigate } from 'react-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import type { ApiError } from '@/shared/api';
import { createDomainQueryKeys } from '@/shared/model';

import { updateMedicineStock } from '../api';
import type { StockPayload } from './stockTypes';

export function useEditMedicineStock(id: number) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const queryKeys = createDomainQueryKeys('medicines');

  const { t } = useTranslation();
  const { t: tErrors } = useTranslation('errors');

  return useMutation<void, ApiError, StockPayload>({
    mutationFn: (payload) => updateMedicineStock(id, payload),

    onSuccess: () => {
      toast.success(t('toasts.restock.title'), {
        description: t('toasts.restock.description'),
      });

      queryClient.invalidateQueries({ queryKey: queryKeys.all });
      navigate(`/dashboard/medicines/${id}`);
    },

    onError: (error) => {
      toast.error(t('toasts.restock.error'), {
        description: tErrors(error.i18nKey),
      });
    },
  });
}
