import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { getCities, type CitiesResponse } from '@/entities/city';
import type { ApiError, ApiResponse } from '@/shared/api';
import { getPage, getPerPage } from '@/shared/lib';

export function useGetCities() {
  const [searchParams] = useSearchParams();

  const name = searchParams.get('name');
  const page_number = getPage(searchParams);
  const per_page = getPerPage(searchParams);

  return useQuery<ApiResponse<CitiesResponse>, ApiError>({
    queryKey: ['cities', { page_number, per_page, name }],
    queryFn: () => getCities({ page_number, per_page, name }),
    placeholderData: (prev) => {
      const data = prev?.data?.data;
      return data && data.length > 0 ? prev : undefined;
    },
  });
}
