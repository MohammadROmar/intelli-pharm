import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useRegionAccess } from '@/features/region-access';
import { DeleteRegionModal } from '@/features/region-delete';
import type { RegionListItem, RegionsListResponse } from '@/entities/region';
import {
  TableHead,
  EntityListTable,
  EntityFiltersToolbar,
  EntityEmptyState,
} from '@/shared/ui';

import { RegionRow } from './RegionRow';
import { RegionFiltersModal } from './RegionFiltersModal';
import { useRegionFilters } from '../model/useRegionFilters';

type Props = { data: RegionsListResponse };

export function RegionsTable({ data }: Props) {
  const { t } = useTranslation('regions', { keyPrefix: 'list' });

  const [regionToDelete, setRegionToDelete] = useState<RegionListItem | null>(
    null,
  );

  const filtersState = useRegionFilters();

  const actionAccess = useRegionAccess();

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
      {actionAccess.canDelete && (
        <DeleteRegionModal
          label={regionToDelete?.name}
          region={regionToDelete}
          onClose={handleDeleteClose}
        />
      )}

      <EntityListTable
        data={data}
        title={t('all')}
        addButton={
          actionAccess.canCreate
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
            <TableHead>{t('actions')}</TableHead>
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
