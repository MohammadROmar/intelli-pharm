import {
  createEmployee,
  type CreateEmployeeFormData,
} from '@/entities/employee';
import { useCreateEntity } from '@/shared/model';

export function useCreateEmployee() {
  return useCreateEntity<CreateEmployeeFormData>({
    queryKey: 'employees',
    mutationFn: createEmployee,
    translationKey: 'employeesPage.employee',
  });
}
