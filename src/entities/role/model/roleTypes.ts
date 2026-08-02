import type { PaginatedResponse, Permission } from '@/shared/api';

export type RoleDto = { name: string; permissions: Permission[] };

export type RoleItem = RoleDto & {
  id: number;
  guard_name: string;
  created_at: string;
  updated_at: string;
};

export type RolesListResponse = PaginatedResponse<RoleItem>;
