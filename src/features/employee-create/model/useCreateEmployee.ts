import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  createEmployee,
  type CreateEmployeeFormData,
} from '@/entities/employee';
import type { ApiError, ApiResponse } from '@/shared/api';

export function useCreateEmployee() {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation<ApiResponse<unknown>, ApiError, CreateEmployeeFormData>({
    mutationFn: createEmployee,

    onSuccess: () => {
      toast.success(t('common.toasts.created.title'), {
        description: t('common.toasts.created.description', {
          item: t('employeesPage.employee'),
        }),
      });
      queryClient.invalidateQueries({ queryKey: ['employees'] });
    },

    onError: (error) => {
      toast.error(t('common.toasts.create.error'), {
        description: t(error.i18nKey),
      });
    },
  });
}
