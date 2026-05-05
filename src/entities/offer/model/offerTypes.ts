import type { PaginatedResponse } from '@/shared/api';

type BaseOffer = {
  id: number;
  required_amount: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type PercentageOffer = BaseOffer & {
  type: 'percentage';
  percentage: string;
  medicine: null;
};

export type GiftsOffer = BaseOffer & {
  type: 'gifts';
  medicine_id: number;
  quantity: number;
  medicine: {
    id: number;
    commercial_name: string;
  };
};

export type Offer = PercentageOffer | GiftsOffer;

export type CreatePercentageOfferDto = {
  type: 'percentage';
  required_amount: number;
  percentage: number;
  is_active: boolean;
};

export type CreateGiftsOfferDto = {
  type: 'gifts';
  required_amount: number;
  medicine_id: number;
  quantity: number;
  is_active: boolean;
};

export type CreateOfferDto = CreatePercentageOfferDto | CreateGiftsOfferDto;

export type OfferResponse = PaginatedResponse<Offer>;

export type EditOfferDto = {
  required_amount: string;
  is_active: boolean;
};
