import { Outlet, useMatches } from 'react-router';

import { LazyForbiddenPage } from '@/pages/forbidden';
import { hasPermission, useGrantedPermissions } from '@/entities/session';
import type { Permission } from '@/shared/api';

export type PermissionHandle = { permission?: Permission };

function hasRequiredPermissions(
  matches: ReturnType<typeof useMatches>,
  granted: ReadonlySet<Permission>,
): boolean {
  for (const match of matches) {
    const handle = match.handle as PermissionHandle | undefined;
    if (
      handle?.permission !== undefined &&
      !hasPermission(granted, handle.permission)
    ) {
      return false;
    }
  }

  return true;
}

export function PermissionRoute() {
  const matches = useMatches();
  const granted = useGrantedPermissions();
  const isAllowed = hasRequiredPermissions(matches, granted);

  return isAllowed ? <Outlet /> : <LazyForbiddenPage />;
}

export { PermissionRoute as Component };
