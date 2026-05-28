import { useTranslation } from 'react-i18next';

import { useAreaFilters, useAreaMetrics } from '@/features/metrics-area';
import { MetricsFiltersRequired } from '@/entities/metrics';
import { PageTitle, QueryErrorBoundary } from '@/shared/ui';

import { AreaMetricsTable } from './AreaMetricsTable';

export default function AreaMetricsPage() {
  const { filters, clearFilters } = useAreaFilters();

  const isMissingPair = !!filters.quarter !== !!filters.year;

  if (isMissingPair)
    return <MetricsFiltersRequired clearFilters={clearFilters} />;

  return (
    <QueryErrorBoundary>
      <AreaMetricsContent filters={filters} />
    </QueryErrorBoundary>
  );
}

type Props = { filters: Record<string, unknown> };

function AreaMetricsContent({ filters }: Props) {
  const { t } = useTranslation('metrics', { keyPrefix: 'area' });
  const { data } = useAreaMetrics(filters);

  return (
    <>
      <PageTitle title={t('title')} subtitle={t('subtitle')} />
      <AreaMetricsTable data={data.data!} />
    </>
  );
}
