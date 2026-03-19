import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import type { ApiError, ApiResponse } from '@/shared/api';
import { getMedicines, type MedicineResponse } from '@/entities/medicine';

export function useGetMedicines() {
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page');
  const name = searchParams.get('name');

  return useQuery<ApiResponse<MedicineResponse>, ApiError>({
    queryKey: ['medicines', { page, name }],
    queryFn: () => getMedicines(page, name),
    placeholderData: (prev) => prev,
  });
}
