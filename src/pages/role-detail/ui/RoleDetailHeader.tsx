import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Pencil, Trash2 } from 'lucide-react';

import { DeleteRoleModal } from '@/features/role-delete';
import type { RoleItem } from '@/entities/role';
import { hasPermission, useGrantedPermissions } from '@/entities/session';
import { DropdownMenuItem, PageHeader, ActionsDropdown } from '@/shared/ui';

type Props = { role: RoleItem };

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

function RoleActions({ role, name }: Props & { name: string }) {
  const { t } = useTranslation('roles', { keyPrefix: 'shared' });

  const [roleToDelete, setRoleToDelete] = useState<RoleItem | null>(null);
  const navigate = useNavigate();
  const grantedPermissions = useGrantedPermissions();

  const canManage = hasPermission(grantedPermissions, 'auth.roles.manage');

  return (
    <>
      {canManage ? (
        <DeleteRoleModal
          label={name}
          role={roleToDelete}
          onClose={() => setRoleToDelete(null)}
          onDeleteSuccess={() => navigate('/dashboard/roles')}
        />
      ) : null}

      {canManage ? (
        <ActionsDropdown label={t('actions')}>
          <DropdownMenuItem asChild>
            <Link
              to={`/dashboard/roles/${role.id}/edit`}
              className="cursor-pointer"
            >
              <Pencil className="size-4" />
              {t('edit')}
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem
            variant="destructive"
            onSelect={() => setRoleToDelete(role)}
            className="text-destructive hover:text-destructive hover:bg-destructive/20! w-full justify-start"
          >
            <Trash2 className="size-4" />
            {t('delete')}
          </DropdownMenuItem>
        </ActionsDropdown>
      ) : null}
    </>
  );
}
