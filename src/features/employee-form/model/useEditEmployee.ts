import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { editEmployee, type EditEmployeeFormData } from '@/entities/employee';
import { useEditEntity } from '@/shared/model';

import { getEmployeeErrorKey } from '../lib/getEmployeeErrorKey';

export function useEditEmployee(id: number) {
  const { t } = useTranslation();
  const { t: tErrors } = useTranslation('errors');

  return useEditEntity<EditEmployeeFormData>({
    queryKey: 'employees',
    mutationFn: (payload) => editEmployee({ id, payload }),
    translationKey: 'employee',
    redirectTo: `/dashboard/employees/${id}`,

    onError: (error) => {
      toast.error(t(`toasts.edit.error`), {
        description: tErrors(getEmployeeErrorKey(error)),
      });
    },
  });
}
