import type { PaginatedResponse } from '@/shared/api';

export type City = { name: { ar: string; en: string } };

export type CityDetail = City & { id: number };

export type CitiesResponse = PaginatedResponse<CityDetail>;
