import type { RoleItem } from './roleTypes';
import { useSuspenseGetEntityById } from '@/shared/model';

export function useGetRoleSuspense(id: number) {
  return useSuspenseGetEntityById<RoleItem>({
    id,
    queryKey: 'roles',
    endpoint: '/auth/v1/roles',
    withDualLanguage: true,
  });
}
