import { useSearchParams } from 'react-router';

import type { TargetFilters } from '@/entities/target';
import { useFilters, parseFilters } from '@/shared/lib';

const FILTER_KEYS: (keyof TargetFilters)[] = ['is_active', 'type'];

export function useTargetFilters() {
  const [searchParams] = useSearchParams();

  const filters = parseFilters<TargetFilters>(searchParams, {
    is_active: 'boolean',
  });

  return useFilters<TargetFilters>({ filters, filterKeys: FILTER_KEYS });
}
