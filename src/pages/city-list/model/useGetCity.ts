import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { getCityById, type CityDetail } from '@/entities/city';
import type { ApiError, ApiResponse } from '@/shared/api';

export function useGetCity() {
  const { id } = useParams();

  const cityId = Number(id);
  const isValidId = !isNaN(cityId);

  return useQuery<ApiResponse<CityDetail>, ApiError>({
    queryKey: ['cities', `id-${cityId}`],
    queryFn: () => getCityById(cityId),
    enabled: isValidId,
  });
}
