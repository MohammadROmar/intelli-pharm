import { CityEditForm } from './CityEditForm';
import { CitySheet, type CityDetail } from '@/entities/city';

type Props = { cityToEdit: CityDetail | null; onClose: () => void };

export function CityEditButton({ cityToEdit, onClose }: Props) {
  return (
    <CitySheet open={!!cityToEdit} onOpenChange={onClose} isEdit>
      <CityEditForm city={cityToEdit} />
    </CitySheet>
  );
}
