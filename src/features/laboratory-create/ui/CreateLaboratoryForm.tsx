import { useCreateLaboratory } from '../model/useCreatelaboratory';
import { LaboratoryForm, type Laboratory } from '@/entities/laboratory';

export function CreateLaboratoryForm() {
  const { isPending } = useCreateLaboratory();

  function onSubmit(payload: Laboratory) {
    console.log(payload);
  }

  return <LaboratoryForm onSubmit={onSubmit} isLoading={isPending} />;
}
