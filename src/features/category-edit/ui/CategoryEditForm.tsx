import { useState } from 'react';

import { useEditCategory } from '../model/useEditCategory';
import {
  CategoryForm,
  type Category,
  type CategoryListItem,
} from '@/entities/category';

type Props = { category: CategoryListItem };

export function CategoryEditForm({ category }: Props) {
  const [formKey, setFormKey] = useState(0);

  const { mutate, isPending } = useEditCategory(category.id);

  function handleSubmit(payload: Category) {
    mutate(payload, {
      onSuccess: () => setFormKey((prev) => prev + 1),
    });
  }

  const hasParent = !!category.parent_id;
  const parentData = hasParent
    ? { id: category.parent_id!, name: category.parent_name! }
    : undefined;

  return (
    <CategoryForm
      key={formKey}
      isLoading={isPending}
      onSubmit={handleSubmit}
      defaultValues={{ ...category, name: { ar: '', en: '' } }}
      parentData={parentData}
      onReset={() => setFormKey((prev) => prev + 1)}
    />
  );
}
