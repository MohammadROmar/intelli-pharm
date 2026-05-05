import { useTranslation } from 'react-i18next';

import type { CityDetail } from '@/entities/city';
import { useDeleteEntity } from '@/shared/model';
import { getLocalized } from '@/shared/lib';
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

  const { i18n } = useTranslation();
  const name = city ? getLocalized(city.name, i18n.language) : '';

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
      label={name}
      isPending={isPending}
      onClose={onClose}
      onConfirm={handleConfirm}
    />
  );
}
