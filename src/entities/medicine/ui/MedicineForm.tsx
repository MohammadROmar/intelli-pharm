import { FormProvider, useForm } from 'react-hook-form';

import { createMedicine } from '../api/api';
import { useMedicineImages } from '../model/useMedicineImages';
import type { FormValues } from '../model/medicineTypes';
import { FormActions } from '@/shared/ui';

import { BasicInfoCard } from './BasicInfoCard';
import { StockEntriesCard } from './StockEntriesCard';
import { ImagesCard } from './ImagesCard';

type MedicineFormProps = { defaultValues?: Partial<FormValues> };

export function MedicineForm({ defaultValues }: MedicineFormProps) {
  const methods = useForm<FormValues>({
    defaultValues: defaultValues ?? {
      stocks: [{ warehouse_id: '', expiry_date: '', quantity: '' }],
    },
  });

  const { images, handleImageRemove, handleImagesAdd, clearImages } =
    useMedicineImages();

  async function onSubmit(values: FormValues) {
    await createMedicine(values, images);
  }

  function handleReset() {
    methods.reset();
    images.forEach((img) => URL.revokeObjectURL(img.preview));
    clearImages();
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
        <FormActions onReset={handleReset} />
      </form>
    </FormProvider>
  );
}
