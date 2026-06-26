import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import {
  createEmployee,
  type CreateEmployeeFormData,
} from '@/entities/employee';
import { useCreateEntity } from '@/shared/model';

export function useCreateEmployee() {
  const { t } = useTranslation();

  return useCreateEntity<CreateEmployeeFormData>({
    queryKey: 'employees',
    mutationFn: createEmployee,
    translationKey: 'employee',
    navigatePath: '/dashboard/employees',

    onError: ({ status, i18nKey }) => {
      toast.error(t(`toasts.edit.error`), {
        description: t(status === 422 ? 'errors.emailAlreadyTaken' : i18nKey),
      });
    },
  });
}
