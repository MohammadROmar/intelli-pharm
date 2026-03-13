import { FormProvider, useForm } from 'react-hook-form';

import { createMedicine } from '../api/api';
import { useMedicineImages } from '../model/useMedicineImages';
import type { FormValues } from '../model/medicineTypes';
import { FormActions } from '@/shared/ui';

import { BasicInfoCard } from './BasicInfoCard';
import { StockEntriesCard } from './StockEntriesCard';
import { ImagesCard } from './ImagesCard';

type MedicineFormProps = {
  defaultValues?: Partial<FormValues>;
  onReset: () => void;
};

export function MedicineForm({ defaultValues, onReset }: MedicineFormProps) {
  const methods = useForm<FormValues>({
    defaultValues: defaultValues ?? {
      stocks: [{ warehouse_id: '', expiry_date: '', quantity: '' }],
    },
  });

  const { images, handleImageRemove, handleImagesAdd } = useMedicineImages();

  async function onSubmit(values: FormValues) {
    await createMedicine(values, images);
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
        <BasicInfoCard />
        <StockEntriesCard />
        <ImagesCard
          images={images}
          onAdd={handleImagesAdd}
          onRemove={handleImageRemove}
        />
        <FormActions onReset={onReset} />
      </form>
    </FormProvider>
  );
}
