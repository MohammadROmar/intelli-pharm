import type { PaginatedResponse } from '@/shared/api';
import type { Localized } from '@/shared/lib';

export type StockEntry = {
  warehouse_id: string;
  quantity: string;
  expiry_date: string;
};

export type FormValues = {
  name: Localized;
  category_id: number;
  scientific_name: string;
  price: string;
  note: string;
  is_imported: boolean;
  is_active: boolean;
  is_alternative: boolean;
  laboratory_id: number;
  barcode?: string;
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
  commercial_name: string;
  price: string;
  is_imported: boolean;
  is_active: boolean;
  note: string;
  images: string[];
};

type BaseMedicine = {
  id: number;
  category_id: number;
  price: string;
  is_imported: boolean;
  is_active: boolean;
  available_quantity: number;
  barcode?: string;
  in_stock: boolean;
  created_at: string;
  updated_at: string;
  images: string[];
  scientific_name: string;
  note?: string;
  category: MedicineCategory;
  laboratory: { id: number; name: string };
  stocks: MedicineStock[];
  alternatives: AlternativeMedicine[];
  alternative_for: AlternativeMedicine[];
};

export type Medicine = BaseMedicine & { commercial_name: string };
export type MedicineDetail = BaseMedicine & { commercial_name: Localized };

export type MedicineResponse = PaginatedResponse<Medicine>;

export type MedicineFormData = { values: FormValues; images: ImageFile[] };

export type BooleanFilter = '1' | '0' | undefined;

export type MedicineFilters = {
  name?: string;
  scientific_name?: string;
  category?: string;
  min_price?: string;
  max_price?: string;
  imported?: BooleanFilter;
  laboratory?: string;
  active?: BooleanFilter;
  alternative_for?: string;
};

export type BarcodeScanResult = {
  id: number;
  category_id: number;
  commercial_name: string;
  price: string;
  is_imported: boolean;
  is_active: boolean;
  available_quantity: number;
  in_stock: boolean;
  barcode: string;
  created_at: string;
  updated_at: string;
};
