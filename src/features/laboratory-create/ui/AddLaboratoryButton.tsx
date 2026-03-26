import { CreateLaboratoryForm } from './CreateLaboratoryForm';
import { LaboratorySheet } from '@/entities/laboratory';

export function AddLaboratoryButton() {
  return (
    <LaboratorySheet>
      <CreateLaboratoryForm />
    </LaboratorySheet>
  );
}
