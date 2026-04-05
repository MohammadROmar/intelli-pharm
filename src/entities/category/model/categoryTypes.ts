export type Category = {
  name: { ar: string; en: string };
  parent_id: number | null;
};

export type CategoryListItem = Omit<Category, 'name'> & {
  id: number;
  name: string;
  parent_name: string | null;
  created_at: string;
  updated_at: string;
};

export type CategoryListResponse = {
  data: CategoryListItem[];
  meta: {
    current_page: number;
    per_page: number;
    to: number;
    total: number;
  };
};

export type CategoryFilters = {
  name?: string | null;
  parent_id?: string | null;
};

export type CategoryChild = {
  id: number;
  name: string;
  parent_id: number;
  parent_name: string;
  created_at: string | null;
  updated_at: string | null;
};

export type CategoryDetail = {
  id: number;
  name: string;
  parent_id: number | null;
  parent_name: string | null;
  children: CategoryChild[];
  created_at: string;
  updated_at: string;
};
