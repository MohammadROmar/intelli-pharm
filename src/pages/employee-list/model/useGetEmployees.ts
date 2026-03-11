import { useQuery } from '@tanstack/react-query';

import { getEmployees } from '@/entities/employee';

export function useGetEmployees() {
  return useQuery({ queryKey: ['employees'], queryFn: getEmployees });
}
