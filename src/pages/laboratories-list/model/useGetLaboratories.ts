import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import {
  getLaboratories,
  type LaboratoriesResponse,
} from '@/entities/laboratory';
import type { ApiError, ApiResponse } from '@/shared/api';

export function useGetLaboratories() {
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page');
  const name = searchParams.get('name');

  return useQuery<ApiResponse<LaboratoriesResponse>, ApiError>({
    queryKey: ['laboratories', { page, name }],
    queryFn: () => getLaboratories(page, name),
    placeholderData: (prev) => {
      const data = prev?.data?.data;
      return data && data.length > 0 ? prev : undefined;
    },
  });
}
