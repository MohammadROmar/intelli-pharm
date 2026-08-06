import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { DeleteRegionModal } from '@/features/region-delete';
import { hasPermission, useGrantedPermissions } from '@/entities/session';
import type { RegionListItem, RegionsListResponse } from '@/entities/region';
import {
  TableHead,
  EntityListTable,
  EntityFiltersToolbar,
  EntityEmptyState,
} from '@/shared/ui';

import { RegionRow, type RegionRowActionAccess } from './RegionRow';
import { RegionFiltersModal } from './RegionFiltersModal';
import { useRegionFilters } from '../model/useRegionFilters';

type Props = { data: RegionsListResponse };

export function RegionsTable({ data }: Props) {
  const { t } = useTranslation('regions', { keyPrefix: 'list' });
  const grantedPermissions = useGrantedPermissions();

  const [regionToDelete, setRegionToDelete] = useState<RegionListItem | null>(
    null,
  );

  const filtersState = useRegionFilters();

  const canCreate = hasPermission(grantedPermissions, 'erp.regions.create');
  const canView = hasPermission(grantedPermissions, 'erp.regions.view');
  const canUpdate = hasPermission(grantedPermissions, 'erp.regions.update');
  const canDelete = hasPermission(grantedPermissions, 'erp.regions.delete');

  const actionAccess = useMemo<RegionRowActionAccess>(
    () => ({
      canView,
      canUpdate,
      canDelete,
      hasAnyRowAction: canView || canUpdate || canDelete,
    }),
    [canDelete, canUpdate, canView],
  );

  const handleDeleteClose = useCallback(() => setRegionToDelete(null), []);

  const renderRow = useCallback(
    (region: RegionListItem) => (
      <RegionRow
        key={region.id}
        region={region}
        actionAccess={actionAccess}
        onDelete={setRegionToDelete}
      />
    ),
    [actionAccess],
  );

  return (
    <>
      {canDelete ? (
        <DeleteRegionModal
          label={regionToDelete?.name}
          region={regionToDelete}
          onClose={handleDeleteClose}
        />
      ) : null}

      <EntityListTable
        data={data}
        title={t('all')}
        addButton={
          canCreate
            ? {
                addHref: '/dashboard/regions/new',
                addLabel: t('add'),
              }
            : undefined
        }
        basePath="/dashboard/regions"
        toolbar={
          <EntityFiltersToolbar
            filtersState={filtersState}
            FiltersModal={RegionFiltersModal}
          />
        }
        columns={
          <>
            <TableHead>{t('name')}</TableHead>
            <TableHead>{t('city')}</TableHead>
            {actionAccess.hasAnyRowAction ? (
              <TableHead>{t('actions')}</TableHead>
            ) : null}
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
