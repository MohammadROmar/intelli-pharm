import { useSearchParams } from 'react-router-dom';

import { useFilters } from '@/shared/lib';

type LaboratoryFilteres = { name?: string };

const FILTER_KEYS: (keyof LaboratoryFilteres)[] = ['name'];

export function useLaboratoryFilteres() {
  const [searchParams] = useSearchParams();

  const filters: LaboratoryFilteres = {
    name: searchParams.get('name') ?? undefined,
  };

  return useFilters<LaboratoryFilteres>({ filters, filterKeys: FILTER_KEYS });
}
