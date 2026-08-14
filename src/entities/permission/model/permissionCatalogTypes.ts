import type { Permission } from '@/shared/api';

export type PermissionCatalogEntry = {
  id: number;
  name: Permission;
  guard_name: string;
  created_at: string;
  updated_at: string;
};

export type PermissionCatalog = { id: number; name: Permission };
