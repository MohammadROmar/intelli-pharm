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

  return useMutation<void, ApiError, RestockPayload>({
    mutationFn: (payload) => restockMedicine(id, payload),

    onSuccess: () => {
      toast.success(t('common.toasts.restock.title'), {
        description: t('common.toasts.restock.description'),
      });

      queryClient.invalidateQueries({ queryKey: queryKeys.all });
      navigate(`/dashboard/medicines/${id}`);
    },

    onError: (error) => {
      toast.error(t('common.toasts.restock.error'), {
        description: t(error.i18nKey),
      });
    },
  });
}
