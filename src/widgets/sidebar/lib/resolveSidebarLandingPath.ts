import { hasPermissionRequirement } from '@/entities/session';
import type { Permission, PermissionRequirement } from '@/shared/api';

import { sidebarData } from '../config/sidebarData';

type PermissionGatedLink = { url: string; permission?: PermissionRequirement };

function isAccessible(
  link: PermissionGatedLink,
  granted: ReadonlySet<Permission>,
): boolean {
  return (
    link.permission !== undefined &&
    hasPermissionRequirement(granted, link.permission)
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
