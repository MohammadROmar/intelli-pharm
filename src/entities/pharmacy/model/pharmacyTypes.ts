import type { PaginatedResponse } from '@/shared/api';
import type { Localized } from '@/shared/lib';

type BasePharmacy = {
  latitude: number;
  longitude: number;
  region_id: number;
  is_active: boolean;
  opening_time: string;
  closing_time: string;
  pharmacist_name: string;
  pharmacist_phone: string;
  pharmacist_alt_phone?: string;
};

type BasePharmacyDetail = BasePharmacy & {
  id: number;
  region: string;
  history_notes: HistoryNote[];
};

export type Pharmacy = BasePharmacyDetail & { name: string };

export type HistoryNote = {
  id: number;
  notes: string;
  user_name: string;
  visited_at: string;
};

export type PharmacyDetail = BasePharmacyDetail & {
  name: Localized;
};

export type PharmacyFilters = {
  name?: string | null;
  region?: string | null;
  pharmacist_name?: string | null;
  pharmacist_phone?: string | null;
  pharmacist_alt_phone?: string | null;
};

export type PharmaciesResponse = PaginatedResponse<Pharmacy>;
