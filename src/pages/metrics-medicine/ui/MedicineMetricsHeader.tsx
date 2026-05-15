import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { MedicineMetricsFiltersModal } from './MedicineMetricsFiltersModal';
import { useMedicineMetricsFilters } from '../model/useMedicineMetricsFilters';
import { FiltersTrigger, PageTitle } from '@/shared/ui';

export function MedicineMetricsHeader() {
  const { t } = useTranslation('metrics', {
    keyPrefix: 'medicine',
  });

  const [open, setOpen] = useState(false);
  const { filters, applyFilters, clearFilters, activeCount, hasActiveFilters } =
    useMedicineMetricsFilters();

  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <PageTitle title={t('title')} subtitle={t('subtitle')} />

      <div>
        <FiltersTrigger
          onClick={() => setOpen(true)}
          activeCount={activeCount}
          className="bg-card!"
        />
        <MedicineMetricsFiltersModal
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
      </div>
    </div>
  );
}
