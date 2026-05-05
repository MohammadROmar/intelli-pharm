import type { PaginatedResponse } from '@/shared/api';
import type { Localized } from '@/shared/lib';

export type Laboratory = { name: { ar: string; en: string } };

export type LaboratoryListItem = { id: number; name: string };

export type LaboratoriesResponse = PaginatedResponse<LaboratoryListItem>;

export type LaboratoryMedicine = {
  id: number;
  category_id: number;
  commercial_name: Localized;
  price: string;
  is_imported: number;
  is_active: number;
  created_at: string;
  updated_at: string;
  laboratory_id: number;
};

export type LaboratoryDetail = {
  id: number;
  name: Localized;
  created_at: string;
  updated_at: string;
  medicines: LaboratoryMedicine[];
};
