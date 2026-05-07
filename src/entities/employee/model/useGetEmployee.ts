import type { Employee } from './employeeTypes';
import { useGetEntityById } from '@/shared/model';

export function useGetEmployee() {
  return useGetEntityById<Employee>({
    queryKey: 'employees',
    endpoint: '/erp/v1/employees',
  });
}
