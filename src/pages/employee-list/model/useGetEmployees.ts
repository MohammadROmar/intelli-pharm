import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { getEmployees } from '@/entities/employee';
import { useEmployeeFilters } from './useEmployeeFilters';
import type { ApiError, ApiResponse } from '@/shared/api';
import type { EmployeeListResponse } from '@/entities/employee/model/employeeTypes';

export function useGetEmployees() {
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page');

  const { filters } = useEmployeeFilters();

  return useQuery<ApiResponse<EmployeeListResponse>, ApiError>({
    queryKey: ['employees', { page, filters }],
    queryFn: () => getEmployees(page, filters),
    placeholderData: (prev) => prev,
  });
}
