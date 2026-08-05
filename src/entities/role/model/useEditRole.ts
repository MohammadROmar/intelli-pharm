import { useEditEntity } from '@/shared/model';

import { editRole } from '../api/roleApi';
import type { EditRolePayload } from './roleTypes';

export function useEditRole(id: number) {
  return useEditEntity<EditRolePayload>({
    queryKey: 'roles',
    translationKey: 'role',
    redirectTo: `/dashboard/roles/${id}`,
    mutationFn: editRole,
  });
}
