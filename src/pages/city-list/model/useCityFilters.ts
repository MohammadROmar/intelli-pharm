import { useSearchParams } from 'react-router-dom';

import { useFilters } from '@/shared/lib';

type CityFilters = { name?: string };

const FILTER_KEYS: (keyof CityFilters)[] = ['name'];

export function useCityFilteres() {
  const [searchParams] = useSearchParams();

  const filters: CityFilters = {
    name: searchParams.get('name') ?? undefined,
  };

  return useFilters<CityFilters>({ filters, filterKeys: FILTER_KEYS });
}
