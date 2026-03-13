import {
  Controller,
  useFieldArray,
  useFormContext,
  useFormState,
} from 'react-hook-form';
import { Plus, Trash2, Warehouse } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import type { FormValues } from '../model/medicineTypes';
import { required, fRequired, positiveNumber } from '../utils/utils';
import { useFieldError } from '../model/useFieldError';
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
  FormSectionHeader,
  GenericSingleSelect,
  Input,
} from '@/shared/ui';

const WAREHOUSES = [
  { id: '1', name: 'Main Warehouse' },
  { id: '2', name: 'Branch A' },
  { id: '3', name: 'Branch B' },
];
export function StockEntriesCard() {
  const { register, control, getFieldState } = useFormContext<FormValues>();
  const formState = useFormState<FormValues>({
    name: 'stocks',
  });

  const { t } = useTranslation('translation', {
    keyPrefix: 'medicinesPage.form',
  });

  const { te } = useFieldError('medicinesPage.form');

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'stocks',
  });

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{t('stockEntriesTitle')}</CardTitle>
            <CardDescription>{t('stockEntriesSubtitle')}</CardDescription>
          </div>
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="text-primary"
            onClick={() =>
              append(
                { warehouse_id: '', quantity: '', expiry_date: '' },
                { shouldFocus: false },
              )
            }
          >
            <Plus className="h-4 w-4" />
            {t('addStock')}
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <FormSectionHeader
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
                  rules={{ validate: fRequired() }}
                  render={({ field: f }) => (
                    <Field data-invalid={warehouseState.invalid}>
                      <FieldLabel asChild className="text-xs">
                        <p>{t('warehouse')}</p>
                      </FieldLabel>
                      <GenericSingleSelect
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
                    {...register(`stocks.${index}.quantity`, {
                      validate: {
                        required: required(),
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
                    aria-invalid={expiryState.invalid}
                    className="text-sm"
                    {...register(`stocks.${index}.expiry_date`, {
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
