import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { getMedicineById } from '../api/api';
import type { Medicine } from '../model/medicineTypes';
import type { ApiError, ApiResponse } from '@/shared/api';

export function useGetMedicine() {
  const { id } = useParams();

  const medicineId = Number(id);
  const isValidId = !isNaN(medicineId);

  return useQuery<ApiResponse<Medicine>, ApiError>({
    queryKey: ['medicines', `id-${medicineId}`],
    queryFn: () => getMedicineById(medicineId),
    enabled: isValidId,
  });
}
