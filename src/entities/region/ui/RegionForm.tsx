import {
  useForm,
  type SubmitHandler,
  Controller,
  FormProvider,
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { MapPin } from 'lucide-react';

import type { Region } from '../model/regionTypes';
import { CitySelector } from '@/entities/city';
import type { Localized } from '@/shared/lib';
import { BilingualNameFields } from '@/shared/form';
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

type RegionFormProps = {
  onSubmit: SubmitHandler<Region>;
  name?: Localized;
  isLoading?: boolean;
  selected?: { id: number; name: string };
  onReset: () => void;
};

export function RegionForm({
  onSubmit,
  name,
  isLoading,
  selected,
  onReset,
}: RegionFormProps) {
  const methods = useForm<Region>({ defaultValues: { name } });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = methods;

  const { t } = useTranslation('translation', {
    keyPrefix: 'regionsPage.form',
  });

  const isEdit = !!name;

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
          isEdit={isEdit}
          isLoading={isLoading}
          onReset={onReset}
        />
      </CardFooter>
    </Card>
  );
}
