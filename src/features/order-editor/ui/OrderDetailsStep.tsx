import { useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Boxes, Cross, FileText, MoveRight } from 'lucide-react';

import { PharmacySelector } from '@/entities/pharmacy';
import { required } from '@/shared/form';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardSectionHeader,
  Field,
  FieldLabel,
  GenericSingleSelect,
  Textarea,
} from '@/shared/ui';

import { ORDER_WAREHOUSES } from '../config/warehouses';
import {
  useOrderEditorActions,
  useOrderEditorState,
} from '../model/orderEditorContextValue';
import type { OrderEditorDetails } from '../model/orderEditorTypes';

export function OrderDetailsStep() {
  const { t } = useTranslation('order-form', { keyPrefix: 'details' });
  const state = useOrderEditorState();
  const actions = useOrderEditorActions();
  const warehouseOptions = useMemo(
    () =>
      ORDER_WAREHOUSES.map((warehouse) => ({
        id: warehouse.id,
        name: t('mainWarehouse'),
      })),
    [t],
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<OrderEditorDetails>({
    defaultValues: state.details,
    mode: 'onTouched',
  });

  const onSubmit = handleSubmit(() => actions.setStep('medicines'));

  return (
    <Card>
      <CardHeader>
        <CardSectionHeader
          title={t('title')}
          description={t('subtitle')}
          icon={FileText}
        />
      </CardHeader>

      <CardContent>
        <form onSubmit={onSubmit} noValidate className="space-y-6">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Controller
              name="pharmacyId"
              control={control}
              rules={{ validate: required() }}
              render={({ field }) => (
                <Field data-invalid={Boolean(errors.pharmacyId)}>
                  <FieldLabel>{t('pharmacy')}</FieldLabel>
                  <PharmacySelector
                    defaultValue={state.details.pharmacy ?? undefined}
                    value={field.value}
                    invalid={Boolean(errors.pharmacyId)}
                    placeholder={t('pharmacyPlaceholder')}
                    onValueChange={(value) => {
                      field.onChange(value === null ? null : Number(value));
                    }}
                    onOptionChange={(pharmacy) => {
                      actions.setPharmacy(pharmacy?.id ?? null, pharmacy);
                    }}
                  />
                  {errors.pharmacyId?.message ? (
                    <p className="text-destructive text-xs" role="alert">
                      {t(`validation.${errors.pharmacyId.message}`)}
                    </p>
                  ) : null}
                </Field>
              )}
            />

            <Controller
              name="warehouseId"
              control={control}
              rules={{ validate: required() }}
              render={({ field }) => (
                <Field data-invalid={Boolean(errors.warehouseId)}>
                  <FieldLabel>{t('warehouse')}</FieldLabel>
                  <GenericSingleSelect
                    disabled
                    icon={Boxes}
                    options={warehouseOptions}
                    valueKey="id"
                    labelKey="name"
                    value={field.value}
                    invalid={Boolean(errors.warehouseId)}
                    hasMoreLabel={false}
                    onValueChange={(value) => {
                      const warehouseId = String(value ?? '');
                      field.onChange(warehouseId);
                      actions.setWarehouse(warehouseId);
                    }}
                  />
                  <p className="text-muted-foreground text-xs">
                    {t('warehouseHint')}
                  </p>
                </Field>
              )}
            />
          </div>

          <Controller
            name="notes"
            control={control}
            render={({ field }) => (
              <Field>
                <FieldLabel htmlFor="order-notes">{t('notes')}</FieldLabel>
                <Textarea
                  {...field}
                  id="order-notes"
                  rows={4}
                  placeholder={t('notesPlaceholder')}
                  onChange={(event) => {
                    field.onChange(event);
                    actions.setNotes(event.target.value);
                  }}
                />
                <p className="text-muted-foreground flex items-center gap-1.5 text-xs">
                  <Cross className="size-3.5" aria-hidden="true" />
                  {t('notesHint')}
                </p>
              </Field>
            )}
          />

          <div className="flex justify-end border-t pt-5">
            <Button type="submit" className="gap-2">
              {t('continue')}
              <MoveRight className="size-4 rtl:rotate-180" aria-hidden="true" />
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
