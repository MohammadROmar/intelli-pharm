import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import {
  getLaboratoryById,
  type LaboratoryDetail,
} from '@/entities/laboratory';
import type { ApiError, ApiResponse } from '@/shared/api';

export function useGetLaboratory() {
  const { id } = useParams();

  const laboratoryId = Number(id);
  const isValidId = !isNaN(laboratoryId);

  return useQuery<ApiResponse<LaboratoryDetail>, ApiError>({
    queryKey: ['laboratories', `id-${laboratoryId}`],
    queryFn: () => getLaboratoryById(laboratoryId),
    enabled: isValidId,
  });
}
