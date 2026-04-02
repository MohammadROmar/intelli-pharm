import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { useEmployeeFilters } from './useEmployeeFilters';
import { getEmployees, type EmployeeListResponse } from '@/entities/employee';
import type { ApiError, ApiResponse } from '@/shared/api';
import { getPage, getPerPage } from '@/shared/lib';

export function useGetEmployees() {
  const [searchParams] = useSearchParams();
  const { filters } = useEmployeeFilters();

  const page_number = getPage(searchParams);
  const per_page = getPerPage(searchParams);

  return useQuery<ApiResponse<EmployeeListResponse>, ApiError>({
    queryKey: ['employees', { page_number, per_page, filters }],
    queryFn: () => getEmployees({ ...filters, page_number, per_page }),
    placeholderData: (prev) => {
      const data = prev?.data?.data;
      return data && data.length > 0 ? prev : undefined;
    },
  });
}
