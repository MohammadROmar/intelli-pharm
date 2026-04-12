import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowLeftRight, Pill, RefreshCcw, ShoppingCart } from 'lucide-react';

import type { MedicineMetric } from '../model/medicineMetricsTypes';
import { useMedicineMetricsWorker } from '../model/useMedicineMetricsWorker';
import { StatCard } from '@/entities/metrics';
import { MetricsCardsSkeleton } from '@/shared/ui';

type Props = { metrics: MedicineMetric[] };

export function MedicineMetricsCards({ metrics }: Props) {
  const { t } = useTranslation('translation', {
    keyPrefix: 'metricsPage.medicine.cards',
  });

  const { summary, isCalculating, calculate } = useMedicineMetricsWorker();

  useEffect(() => {
    calculate(metrics);
  }, [metrics, calculate]);

  if (isCalculating) return <MetricsCardsSkeleton />;

  const totalOrders = summary?.totalOrders ?? 0;
  const avgAcceptanceRate = summary?.avgAcceptanceRate ?? 0;
  const alternativesUsed = summary?.alternativesUsed ?? 0;
  const medicinesCount = summary?.medicinesCount ?? 0;

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      <StatCard
        icon={ShoppingCart}
        title={t('ordersTitle')}
        value={isCalculating ? '...' : totalOrders}
        subtitle={t('ordersSubtitle')}
      />
      <StatCard
        icon={RefreshCcw}
        title={t('acceptanceRateTitle')}
        value={isCalculating ? '...' : avgAcceptanceRate}
        subtitle={t('acceptanceRateSubtitle')}
      />
      <StatCard
        icon={ArrowLeftRight}
        title={t('altsUsedTitle')}
        value={isCalculating ? '...' : alternativesUsed}
        subtitle={t('altsUsedSubtitle')}
      />
      <StatCard
        icon={Pill}
        title={t('medicines')}
        value={isCalculating ? '...' : medicinesCount}
        subtitle={`${metrics.length} ${t('record')}`}
      />
    </div>
  );
}
