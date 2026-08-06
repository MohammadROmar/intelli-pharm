import { useTranslation } from 'react-i18next';

import { PageTitle, QueryErrorBoundary } from '@/shared/ui';
import {
  usePharmacyMetrics,
  usePharmacyFilters,
} from '@/features/metrics-pharmacy';
import { useHasPermission } from '@/entities/session';

import { PharmacyMetricsTable } from './PharmacyMetricsTable';

export default function PharmacyMetricsPage() {
  return (
    <QueryErrorBoundary>
      <PharmacyMetricsContent />
    </QueryErrorBoundary>
  );
}

function PharmacyMetricsContent() {
  const { t } = useTranslation('metrics', { keyPrefix: 'pharmacy' });
  const { filters } = usePharmacyFilters();
  const { data } = usePharmacyMetrics(filters);

  const canViewPharmacy = useHasPermission('erp.pharmacies.view');

  return (
    <>
      <PageTitle title={t('title')} subtitle={t('subtitle')} />
      <PharmacyMetricsTable
        data={data.data!}
        canViewPharmacy={canViewPharmacy}
      />
    </>
  );
}
