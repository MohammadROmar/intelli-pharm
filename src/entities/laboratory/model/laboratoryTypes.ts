export type Laboratory = {
  name: string;
};

export type LaboratoryListItem = {
  id: number;
  created_at: string;
  updated_at: string;
} & Laboratory;

export type LaboratoriesResponse = {
  data?: LaboratoryListItem[];
  current_page: number;
  per_page: number;
  to: number;
  total: number;
};

export type LaboratoryMedicine = {
  id: number;
  category_id: number;
  name: string;
  price: string;
  is_imported: number;
  is_active: number;
  created_at: string;
  updated_at: string;
  laboratory_id: number;
};

export type LaboratoryDetail = {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  medicines: LaboratoryMedicine[];
};
