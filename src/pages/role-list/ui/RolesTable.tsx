import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { DeleteRoleModal } from '@/features/role-delete';
import { hasPermission, useGrantedPermissions } from '@/entities/session';
import type { RoleItem, RolesListResponse } from '@/entities/role';
import { EntityListTable, TableEmptyState, TableHead } from '@/shared/ui';

import { RoleRow, type RoleActionAccess } from './RoleRow';

type Props = { data: RolesListResponse };

export function RolesTable({ data }: Props) {
  const { t } = useTranslation('roles');
  const grantedPermissions = useGrantedPermissions();

  const [roleToDelete, setRoleToDelete] = useState<RoleItem | null>(null);

  const actionAccess = useMemo<RoleActionAccess>(
    () => ({
      canManage: hasPermission(grantedPermissions, 'auth.roles.manage'),
      hasAnyRowAction: hasPermission(grantedPermissions, 'auth.roles.manage'),
    }),
    [grantedPermissions],
  );

  const name = roleToDelete?.name;

  return (
    <>
      <DeleteRoleModal
        label={name ? t(`roleLabels.${name}`, name) : t('role')}
        role={roleToDelete}
        onClose={() => setRoleToDelete(null)}
      />

      <EntityListTable
        data={data}
        title={t('list.all')}
        addHref="/dashboard/roles/new"
        addLabel={t('list.add')}
        basePath="/dashboard/roles"
        columns={
          <>
            <TableHead>{t('shared.name')}</TableHead>
            <TableHead>{t('shared.permissions')}</TableHead>
            <TableHead>{t('shared.updatedAt')}</TableHead>
            {actionAccess.hasAnyRowAction ? (
              <TableHead>{t('shared.actions')}</TableHead>
            ) : null}
          </>
        }
        renderRow={(role) => (
          <RoleRow
            key={role.id}
            role={role}
            actionAccess={actionAccess}
            onDelete={setRoleToDelete}
          />
        )}
        emptyState={<TableEmptyState variant="empty" />}
      />
    </>
  );
}
