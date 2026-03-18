import { useState } from 'react';

import { CategoryForm, type Category } from '@/entities/category';
import { useCreateCategory } from '../model/useCreateCategory';

export function CategoryCreateForm() {
  const [formKey, setFormKey] = useState(0);

  const { mutate, isPending } = useCreateCategory();

  function handleSubmit(payload: Category) {
    mutate(payload, {
      onSuccess: () => {
        setFormKey((prev) => prev + 1);
      },
    });
  }

  return (
    <CategoryForm
      key={formKey}
      isLoading={isPending}
      onSubmit={handleSubmit}
      onReset={() => setFormKey((prev) => prev + 1)}
    />
  );
}
