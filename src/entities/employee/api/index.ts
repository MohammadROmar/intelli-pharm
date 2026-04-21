import type {
  Employee,
  CreateEmployeeFormData,
  EditEmployeeFormData,
  EmployeeListResponse,
} from '../model/employeeTypes';
import { apiClient, ApiError, statusToI18nKey } from '@/shared/api';

export async function getEmployees(
  params: Record<string, string | number | null | undefined>,
) {
  return apiClient.get<EmployeeListResponse>('/erp/v1/employees', { params });
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

export async function getInfiniteEmployees(page_number: string, name?: string) {
  const response = await getEmployees({ page_number, name });

  if (!response.isSuccess || !response.data) {
    throw new ApiError(statusToI18nKey(response.statusCode));
  }

  const { data, meta } = response.data;

  return {
    items: data!,
    page: meta.current_page,
    pageSize: meta.per_page,
    totalPages: Math.max(meta.total / meta.per_page, 1),
    totalCount: meta.total,
  };
}
