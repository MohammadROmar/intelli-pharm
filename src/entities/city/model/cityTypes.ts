export type City = {
  name: {
    ar: string;
    en: string;
  };
};

export type CityDetail = { id: number; name: string };

export type CitiesResponse = {
  data?: CityDetail[];
  meta: {
    current_page: number;
    per_page: number;
    to: number;
    total: number;
  };
};
