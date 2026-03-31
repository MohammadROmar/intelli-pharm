export type Pharmacy = {
  name: string;
  latitude: number;
  longitude: number;
  region_id: number;
  region: string;
  is_active: boolean;
  opening_time: string;
  closing_time: string;
  pharmacist_name: string;
  pharmacist_phone: string;
  pharmacist_alt_phone?: string;
};

export type PharmacyDetail = { id: number; region: string } & Pharmacy;

export type PharmacyFilters = {
  name?: string | null;
  region?: string | null;
  pharmacist_name?: string | null;
  pharmacist_phone?: string | null;
  pharmacist_alt_phone?: string | null;
};

export type PharmaciesResponse = {
  data: PharmacyDetail[];
  meta: {
    current_page: number;
    per_page: number;
    to: number;
    total: number;
  };
};
