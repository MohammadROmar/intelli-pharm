import type { CategoryListItem } from './categoryTypes';

export const dummyCategories: CategoryListItem[] = [
  {
    id: 1,
    name: 'Electronics',
    parentId: null,
    parentName: null,
  },
  {
    id: 2,
    name: 'Smartphones',
    parentId: 1,
    parentName: 'Electronics',
  },
  {
    id: 3,
    name: 'Laptops',
    parentId: 1,
    parentName: 'Electronics',
  },
  {
    id: 4,
    name: 'Clothing',
    parentId: null,
    parentName: null,
  },
  {
    id: 5,
    name: "Men's Clothing",
    parentId: 4,
    parentName: 'Clothing',
  },
  {
    id: 6,
    name: "Women's Clothing",
    parentId: 4,
    parentName: 'Clothing',
  },
  {
    id: 7,
    name: 'Books',
    parentId: null,
    parentName: null,
  },
  {
    id: 8,
    name: 'Fiction',
    parentId: 7,
    parentName: 'Books',
  },
  {
    id: 9,
    name: 'Home & Kitchen',
    parentId: null,
    parentName: null,
  },
  {
    id: 10,
    name: 'Furniture',
    parentId: 9,
    parentName: 'Home & Kitchen',
  },
];
