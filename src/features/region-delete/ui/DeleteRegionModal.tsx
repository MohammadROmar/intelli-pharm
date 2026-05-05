import type { RegionDetail, RegionListItem } from '@/entities/region';
import { useDeleteEntity } from '@/shared/model';
import { DeleteModal } from '@/shared/ui';

type DeleteRegionModalProps = {
  label?: string;
  region: RegionDetail | RegionListItem | null;
  onClose: () => void;
  onDeleteSuccess?: () => void;
};

export function DeleteRegionModal({
  label,
  region,
  onClose,
  onDeleteSuccess,
}: DeleteRegionModalProps) {
  const { mutate, isPending } = useDeleteEntity({
    item: 'regions',
    translationKey: 'regionsPage.region',
  });

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
      label={label}
      isPending={isPending}
      onClose={onClose}
      onConfirm={handleConfirm}
    />
  );
}
