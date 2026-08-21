import { FormProvider, useForm } from 'react-hook-form';

import { useMedicineImages } from '@/entities/medicine';

import { ImagesCard } from './ImagesCard';
import { BasicInfoCard } from './BasicInfoCard';
import { StockEntriesCard } from './StockEntriesCard';
import { medicineToFromData } from '../lib/utils';
import type {
  ImageFile,
  MedicineDetail,
  MedicineFormData,
} from '@/entities/medicine';
import { FormActions } from '@/shared/ui';

type MedicineFormProps = {
  medicine?: MedicineDetail;
  isPending?: boolean;
  onSubmit: (payload: {
    values: MedicineFormData;
    images: ImageFile[];
  }) => void;
  onReset: () => void;
};

export function MedicineForm({
  medicine,
  isPending,
  onSubmit,
  onReset,
}: MedicineFormProps) {
  const methods = useForm<MedicineFormData>({
    defaultValues: medicine
      ? medicineToFromData(medicine)
      : {
          is_active: true,
          stocks: [{ warehouse_id: '', expiry_date: '', quantity: '' }],
          imagesCount: 0,
        },
  });

  const { images, handleImageRemove, handleImagesAdd } = useMedicineImages();

  function submitHandler(values: MedicineFormData) {
    onSubmit({ values, images });
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(submitHandler)}
        className="space-y-6"
      >
        <BasicInfoCard medicine={medicine} isPending={isPending} />
        {!medicine && <StockEntriesCard isPending={isPending} />}
        <ImagesCard
          images={images}
          existingImages={medicine?.images}
          imagesRequired={!medicine}
          isPending={isPending}
          onAdd={handleImagesAdd}
          onRemove={handleImageRemove}
        />
        <FormActions
          isEdit={!!medicine}
          isLoading={isPending}
          onReset={onReset}
        />
      </form>
    </FormProvider>
  );
}
