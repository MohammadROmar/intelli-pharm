import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router';
import { Pencil, Trash2 } from 'lucide-react';

import { DeleteRoleModal } from '@/features/role-delete';
import type { RoleItem } from '@/entities/role';
import { hasPermission, useGrantedPermissions } from '@/entities/session';
import { ActionsDropdown, DropdownMenuItem, PageHeader } from '@/shared/ui';

type Props = {
  role: RoleItem;
};

export function RoleDetailHeader({ role }: Props) {
  const { t } = useTranslation('roles');
  const roleName = t(`roleLabels.${role.name}`, role.name);

  return (
    <PageHeader
      title={roleName}
      pageTitle={`${roleName} · ${t('detail.pageTitle')} - IntelliPharma`}
    >
      <RoleActions role={role} name={roleName} />
    </PageHeader>
  );
}

type RoleActionsProps = {
  role: RoleItem;
  name: string;
};

function RoleActions({ role, name }: RoleActionsProps) {
  const { t } = useTranslation('roles', { keyPrefix: 'shared' });
  const [roleToDelete, setRoleToDelete] = useState<RoleItem | null>(null);
  const navigate = useNavigate();
  const grantedPermissions = useGrantedPermissions();

  const canManage = hasPermission(grantedPermissions, 'auth.roles.manage');
  const canMutate = canManage && role.is_editable;

  if (!canMutate) return null;

  return (
    <>
      <DeleteRoleModal
        label={name}
        role={roleToDelete}
        onClose={() => setRoleToDelete(null)}
        onDeleteSuccess={() => navigate('/dashboard/roles')}
      />

      <ActionsDropdown label={t('actions')}>
        <DropdownMenuItem asChild>
          <Link
            to={`/dashboard/roles/${role.id}/edit`}
            className="cursor-pointer"
          >
            <Pencil className="size-4" aria-hidden />
            {t('edit')}
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem
          variant="destructive"
          onSelect={() => setRoleToDelete(role)}
          className="text-destructive hover:text-destructive hover:bg-destructive/20! w-full justify-start"
        >
          <Trash2 className="size-4" aria-hidden />
          {t('delete')}
        </DropdownMenuItem>
      </ActionsDropdown>
    </>
  );
}
