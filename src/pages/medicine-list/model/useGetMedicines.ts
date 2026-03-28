import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { useMedicineFilters } from './useMedicineFilters';
import type { ApiError, ApiResponse } from '@/shared/api';
import { getMedicines, type MedicineResponse } from '@/entities/medicine';

export function useGetMedicines() {
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page');

  const { filters } = useMedicineFilters();

  return useQuery<ApiResponse<MedicineResponse>, ApiError>({
    queryKey: ['medicines', { page, filters }],
    queryFn: () => getMedicines(page, filters),
    placeholderData: (prev) => {
      const data = prev?.data?.data;
      return data && data.length > 0 ? prev : undefined;
    },
  });
}
