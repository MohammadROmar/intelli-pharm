import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { UpdateEmployeeFormData } from '@/entities/employee';
import { updateEmployee } from '@/entities/employee';
import type { ApiError, ApiResponse } from '@/shared/api';

export function useUpdateEmployee() {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const naviagte = useNavigate();

  return useMutation<
    ApiResponse<unknown>,
    ApiError,
    { id: number; payload: UpdateEmployeeFormData }
  >({
    mutationFn: updateEmployee,

    onSuccess: () => {
      toast.success(t('employeesPage.update.success.title'), {
        description: t('employeesPage.update.success.description'),
      });
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      naviagte('/dashboard/employees');
    },

    onError: (error) => {
      toast.error(t('employeesPage.update.error'), {
        description: t(error.i18nKey),
      });
    },
  });
}
