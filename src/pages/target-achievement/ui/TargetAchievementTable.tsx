import { useTranslation } from 'react-i18next';

import type { TargetAchievementResponse } from '@/entities/target';
import {
  TableHead,
  EntityListTable,
  EntityFiltersToolbar,
  EntityEmptyState,
} from '@/shared/ui';

import { AchievementRow } from './AchievementRow';
import { TargetAchievementFiltersModal } from './TargetAchievementFiltersModal';
import { useTargetAchievementFilters } from '../model/useTargetAchievementFilters';

type Props = { targetId: number; data: TargetAchievementResponse };

export function TargetAchievementTable({ targetId, data }: Props) {
  const { t } = useTranslation('targets', { keyPrefix: 'achievements' });

  const filtersState = useTargetAchievementFilters();

  return (
    <EntityListTable
      data={data}
      title={t('all')}
      basePath={`/dashboard/targets/${targetId}/achievements`}
      toolbar={
        <EntityFiltersToolbar
          filtersState={filtersState}
          FiltersModal={TargetAchievementFiltersModal}
        />
      }
      columns={
        <>
          <TableHead>{t('repName')}</TableHead>
          <TableHead>{t('achievedValue')}</TableHead>
          <TableHead>{t('achievedAt')}</TableHead>
        </>
      }
      renderRow={(achievement) => (
        <AchievementRow
          key={`${achievement.representative_id}-${achievement.achieved_at}`}
          target={achievement}
        />
      )}
      emptyState={
        <EntityEmptyState
          hasActiveFilters={filtersState.hasActiveFilters}
          clearFilters={filtersState.clearFilters}
        />
      }
    />
  );
}
