import { useSearchParams } from 'react-router-dom';

import { useFilters } from '@/shared/lib';

type CitiesFilteres = { name?: string };

const FILTER_KEYS: (keyof CitiesFilteres)[] = ['name'];

export function useCitiesFilteres() {
  const [searchParams] = useSearchParams();

  const filters: CitiesFilteres = {
    name: searchParams.get('name') ?? undefined,
  };

  return useFilters<CitiesFilteres>({ filters, filterKeys: FILTER_KEYS });
}
