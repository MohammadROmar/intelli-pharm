export type Employee = {
  id: string;
  name: string;
  email: string;
  role: 'distributor' | 'rep';
};

export type EmployeeFormData = Omit<Employee, 'id'> & { password: string };
