import { useSearchParams } from 'react-router-dom';

import { useFilters, parseFilters } from '@/shared/lib';
import type { AreaFilters } from '@/entities/metrics';

const FILTER_KEYS: (keyof AreaFilters)[] = [
  'quarter',
  'year',
  'region_id',
  'category_id',
];

export function useAreaFilters() {
  const [searchParams] = useSearchParams();
  const filters = parseFilters<AreaFilters>(searchParams);
  return useFilters<AreaFilters>({ filters, filterKeys: FILTER_KEYS });
}
