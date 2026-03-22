export type StockEntry = {
  warehouse_id: string;
  quantity: string;
  expiry_date: string;
};

export type FormValues = {
  name: string;
  category_id: number;
  price: string;
  note: string;
  is_imported: boolean;
  is_active: boolean;
  is_alternative: boolean;
  stocks: StockEntry[];
  is_alternative_to_id: number | null;
  imagesCount: number;
};

export type ImageFile = {
  id: string;
  file: File;
  preview: string;
};

export type MedicineCategory = {
  id: number;
  name: string;
};

export type MedicineStock = {
  id: number;
  warehouse_id: number;
  quantity: number;
  expiry_date: string;
};

export type AlternativeMedicine = {
  id: number;
  category_id: number | null;
  name: string;
  price: string;
  is_imported: boolean;
  is_active: boolean;
  note: string;
  images: string[];
};

export type Medicine = {
  id: number;
  category_id: number;
  name: string;
  price: string;
  is_imported: boolean;
  is_active: boolean;
  available_quantity: number;
  in_stock: boolean;
  created_at: string;
  updated_at: string;
  images: string[];
  note?: string;
  category: MedicineCategory;
  laboratory: null | { id: number; name: string };
  stocks: MedicineStock[];
  alternatives: AlternativeMedicine[];
  alternative_for: AlternativeMedicine[];
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

export type MedicineFormData = { values: FormValues; images: ImageFile[] };
