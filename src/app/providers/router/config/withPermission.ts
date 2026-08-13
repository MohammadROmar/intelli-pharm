import type { Permission } from '@/shared/api';

import type { PermissionHandle } from './PermissionRoute';

export function withPermission(permission: Permission): PermissionHandle {
  return { permission };
}
