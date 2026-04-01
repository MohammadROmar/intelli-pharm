import type { OrderFilters } from '@/entities/order';
import { useFilters } from '@/shared/lib';
import { useSearchParams } from 'react-router-dom';

const FILTER_KEYS: (keyof OrderFilters)[] = [
  'date_from',
  'date_to',
  'max_total',
  'min_total',
  'pharmacy',
  'status',
];

export function useOrderFilters() {
  const [searchParams] = useSearchParams();

  const filters: OrderFilters = {
    date_from: searchParams.get('date_from') ?? undefined,
    date_to: searchParams.get('date_to') ?? undefined,
    max_total: searchParams.get('max_total') ?? undefined,
    min_total: searchParams.get('min_total') ?? undefined,
    pharmacy: searchParams.get('pharmacy') ?? undefined,
    status: searchParams.get('status') ?? undefined,
  };

  return useFilters<OrderFilters>({ filters, filterKeys: FILTER_KEYS });
}
