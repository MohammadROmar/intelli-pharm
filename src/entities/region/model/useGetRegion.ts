import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import type { RegionDetail } from './regionTypes';
import { getRegionById } from '../api/api';
import type { ApiError, ApiResponse } from '@/shared/api';

export function useGetRegion() {
  const { id } = useParams();

  const employeeId = Number(id);
  const isValidId = !isNaN(employeeId);

  return useQuery<ApiResponse<RegionDetail>, ApiError>({
    queryKey: ['regions', `id-${id}`],
    queryFn: () => getRegionById(employeeId),
    enabled: isValidId,
  });
}
