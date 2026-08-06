import type { PaginatedResponse, Permission } from '@/shared/api';

export type Role = {
  id: number;
  name: string;
  permissions: Permission[];
};

export type RoleItem = Role & {
  is_editable: boolean;
  guard_name: string;
  created_at: string;
  updated_at: string;
};

export type RolesListResponse = PaginatedResponse<RoleItem>;

export type RoleFormData = Omit<Role, 'id'>;

export type CreateRolePayload = RoleFormData;

export type EditRolePayload = RoleFormData & Pick<Role, 'id'>;
