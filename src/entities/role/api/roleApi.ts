import { apiClient } from '@/shared/api';

import type {
  CreateRolePayload,
  Role,
  EditRolePayload,
} from '../model/roleTypes';

export function createRole(payload: CreateRolePayload) {
  return apiClient.post<Role>('/auth/v1/roles', payload);
}

export function editRole({ id, ...payload }: EditRolePayload) {
  return apiClient.put<Role>(`/auth/v1/roles/${id}`, payload);
}
