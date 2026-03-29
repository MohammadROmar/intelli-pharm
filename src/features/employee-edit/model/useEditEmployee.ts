import { editEmployee, type EditEmployeeFormData } from '@/entities/employee';
import { useEditEntity } from '@/shared/model';

export function useEditEmployee() {
  return useEditEntity<{ id: number; payload: EditEmployeeFormData }>({
    queryKey: 'employees',
    mutationFn: editEmployee,
    translationKey: 'employeesPage.employee',
    redirectTo: '/dashboard/employees',
  });
}
