import type { PaginatedResponse } from '@/shared/api';
import type { Localized } from '@/shared/lib';

export type CategoryDto = {
  name: { ar: string; en: string };
  parent_id: number | null;
};

type BaseCategory = {
  id: number;
  parent_name: string | null;
  parent_id: number | null;
  created_at: string;
  updated_at: string;
};

export type CategoryDetail = BaseCategory & {
  name: Localized;
  children: CategoryChild[];
};

export type CategoryListItem = BaseCategory & { name: string };

export type CategoryListResponse = PaginatedResponse<CategoryListItem>;

export type CategoryFilters = {
  name?: string | null;
  parent_id?: string | null;
};

export type CategoryChild = {
  id: number;
  name: Localized;
  parent_id: number;
  parent_name: string;
  created_at: string | null;
  updated_at: string | null;
};
