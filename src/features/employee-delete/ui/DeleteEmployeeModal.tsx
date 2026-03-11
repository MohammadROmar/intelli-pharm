import { useTranslation } from 'react-i18next';

import { useDeleteEmployee } from '../model/useDeleteEmployee';
import type { Employee } from '@/entities/employee';
import { DeleteModal } from '@/shared/ui/DeleteModal';

interface DeleteEmployeeModalProps {
  employee: Employee | null;
  onClose: () => void;
}

export function DeleteEmployeeModal({
  employee,
  onClose,
}: DeleteEmployeeModalProps) {
  const { mutate, isPending } = useDeleteEmployee();

  const { t } = useTranslation();

  function handleConfirm() {
    if (!employee) return;
    mutate(employee.id, {
      onSuccess: () => onClose(),
    });
  }

  return (
    <DeleteModal
      hasItem={!!employee}
      label={t('employeesPage.employee')}
      isPending={isPending}
      onClose={onClose}
      onConfirm={handleConfirm}
    />
  );
}
