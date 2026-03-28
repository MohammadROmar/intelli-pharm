import {
  Controller,
  useFieldArray,
  useFormContext,
  useFormState,
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Calendar, Package, Plus, Trash2, Warehouse } from 'lucide-react';

import {
  useMedicineFieldError,
  type MedicineFormData,
} from '@/entities/medicine';
import { required, fRequired, positiveNumber } from '@/shared/lib';
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Field,
  FieldError,
  FieldLabel,
  CardSectionHeader,
  GenericSingleSelect,
  Input,
} from '@/shared/ui';

const WAREHOUSES = [{ id: '1', name: 'Main Warehouse' }];

export function StockEntriesCard({ isPending }: { isPending?: boolean }) {
  const { register, control, getFieldState } =
    useFormContext<MedicineFormData>();
  const formState = useFormState<MedicineFormData>({
    name: 'stocks',
  });

  const { t } = useTranslation('translation', {
    keyPrefix: 'medicinesPage.form',
  });

  const { te } = useMedicineFieldError('medicinesPage.form');

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'stocks',
  });

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <CardTitle>{t('stockEntriesTitle')}</CardTitle>
            <CardDescription>{t('stockEntriesSubtitle')}</CardDescription>
          </div>
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="text-primary"
            disabled={isPending}
            onClick={() =>
              append(
                { warehouse_id: '', quantity: '', expiry_date: '' },
                { shouldFocus: false },
              )
            }
          >
            <Plus className="size-4" />
            {t('addStock')}
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <CardSectionHeader
          icon={Warehouse}
          title={t('warehouseStock')}
          description={t('warehouseStockSubtitle')}
        />

        {fields.map((field, index) => {
          const warehouseState = getFieldState(
            `stocks.${index}.warehouse_id`,
            formState,
          );
          const quantityState = getFieldState(
            `stocks.${index}.quantity`,
            formState,
          );
          const expiryState = getFieldState(
            `stocks.${index}.expiry_date`,
            formState,
          );

          return (
            <div
              key={field.id}
              className="border-border bg-muted/20 relative rounded-lg border p-4"
            >
              <div className="mb-3 flex items-center justify-between">
                <Badge
                  variant="secondary"
                  className="bg-primary/10 text-primary rounded-md text-xs"
                >
                  {t('stock')} #{index + 1}
                </Badge>

                {fields.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    type="button"
                    onClick={() => remove(index)}
                    className="text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
                  >
                    <Trash2 />
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <Controller
                  name={`stocks.${index}.warehouse_id`}
                  control={control}
                  rules={{ validate: required() }}
                  render={({ field: f }) => (
                    <Field data-invalid={warehouseState.invalid}>
                      <FieldLabel asChild className="text-xs">
                        <p>{t('warehouse')}</p>
                      </FieldLabel>
                      <GenericSingleSelect
                        icon={Warehouse}
                        disabled={isPending}
                        invalid={warehouseState.invalid}
                        options={WAREHOUSES}
                        valueKey="id"
                        labelKey="name"
                        value={f.value}
                        onValueChange={f.onChange}
                      />
                      <FieldError
                        errors={te(warehouseState.error, 'warehouse')}
                      />
                    </Field>
                  )}
                />

                <Field data-invalid={quantityState.invalid}>
                  <FieldLabel htmlFor={`quantity-${index}`} className="text-xs">
                    {t('quantity')}
                  </FieldLabel>
                  <Input
                    id={`quantity-${index}`}
                    type="number"
                    min="1"
                    placeholder="100"
                    aria-invalid={quantityState.invalid}
                    className="text-sm"
                    icon={Package}
                    {...register(`stocks.${index}.quantity`, {
                      disabled: isPending,
                      validate: {
                        required: fRequired(),
                        positive: positiveNumber(),
                      },
                    })}
                  />
                  <FieldError errors={te(quantityState.error, 'quantity')} />
                </Field>

                <Field data-invalid={expiryState.invalid}>
                  <FieldLabel htmlFor={`expiry-${index}`} className="text-xs">
                    {t('expiryDate')}
                  </FieldLabel>
                  <Input
                    id={`expiry-${index}`}
                    type="date"
                    icon={Calendar}
                    aria-invalid={expiryState.invalid}
                    className="text-sm"
                    {...register(`stocks.${index}.expiry_date`, {
                      disabled: isPending,
                      validate: { required: required() },
                    })}
                  />
                  <FieldError errors={te(expiryState.error, 'expiryDate')} />
                </Field>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
