import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { DeleteRegionModal } from '@/features/region-delete';
import { RegionFiltersModal } from './RegionFiltersModal';
import { useRegionFilters } from '../model/useRegionFilters';
import {
  RegionRow,
  type RegionListItem,
  type RegionsListResponse,
} from '@/entities/region';
import {
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCard,
  TableEmptyState,
  FiltersTrigger,
} from '@/shared/ui';

type Props = {
  data: RegionsListResponse;
};

export function RegionsTable({ data }: Props) {
  const { t } = useTranslation('translation', {
    keyPrefix: 'regionsPage.list',
  });

  const [regionToDelete, setRegionToDelete] = useState<RegionListItem | null>(
    null,
  );

  const regions = data.data;

  return (
    <>
      <DeleteRegionModal
        region={regionToDelete}
        onClose={() => setRegionToDelete(null)}
      />

      <TableCard
        title={t('all')}
        header={<RegionFilters />}
        basePath="/dashboard/regions"
        currentPage={data.meta.current_page}
        totalItems={data.meta.total}
        itemsPerPage={data.meta.per_page}
      >
        {regions.length > 0 ? (
          <>
            <TableHeader>
              <TableRow>
                <TableHead className="w-25">{t('id')}</TableHead>
                <TableHead>{t('name')}</TableHead>
                <TableHead>{t('cityId')}</TableHead>
                <TableHead>{t('actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {regions.map((region) => (
                <RegionRow
                  key={region.id}
                  region={region}
                  onDelete={setRegionToDelete}
                />
              ))}
            </TableBody>
          </>
        ) : (
          <EmptyState />
        )}
      </TableCard>
    </>
  );
}

function RegionFilters() {
  const [open, setOpen] = useState(false);
  const { filters, applyFilters, clearFilters, activeCount, hasActiveFilters } =
    useRegionFilters();

  return (
    <>
      <FiltersTrigger onClick={() => setOpen(true)} activeCount={activeCount} />
      <RegionFiltersModal
        open={open}
        onOpenChange={setOpen}
        defaultValues={filters}
        hasActiveFilters={hasActiveFilters}
        onApply={(v) => {
          applyFilters(v);
          setOpen(false);
        }}
        onClear={() => {
          clearFilters();
          setOpen(false);
        }}
      />
    </>
  );
}

function EmptyState() {
  const { hasActiveFilters, clearFilters } = useRegionFilters();

  return (
    <TableEmptyState
      variant={hasActiveFilters ? 'search' : 'empty'}
      onClearSearch={clearFilters}
    />
  );
}
