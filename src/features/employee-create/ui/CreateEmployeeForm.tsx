import { useState } from 'react';
import { useCreateEmployee } from '../model/useCreateEmployee';
import { EmployeeForm, type EmployeeFormData } from '@/entities/employee';

export function CreateEmployeeForm() {
  const [formKey, setFormKey] = useState(0); // Becasue reset function does not behave correctly
  const { isPending } = useCreateEmployee();

  function onSubmit(payload: EmployeeFormData) {
    console.log(payload);
  }

  return (
    <>
      <EmployeeForm
        key={formKey}
        onSubmit={onSubmit}
        isLoading={isPending}
        onReset={() => setFormKey((prev) => prev + 1)}
      />
    </>
  );
}
