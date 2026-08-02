import type { RoleItem, RolesListResponse } from '@/entities/role';

import { useSuspenseGetEntities } from '@/shared/model';

export function useGetRolesSuspense() {
  return useSuspenseGetEntities<RolesListResponse, RoleItem>({
    queryKey: 'roles',
    module: 'auth',
  });
}
