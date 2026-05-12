import { useParams, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { useTargetAchievementFilters } from './useTargetAchievementFilters';
import { getTargetAchievemnets } from '@/entities/target';
import type { TargetAchievementResponse } from '@/entities/target';
import { ApiError, type ApiResponse } from '@/shared/api';
import { getPage, getPerPage } from '@/shared/lib';

export function useGetTargetAchievements() {
  const { filters } = useTargetAchievementFilters();

  const params = useParams();

  const rawId = params['id'];
  const numericId = Number(rawId);
  const isValidId = rawId !== undefined && !isNaN(numericId);

  const [searchParams] = useSearchParams();

  const page_number = getPage(searchParams);
  const per_page = getPerPage(searchParams);

  const config = { ...filters, page_number, per_page };

  const queryData = useQuery<ApiResponse<TargetAchievementResponse>, ApiError>({
    queryKey: ['targets', 'targetAchievements', config],
    queryFn: () => getTargetAchievemnets({ id: numericId, params: config }),
    enabled: isValidId,
    placeholderData: (prev) => {
      const data = prev?.data?.data;
      return data && data.length > 0 ? prev : undefined;
    },
  });

  return { queryData, id: numericId };
}
