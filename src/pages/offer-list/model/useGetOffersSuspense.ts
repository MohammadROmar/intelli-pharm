import type { Offer, OfferResponse } from '@/entities/offer';
import { useSearchParams } from 'react-router';
import { useSuspenseGetEntities } from '@/shared/model';

export function useGetOffersSuspense() {
  const [searchParams] = useSearchParams();

  const status = searchParams.get('status');
  const filters = { status };

  return useSuspenseGetEntities<OfferResponse, Offer>({
    queryKey: 'offers',
    filters,
  });
}
