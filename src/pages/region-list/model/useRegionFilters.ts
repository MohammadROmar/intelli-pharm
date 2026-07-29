import { useSearchParams } from 'react-router';

import type { RegionFilters } from '@/entities/region';
import { useFilters, parseFilters } from '@/shared/lib';

const FILTER_KEYS: (keyof RegionFilters)[] = ['name', 'city'];

export function useRegionFilters() {
  const [searchParams] = useSearchParams();

  const filters = parseFilters<RegionFilters>(searchParams);

  return useFilters<RegionFilters>({ filters, filterKeys: FILTER_KEYS });
}
