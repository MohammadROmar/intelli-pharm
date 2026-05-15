import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { editEmployee, type EditEmployeeFormData } from '@/entities/employee';
import { useEditEntity } from '@/shared/model';

export function useEditEmployee(id: number) {
  const { t } = useTranslation();

  return useEditEntity<EditEmployeeFormData>({
    queryKey: 'employees',
    mutationFn: (payload) => editEmployee({ id, payload }),
    translationKey: 'employee',
    redirectTo: `/dashboard/employees/${id}`,

    onError: ({ status, i18nKey }) => {
      toast.error(t(`toasts.edit.error`), {
        description: t(status === 422 ? 'errors.emailAlreadyTaken' : i18nKey),
      });
    },
  });
}
