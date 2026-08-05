import { unwrapApiResponse } from '@/shared/api';
import { useSuspenseGetEntityById } from '@/shared/model';

import type { RoleItem } from './roleTypes';

export function useGetRoleSuspense(id: number) {
  const { data: response } = useSuspenseGetEntityById<RoleItem>({
    id,
    queryKey: 'roles',
    endpoint: '/auth/v1/roles',
    withDualLanguage: true,
  });

  return {
    data: unwrapApiResponse(response),
  };
}
