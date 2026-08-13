import { hasPermission } from '@/entities/session';
import type { Permission } from '@/shared/api';

import { sidebarData } from '../config/sidebarData';

type PermissionGatedLink = { url: string; permission?: Permission };

function isAccessible(
  link: PermissionGatedLink,
  granted: ReadonlySet<Permission>,
): boolean {
  return (
    link.permission !== undefined && hasPermission(granted, link.permission)
  );
}

export function resolveSidebarLandingPath(
  granted: ReadonlySet<Permission>,
): string | null {
  const candidates = sidebarData.flatMap((section) =>
    section.items.flatMap((item) => (item.items?.length ? item.items : [item])),
  );

  return candidates.find((link) => isAccessible(link, granted))?.url ?? null;
}
