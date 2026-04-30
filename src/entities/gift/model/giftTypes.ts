export type Gift = {
  id: number;
  medicine_id: number;
  gift_quantity: number;
  required_quantity: number;
  active: 0 | 1;
  created_at: string;
  updated_at: string;
  medicine: {
    id: 1;
    commercial_name: { ar: string; en: string };
  };
};

export type GiftPayload = {
  medicine_id: number;
  required_quantity: string;
  gift_quantity: string;
};

export type GiftResponse = {
  data: Gift[];
  current_page: number;
  per_page: number;
  to: number;
  total: number;
};
