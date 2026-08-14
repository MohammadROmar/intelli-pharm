import { useState } from 'react';

import type { Employee, EditEmployeeFormData } from '@/entities/employee';

import { EmployeeForm } from './EmployeeForm';
import { useEditEmployee } from '../model/useEditEmployee';

type Props = { employee: Employee };

export function EditEmployeeForm({ employee }: Props) {
  const [formKey, setFormKey] = useState(0);
  const { mutate, isPending } = useEditEmployee(employee.id);

  function onSubmit(payload: EditEmployeeFormData) {
    mutate(payload, { onSuccess: () => setFormKey((prev) => prev + 1) });
  }

  return (
    <EmployeeForm
      mode="edit"
      key={formKey}
      onSubmit={onSubmit}
      onReset={() => setFormKey((prev) => prev + 1)}
      isLoading={isPending}
      defaultValues={{
        ...employee,
        phone_number: employee.phone_number || '',
        role: employee.roles[0],
      }}
    />
  );
}
