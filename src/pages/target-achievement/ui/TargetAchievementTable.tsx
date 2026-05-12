import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { AchievementRow } from './AchievementRow';
import { TargetAchievementFiltersModal } from './TargetAchievementFiltersModal';
import { useTargetAchievementFilters } from '../model/useTargetAchievementFilters';
import type { TargetAchievementResponse } from '@/entities/target';
import {
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCard,
  TableEmptyState,
  FiltersTrigger,
} from '@/shared/ui';

type Props = { targetId: number; data: TargetAchievementResponse };

export function TargetAchievementTable({ targetId, data }: Props) {
  const { t } = useTranslation('translation', {
    keyPrefix: 'targetsPage.achievements',
  });

  const acheivements = data.data;

  return (
    <>
      <TableCard
        title={t('all')}
        toolbar={<TargetAchievementFilters />}
        currItemsCount={acheivements.length}
        basePath={`/dashboard/targets/${targetId}/achievements`}
        currentPage={data.meta.current_page}
        totalItems={data.meta.total}
        itemsPerPage={data.meta.per_page}
      >
        {acheivements.length > 0 ? (
          <>
            <TableHeader>
              <TableRow>
                <TableHead>{t('repName')}</TableHead>
                <TableHead>{t('achievedValue')}</TableHead>
                <TableHead>{t('achievedAt')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {acheivements.map((acheivement, i) => (
                <AchievementRow
                  key={`target-achievement-${i}`}
                  target={acheivement}
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

function TargetAchievementFilters() {
  const [open, setOpen] = useState(false);
  const { filters, applyFilters, clearFilters, activeCount, hasActiveFilters } =
    useTargetAchievementFilters();

  return (
    <>
      <FiltersTrigger onClick={() => setOpen(true)} activeCount={activeCount} />
      <TargetAchievementFiltersModal
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
  const { hasActiveFilters, clearFilters } = useTargetAchievementFilters();

  return (
    <TableEmptyState
      variant={hasActiveFilters ? 'search' : 'empty'}
      onClearSearch={clearFilters}
    />
  );
}
