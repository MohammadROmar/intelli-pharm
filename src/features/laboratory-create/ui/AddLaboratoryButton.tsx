import { useState } from 'react';
import { CreateLaboratoryForm } from './CreateLaboratoryForm';
import { LaboratorySheet, LaboratorySheetTrigger } from '@/entities/laboratory';

export function AddLaboratoryButton() {
  const [open, setOpen] = useState(false);

  return (
    <LaboratorySheet
      open={open}
      onOpenChange={setOpen}
      trigger={<LaboratorySheetTrigger />}
    >
      <CreateLaboratoryForm onSuccess={() => setOpen(false)} />
    </LaboratorySheet>
  );
}
