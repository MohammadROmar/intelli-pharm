import { useForm, type SubmitHandler, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import type { Category, CategoryListItem } from '../model/categoryTypes';
import {
  Input,
  Field,
  Button,
  FieldError,
  FieldGroup,
  FieldLabel,
  GenericSingleSelect,
} from '@/shared/ui';
import { dummyCategories } from '../model/dummyCategories';

type CategoryFormProps = {
  onSubmit: SubmitHandler<Category>;
  defaultValues?: Partial<CategoryListItem>;
  isLoading?: boolean;
};

export function CategoryForm({
  onSubmit,
  defaultValues,
  isLoading,
}: CategoryFormProps) {
  const {
    reset,
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Category>({ defaultValues });

  const { t } = useTranslation();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        <Field data-invalid={!!errors.name}>
          <FieldLabel htmlFor="name">
            {t('form.fields.categoryName')}
          </FieldLabel>
          <Input
            id="name"
            type="text"
            autoComplete="off"
            {...register('name', {
              required: true,
              disabled: isLoading,
              validate: (value) => value && value.trim() !== '',
            })}
          />
          {errors.name && <FieldError>{t('form.errors.required')}</FieldError>}
        </Field>
        <Field data-invalid={!!errors.parentId}>
          <FieldLabel htmlFor="parent">
            {t('form.fields.categoryParent')}
          </FieldLabel>
          <Controller
            name="parentId"
            control={control}
            render={({ field }) => (
              <GenericSingleSelect
                options={dummyCategories}
                labelKey="name"
                valueKey="id"
                value={field.value}
                onValueChange={field.onChange}
                noMoreResultsText={t('asyncSelect.noMoreResults')}
                noResultsText={t('asyncSelect.noResultsFound')}
                searchBarPlaceholder={t('asyncSelect.search')}
                placeholder={t('asyncSelect.placeholder')}
              />
            )}
          />
        </Field>
        <Field>
          <div className="flex w-full flex-col-reverse gap-2 lg:flex-row lg:items-end lg:justify-end">
            <Button type="button" variant="secondary" onClick={() => reset()}>
              {t('form.actions.reset')}
            </Button>
            <Button type="submit">
              {t(`form.actions.${defaultValues ? 'edit' : 'create'}`)}
            </Button>
          </div>
        </Field>
      </FieldGroup>
    </form>
  );
}
