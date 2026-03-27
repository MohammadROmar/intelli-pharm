import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { getCities, type CitiesResponse } from '@/entities/city';
import type { ApiError, ApiResponse } from '@/shared/api';

export function useGetCities() {
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page');
  const name = searchParams.get('name');

  return useQuery<ApiResponse<CitiesResponse>, ApiError>({
    queryKey: ['cities', { page, name }],
    queryFn: () => getCities(page, name),
    placeholderData: (prev) => {
      const data = prev?.data?.data;
      return data && data.length > 0 ? prev : undefined;
    },
  });
}
