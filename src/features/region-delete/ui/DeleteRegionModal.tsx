import { useTranslation } from 'react-i18next';

import type { RegionDetail, RegionListItem } from '@/entities/region';
import { DeleteModal } from '@/shared/ui';
import { useDeleteEntity } from '@/shared/model';

interface DeleteRegionModalProps {
  region: RegionDetail | RegionListItem | null;
  onClose: () => void;
  onDeleteSuccess?: () => void;
}

export function DeleteRegionModal({
  region,
  onClose,
  onDeleteSuccess,
}: DeleteRegionModalProps) {
  const { mutate, isPending } = useDeleteEntity({
    item: 'regions',
    translationKey: 'regionsPage.region',
  });

  const { t } = useTranslation();

  function handleConfirm() {
    if (!region) return;
    mutate(region.id, {
      onSuccess: () => {
        onClose();
        onDeleteSuccess?.();
      },
    });
  }

  return (
    <DeleteModal
      hasItem={!!region}
      label={t('regionsPage.region')}
      isPending={isPending}
      onClose={onClose}
      onConfirm={handleConfirm}
    />
  );
}
