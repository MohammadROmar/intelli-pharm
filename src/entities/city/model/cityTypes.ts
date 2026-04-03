export type City = {
  name: string;
};

export type CityDetail = { id: number } & City;

export type CitiesResponse = {
  data?: CityDetail[];
  meta: {
    current_page: number;
    per_page: number;
    to: number;
    total: number;
  };
};
