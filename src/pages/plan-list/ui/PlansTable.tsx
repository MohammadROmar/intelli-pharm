import { useTranslation } from 'react-i18next';

import { PlanFiltersModal } from './PlanFiltersModal';
import { PlanRow } from './PlanRow';
import { usePlanFilters } from '../model/usePlanFilters';

import type { PlanListApiResponse } from '@/entities/plan';
import {
  EntityEmptyState,
  EntityFiltersToolbar,
  EntityListTable,
  TableHead,
} from '@/shared/ui';

export function PlansTable({ data }: { data: PlanListApiResponse }) {
  const { t } = useTranslation('plan', { keyPrefix: 'list' });
  const filtersState = usePlanFilters();

  return (
    <EntityListTable
      data={data}
      title={t('title')}
      basePath="/dashboard/plans"
      addLabel={t('initiate')}
      addHref="/dashboard/plans/initiate"
      toolbar={
        <EntityFiltersToolbar
          filtersState={filtersState}
          FiltersModal={PlanFiltersModal}
        />
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
