import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import {
  createEmployee,
  type CreateEmployeeFormData,
} from '@/entities/employee';
import { useCreateEntity } from '@/shared/model';

export function useCreateEmployee() {
  const { t } = useTranslation();
  const { t: tErrors } = useTranslation('errors');

  return useCreateEntity<CreateEmployeeFormData>({
    queryKey: 'employees',
    mutationFn: createEmployee,
    translationKey: 'employee',
    navigatePath: '/dashboard/employees',

    onError: ({ status, i18nKey }) => {
      toast.error(t(`toasts.create.error`), {
        description: tErrors(status === 422 ? 'emailAlreadyTaken' : i18nKey),
      });
    },
  });
}
