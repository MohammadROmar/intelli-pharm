import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import type { RestockPayload } from './restockTypes';
import { restockMedicine } from '../api';
import type { ApiError } from '@/shared/api';
import { createDomainQueryKeys } from '@/shared/model';

export function useRestockMedicine(id: number) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const queryKeys = createDomainQueryKeys('medicines');

  const { t } = useTranslation();
  const { t: tErrors } = useTranslation('errors');

  return useMutation<void, ApiError, RestockPayload>({
    mutationFn: (payload) => restockMedicine(id, payload),

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
