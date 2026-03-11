import { useCreateEmployee } from '../model/useCreateEmployee';
import { EmployeeForm, type EmployeeFormData } from '@/entities/employee';

// TO BE IMPLEMENTED
export function CreateEmployeeForm() {
  const { isPending } = useCreateEmployee();

  function onSubmit(payload: EmployeeFormData) {
    console.log(payload);
  }

  return <EmployeeForm onSubmit={onSubmit} isLoading={isPending} />;
}
