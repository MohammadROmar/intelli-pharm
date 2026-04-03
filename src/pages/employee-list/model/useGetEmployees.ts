import { useEmployeeFilters } from './useEmployeeFilters';
import type { Employee, EmployeeListResponse } from '@/entities/employee';
import { useGetEntities } from '@/shared/model';

export function useGetEmployees() {
  const { filters } = useEmployeeFilters();

  return useGetEntities<EmployeeListResponse, Employee>({
    queryKey: 'employees',
    filters,
  });
}
