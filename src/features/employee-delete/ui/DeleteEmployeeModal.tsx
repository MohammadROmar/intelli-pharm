import { AdminDeleteRestricted } from './AdminDeleteRestricted';
import type { Employee } from '@/entities/employee';
import { useDeleteEntity } from '@/shared/model';
import { DeleteModal } from '@/shared/ui';

export type DeleteEmployeeModalProps = {
  employee: Employee | null;
  onClose: () => void;
  onDeleteSuccess?: () => void;
};

export function DeleteEmployeeModal({
  employee,
  onClose,
  onDeleteSuccess,
}: DeleteEmployeeModalProps) {
  const { mutate, isPending } = useDeleteEntity({
    item: 'employees',
    translationKey: 'employee',
  });

  function handleConfirm() {
    if (!employee) return;
    mutate(employee.id, {
      onSuccess: () => {
        onClose();
        onDeleteSuccess?.();
      },
    });
  }

  const isAdmin = employee?.roles[0] === 'admin';

  if (isAdmin) {
    return <AdminDeleteRestricted employee={employee} onClose={onClose} />;
  }

  return (
    <DeleteModal
      hasItem={!!employee}
      label={employee?.name}
      isPending={isPending}
      onClose={onClose}
      onConfirm={handleConfirm}
    />
  );
}
