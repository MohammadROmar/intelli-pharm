import { Outlet, useMatches } from 'react-router';

import { LazyForbiddenPage } from '@/pages/forbidden';
import {
  hasAllPermissionRequirements,
  useGrantedPermissions,
} from '@/entities/session';
import type { PermissionRequirement } from '@/shared/api';

export type PermissionHandle = { permission?: PermissionRequirement };

function getRequiredPermissions(
  matches: ReturnType<typeof useMatches>,
): PermissionRequirement[] {
  const requirements: PermissionRequirement[] = [];

  for (const match of matches) {
    const handle = match.handle as PermissionHandle | undefined;
    if (handle?.permission) requirements.push(handle.permission);
  }

  return requirements;
}

export function PermissionRoute() {
  const matches = useMatches();
  const granted = useGrantedPermissions();
  const requirements = getRequiredPermissions(matches);
  const isAllowed = hasAllPermissionRequirements(granted, requirements);

  return isAllowed ? <Outlet /> : <LazyForbiddenPage />;
}

export { PermissionRoute as Component };
