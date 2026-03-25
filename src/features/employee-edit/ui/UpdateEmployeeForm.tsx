import { useState } from 'react';

import { useUpdateEmployee } from '../model/useUpdateEmployee';
import {
  EmployeeForm,
  type Employee,
  type UpdateEmployeeFormData,
} from '@/entities/employee';

type Props = { employee: Employee };

export function UpdateEmployeeForm({ employee }: Props) {
  const [formKey, setFormKey] = useState(0);
  const { mutate, isPending } = useUpdateEmployee();

  function onSubmit(payload: UpdateEmployeeFormData) {
    mutate(
      { id: employee.id, payload },
      {
        onSuccess: () => setFormKey((prev) => prev + 1),
      },
    );
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
        role: employee.roles[0],
      }}
    />
  );
}
