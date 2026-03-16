import type {
  EmployeeFormData,
  EmployeeListResponse,
} from '../model/employeeTypes';
import { apiClient } from '@/shared/api';

export async function getEmployees(page: string | null, name: string | null) {
  return apiClient.get<EmployeeListResponse>('/erp/v1/employees', {
    params: { page_number: page ?? 1, per_page: 10, search: name },
  });
}

export async function createEmployee(payload: EmployeeFormData) {
  return apiClient.post('/erp/v1/employees', payload);
}

export async function updateEmployee(
  id: string,
  payload: Partial<EmployeeFormData>,
) {
  return apiClient.put(`/erp/v1/employees/${id}`, payload);
}

export async function deleteEmployee(id: string) {
  await apiClient.delete(`/erp/v1/employees/${id}`);
}
