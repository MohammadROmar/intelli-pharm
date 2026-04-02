import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import {
  getLaboratories,
  type LaboratoriesResponse,
} from '@/entities/laboratory';
import type { ApiError, ApiResponse } from '@/shared/api';
import { getPage, getPerPage } from '@/shared/lib';

export function useGetLaboratories() {
  const [searchParams] = useSearchParams();

  const name = searchParams.get('name');
  const page_number = getPage(searchParams);
  const per_page = getPerPage(searchParams);

  return useQuery<ApiResponse<LaboratoriesResponse>, ApiError>({
    queryKey: ['laboratories', { page_number, per_page, name }],
    queryFn: () => getLaboratories({ page_number, name, per_page }),
    placeholderData: (prev) => {
      const data = prev?.data?.data;
      return data && data.length > 0 ? prev : undefined;
    },
  });
}
