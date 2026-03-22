export type Category = {
  name: string;
  parent_id: number | null;
};

export type CategoryListItem = Category & {
  id: number;
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
