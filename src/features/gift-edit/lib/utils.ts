import type { Gift, GiftPayload } from '@/entities/gift';

export function giftToPayload(gift: Gift): GiftPayload {
  return {
    medicine_id: gift.medicine.id,
    gift_quantity: gift.gift_quantity.toString(),
    required_quantity: gift.required_quantity.toString(),
  };
}
