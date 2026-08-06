import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { hasPermission, useGrantedPermissions } from '@/entities/session';
import type { PlanListApiResponse } from '@/entities/plan';
import {
  EntityEmptyState,
  EntityFiltersToolbar,
  EntityListTable,
  TableHead,
} from '@/shared/ui';

import { PlanRow, type PlanRowActionAccess } from './PlanRow';
import { PlanFiltersModal } from './PlanFiltersModal';
import { InitiatePlanButton } from './InitiatePlanButton';
import { usePlanFilters } from '../model/usePlanFilters';

export function PlansTable({ data }: { data: PlanListApiResponse }) {
  const { t } = useTranslation('plan', { keyPrefix: 'list' });
  const filtersState = usePlanFilters();
  const grantedPermissions = useGrantedPermissions();

  const canView = hasPermission(grantedPermissions, 'planner.plan.view');

  const actionAccess = useMemo<PlanRowActionAccess>(
    () => ({
      canView,
      hasAnyRowAction: canView,
    }),
    [canView],
  );

  const renderRow = useCallback(
    (plan: PlanListApiResponse['data'][number]) => (
      <PlanRow key={plan.id} plan={plan} actionAccess={actionAccess} />
    ),
    [actionAccess],
  );

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
          <TableHead>{t('table.userName')}</TableHead>
          <TableHead>{t('table.region')}</TableHead>
          <TableHead>{t('table.createdAt')}</TableHead>
          <TableHead>{t('table.reason')}</TableHead>
          <TableHead>{t('table.distance')}</TableHead>
          <TableHead>{t('table.duration')}</TableHead>
          {actionAccess.hasAnyRowAction ? (
            <TableHead>{t('table.actions')}</TableHead>
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
  );
}
