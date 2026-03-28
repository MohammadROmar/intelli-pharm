import { Controller, useFormContext, useFormState } from 'react-hook-form';
import { Calendar, Package, Trash2, Warehouse } from 'lucide-react';

import { required, fRequired, positiveNumber } from '@/shared/lib';
import {
  Badge,
  Button,
  Field,
  FieldError,
  FieldLabel,
  GenericSingleSelect,
  Input,
} from '@/shared/ui';
import type { RestockFormValues } from '../model/restockTypes';
import { useTranslation } from 'react-i18next';

type StockRowCardProps = {
  index: number;
  canRemove: boolean;
  onRemove: () => void;
  isPending: boolean;
};

const WAREHOUSES = [{ id: '1', name: 'Main Warehouse' }];

export function StockRowCard({
  index,
  canRemove,
  onRemove,
  isPending,
}: StockRowCardProps) {
  const { register, control, getFieldState } =
    useFormContext<RestockFormValues>();

  const formState = useFormState<RestockFormValues>({
    name: [
      `stocks.${index}.warehouse_id`,
      `stocks.${index}.quantity`,
      `stocks.${index}.expiry_date`,
    ],
  });

  const { t } = useTranslation('translation', {
    keyPrefix: 'medicinesPage.restock',
  });

  const warehouseState = getFieldState(
    `stocks.${index}.warehouse_id`,
    formState,
  );
  const quantityState = getFieldState(`stocks.${index}.quantity`, formState);
  const expiryState = getFieldState(`stocks.${index}.expiry_date`, formState);

  return (
    <div className="border-border bg-muted/20 rounded-lg border p-4">
      <div className="mb-4 flex items-center justify-between">
        <Badge
          variant="secondary"
          className="bg-primary/10 text-primary rounded-md text-xs"
        >
          {t('stockLabel')} #{index + 1}
        </Badge>
        {canRemove && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onRemove}
            disabled={isPending}
            className="text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
          >
            <Trash2 className="size-4" />
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
              {warehouseState.invalid && (
                <FieldError>
                  {t(warehouseState.error!.message!, { field: t('warehouse') })}
                </FieldError>
              )}
            </Field>
          )}
        />

        <Field data-invalid={quantityState.invalid}>
          <FieldLabel htmlFor={`qty-${index}`} className="text-xs">
            {t('quantity')}
          </FieldLabel>
          <Input
            id={`qty-${index}`}
            type="number"
            min="1"
            step="1"
            placeholder="100"
            icon={Package}
            aria-invalid={quantityState.invalid}
            {...register(`stocks.${index}.quantity`, {
              disabled: isPending,
              validate: {
                required: fRequired(),
                positive: positiveNumber(),
              },
            })}
          />
          {quantityState.invalid && (
            <FieldError>
              {t(quantityState.error!.message!, { field: t('quantity') })}
            </FieldError>
          )}
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
            {...register(`stocks.${index}.expiry_date`, {
              disabled: isPending,
              validate: { required: required() },
            })}
          />
          {expiryState.invalid && (
            <FieldError>
              {t(expiryState.error!.message!, { field: t('expiryDate') })}
            </FieldError>
          )}
        </Field>
      </div>
    </div>
  );
}
