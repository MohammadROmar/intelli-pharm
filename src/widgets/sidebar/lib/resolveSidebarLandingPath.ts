import { hasPermissionRequirement } from '@/entities/session';
import type { Permission } from '@/shared/api';

import { sidebarData } from '../config/sidebarData';

export function resolveSidebarLandingPath(
  granted: ReadonlySet<Permission>,
): string | null {
  for (const section of sidebarData) {
    for (const item of section.items) {
      if (item.items?.length) {
        for (const subItem of item.items) {
          if (
            subItem.permission &&
            hasPermissionRequirement(granted, subItem.permission)
          ) {
            return subItem.url;
          }
        }

        continue;
      }

      if (
        item.permission &&
        hasPermissionRequirement(granted, item.permission)
      ) {
        return item.url;
      }
    }
  }

  return null;
}
