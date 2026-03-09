export type Category = {
  name: string;
  parentId: number | null;
};

export type CategoryListItem = Category & {
  id: number;
  parentName: string | null;
};
