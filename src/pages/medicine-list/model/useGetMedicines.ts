import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import type { ApiError, ApiResponse } from '@/shared/api';
import { getMedicines } from '@/entities/medicine';

export function useGetMedicines() {
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page');
  const name = searchParams.get('name');

  return useQuery<ApiResponse<unknown>, ApiError>({
    queryKey: ['medicines', { page, name }],
    queryFn: () => getMedicines(page, name),
    placeholderData: (prev) => prev,
  });
}
