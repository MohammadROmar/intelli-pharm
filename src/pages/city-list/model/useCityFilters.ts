import { useSearchParams } from 'react-router';

import { useFilters, parseFilters } from '@/shared/lib';

type CityFilters = { name?: string };

const FILTER_KEYS: (keyof CityFilters)[] = ['name'];

export function useCityFilters() {
  const [searchParams] = useSearchParams();

  const filters = parseFilters<CityFilters>(searchParams);

  return useFilters<CityFilters>({ filters, filterKeys: FILTER_KEYS });
}
