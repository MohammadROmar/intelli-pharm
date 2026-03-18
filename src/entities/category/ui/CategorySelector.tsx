import { useState } from 'react';
import { FolderTree } from 'lucide-react';

import { useInfiniteCategories } from '../model/useInfiniteCategories';
import type { CategoryListItem } from '../model/categoryTypes';
import {
  GenericSingleSelect,
  type GenericSingleSelectProps,
} from '@/shared/ui';

export function CategorySelector({
  value,
  onValueChange,
  invalid,
  isLoading,
}: Partial<GenericSingleSelectProps<CategoryListItem>>) {
  const [searchTerm, setSearchTerm] = useState('');

  const { categories, queryResult } = useInfiniteCategories(searchTerm);
  const { fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } =
    queryResult;

  return (
    <GenericSingleSelect
      disabled={isFetching || isLoading}
      invalid={invalid}
      options={categories}
      valueKey="id"
      labelKey="name"
      icon={FolderTree}
      value={value}
      onValueChange={onValueChange!}
      onSearchChange={setSearchTerm}
      onLoadMore={fetchNextPage}
      hasNextPage={hasNextPage}
      isLoading={isFetching}
      isFetchingNextPage={isFetchingNextPage}
    />
  );
}
