import { CreateLaboratoryForm } from './CreateLaboratoryForm';
import { LaboratorySheet } from '@/entities/laboratory';

export function AddLaboratoryButton() {
  return (
    <LaboratorySheet hasTrigger>
      <CreateLaboratoryForm />
    </LaboratorySheet>
  );
}
