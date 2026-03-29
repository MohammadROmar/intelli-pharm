export type Region = { name: string; city_id: number };

export type RegionListItem = { id: number } & Region;

type City = { id: number; name: string };

export type RegionPharmacy = {
  id: number;
  name: string;
  region: string;
  pharmacist_phone: string;
};

export type RegionDetail = {
  pharmacies: RegionPharmacy[];
  city_id: number;
  city: City;
} & RegionListItem;

export type RegionsListResponse = {
  data: RegionListItem[];
  meta: {
    current_page: number;
    per_page: number;
    to: number;
    total: number;
  };
};

export type RegionFilters = {
  name?: string | null;
  city?: string | null;
};
