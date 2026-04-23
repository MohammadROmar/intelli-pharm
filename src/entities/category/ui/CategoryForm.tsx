import {
  useForm,
  type SubmitHandler,
  Controller,
  FormProvider,
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Folder, Folders } from 'lucide-react';

import { CategorySelector } from './CategorySelector';
import type { Category } from '../model/categoryTypes';
import {
  Field,
  FieldLabel,
  FormActions,
  CardSectionHeader,
  CardHeader,
  Card,
  CardContent,
  CardFooter,
} from '@/shared/ui';
import { BilingualNameFields } from '@/shared/form';

type CategoryFormProps = {
  onSubmit: SubmitHandler<Category>;
  defaultValues?: Partial<Category>;
  isLoading?: boolean;
  parentData?: { id: number; name: string };
  onReset: () => void;
};

export function CategoryForm({
  onSubmit,
  defaultValues,
  isLoading,
  parentData,
  onReset,
}: CategoryFormProps) {
  const methods = useForm<Category>({ defaultValues });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = methods;

  const { t } = useTranslation();

  return (
    <Card>
      <CardHeader>
        <CardSectionHeader
          icon={Folders}
          title={t('categoriesPage.categoryInfo')}
          description={t('categoriesPage.categoryInfoDescription')}
        />
      </CardHeader>

      <CardContent>
        <FormProvider {...methods}>
          <form
            id="category-form"
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
          >
            <BilingualNameFields
              icon={Folder}
              disabled={isLoading}
              i18nPrefix="categoriesPage.form"
            />
            <Field data-invalid={!!errors.parent_id}>
              <FieldLabel asChild>
                <p>
                  {t('form.fields.categoryParent')}{' '}
                  <span className="text-muted-foreground text-xs font-normal">
                    ({t('form.fields.optional')})
                  </span>
                </p>
              </FieldLabel>
              <Controller
                name="parent_id"
                control={control}
                render={({ field }) => (
                  <CategorySelector
                    isLoading={isLoading}
                    invalid={!!errors.parent_id}
                    parent={parentData}
                    value={field.value}
                    onValueChange={field.onChange}
                  />
                )}
              />
            </Field>
          </form>
        </FormProvider>
      </CardContent>
      <CardFooter>
        <FormActions
          form="category-form"
          isEdit={!!defaultValues}
          isLoading={isLoading}
          onReset={onReset}
        />
      </CardFooter>
    </Card>
  );
}
