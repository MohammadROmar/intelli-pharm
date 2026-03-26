import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { LaboratoryEditForm } from './LaboratoryEditForm';
import { LaboratorySheet } from '@/entities/laboratory';

type Props = { id: number; defaultName: string };

export function LaboratoryEditButton(props: Props) {
  const [searchParams] = useSearchParams();
  const [open, setOpen] = useState(() => searchParams.get('active') === 'edit');

  return (
    <LaboratorySheet open={open} onOpenChange={setOpen} isEdit>
      <LaboratoryEditForm {...props} />
    </LaboratorySheet>
  );
}
