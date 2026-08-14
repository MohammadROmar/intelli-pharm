import { useInfiniteEntities } from '@/shared/model';

import type { RoleItem } from './roleTypes';
import { getInfiniteRoles } from '../api/roleApi';

export function useInfiniteRoles(searchTerm: string) {
  return useInfiniteEntities<RoleItem>({
    queryKey: 'roles',
    searchTerm,
    queryFn: getInfiniteRoles,
  });
}
