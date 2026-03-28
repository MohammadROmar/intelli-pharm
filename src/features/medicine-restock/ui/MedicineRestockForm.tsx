import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Plus, Warehouse } from 'lucide-react';

import { StockRowCard } from './StockRowCard';
import { toPayload } from '../lib/utils';
import type { RestockFormValues, RestockPayload } from '../model/restockTypes';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CardSectionHeader,
} from '@/shared/ui';

type StockRow = {
  warehouse_id: string;
  quantity: string;
  expiry_date: string;
};

const DEFAULT_ROW: StockRow = {
  warehouse_id: '',
  quantity: '',
  expiry_date: '',
};

type MedicineRestockFormProps = {
  isPending?: boolean;
  onSubmit: (payload: RestockPayload) => void;
  onCancel?: () => void;
};

export function MedicineRestockForm({
  isPending = false,
  onSubmit,
  onCancel,
}: MedicineRestockFormProps) {
  const { t } = useTranslation('translation', {
    keyPrefix: 'medicinesPage.restock',
  });

  const methods = useForm<RestockFormValues>({
    defaultValues: { stocks: [DEFAULT_ROW] },
    mode: 'onTouched',
  });

  const { fields, append, remove } = useFieldArray({
    control: methods.control,
    name: 'stocks',
  });

  function handleSubmit(values: RestockFormValues) {
    onSubmit(toPayload(values));
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(handleSubmit)}
        noValidate
        className="space-y-6"
      >
        <Card>
          <CardHeader>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="space-y-1">
                <CardTitle>{t('title')}</CardTitle>
                <CardDescription>{t('subtitle')}</CardDescription>
              </div>
              <Button
                type="button"
                size="sm"
                variant="outline"
                className="text-primary"
                disabled={isPending}
                onClick={() => append(DEFAULT_ROW, { shouldFocus: false })}
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

            {fields.map((field, index) => (
              <StockRowCard
                key={field.id}
                index={index}
                canRemove={fields.length > 1}
                onRemove={() => remove(index)}
                isPending={isPending}
              />
            ))}
          </CardContent>

          <CardFooter className="flex justify-end gap-3">
            {onCancel && (
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={isPending}
              >
                {t('cancel')}
              </Button>
            )}
            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="size-4 animate-spin"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                  </svg>
                  {t('submitting')}
                </span>
              ) : (
                t('submit')
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </FormProvider>
  );
}
