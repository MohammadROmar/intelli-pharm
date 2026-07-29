import { useSearchParams } from 'react-router';

import type { TargetAchievementFilters } from '@/entities/target';
import { useFilters, parseFilters } from '@/shared/lib';

const FILTER_KEYS: (keyof TargetAchievementFilters)[] = [
  'achieved_at',
  'month',
  'quarter',
  'year',
];

export function useTargetAchievementFilters() {
  const [searchParams] = useSearchParams();

  const filters = parseFilters<TargetAchievementFilters>(searchParams);

  return useFilters<TargetAchievementFilters>({
    filters,
    filterKeys: FILTER_KEYS,
  });
}
