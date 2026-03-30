import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { editEmployee, type EditEmployeeFormData } from '@/entities/employee';
import { useEditEntity } from '@/shared/model';

export function useEditEmployee() {
  const { t } = useTranslation();

  return useEditEntity<{ id: number; payload: EditEmployeeFormData }>({
    queryKey: 'employees',
    mutationFn: editEmployee,
    translationKey: 'employeesPage.employee',
    redirectTo: '/dashboard/employees',

    onError: ({ status, i18nKey }) => {
      toast.error(t(`common.toasts.edit.error`), {
        description: t(status === 422 ? 'errors.emailAlreadyTaken' : i18nKey),
      });
    },
  });
}
