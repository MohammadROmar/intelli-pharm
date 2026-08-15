import type { DeliveryFilters } from '@/entities/delivery';
import { parseFilters, useFilters } from '@/shared/lib';
import { useSearchParams } from 'react-router';

const FILTER_KEYS = [
  'status',
  'pharmacy_id',
  'scheduled_at_before',
  'scheduled_at_after',
] as const satisfies readonly (keyof DeliveryFilters)[];

export function useDeliveryFilters() {
  const [searchParams] = useSearchParams();
  const filters = parseFilters<DeliveryFilters>(searchParams);

  return useFilters<DeliveryFilters>({ filters, filterKeys: FILTER_KEYS });
}
