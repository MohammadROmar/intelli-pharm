import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createEmployee, type EmployeeFormData } from '@/entities/employee';
import type { ApiError, ApiResponse } from '@/shared/api';

export function useCreateEmployee() {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation<ApiResponse<unknown>, ApiError, EmployeeFormData>({
    mutationFn: createEmployee,

    onSuccess: () => {
      toast.success(t('employeesPage.create.success.title'), {
        description: t('employeesPage.create.success.description'),
      });
      queryClient.invalidateQueries({ queryKey: ['employees'] });
    },

    onError: (error) => {
      toast.error(t('employeesPage.create.error'), {
        description: t(error.i18nKey),
      });
    },
  });
}
