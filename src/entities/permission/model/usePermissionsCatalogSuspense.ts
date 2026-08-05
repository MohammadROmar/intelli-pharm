import { unwrapApiResponse } from '@/shared/api';
import { useSuspenseGetResource } from '@/shared/model';

import type { PermissionCatalogModule } from './permissionCatalogTypes';

const PERMISSIONS_CATALOG_STALE_TIME = 30 * 60 * 1000;

export function usePermissionsCatalogSuspense(): {
  data: PermissionCatalogModule[];
} {
  const { data: response } = useSuspenseGetResource<PermissionCatalogModule[]>({
    module: 'auth',
    queryKey: 'permissions',
    staleTime: PERMISSIONS_CATALOG_STALE_TIME,
  });

  return {
    data: unwrapApiResponse(response),
  };
}
