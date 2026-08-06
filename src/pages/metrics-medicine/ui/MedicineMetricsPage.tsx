import { useTranslation } from 'react-i18next';

import {
  useMedicineFilters,
  useMedicineMetrics,
} from '@/features/metrics-medicine';
import { MetricsFiltersRequired } from '@/entities/metrics';
import { hasPermission, useGrantedPermissions } from '@/entities/session';
import { PageTitle, QueryErrorBoundary } from '@/shared/ui';

import { MedicineMetricsTable } from './MedicineMetricsTable';

export default function MedicineMetricsPage() {
  const { filters, clearFilters } = useMedicineFilters();

  const isMissingPair = !!filters.quarter !== !!filters.year;

  if (isMissingPair)
    return <MetricsFiltersRequired clearFilters={clearFilters} />;

  return (
    <QueryErrorBoundary>
      <MedicineMetricsContent filters={filters} />
    </QueryErrorBoundary>
  );
}

type Props = { filters: Record<string, unknown> };

function MedicineMetricsContent({ filters }: Props) {
  const { t } = useTranslation('metrics', { keyPrefix: 'medicine' });
  const { data } = useMedicineMetrics(filters);
  const grantedPermissions = useGrantedPermissions();

  const canViewMedicine = hasPermission(
    grantedPermissions,
    'erp.medicines.view',
  );

  return (
    <>
      <PageTitle title={t('title')} subtitle={t('subtitle')} />
      <MedicineMetricsTable
        data={data.data!}
        canViewMedicine={canViewMedicine}
      />
    </>
  );
}
