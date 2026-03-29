import type {
  Employee,
  CreateEmployeeFormData,
  EditEmployeeFormData,
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
  const data: CreateEmployeeFormData = {
    ...payload,
    is_active: payload.is_active ?? false,
    working_start: payload.working_start.slice(0, 5),
    working_end: payload.working_end.slice(0, 5),
  };

  return apiClient.post('/erp/v1/employees', data);
}

export async function editEmployee({
  id,
  payload,
}: {
  id: number;
  payload: EditEmployeeFormData;
}) {
  const data: EditEmployeeFormData = {
    ...payload,
    working_start: payload.working_start.slice(0, 5),
    working_end: payload.working_end.slice(0, 5),
  };

  return apiClient.put(`/erp/v1/employees/${id}`, data);
}

export async function getEmployeeById(id: number) {
  return apiClient.get<Employee>(`/erp/v1/employees/${id}`);
}
