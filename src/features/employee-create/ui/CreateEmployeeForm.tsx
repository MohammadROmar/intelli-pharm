import { useState } from 'react';

import { useCreateEmployee } from '../model/useCreateEmployee';
import { EmployeeForm, type EmployeeFormData } from '@/entities/employee';

export function CreateEmployeeForm() {
  const [formKey, setFormKey] = useState(0); // Becasue reset function does not behave correctly
  const { mutate, isPending } = useCreateEmployee();

  function onSubmit(payload: EmployeeFormData) {
    mutate(payload, {
      onSuccess: () => setFormKey((prev) => prev + 1),
    });
  }

  return (
    <EmployeeForm
      key={formKey}
      onSubmit={onSubmit}
      isLoading={isPending}
      onReset={() => setFormKey((prev) => prev + 1)}
    />
  );
}
