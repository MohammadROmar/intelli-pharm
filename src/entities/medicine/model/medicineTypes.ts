export type StockEntry = {
  warehouse_id: string;
  quantity: string;
  expiry_date: string;
};

export type FormValues = {
  name: string;
  category_id: string;
  price: string;
  note: string;
  is_imported: boolean;
  is_active: boolean;
  is_alternative: boolean;
  stocks: StockEntry[];
  is_alternative_to_id: string | null;
  imagesCount: number;
};

export type ImageFile = {
  id: string;
  file: File;
  preview: string;
};

export type Medicine = {
  id: number;
  category_id: number;
  name: string;
  price: string;
  is_imported: boolean;
  is_active: boolean;
  note?: string;
  created_at: string;
  updated_at: string;
  category: { id: number; name: string };
  alternatives: Medicine[];
  images: string[];
};

export type MedicineResponse = {
  data: Medicine[];
  meta: {
    current_page: number;
    per_page: number;
    to: number;
    total: number;
  };
};
