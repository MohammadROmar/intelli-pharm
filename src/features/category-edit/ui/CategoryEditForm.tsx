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

  const { mutate, isPending } = useEditCategory();

  function handleSubmit(payload: Category) {
    const data = { id: category.id, payload };

    mutate(data, {
      onSuccess: () => setFormKey((prev) => prev + 1),
    });
  }

  return (
    <CategoryForm
      key={formKey}
      isLoading={isPending}
      onSubmit={handleSubmit}
      defaultValues={category}
      onReset={() => setFormKey((prev) => prev + 1)}
    />
  );
}
