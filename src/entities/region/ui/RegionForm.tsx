import {
  useForm,
  type SubmitHandler,
  Controller,
  FormProvider,
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { MapPin } from 'lucide-react';

import { CitySelector } from '@/entities/city';
import type { Region } from '../model/regionTypes';
import {
  Field,
  FieldError,
  FieldLabel,
  FormActions,
  CardSectionHeader,
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from '@/shared/ui';
import { BilingualNameFields } from '@/shared/form';

type RegionFormProps = {
  onSubmit: SubmitHandler<Region>;
  defaultValues?: Partial<Region>;
  isLoading?: boolean;
  selected?: { id: number; name: string };
  onReset: () => void;
};

export function RegionForm({
  onSubmit,
  defaultValues,
  isLoading,
  selected,
  onReset,
}: RegionFormProps) {
  const methods = useForm<Region>({ defaultValues });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = methods;

  const { t } = useTranslation('translation', {
    keyPrefix: 'regionsPage.form',
  });

  const isEdit = !!defaultValues;

  return (
    <Card>
      <CardHeader>
        <CardSectionHeader
          icon={MapPin}
          title={t('info')}
          description={t('infoDescription')}
        />
      </CardHeader>
      <CardContent>
        <FormProvider {...methods}>
          <form
            id="regions-form"
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
          >
            <div className="space-y-5">
              <BilingualNameFields
                icon={MapPin}
                disabled={isLoading}
                i18nPrefix="regionsPage.form"
              />
            </div>
            {!isEdit && (
              <Field data-invalid={!!errors.city_id}>
                <FieldLabel asChild>
                  <p>{t('city')}</p>
                </FieldLabel>
                <Controller
                  name="city_id"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <CitySelector
                      isLoading={isLoading}
                      invalid={!!errors.city_id}
                      selected={selected}
                      value={field.value}
                      onValueChange={field.onChange}
                    />
                  )}
                />
                {errors.city_id && (
                  <FieldError>{t('errors.required')}</FieldError>
                )}
              </Field>
            )}
          </form>
        </FormProvider>
      </CardContent>
      <CardFooter>
        <FormActions
          form="regions-form"
          isEdit={!!defaultValues}
          isLoading={isLoading}
          onReset={onReset}
        />
      </CardFooter>
    </Card>
  );
}
