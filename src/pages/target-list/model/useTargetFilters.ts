import { useSearchParams } from 'react-router-dom';

import type {
  TypeFilters,
  BooleanFilter,
  TargetFilters,
} from '@/entities/target';
import { useFilters } from '@/shared/lib';

const FILTER_KEYS: (keyof TargetFilters)[] = ['is_active', 'type'];

export function useTargetFilters() {
  const [searchParams] = useSearchParams();

  const filters: TargetFilters = {
    type: (searchParams.get('type') ?? undefined) as TypeFilters,
    is_active: (searchParams.get('is_active') ?? undefined) as BooleanFilter,
  };

  return useFilters<TargetFilters>({ filters, filterKeys: FILTER_KEYS });
}
