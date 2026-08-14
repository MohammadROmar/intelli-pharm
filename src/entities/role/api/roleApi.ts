import { apiClient, unwrapPaginatedApiResponse } from '@/shared/api';

import type {
  Role,
  EditRolePayload,
  RolesListResponse,
  CreateRolePayload,
} from '../model/roleTypes';

export function createRole(payload: CreateRolePayload) {
  return apiClient.post<Role>('/auth/v1/roles', payload);
}

export function editRole({ id, ...payload }: EditRolePayload) {
  return apiClient.put<Role>(`/auth/v1/roles/${id}`, payload);
}

export async function getRoles(
  params: Record<string, string | number | null | undefined>,
) {
  return apiClient.get<RolesListResponse>('/auth/v1/roles', { params });
}

export async function getInfiniteRoles(page_number: string, name?: string) {
  const response = await getRoles({ page_number, name });

  return unwrapPaginatedApiResponse(response);
}
