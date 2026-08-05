import { hasAnyPermission } from '@/entities/session';
import type { Permission, PermissionRequirement } from '@/shared/api';
import type {
  NavSection,
  NavSubItem,
  SidebarItem,
} from '../config/sidebarData';

function toPermissionList(
  permission?: PermissionRequirement,
): readonly Permission[] {
  if (!permission) return [];
  return typeof permission === 'string' ? [permission] : permission;
}

function isVisible(
  permission: PermissionRequirement | undefined,
  granted: ReadonlySet<Permission>,
): boolean {
  const required = toPermissionList(permission);
  return required.length === 0 || hasAnyPermission(granted, required);
}

function filterSubItems(
  subItems: NavSubItem[],
  granted: ReadonlySet<Permission>,
): NavSubItem[] {
  return subItems.filter((subItem) => isVisible(subItem.permission, granted));
}

function filterItems(
  items: SidebarItem[],
  granted: ReadonlySet<Permission>,
): SidebarItem[] {
  return items.reduce<SidebarItem[]>((visible, item) => {
    if (item.items) {
      const visibleSubItems = filterSubItems(item.items, granted);
      if (visibleSubItems.length > 0) {
        visible.push({ ...item, items: visibleSubItems });
      }
      return visible;
    }

    if (isVisible(item.permission, granted)) {
      visible.push(item);
    }

    return visible;
  }, []);
}

export function filterSidebarByPermission(
  sections: NavSection[],
  granted: ReadonlySet<Permission>,
): NavSection[] {
  return sections.reduce<NavSection[]>((visible, section) => {
    const items = filterItems(section.items, granted);
    if (items.length > 0) {
      visible.push({ ...section, items });
    }
    return visible;
  }, []);
}
