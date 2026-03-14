export interface AlternativePivot {
  medicine_id: number;
  alternative_id: number;
  note: string;
}

export interface Alternative {
  id: number;
  name: string;
  price: string;
  is_imported: number;
  pivot: AlternativePivot;
}

export interface MedicineCategory {
  id: number;
  name: string;
}

export interface MedicineDetail {
  id: number;
  category_id: number;
  name: string;
  price: string;
  is_imported: number;
  is_active: number;
  created_at: string;
  updated_at: string;
  category: MedicineCategory;
  alternatives: Alternative[];
  images?: string[];
}
