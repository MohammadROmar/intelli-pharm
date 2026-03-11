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
          <FieldLabel asChild>
            <p>{t('form.fields.categoryParent')}</p>
          </FieldLabel>
          <Controller
            name="parentId"
            control={control}
            render={({ field }) => (
              <GenericSingleSelect
                options={dummyCategories}
                valueKey="id"
                labelKey="name"
                value={field.value}
                onValueChange={field.onChange}
              />
            )}
          />
        </Field>
        <Field>
          <div className="flex w-full flex-col-reverse gap-2 lg:flex-row lg:items-end lg:justify-end">
            <Button
              type="button"
              variant="secondary"
              disabled={isLoading}
              onClick={() => reset()}
            >
              {t('form.actions.reset')}
            </Button>
            <Button type="submit" isLoading={isLoading} disabled={isLoading}>
              {t(`form.actions.${defaultValues ? 'edit' : 'create'}`)}
            </Button>
          </div>
        </Field>
      </FieldGroup>
    </form>
  );
}
