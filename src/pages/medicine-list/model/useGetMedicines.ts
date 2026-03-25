import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import type { ApiError, ApiResponse } from '@/shared/api';
import { getMedicines, type MedicineResponse } from '@/entities/medicine';
import { useMedicineFilters } from './useMedicineFilters';

export function useGetMedicines() {
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page');

  const { filters } = useMedicineFilters();

  return useQuery<ApiResponse<MedicineResponse>, ApiError>({
    queryKey: ['medicines', { page, filters }],
    queryFn: () => getMedicines(page, filters),
    placeholderData: (prev) => prev,
  });
}
