import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { useRegionFilters } from './useRegionFilters';
import { getRegions, type RegionsListResponse } from '@/entities/region';
import type { ApiError, ApiResponse } from '@/shared/api';
import { getPage, getPerPage } from '@/shared/lib';

export function useGetRegions() {
  const [searchParams] = useSearchParams();
  const { filters } = useRegionFilters();

  const page_number = getPage(searchParams);
  const per_page = getPerPage(searchParams);

  return useQuery<ApiResponse<RegionsListResponse>, ApiError>({
    queryKey: ['regions', { page_number, per_page, filters }],
    queryFn: () => getRegions({ ...filters, page_number, per_page }),
    placeholderData: (prev) => {
      const data = prev?.data?.data;
      return data && data.length > 0 ? prev : undefined;
    },
  });
}
