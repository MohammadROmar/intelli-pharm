import { useTranslation } from 'react-i18next';

import { useDeleteCity } from '../model/useDeleteCity';
import type { CityDetail } from '@/entities/city';
import { DeleteModal } from '@/shared/ui';

interface DeleteCityModalProps {
  city: CityDetail | null;
  onClose: () => void;
  onDeleteSuccess?: () => void;
}

export function DeleteCityModal({
  city,
  onClose,
  onDeleteSuccess,
}: DeleteCityModalProps) {
  const { mutate, isPending } = useDeleteCity();

  const { t } = useTranslation();

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
      label={t('citiesPage.city')}
      isPending={isPending}
      onClose={onClose}
      onConfirm={handleConfirm}
    />
  );
}
