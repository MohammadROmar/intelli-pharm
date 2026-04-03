import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { apiClient, type ApiError, type ApiResponse } from '@/shared/api';
import { getPage, getPerPage } from '@/shared/lib';

type Props = {
  queryKey: string;
  filters: Record<string, string | null | undefined>;
};

export function useGetEntities<T extends { data?: Y[] }, Y>({
  queryKey,
  filters,
}: Props) {
  const [searchParams] = useSearchParams();

  const page_number = getPage(searchParams);
  const per_page = getPerPage(searchParams);

  const params = { ...filters, page_number, per_page };

  return useQuery<ApiResponse<T>, ApiError>({
    queryKey: [queryKey, { page_number, per_page, filters }],
    queryFn: () => apiClient.get(`/erp/v1/${queryKey}`, { params }),
    placeholderData: (prev) => {
      const data = prev?.data?.data;
      return data && data.length > 0 ? prev : undefined;
    },
  });
}
