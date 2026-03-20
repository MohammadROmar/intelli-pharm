import { useForm, type SubmitHandler, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Tag, Tags } from 'lucide-react';

import { CategorySelector } from './CategorySelector';
import type { Category, CategoryListItem } from '../model/categoryTypes';
import {
  Input,
  Field,
  FieldError,
  FieldLabel,
  FormActions,
  FormSectionHeader,
} from '@/shared/ui';

type CategoryFormProps = {
  onSubmit: SubmitHandler<Category>;
  defaultValues?: Partial<CategoryListItem>;
  isLoading?: boolean;
  onReset: () => void;
};

export function CategoryForm({
  onSubmit,
  defaultValues,
  isLoading,
  onReset,
}: CategoryFormProps) {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Category>({ defaultValues });

  const { t } = useTranslation();

  return (
    <>
      <FormSectionHeader
        icon={Tags}
        title={t('categoriesPage.categoryInfo')}
        description={t('categoriesPage.categoryInfoDescription')}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <Field data-invalid={!!errors.name}>
          <FieldLabel htmlFor="name">
            {t('form.fields.categoryName')}
          </FieldLabel>
          <Input
            id="name"
            type="text"
            autoComplete="off"
            icon={Tag}
            placeholder={t('categoriesPage.categoryNamePlaceholder')}
            {...register('name', {
              required: true,
              disabled: isLoading,
              validate: (value) => value && value.trim() !== '',
            })}
          />
          {errors.name && <FieldError>{t('form.errors.required')}</FieldError>}
        </Field>
        <Field data-invalid={!!errors.parent_id}>
          <FieldLabel asChild>
            <p>{t('form.fields.categoryParent')}</p>
          </FieldLabel>
          <Controller
            name="parent_id"
            control={control}
            render={({ field }) => (
              <CategorySelector
                isLoading={isLoading}
                invalid={!!errors.parent_id}
                value={field.value}
                onValueChange={field.onChange}
              />
            )}
          />
        </Field>
        <FormActions
          isEdit={!!defaultValues}
          isLoading={isLoading}
          onReset={onReset}
        />
      </form>
    </>
  );
}
