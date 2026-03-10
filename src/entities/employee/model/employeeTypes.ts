export type Employee = {
  name: string;
  email: string;
  role: 'distributor' | 'rep';
};

export type EmployeeFormData = Employee & { password: string };
