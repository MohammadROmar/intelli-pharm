import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { useEditEntity } from '@/shared/model';

import { editRole } from '../api/roleApi';
import type { EditRolePayload } from './roleTypes';
import { getRoleErrorKey } from '../lib/getRoleErrorKey';

export function useEditRole(id: number) {
  const { t } = useTranslation();
  const { t: tErrors } = useTranslation('errors');

  return useEditEntity<EditRolePayload>({
    queryKey: 'roles',
    translationKey: 'role',
    redirectTo: `/dashboard/roles/${id}`,
    mutationFn: editRole,
    onError: (error) => {
      toast.error(t('toasts.edit.error'), {
        description: tErrors(getRoleErrorKey(error)),
      });
    },
  });
}
