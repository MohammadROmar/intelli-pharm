import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { TargetFiltersModal } from './TargetFiltersModal';
import { useTargetFilters } from '../model/useTargetFilters';
import { Badge, FiltersTrigger, PageTitle } from '@/shared/ui';

export function TargetListHeader({ targets }: { targets: number }) {
  const { t } = useTranslation('targets');

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <PageTitle title={t('pageTitle')} subtitle={t('pageSubtitle')} />
        <Filters />
      </div>

      {targets > 0 && (
        <div className="flex items-center gap-2">
          <span>{t('all')}</span>
          <Badge variant="secondary" className="shrink-0 tabular-nums">
            {targets}
          </Badge>
        </div>
      )}
    </div>
  );
}

function Filters() {
  const [open, setOpen] = useState(false);
  const { filters, applyFilters, clearFilters, activeCount, hasActiveFilters } =
    useTargetFilters();

  return (
    <>
      <FiltersTrigger onClick={() => setOpen(true)} activeCount={activeCount} />
      <TargetFiltersModal
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
