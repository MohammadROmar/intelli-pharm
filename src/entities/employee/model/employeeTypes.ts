export type Employee = {
  id: string;
  name: string;
  email: string;
  roles: string[];
};

export type EmployeeFormData = Omit<
  Employee,
  'id' | 'createdAt' | 'updatedAt'
> & {
  password: string;
  role: 'distributor' | 'rep';
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
