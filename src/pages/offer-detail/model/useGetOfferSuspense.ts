import type { Offer } from '@/entities/offer';
import { useSuspenseGetEntityById } from '@/shared/model';

export function useGetOfferSuspense(id: number) {
  return useSuspenseGetEntityById<Offer>({
    id,
    queryKey: 'offers',
    endpoint: '/erp/v1/offers',
  });
}
