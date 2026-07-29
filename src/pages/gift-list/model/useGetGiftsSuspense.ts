import type { Gift, GiftResponse } from '@/entities/gift';
import { useSearchParams } from 'react-router';
import { useSuspenseGetEntities } from '@/shared/model';

export function useGetGiftsSuspense() {
  const [searchParams] = useSearchParams();

  const page = searchParams.get('page');

  const filters = { page };

  return useSuspenseGetEntities<GiftResponse, Gift>({
    queryKey: 'gifts',
    filters,
  });
}
