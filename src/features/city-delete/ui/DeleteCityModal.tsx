import type { CityDetail } from '@/entities/city';
import { useDeleteEntity } from '@/shared/model';
import { DeleteModal } from '@/shared/ui';

type DeleteCityModalProps = {
  city: CityDetail | null;
  onClose: () => void;
  onDeleteSuccess?: () => void;
};

export function DeleteCityModal({
  city,
  onClose,
  onDeleteSuccess,
}: DeleteCityModalProps) {
  const { mutate, isPending } = useDeleteEntity({
    item: 'cities',
    translationKey: 'citiesPage.city',
  });

  function handleConfirm() {
    if (!city) return;
    mutate(city.id, {
      onSuccess: () => {
        onClose();
        onDeleteSuccess?.();
      },
    });
  }

  return (
    <DeleteModal
      hasItem={!!city}
      label={city?.name}
      isPending={isPending}
      onClose={onClose}
      onConfirm={handleConfirm}
    />
  );
}
