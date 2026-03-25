export type Employee = {
  id: number;
  name: string;
  email: string;
  roles: Role[];
  permissions: string[];
};

type Role = 'distributor' | 'rep' | 'admin';

export type BaseEmployeeFormData = {
  name: string;
  email: string;
  role: Role;
};

export type CreateEmployeeFormData = BaseEmployeeFormData & {
  password: string;
};

export type UpdateEmployeeFormData = BaseEmployeeFormData;

export type EmployeeInternalFormData = BaseEmployeeFormData & {
  password?: string;
};

export type EmployeeListResponse = {
  data: Employee[];
  meta: {
    current_page: number;
    per_page: number;
    to: number;
    total: number;
  };
};

export type EmployeeFilters = {
  name?: string;
  email?: string;
};
