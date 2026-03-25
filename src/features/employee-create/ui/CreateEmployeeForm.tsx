import { useState } from 'react';

import { useCreateEmployee } from '../model/useCreateEmployee';
import { EmployeeForm, type CreateEmployeeFormData } from '@/entities/employee';

export function CreateEmployeeForm() {
  const [formKey, setFormKey] = useState(0);
  const { mutate, isPending } = useCreateEmployee();

  function onSubmit(payload: CreateEmployeeFormData) {
    console.log(payload);
    mutate(payload, {
      onSuccess: () => setFormKey((prev) => prev + 1),
    });
  }

  return (
    <EmployeeForm
      mode="create"
      key={formKey}
      onSubmit={onSubmit}
      isLoading={isPending}
      onReset={() => setFormKey((prev) => prev + 1)}
    />
  );
}
