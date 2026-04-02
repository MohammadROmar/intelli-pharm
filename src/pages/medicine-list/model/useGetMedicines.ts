import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { useMedicineFilters } from './useMedicineFilters';
import { getMedicines, type MedicineResponse } from '@/entities/medicine';
import type { ApiError, ApiResponse } from '@/shared/api';
import { getPage, getPerPage } from '@/shared/lib';

export function useGetMedicines() {
  const [searchParams] = useSearchParams();
  const { filters } = useMedicineFilters();

  const page_number = getPage(searchParams);
  const per_page = getPerPage(searchParams);

  return useQuery<ApiResponse<MedicineResponse>, ApiError>({
    queryKey: ['medicines', { page_number, per_page, filters }],
    queryFn: () => getMedicines({ ...filters, page_number, per_page }),
    placeholderData: (prev) => {
      const data = prev?.data?.data;
      return data && data.length > 0 ? prev : undefined;
    },
  });
}
