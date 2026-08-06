import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { DeleteRoleModal } from '@/features/role-delete';
import type { RoleItem, RolesListResponse } from '@/entities/role';
import { EntityListTable, TableEmptyState, TableHead } from '@/shared/ui';

import { RoleRow } from './RoleRow';

type Props = {
  data: RolesListResponse;
};

export function RolesTable({ data }: Props) {
  const { t } = useTranslation('roles');

  const [roleToDelete, setRoleToDelete] = useState<RoleItem | null>(null);

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
            <TableHead>
              <span className="sr-only">{t('shared.protection')}</span>
            </TableHead>
            <TableHead>{t('shared.permissions')}</TableHead>
            <TableHead>{t('shared.updatedAt')}</TableHead>
            <TableHead>{t('shared.actions')}</TableHead>
          </>
        }
        renderRow={(role) => (
          <RoleRow key={role.id} role={role} onDelete={setRoleToDelete} />
        )}
        emptyState={<TableEmptyState variant="empty" />}
      />
    </>
  );
}
