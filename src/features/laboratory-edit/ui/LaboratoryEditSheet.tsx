import { LaboratoryEditForm } from './LaboratoryEditForm';
import { LaboratorySheet } from '@/entities/laboratory';
import type { Localized } from '@/shared/lib';

type Props = {
  id: number;
  defaultName: Localized;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function LaboratoryEditSheet({
  id,
  defaultName,
  open,
  onOpenChange,
}: Props) {
  return (
    <LaboratorySheet open={open} onOpenChange={onOpenChange} isEdit>
      <LaboratoryEditForm
        id={id}
        defaultName={defaultName}
        onSuccess={() => onOpenChange(false)}
      />
    </LaboratorySheet>
  );
}
