import type { Offer, OfferResponse } from '@/entities/offer';
import { useGetEntities } from '@/shared/model';

export function useGetOffers() {
  return useGetEntities<OfferResponse, Offer>({ queryKey: 'offers' });
}
