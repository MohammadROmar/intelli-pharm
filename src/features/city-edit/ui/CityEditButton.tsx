import { CityEditForm } from './CityEditForm';
import { CitySheet, type CityDetail } from '@/entities/city';

type Props = { cityToUpdate: CityDetail | null; onClose: () => void };

export function CityEditButton({ cityToUpdate, onClose }: Props) {
  return (
    <CitySheet open={!!cityToUpdate} onOpenChange={onClose} isEdit>
      <CityEditForm
        id={cityToUpdate?.id ?? -1}
        defaultName={cityToUpdate?.name ?? ''}
      />
    </CitySheet>
  );
}
