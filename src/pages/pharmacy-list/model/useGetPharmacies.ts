import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { usePharmacyFilters } from './usePharmacyFilters';
import { getPharmacies, type PharmaciesResponse } from '@/entities/pharmacy';
import type { ApiError, ApiResponse } from '@/shared/api';
import { getPage, getPerPage } from '@/shared/lib';

export function useGetPharmacies() {
  const [searchParams] = useSearchParams();
  const { filters } = usePharmacyFilters();

  const page_number = getPage(searchParams);
  const per_page = getPerPage(searchParams);

  return useQuery<ApiResponse<PharmaciesResponse>, ApiError>({
    queryKey: ['pharmacies', { page_number, per_page, filters }],
    queryFn: () => getPharmacies({ ...filters, page_number, per_page }),
    placeholderData: (prev) => {
      const data = prev?.data?.data;
      return data && data.length > 0 ? prev : undefined;
    },
  });
}
