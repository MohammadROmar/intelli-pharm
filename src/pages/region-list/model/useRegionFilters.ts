import { useSearchParams } from 'react-router-dom';

import type { RegionFilters } from '@/entities/region';
import { useFilters } from '@/shared/lib';

const FILTER_KEYS: (keyof RegionFilters)[] = ['name', 'city'];

export function useRegionFilters() {
  const [searchParams] = useSearchParams();

  const filters: RegionFilters = {
    name: searchParams.get('name') ?? undefined,
    city: searchParams.get('city') ?? undefined,
  };

  return useFilters<RegionFilters>({ filters, filterKeys: FILTER_KEYS });
}
