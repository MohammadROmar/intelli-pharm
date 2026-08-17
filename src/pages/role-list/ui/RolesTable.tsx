import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { DeleteRoleModal } from '@/features/role-delete';
import type { RoleItem, RolesListResponse } from '@/entities/role';
import {
  EntityEmptyState,
  EntityFiltersToolbar,
  EntityListTable,
  TableHead,
} from '@/shared/ui';

import { RoleFiltersModal } from './RoleFiltersModal';
import { RoleRow } from './RoleRow';
import { useRoleFilters } from '../model/useRoleFilters';
import { useRoleAccess } from '@/features/role-access';

type Props = { data: RolesListResponse };

export function RolesTable({ data }: Props) {
  const { t } = useTranslation('roles');

  const filtersState = useRoleFilters();
  const [roleToDelete, setRoleToDelete] = useState<RoleItem | null>(null);

  const name = roleToDelete?.name;
  const access = useRoleAccess();

  const handleDeleteModalClose = useCallback(() => {
    setRoleToDelete(null);
  }, []);

  const renderRow = useCallback(
    (role: RoleItem) => (
      <RoleRow
        key={role.id}
        role={role}
        onDelete={setRoleToDelete}
        access={access}
      />
    ),
    [access],
  );

  return (
    <>
      <DeleteRoleModal
        label={name ? t(`roleLabels.${name}`, name) : t('role')}
        role={roleToDelete}
        onClose={handleDeleteModalClose}
      />

      <EntityListTable
        data={data}
        title={t('list.all')}
        addButton={
          access.canCreate
            ? { addHref: '/dashboard/roles/new', addLabel: t('list.add') }
            : undefined
        }
        basePath="/dashboard/roles"
        toolbar={
          <EntityFiltersToolbar
            filtersState={filtersState}
            FiltersModal={RoleFiltersModal}
          />
        }
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
        renderRow={renderRow}
        emptyState={
          <EntityEmptyState
            hasActiveFilters={filtersState.hasActiveFilters}
            clearFilters={filtersState.clearFilters}
          />
        }
      />
    </>
  );
}
