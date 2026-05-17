import type { Employee, EmployeeListResponse } from '@/entities/employee';
import { useEmployeeFilters } from './useEmployeeFilters';
import { useSuspenseGetEntities } from '@/shared/model';

export function useGetEmployeesSuspense() {
  const { filters } = useEmployeeFilters();

  return useSuspenseGetEntities<EmployeeListResponse, Employee>({
    queryKey: 'employees',
    filters,
  });
}
