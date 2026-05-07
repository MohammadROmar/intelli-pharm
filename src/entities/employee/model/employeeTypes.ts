import type { PaginatedResponse } from '@/shared/api';

type Role = 'distributor' | 'rep' | 'admin';

export type Employee = {
  id: number;
  name: string;
  email: string;
  roles: Role[];
  permissions: string[];
  working_start: string;
  working_end: string;
  vehicle_capacity?: number;
  is_active: boolean;
  phone_number: string | null;
};

export type BaseEmployeeFormData = {
  name: string;
  email: string;
  phone_number: string;
  working_start: string;
  working_end: string;
  vehicle_capacity?: number;
  is_active: boolean;
  role: Role;
};

export type CreateEmployeeFormData = BaseEmployeeFormData & {
  password: string;
};

export type EditEmployeeFormData = BaseEmployeeFormData;

export type EmployeeInternalFormData = BaseEmployeeFormData & {
  password?: string;
};

export type EmployeeListResponse = PaginatedResponse<Employee>;

export type EmployeeFilters = {
  name?: string;
  email?: string;
  phone?: string;
};
