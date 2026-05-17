import { useSearchParams } from 'react-router-dom';
import { useSuspenseQuery } from '@tanstack/react-query';

import { useTargetAchievementFilters } from './useTargetAchievementFilters';
import { getTargetAchievemnets } from '@/entities/target';
import type { TargetAchievementResponse } from '@/entities/target';
import type { ApiError, ApiResponse } from '@/shared/api';
import { getPage, getPerPage } from '@/shared/lib';

export function useGetTargetAchievementsSuspense(id: number) {
  const { filters } = useTargetAchievementFilters();
  const [searchParams] = useSearchParams();

  const page_number = getPage(searchParams);
  const per_page = getPerPage(searchParams);
  const config = { ...filters, page_number, per_page };

  return useSuspenseQuery<ApiResponse<TargetAchievementResponse>, ApiError>({
    queryKey: ['targets', 'targetAchievements', id, config],
    queryFn: () => getTargetAchievemnets({ id, params: config }),
  });
}
