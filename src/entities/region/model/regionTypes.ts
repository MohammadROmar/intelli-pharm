import type { PaginatedResponse } from '@/shared/api';
import type { Localized } from '@/shared/lib';

export type Region = { name: { ar: string; en: string }; city_id: number };

export type RegionListItem = {
  id: number;
  name: string;
  city_id: number;
  city: City;
};

export type City = { id: number; name: string };

export type RegionPharmacy = {
  id: number;
  name: Localized;
  region: string;
  pharmacist_phone: string;
};

export type RegionDetail = Omit<RegionListItem, 'name'> & {
  name: Localized;
  pharmacies: RegionPharmacy[];
  city_id: number;
  city: { id: number; name: Localized };
};

export type RegionsListResponse = PaginatedResponse<RegionListItem>;

export type RegionFilters = { name?: string | null; city?: string | null };
