import { useTranslation } from 'react-i18next';
import { Box, Boxes, CircleCheckBig, TrendingUp } from 'lucide-react';

import { calculatePharmacyMetrics } from '../lib/utils';
import type { PharmacyMetrics } from '../model/pharmacyMetricsTypes';
import { StatCard } from '@/entities/metrics';

type Props = { metrics: PharmacyMetrics[] };

export function PharmacyMetricsCards({ metrics }: Props) {
  const { t } = useTranslation('translation', {
    keyPrefix: 'metricsPage.pharmacy.cards',
  });

  const {
    totalItems,
    totalOrders,
    averageScore,
    completionRate,
    completedOrders,
    totalPharmacies,
  } = calculatePharmacyMetrics(metrics);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <StatCard
        icon={TrendingUp}
        title={t('avgScore')}
        value={averageScore}
        subtitle={t('selectedPharmacies')}
      />
      <StatCard
        icon={Box}
        title={t('totalOrders')}
        value={totalOrders}
        subtitle={`${completedOrders} ${t('completed')}`}
      />
      <StatCard
        icon={CircleCheckBig}
        title={t('completionRate')}
        value={`${completionRate * 100}%`}
        subtitle={t('ordersFulfilled')}
      />
      <StatCard
        icon={Boxes}
        title={t('totalItems')}
        value={totalItems}
        subtitle={`${totalPharmacies} ${t('pharmacies')}`}
      />
    </div>
  );
}
