import { useTranslation } from 'react-i18next';

import type { Employee } from '@/entities/employee';
import { useDeleteEntity } from '@/shared/model';
import { DeleteModal } from '@/shared/ui';

type DeleteEmployeeModalProps = {
  employee: Employee | null;
  onClose: () => void;
};

export function DeleteEmployeeModal({
  employee,
  onClose,
}: DeleteEmployeeModalProps) {
  const { mutate, isPending } = useDeleteEntity({
    item: 'employees',
    translationKey: 'employeesPage.employee',
  });

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
