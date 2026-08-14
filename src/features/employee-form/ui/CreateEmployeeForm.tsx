import { useState } from 'react';

import type { CreateEmployeeFormData } from '@/entities/employee';

import { EmployeeForm } from './EmployeeForm';
import { useCreateEmployee } from '../model/useCreateEmployee';

export function CreateEmployeeForm() {
  const [formKey, setFormKey] = useState(0);
  const { mutate, isPending } = useCreateEmployee();

  function onSubmit(payload: CreateEmployeeFormData) {
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
