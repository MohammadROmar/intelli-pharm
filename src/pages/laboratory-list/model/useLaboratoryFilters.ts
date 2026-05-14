import { useSearchParams } from 'react-router-dom';

import { useFilters, parseFilters } from '@/shared/lib';

type LaboratoryFilteres = { name?: string };

const FILTER_KEYS: (keyof LaboratoryFilteres)[] = ['name'];

export function useLaboratoryFilters() {
  const [searchParams] = useSearchParams();

  const filters = parseFilters<LaboratoryFilteres>(searchParams);

  return useFilters<LaboratoryFilteres>({ filters, filterKeys: FILTER_KEYS });
}
