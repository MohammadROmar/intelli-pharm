import type { RoleItem } from '@/entities/role';
import { useDeleteEntity } from '@/shared/model';
import { DeleteModal } from '@/shared/ui';
import { RoleDeleteRestricted } from './RoleDeleteRestricted';

type DeleteRoleModalProps = {
  label: string;
  role: RoleItem | null;
  onClose: () => void;
  onDeleteSuccess?: () => void;
};

export function DeleteRoleModal({
  label,
  role,
  onClose,
  onDeleteSuccess,
}: DeleteRoleModalProps) {
  const { mutate, isPending } = useDeleteEntity({
    item: 'roles',
    translationKey: 'role',
  });

  function handleConfirm() {
    if (!role) return;

    mutate(role.id, {
      onSuccess: () => {
        onClose();
        onDeleteSuccess?.();
      },
    });
  }

  const isAdmin = role?.name === 'admin';

  if (isAdmin) {
    return <RoleDeleteRestricted role={role} onClose={onClose} />;
  }

  return (
    <DeleteModal
      hasItem={!!role}
      label={label}
      isPending={isPending}
      onClose={onClose}
      onConfirm={handleConfirm}
    />
  );
}
