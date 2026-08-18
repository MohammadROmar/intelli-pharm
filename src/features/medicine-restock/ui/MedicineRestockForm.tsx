import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Boxes, Plus } from 'lucide-react';

import type { StockEntry } from '@/entities/medicine';
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardSectionHeader,
  FormActions,
} from '@/shared/ui';

import { StockRowCard } from './StockRowCard';
import type {
  RestockFormValues,
  MedicineRestockFormProps,
} from '../model/restockTypes';

const DEFAULT_ROW: StockEntry = {
  warehouse_id: '',
  quantity: '',
  expiry_date: '',
};

export function MedicineRestockForm({
  isPending = false,
  onSubmit,
  onReset,
  defaultValues,
}: MedicineRestockFormProps) {
  const { t } = useTranslation('medicines', { keyPrefix: 'restock' });

  const methods = useForm<RestockFormValues>({
    defaultValues: { stocks: defaultValues ?? [DEFAULT_ROW] },
    mode: 'onTouched',
  });

  const { fields, append, remove } = useFieldArray({
    control: methods.control,
    name: 'stocks',
  });

  return (
    <FormProvider {...methods}>
      <Card>
        <CardHeader className="flex! flex-wrap items-center justify-between gap-4">
          <CardSectionHeader
            icon={Boxes}
            title={t('warehouseStock')}
            description={t('warehouseStockSubtitle')}
          />
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
        </CardHeader>

        <CardContent className="space-y-4">
          <form
            id="medicine-restock-form"
            onSubmit={methods.handleSubmit(onSubmit)}
            noValidate
            className="space-y-6"
          >
            {fields.map((field, index) => (
              <StockRowCard
                key={field.id}
                index={index}
                canRemove={fields.length > 1}
                onRemove={() => remove(index)}
                isPending={isPending}
              />
            ))}
          </form>
        </CardContent>

        <CardFooter>
          <FormActions
            onReset={() => onReset()}
            label={t('addStock')}
            isLoading={isPending}
            form="medicine-restock-form"
          />
        </CardFooter>
      </Card>
    </FormProvider>
  );
}
