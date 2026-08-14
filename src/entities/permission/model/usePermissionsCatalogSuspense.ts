import { unwrapApiResponse } from '@/shared/api';
import { useSuspenseGetResource } from '@/shared/model';

import type { PermissionCatalog } from './permissionCatalogTypes';

const PERMISSIONS_CATALOG_STALE_TIME = Infinity;
const PERMISSIONS_CATALOG_GC_TIME = Infinity;

export function usePermissionsCatalogSuspense() {
  const { data: response } = useSuspenseGetResource<PermissionCatalog[]>({
    module: 'auth',
    queryKey: 'permissions',
    gcTime: PERMISSIONS_CATALOG_GC_TIME,
    staleTime: PERMISSIONS_CATALOG_STALE_TIME,
  });

  return {
    data: unwrapApiResponse(response),
  };
}
