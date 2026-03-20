import { FormProvider, useForm } from 'react-hook-form';

import { BasicInfoCard } from './BasicInfoCard';
import { StockEntriesCard } from './StockEntriesCard';
import { ImagesCard } from './ImagesCard';
import {
  useMedicineImages,
  type MedicineFormData,
  type ImageFile,
} from '@/entities/medicine';
import { FormActions } from '@/shared/ui';

type MedicineFormProps = {
  defaultValues?: Partial<MedicineFormData>;
  isPending?: boolean;
  onSubmit: (payload: {
    values: MedicineFormData;
    images: ImageFile[];
  }) => void;
  onReset: () => void;
};

export function MedicineForm({
  defaultValues,
  isPending,
  onSubmit,
  onReset,
}: MedicineFormProps) {
  const methods = useForm<MedicineFormData>({
    defaultValues: defaultValues ?? {
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
        <BasicInfoCard isPending={isPending} />
        <StockEntriesCard isPending={isPending} />
        <ImagesCard
          images={images}
          isPending={isPending}
          onAdd={handleImagesAdd}
          onRemove={handleImageRemove}
        />
        <FormActions
          isEdit={!!defaultValues}
          isLoading={isPending}
          onReset={onReset}
        />
      </form>
    </FormProvider>
  );
}
