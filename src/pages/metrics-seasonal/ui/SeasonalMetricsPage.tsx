import { useTranslation } from 'react-i18next';

import {
  useSeasonalFilters,
  useSeasonalMetrics,
} from '@/features/metrics-seasonal';
import { PageTitle, QueryErrorBoundary } from '@/shared/ui';

import { MetricsFiltersRequired } from '@/entities/metrics';
import { hasPermission, useGrantedPermissions } from '@/entities/session';

import { SeasonalMetricsTable } from './SeasonalMetricsTable';

export default function SeasonalMetricsPage() {
  const { filters, clearFilters } = useSeasonalFilters();

  const isMissingPair = !!filters.quarter !== !!filters.year;

  if (isMissingPair)
    return <MetricsFiltersRequired clearFilters={clearFilters} />;

  return (
    <QueryErrorBoundary>
      <SeasonalMetricsContent filters={filters} />
    </QueryErrorBoundary>
  );
}

type Props = { filters: Record<string, unknown> };

function SeasonalMetricsContent({ filters }: Props) {
  const { t } = useTranslation('metrics', { keyPrefix: 'seasonal' });
  const { data } = useSeasonalMetrics(filters);
  const grantedPermissions = useGrantedPermissions();

  const canViewPharmacy = hasPermission(
    grantedPermissions,
    'erp.pharmacies.view',
  );
  const canViewCategory = hasPermission(
    grantedPermissions,
    'erp.categories.view',
  );

  return (
    <>
      <PageTitle title={t('title')} subtitle={t('subtitle')} />
      <SeasonalMetricsTable
        data={data.data!}
        canViewPharmacy={canViewPharmacy}
        canViewCategory={canViewCategory}
      />
    </>
  );
}
