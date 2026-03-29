import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { useRegionFilters } from './useRegionFilters';
import type { ApiError, ApiResponse } from '@/shared/api';
import { getRegions, type RegionsListResponse } from '@/entities/region';

export function useGetRegions() {
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page');

  const { filters } = useRegionFilters();

  return useQuery<ApiResponse<RegionsListResponse>, ApiError>({
    queryKey: ['regions', { page, filters }],
    queryFn: () => getRegions(page, filters),
    placeholderData: (prev) => {
      const data = prev?.data?.data;
      return data && data.length > 0 ? prev : undefined;
    },
  });
}
