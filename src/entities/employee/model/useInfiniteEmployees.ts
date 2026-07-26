import { useInfiniteEntities } from '@/shared/model';

import type { Employee, EmployeeRole } from './employeeTypes';
import { getInfiniteEmployees } from '../api';

type Filters = { searchTerm: string; role?: EmployeeRole };

export function useInfiniteEmployees({ searchTerm, role }: Filters) {
  return useInfiniteEntities<Employee>({
    queryKey: 'employees',
    searchTerm,
    params: { role },
    queryFn: (page, searchTerm) => getInfiniteEmployees(page, searchTerm, role),
  });
}
