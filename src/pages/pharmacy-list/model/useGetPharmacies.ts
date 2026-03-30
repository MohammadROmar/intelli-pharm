import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { getPharmacies, type PharmaciesResponse } from '@/entities/pharmacy';
import type { ApiError, ApiResponse } from '@/shared/api';
import { usePharmacyFilters } from './usePharmacyFilters';

export function useGetPharmacies() {
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page');

  const { filters } = usePharmacyFilters();

  return useQuery<ApiResponse<PharmaciesResponse>, ApiError>({
    queryKey: ['pharmacies', { page, filters }],
    queryFn: () => getPharmacies(page, filters),
    placeholderData: (prev) => {
      const data = prev?.data?.data;
      return data && data.length > 0 ? prev : undefined;
    },
  });
}
