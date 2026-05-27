import { useSearchParams } from 'react-router-dom';

import type { SeasonalFilters } from '@/entities/metrics';
import { useFilters, parseFilters } from '@/shared/lib';

const FILTER_KEYS: (keyof SeasonalFilters)[] = [
  'quarter',
  'year',
  'pharmacy_id',
  'category_id',
];

export function useSeasonalFilters() {
  const [searchParams] = useSearchParams();
  const filters = parseFilters<SeasonalFilters>(searchParams);
  return useFilters<SeasonalFilters>({ filters, filterKeys: FILTER_KEYS });
}
