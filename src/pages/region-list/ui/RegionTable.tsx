import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { DeleteRegionModal } from '@/features/region-delete';
import {
  RegionRow,
  type RegionListItem,
  type RegionsListResponse,
} from '@/entities/region';
import {
  TableHead,
  EntityListTable,
  EntityFiltersToolbar,
  EntityEmptyState,
} from '@/shared/ui';

import { RegionFiltersModal } from './RegionFiltersModal';
import { useRegionFilters } from '../model/useRegionFilters';

type Props = { data: RegionsListResponse };

export function RegionsTable({ data }: Props) {
  const { t } = useTranslation('regions', { keyPrefix: 'list' });

  const [regionToDelete, setRegionToDelete] = useState<RegionListItem | null>(
    null,
  );

  const filtersState = useRegionFilters();

  return (
    <>
      <DeleteRegionModal
        label={regionToDelete?.name}
        region={regionToDelete}
        onClose={() => setRegionToDelete(null)}
      />

      <EntityListTable
        data={data}
        title={t('all')}
        addHref="/dashboard/regions/new"
        addLabel={t('add')}
        basePath="/dashboard/regions"
        toolbar={
          <EntityFiltersToolbar
            filtersState={filtersState}
            FiltersModal={RegionFiltersModal}
          />
        }
        columns={
          <>
            <TableHead className="w-25">{t('id')}</TableHead>
            <TableHead>{t('name')}</TableHead>
            <TableHead>{t('city')}</TableHead>
            <TableHead>{t('actions')}</TableHead>
          </>
        }
        renderRow={(region) => (
          <RegionRow
            key={region.id}
            region={region}
            onDelete={setRegionToDelete}
          />
        )}
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
