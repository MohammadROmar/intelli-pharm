import { useTranslation } from 'react-i18next';

import type { PlanListApiResponse } from '@/entities/plan';
import {
  EntityEmptyState,
  EntityFiltersToolbar,
  EntityListTable,
  TableHead,
} from '@/shared/ui';

import { PlanRow } from './PlanRow';
import { PlanFiltersModal } from './PlanFiltersModal';
import { InitiatePlanButton } from './InitiatePlanButton';
import { usePlanFilters } from '../model/usePlanFilters';

export function PlansTable({ data }: { data: PlanListApiResponse }) {
  const { t } = useTranslation('plan', { keyPrefix: 'list' });
  const filtersState = usePlanFilters();

  return (
    <EntityListTable
      data={data}
      title={t('title')}
      basePath="/dashboard/plans"
      toolbar={
        <>
          <EntityFiltersToolbar
            filtersState={filtersState}
            FiltersModal={PlanFiltersModal}
          />

          <InitiatePlanButton />
        </>
      }
      columns={
        <>
          <TableHead className="w-32">{t('table.id')}</TableHead>
          <TableHead>{t('table.userName')}</TableHead>
          <TableHead>{t('table.region')}</TableHead>
          <TableHead>{t('table.createdAt')}</TableHead>
          <TableHead>{t('table.reason')}</TableHead>
          <TableHead>{t('table.distance')}</TableHead>
          <TableHead>{t('table.duration')}</TableHead>
          <TableHead>{t('table.actions')}</TableHead>
        </>
      }
      renderRow={(plan) => <PlanRow key={plan.id} plan={plan} />}
      emptyState={
        <EntityEmptyState
          hasActiveFilters={filtersState.hasActiveFilters}
          clearFilters={filtersState.clearFilters}
        />
      }
    />
  );
}
