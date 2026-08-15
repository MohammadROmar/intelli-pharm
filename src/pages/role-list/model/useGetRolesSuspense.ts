import type { RoleItem, RolesListResponse } from '@/entities/role';
import { useSuspenseGetEntities } from '@/shared/model';

import { useRoleFilters } from './useRoleFilters';

export function useGetRolesSuspense() {
  const { filters } = useRoleFilters();

  return useSuspenseGetEntities<RolesListResponse, RoleItem>({
    queryKey: 'roles',
    module: 'auth',
    filters,
  });
}
