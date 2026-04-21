import type { Employee } from './employeeTypes';
import { getInfiniteEmployees } from '../api';
import { useInfiniteEntities } from '@/shared/model';

export function useInfiniteEmployees(searchTerm: string) {
  return useInfiniteEntities<Employee>({
    queryKey: 'employees',
    searchTerm,
    queryFn: getInfiniteEmployees,
  });
}
