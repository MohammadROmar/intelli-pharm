import type { PermissionRequirement } from '@/shared/api';

import type { PermissionHandle } from './PermissionRoute';

export function withPermission(
  permission: PermissionRequirement,
): PermissionHandle {
  return { permission };
}
