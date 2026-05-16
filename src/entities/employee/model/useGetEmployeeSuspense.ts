import type { Employee } from './employeeTypes';
import { useSuspenseGetEntityById } from '@/shared/model';

export function useGetEmployeeSuspense(id: number) {
  return useSuspenseGetEntityById<Employee>({
    id,
    queryKey: 'employees',
    endpoint: '/erp/v1/employees',
  });
}
