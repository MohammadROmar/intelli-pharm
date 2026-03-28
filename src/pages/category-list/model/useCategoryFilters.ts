import { useSearchParams } from 'react-router-dom';

import type { CategoryFilters } from '@/entities/category';
import { useFilters } from '@/shared/lib';

const FILTER_KEYS: (keyof CategoryFilters)[] = ['name', 'parent_id'];

export function useCategoryFilters() {
  const [searchParams] = useSearchParams();

  const filters: CategoryFilters = {
    name: searchParams.get('name') ?? undefined,
    parent_id: searchParams.get('parent_id') ?? undefined,
  };

  return useFilters<CategoryFilters>({ filters, filterKeys: FILTER_KEYS });
}
