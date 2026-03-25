export interface MedicineFilters {
  name?: string;
  category?: string;
  min_price?: string;
  max_price?: string;
  imported?: '1' | '0' | string;
  laboratory?: string;
  alternative?: '1' | '0' | string;
  active?: '1' | '0' | string;
  alternative_for?: string;
}

export interface SelectOption {
  id: string;
  name: string;
}
