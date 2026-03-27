import { useSearchParams } from 'react-router-dom';

import { useFilters } from '@/shared/lib';

type LaboratoriesFilteres = { name?: string };

const FILTER_KEYS: (keyof LaboratoriesFilteres)[] = ['name'];

export function useLaboratoriesFilteres() {
  const [searchParams] = useSearchParams();

  const filters: LaboratoriesFilteres = {
    name: searchParams.get('name') ?? undefined,
  };

  return useFilters<LaboratoriesFilteres>({ filters, filterKeys: FILTER_KEYS });
}
