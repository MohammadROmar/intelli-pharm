import type { Employee, EmployeeFormData } from '../model/employeeTypes';
import { apiClient } from '@/shared/api';

export async function getEmployees() {
  return apiClient.get<Employee[]>('/erp/v1/employees');
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
