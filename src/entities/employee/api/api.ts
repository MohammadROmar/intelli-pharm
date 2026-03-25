import type {
  Employee,
  CreateEmployeeFormData,
  UpdateEmployeeFormData,
  EmployeeListResponse,
  EmployeeFilters,
} from '../model/employeeTypes';
import { apiClient } from '@/shared/api';

export async function getEmployees(
  page: string | null,
  filters: EmployeeFilters,
) {
  return apiClient.get<EmployeeListResponse>('/erp/v1/employees', {
    params: { page_number: page ?? 1, per_page: 10, ...filters },
  });
}

export async function createEmployee(payload: CreateEmployeeFormData) {
  return apiClient.post('/erp/v1/employees', payload);
}

export async function updateEmployee({
  id,
  payload,
}: {
  id: number;
  payload: Partial<UpdateEmployeeFormData>;
}) {
  return apiClient.put(`/erp/v1/employees/${id}`, payload);
}

export async function getEmployee(id: number) {
  return apiClient.get<Employee>(`/erp/v1/employees/${id}`);
}

export async function deleteEmployee(id: number) {
  return apiClient.delete<unknown>(`/erp/v1/employees/${id}`);
}
