import { useSearchParams } from 'react-router-dom';

import type { TargetAchievementFilters } from '@/entities/target';
import { useFilters } from '@/shared/lib';

const FILTER_KEYS: (keyof TargetAchievementFilters)[] = [
  'achieved_at',
  'month',
  'quarter',
  'year',
];

export function useTargetAchievementFilters() {
  const [searchParams] = useSearchParams();

  const filters: TargetAchievementFilters = {
    achieved_at: searchParams.get('achieved_at') ?? undefined,
    month: searchParams.get('month') ?? undefined,
    quarter: searchParams.get('quarter') ?? undefined,
    year: searchParams.get('year') ?? undefined,
  };

  return useFilters<TargetAchievementFilters>({
    filters,
    filterKeys: FILTER_KEYS,
  });
}
