import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { useCreateEntity } from '@/shared/model';

import { createRole } from '../api/roleApi';
import type { CreateRolePayload } from './roleTypes';
import { getRoleErrorKey } from '../lib/getRoleErrorKey';

export function useCreateRole() {
  const { t } = useTranslation();
  const { t: tErrors } = useTranslation('errors');

  return useCreateEntity<CreateRolePayload>({
    queryKey: 'roles',
    translationKey: 'role',
    navigatePath: '/dashboard/roles',
    mutationFn: createRole,
    onError: (error) => {
      toast.error(t('toasts.create.error'), {
        description: tErrors(getRoleErrorKey(error)),
      });
    },
  });
}
