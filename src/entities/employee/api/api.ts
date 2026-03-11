import type { Employee, EmployeeFormData } from '../model/employeeTypes';
import { apiClient } from '@/shared/api';

export async function getEmployees(): Promise<Employee[]> {
  const { data } = await apiClient.get('/erp/v1/employees');
  return data;
}

export async function createEmployee(payload: EmployeeFormData) {
  const { data } = await apiClient.post('/erp/v1/employees', payload);
  return data;
}

export async function updateEmployee(
  id: string,
  payload: Partial<EmployeeFormData>,
) {
  const { data } = await apiClient.put(`/erp/v1/employees/${id}`, payload);
  return data;
}

export async function deleteEmployee(id: string) {
  await apiClient.delete(`/erp/v1/employees/${id}`);
}
